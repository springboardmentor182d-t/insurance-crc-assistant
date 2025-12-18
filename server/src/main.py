from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="Insurance CRC Assistant API")


from src.claims.controller import router as claims_router

app = FastAPI()

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
 
@app.get("/")
def root():
    return {"message": "Backend running"}

app.include_router(claims_router, prefix="/claims", tags=["Claims"])
 
