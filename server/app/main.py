from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import profile, recommendations

app = FastAPI(title="Insurance CRC Assistant")

# ✅ CORS CONFIG (VERY IMPORTANT)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(profile.router)
app.include_router(recommendations.router)

@app.get("/")
def root():
    return {"status": "FastAPI backend running"}
