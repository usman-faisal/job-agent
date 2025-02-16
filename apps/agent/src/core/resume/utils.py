from ..db.database import db

class ResumeUtils:
    @staticmethod
    async def get_resumes(where: dict = {}):
        resumes = await db.resume.find(where=where)
        return resumes

    @staticmethod
    async def get_resume(where: dict = {}):
        resume = await db.resume.find_first(where=where)
        return resume

    @staticmethod
    async def get_populated_resume(where: dict = {}):
        resume = await db.resume.find_first(
            where=where,
            include=['profile', 'educations', 'experiences', 'skills', 'projects', 'languages', 'certifications', 'publications'
         ])
        return resume

    @staticmethod
    async def update_resume(where: dict, data: dict):
        resume = await db.resume.update(where=where, data=data)
        return resume

    @staticmethod
    async def create_resume(data: dict):
        resume = await db.resume.insert(data=data)
        return resume

    @staticmethod
    async def delete_resume(where: dict):
        resume = await db.resume.delete(where=where)
        return resume