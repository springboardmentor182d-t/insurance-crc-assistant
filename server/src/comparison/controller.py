from fastapi import APIRouter, Depends, Query
from typing import List, Optional
from src.database.core import get_db
from src.comparison.service import display_policy, get_providers_by_policy_type



router = APIRouter(tags=["Policies"])


@router.get("/policies/{policy_type}")
def display_policies_endpoint(
    policy_type: str,
    db=Depends(get_db),
    min_price: Optional[float] = Query(None),
    max_price: Optional[float] = Query(None),
    providers: Optional[List[str]] = Query(None),
    duration: Optional[int] = Query(None),
    sort_term: Optional[str] = Query(None)
):
    filters = {
        "min_price": min_price,
        "max_price": max_price,
        "providers": providers,
        "duration": duration,
        "sort_term": sort_term
    }

    
    results = display_policy(db, policy_type, filters)
    
   
    return {"results": results}
@router.get("/policies/{policy_type}/providers")
def get_providers_by_policy_type_endpoint(
    policy_type: str,
    db=Depends(get_db)
):
    providers = get_providers_by_policy_type(db, policy_type)

    return {
        "policy_type": policy_type,
        "count": len(providers),
        "providers": providers
    }
