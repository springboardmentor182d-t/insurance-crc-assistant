from fastapi import APIRouter, Body
from .service import get_comparison_rules, evaluate_comparison

router = APIRouter(prefix="/comparison", tags=["Comparison"])


@router.get("/rules")
async def fetch_comparison_rules():
    """
    Returns raw comparison rules (optional).
    Useful for admin/debugging.
    """
    return get_comparison_rules()


@router.post("/evaluate")
async def evaluate_compare(policies: list = Body(...)):
    """
    Evaluates comparison for selected policies.
    Expects normalized policy objects from frontend.
    """

    rules = get_comparison_rules()
    rows = evaluate_comparison(policies, rules)

    return {
        "rows": rows
    }
