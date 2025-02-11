import os
from src.core.llm.implementations.gemini import Gemini
from src.core.llm.utils import LLMEnums
from .tool_definitions import tools

class LLM:
    def __init__(self):
        llm_model = os.getenv("LLM_MODEL", LLMEnums.GEMINI.value)
        if llm_model == LLMEnums.GEMINI.value:
            self.llm = Gemini(tools=tools)

    async def get_completion(self, message: str, history: list):
        response = await self.llm.get_completion(message, history)
        return response