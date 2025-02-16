from fastapi import APIRouter
from pydantic import BaseModel

from src.core.chat.chat_service import ChatService

from src.core.chat.utils import ChatUtils

router = APIRouter(tags=["chat"])
chat_service = ChatService()

@router.get("/chat/get-messages")
async def get_chat():
    return await chat_service.get_chat()

class SendMessageDto(BaseModel):
    message: str

@router.post("/chat/send-message")
async def post_chat(send_message_dto: SendMessageDto) -> str:
    response = await chat_service.chat(send_message_dto.message)  # Ensure the coroutine is awaited
    print(response, 'response in controller')
    return response  # Return the actual response

@router.delete("/chat/clear-messages")
async def clear_chat():
    return await ChatUtils.clear_messages()