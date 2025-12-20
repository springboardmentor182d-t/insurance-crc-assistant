from app.routes import dashboard
from server import app
app.include_router(dashboard.router)
