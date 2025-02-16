from fastapi import APIRouter
from src.core.resume.resume_service import ResumeService

from src.core.chat.utils import ChatUtils

router = APIRouter(tags=["resume"])
resume_service = ResumeService()

@router.get("/resume/init-resume")
async def init_resume():
    print(resume_service)