from fastapi import FastAPI
from src.auth.routes import router as auth_router
from src.claims.routes import router as claims_router
from fastapi.middleware.cors import CORSMiddleware
from src.claims import models

app = FastAPI(
    title="Insurance CRC Assistant API"
)




# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

) 
# -------------------------
# Health check
# -------------------------
@app.get("/health")
def health():
    return {"status": "ok"}

# -------------------------
# Routers
# -------------------------
app.include_router(auth_router)
app.include_router(claims_router)


from src.database.database import engine
from src.database.base import Base

@app.on_event("startup")
async def on_startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

