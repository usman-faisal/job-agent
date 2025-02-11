import prisma.enums
from ..db.database import db

class ChatUtils:
    @staticmethod
    async def get_messages():
        messages = await db.message.find_many()
        return messages

    @staticmethod
    async def save_message(message: str, role: prisma.enums.Role):
        await db.message.create(data={"content": message, "role": role})
        return True

    @staticmethod
    async def clear_messages():
        await db.message.delete_many()