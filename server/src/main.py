from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# API router
from src.api import api_router

# Policy router (MISSING – now added)
from src.policy.routes.policy import router as policy_router

# Auth routers
from src.auth.routes.auth_routes import router as auth_router
from src.auth.routes.auth_otp_routes import router as register_otp_router
from src.auth.routes.forgot_password import router as forgot_password_router

app = FastAPI(title="Insurance CRC Assistant API")

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- Root ----------------
@app.get("/")
def root():
    return {"message": "Server running"}

# ---------------- Health check (MISSING – added) ----------------
@app.get("/health")
def health():
    return {"status": "ok"}

# ---------------- Test route (MISSING – added) ----------------
@app.get("/api/test")
def test():
    return {"message": "Hello from FastAPI"}

# ---------------- Routers ----------------
# API routes
app.include_router(api_router)

# Policy routes (MISSING – added)
app.include_router(
    policy_router,
    prefix="/policies",
    tags=["policies"]
)

# Auth routes
app.include_router(auth_router)
app.include_router(register_otp_router)
app.include_router(forgot_password_router)
