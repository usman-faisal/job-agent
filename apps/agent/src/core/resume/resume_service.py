from src.config import settings
import os

from src.core.resume.utils import ResumeUtils

class ResumeService:
    async def get_active_resume(self):
        active_resume = await ResumeUtils.get_resume(where={"active": True})
        if not active_resume:
            raise Exception("No active resume found")
        return active_resume

    async def get_resume(self, resume_id: str):
        resume = await ResumeUtils.get_resume(where={"id": resume_id})
        if not resume:
            raise Exception("Resume not found")
        # check if active resume exists
        active_resume_exists = await ResumeUtils.get_resume(where={"active": True})
        if not active_resume_exists:
            await ResumeUtils.update_resume(where={"id": resume_id}, data={"active": True})
        return resume

    async def get_resumes(self):
        resumes = await ResumeUtils.get_resumes()
        return resumes

    async def create_resume(self, resume_id: str):
        existing_resume = await ResumeUtils.get_resume(where={"resumeIdentifier": resume_id})

        if existing_resume:
            return existing_resume

        resume = await ResumeUtils.create_resume(data={"resumeIdentifier": resume_id})
        return resume


    async def update_resume(self, resume_id: str, data: dict):
        resume = await ResumeUtils.update_resume(where={"id": resume_id}, data=data)
        return resume