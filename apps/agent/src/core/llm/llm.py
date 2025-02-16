from src.config import settings
from src.core.llm.implementations.gemini import Gemini
from src.core.llm.utils import LLMEnums
from src.core.tools.tool_definitions import tools

class LLM:
    def __init__(self):
        llm_api_key = settings.LLM_API_KEY
        llm_model = settings.LLM_MODEL
        if llm_model == LLMEnums.GEMINI.value:
            self.llm = Gemini(api_key=llm_api_key, tools=tools)

    async def get_completion(self, message: str, history: list):
        response = await self.llm.get_completion(message, history)
        return response

llm = LLM()