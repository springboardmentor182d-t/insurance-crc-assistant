from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.api import api_router
from src.database.core import Base, engine

from src.auth.routes.auth_routes import router as auth_router
from src.auth.routes.auth_otp_routes import router as register_otp_router
from src.auth.routes.forgot_password import router as forgot_password_router
from src.fraud.fraud_route import router as fraud_router
from src.policy.routes.policy import router as policy_router

# Create DB tables
Base.metadata.create_all(bind=engine)
from src.notifications.routes.notification_routes import router as notification_router


from src.database.core import Base, engine
from src.notifications.models import Notification


Base.metadata.create_all(bind=engine)

app = FastAPI()

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

app.include_router(api_router, prefix="/api")
app.include_router(policy_router, prefix="/policies")
app.include_router(auth_router)
app.include_router(register_otp_router)
app.include_router(forgot_password_router)


app.include_router(
    api_router,
    prefix="/api",
    tags=["internal"]
)

app.include_router(
    policy_router,
    prefix="/api/policies",
    tags=["policies"]
)

app.include_router(fraud_router)
# Auth APIs
app.include_router(auth_router, prefix="/api")
app.include_router(register_otp_router, prefix="/api")
app.include_router(forgot_password_router, prefix="/api")







# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# <<<<<<< HEAD
# from src.api import api_router 


# from src.database.core import Base, engine


# Base.metadata.create_all(bind=engine)



# =======
# from src.api import api_router
# from src.policy.routes.policy import router as policy_router
# >>>>>>> origin/main-group-B
# from src.auth.routes.auth_routes import router as auth_router
# from src.auth.routes.auth_otp_routes import router as register_otp_router
# from src.auth.routes.forgot_password import router as forgot_password_router

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
# @app.get("/")
# def root():
#     return {"message": "Server running"}

# @app.get("/health")
# def health():
#     return {"status": "ok"}

# @app.get("/api/test")
# def test():
#     return {"message": "Hello from FastAPI"}



# app.include_router(api_router)


# app.include_router(
#     policy_router,
#     prefix="/policies",
#     tags=["policies"]
# )


# app.include_router(auth_router)
# app.include_router(register_otp_router)
# app.include_router(forgot_password_router)

# app.include_router(api_router, prefix="/api")
    notification_router,
    prefix="/notifications",
    tags=["notifications"]
)

app.include_router(notification_router)

