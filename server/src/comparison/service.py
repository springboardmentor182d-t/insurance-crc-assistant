from sqlalchemy import text

def display_policy(db, policy_type: str, filters: dict = None):
    if filters is None:
        filters = {}

    sql = """
        SELECT
            p.id AS policy_id,
            p.title,
            p.policy_type,
            p.premium,
            p.term_months,
            p.coverage,
            p.deductible,
            pr.name AS provider_name
        FROM Policies p
        JOIN Providers pr ON p.provider_id = pr.id
        WHERE p.policy_type ILIKE :policy_type
    """

    params = {'policy_type': f"%{policy_type}%"}

    if filters.get('providers'):
        sql += " AND pr.name = ANY(:providers)"
        params['providers'] = filters['providers']

    if filters.get('duration') is not None:
        sql += " AND p.term_months = :term_months"
        params['term_months'] = int(filters['duration']) * 12

    price_range = filters.get("premium_range")
    if price_range:
        if price_range == "Upto ₹5 Lakh":
            sql += " AND p.premium::numeric <= :max_price"
            params['max_price'] = 500000
        elif price_range == "₹5-10 Lakh":
            sql += " AND p.premium::numeric > :min_price AND p.premium::numeric <= :max_price"
            params['min_price'] = 500000
            params['max_price'] = 1000000
        elif price_range == "Above ₹10 Lakh":
            sql += " AND p.premium::numeric > :min_price"
            params['min_price'] = 1000000

    if filters.get('sort_term'):
        sort_order = filters['sort_term'].lower()
        if sort_order in ['asc', 'desc']:
            sql += f" ORDER BY p.term_months {sort_order.upper()}"

    stmt = text(sql)
    result = db.execute(stmt, params)

 
    rows = result.mappings().all()

    results = []
    for row in rows:
        results.append({
            "policy_id": row['policy_id'],
            "provider_name": row['provider_name'],
            "title": row['title'],
            "premium": float(row['premium']) if row['premium'] is not None else 0.0,
            "term_months": int(row['term_months']) if row['term_months'] is not None else 0,
            "coverage": row['coverage'],
            "deductible": float(row['deductible']) if row['deductible'] is not None else 0.0
        })

    return results


def get_providers_by_policy_type(db, policy_type: str):
    sql = """
        SELECT DISTINCT pr.name
        FROM Policies p
        JOIN Providers pr ON p.provider_id = pr.id
        WHERE p.policy_type ILIKE :policy_type
    """
    params = {'policy_type': f"%{policy_type}%"}
    stmt = text(sql)
    result = db.execute(stmt, params)
    rows = result.mappings().all()  
    return [row['name'] for row in rows]
