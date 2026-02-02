from app.api.v1.endpoints import auth, specs, contact
from fastapi import APIRouter

api_router = APIRouter()
api_router.include_router(auth.router, tags=["auth"])
api_router.include_router(specs.router, prefix="/specs", tags=["specs"])
api_router.include_router(contact.router, prefix="/contact", tags=["contact"])
