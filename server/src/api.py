from src.claims.controller import router as claims_router

app.include_router(claims_router, prefix="/claims", tags=["Claims"])
