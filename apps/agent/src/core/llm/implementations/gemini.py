from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import AIMessage, HumanMessage, BaseMessage, ToolCall
from typing import List

from src.core.llm.utils import LLMUtils, LLMEnums


class Gemini:
    def __init__(self, temperature: int = 0, max_tokens: int = None, timeout: int = None, max_retries: int = 2, tools: List[dict] = []):
        self.llm = ChatGoogleGenerativeAI(

            model=LLMEnums.GEMINI.value,
            temperature=temperature,
            max_tokens=max_tokens,
            timeout=timeout,
            max_retries=max_retries,
        )
        self.llm = self.llm.bind_tools(tools=tools)

    async def get_completion(self, message: str, history: List[HumanMessage | AIMessage]) -> BaseMessage:
        """
        Get completion from the LLM model.
        :param message: The message to be completed.
        :param history: The history of messages. (Human and AI messages)
        :return: The completion.
        """
        history = LLMUtils.construct_message_history(message, history)
        response = await self.llm.ainvoke(history)
        return response