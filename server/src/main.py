from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.auth.routes import router as auth_router
from src.auth.protected_routes import router as protected_router
from src.claims.routes import router as claims_router
from src.recommendations.controller import router as recommendations_router
from src.admin.controller import router as admin_router
from src.profile.controller import router as profile_router
from src.preferences.preferences_controller import router as preferences_router

app = FastAPI(title="Insurance CRC Assistant API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/api/test")
def test():
    return {"message": "Hello from FastAPI"}

app.include_router(auth_router)
app.include_router(protected_router) 
app.include_router(admin_router)
app.include_router(profile_router)
app.include_router(preferences_router)
app.include_router(recommendations_router)

@app.get("/")
async def root():
    return {"message": "InsureHub backend is up"}
app.include_router(claims_router)