import json
from psycopg2.extras import RealDictCursor

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
        WHERE p.policy_type ILIKE %(policy_type)s
    """
    
    params = {'policy_type': policy_type}

    # Providers filter
    if filters.get('providers'):
        sql += " AND pr.name = ANY(%(providers)s)"
        params['providers'] = filters['providers']

    # Duration filter
    if filters.get('duration') is not None:
        sql += " AND p.term_months = %(term_months)s"
        params['term_months'] = int(filters['duration']) * 12

    # Price filter
    price_range = filters.get("premium_range")
    if price_range:
        if price_range == "Upto ₹5 Lakh":
            sql += " AND p.premium::numeric <= %(max_price)s"
            params['max_price'] = 500000
        elif price_range == "₹5-10 Lakh":
            sql += " AND p.premium::numeric > %(min_price)s AND p.premium::numeric <= %(max_price)s"
            params['min_price'] = 500000
            params['max_price'] = 1000000
        elif price_range == "Above ₹10 Lakh":
            sql += " AND p.premium::numeric > %(min_price)s"
            params['min_price'] = 1000000

    # Sorting by term
    if filters.get('sort_term'):
        sort_order = filters['sort_term'].lower()
        if sort_order in ['asc', 'desc']:
            sql += f" ORDER BY p.term_months {sort_order.upper()}"

    db.execute(sql, params)
    rows = db.fetchall()

    # Build results
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
        WHERE p.policy_type ILIKE %(policy_type)s
    """
    params = {'policy_type': policy_type}
    db.execute(sql, params)
    rows = db.fetchall()
    return [row['name'] for row in rows]
