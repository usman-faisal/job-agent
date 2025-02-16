from fastapi import APIRouter

from .chat import router as chat_router
from .resume import router as resume_router
router = APIRouter()
router.include_router(chat_router)
router.include_router(resume_router)
