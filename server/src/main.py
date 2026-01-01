from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Policy router
from src.policy.routes.policy import router as policy_router

# Auth routers
from src.auth.routes.auth_routes import router as auth_router
from src.auth.routes.auth_otp_routes import router as register_otp_router
from src.auth.routes.forgot_password import router as forgot_password_router

# API router
from src.api import api_router

app = FastAPI(title="Insurance CRC Assistant API")

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- Health Check ----------------
@app.get("/health")
def health():
    return {"status": "ok"}

# ---------------- Test Route ----------------
@app.get("/")
def root():
    return {"message": "Server running"}

@app.get("/api/test")
def test():
    return {"message": "Hello from FastAPI"}

# ---------------- Include Routers ----------------
# Policy routes with prefix
app.include_router(policy_router, prefix="/policies", tags=["policies"])

# API routes
app.include_router(api_router)

# Authentication routes
app.include_router(auth_router)
app.include_router(register_otp_router)
app.include_router(forgot_password_router)
