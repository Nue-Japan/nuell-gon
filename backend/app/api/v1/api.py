from app.api.v1.endpoints import auth, specs
from fastapi import APIRouter

api_router = APIRouter()
api_router.include_router(auth.router, tags=["auth"])
api_router.include_router(specs.router, prefix="/specs", tags=["specs"])
