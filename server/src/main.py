from fastapi import FastAPI
from src.database.core import engine, Base
from src.policy.routes.policy import router as policy_router
from fastapi.middleware.cors import CORSMiddleware





app = FastAPI(title="Insurance Backend")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


Base.metadata.create_all(bind=engine)
app.include_router(policy_router, prefix="/policies", tags=["Policies"])

@app.get("/")
def root():
    return {"message": "Backend running successfully"}

