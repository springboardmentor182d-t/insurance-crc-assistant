from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database.core import engine, Base
from .entities import claims # Import to register models
from .claims.controller import router as claims_router

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Insurance CRC Assistant API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(claims_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Insurance CRC Assistant API"}

@app.get("/health")
def health():
    return {"status": "ok"}
