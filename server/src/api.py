from fastapi import APIRouter

# Create main API router
api_router = APIRouter()

# Import feature routers
from src.dashboard.controller import router as dashboard_router
#from src.comparison.controller import router as policies_router
from src.profile.controller import router as profile_router

# Include routers
api_router.include_router(dashboard_router)
# api_router.include_router(policies_router)
api_router.include_router(profile_router)







# from fastapi import APIRouter

# <<<<<<< HEAD

# api_router = APIRouter()

# from src.dashboard.controller import router as dashboard_router  # if exists
# from src.comparison.controller import router as policies_router



# =======
# from src.dashboard.controller import router as dashboard_router
# api_router = APIRouter()

# >>>>>>> origin/main-group-B
# api_router.include_router(dashboard_router)
# api_router.include_router(policies_router)


# from src.profile.controller import router as profile_router


# # include profile + preferences routes
# api_router.include_router(profile_router)
















# from fastapi import APIRouter
# from src.comparison.controller import router as policies_router
# from src.dashboard.controller import router as dashboard_router
# from src.profile.controller import router as profile_router
# api_router = APIRouter()
# api_router.include_router(policies_router)
# api_router.include_router(dashboard_router)




# router.include_router(profile_router)
