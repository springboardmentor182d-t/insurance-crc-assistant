from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.policy.routes.policy import router as policy_router

app = FastAPI(title="Insurance CRC Assistant API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check
@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/api/test")
def test():
    return {"message": "Hello from FastAPI"}

# Include the policy router with prefix /policies
app.include_router(policy_router, prefix="/policies", tags=["policies"])
