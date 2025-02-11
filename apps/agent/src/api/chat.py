from fastapi import APIRouter
from src.core.chat.chat import Chat
from typing import Any

from src.core.chat.utils import ChatUtils

router = APIRouter(tags=["chat"])
chat = Chat()

@router.get("/chat/get-messages")
async def get_chat():
    return await chat.get_chat()

@router.post("/chat/send-message")
async def post_chat(message: str) -> str:
    response = await chat.chat(message)  # Ensure the coroutine is awaited
    print(response, 'response in controller')
    return response  # Return the actual response

@router.delete("/chat/clear-messages")
async def clear_chat():
    return await ChatUtils.clear_messages()