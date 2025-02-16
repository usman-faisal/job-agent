import prisma.enums
from langchain_core.messages import BaseMessage

from .utils import ChatUtils
from ..llm.llm import llm

class ChatService:
    async def get_chat(self):
        return await ChatUtils.get_messages()

    async def chat(self, message: str) -> str:
        history = await self.get_chat()
        response = await llm.get_completion(message, history)
        await ChatUtils.save_message(message, prisma.enums.Role.user)

        handled_response = self.handle_llm_response(response)
        await ChatUtils.save_message(handled_response, prisma.enums.Role.assistant)
        return handled_response

    def handle_llm_response(self, response: BaseMessage) -> str:
        if response.tool_calls:
            return self.handle_tool_call(response)
        return response.content

    def handle_tool_call(self, response: BaseMessage) -> str:
        message = f"Tool call: {response.tool_calls[0]['name']} with args: {response.tool_calls[0]['args']}"
        return message
