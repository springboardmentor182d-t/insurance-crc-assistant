from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.users.controller import router as users_router
from src.recommendations.controller import router as recommendations_router

app = FastAPI(title="Insurance CRC Assistant API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router)
app.include_router(recommendations_router)

@app.get("/")
def root():
    return {"message": "Backend is running successfully"}
