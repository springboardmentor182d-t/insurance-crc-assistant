from fastapi import FastAPI
from .database import engine
from .models import Base
from .routes import policy
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
app.include_router(policy.router)

@app.get("/")
def root():
    return {"message": "Backend running successfully"}
