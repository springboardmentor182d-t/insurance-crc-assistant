from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Database
from src.database.core import Base, engine

# Routers
from src.api import api_router
from src.auth.routes.auth_routes import router as auth_router
from src.auth.routes.auth_otp_routes import router as register_otp_router
from src.auth.routes.forgot_password import router as forgot_password_router
from src.policy.routes.policy import router as policy_router
from src.fraud.fraud_route import router as fraud_router
from src.notifications.routes.notification_routes import router as notification_router

# Create DB tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI
app = FastAPI(title="Insurance CRC Assistant API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health & test endpoints
@app.get("/")
def root():
    return {"message": "Server running"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/api/test")
def test():
    return {"message": "Hello from FastAPI"}

# Include routers
app.include_router(api_router, prefix="/api", tags=["internal"])
app.include_router(policy_router, prefix="/api/policies", tags=["policies"])
app.include_router(fraud_router, prefix="/api/fraud", tags=["fraud"])
app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(register_otp_router, prefix="/api/auth", tags=["auth-otp"])
app.include_router(forgot_password_router, prefix="/api/auth", tags=["forgot-password"])
app.include_router(notification_router, prefix="/api/notifications", tags=["notifications"])

