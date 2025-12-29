from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

# Import routers from your new dashboard folder
from server.app.dashboard.profile import router as profile_router
from server.app.dashboard.dashboard import router as dashboard_router

# If recommendations are still in routers/
from server.app.routers.recommendations import router as recommendations_router  

# Database imports (mentor asked to restore these)
from server.app.database import engine, Base
from server.app.models import profile, recommendation

app = FastAPI()

# Allow frontend (React/Vite) to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(profile_router)
app.include_router(dashboard_router)
app.include_router(recommendations_router)

# Serve static files (for profile pictures, etc.)
app.mount("/static", StaticFiles(directory="server/app/static"), name="static")

# Ensure tables are created
Base.metadata.create_all(bind=engine)