import prisma.enums
from langchain_core.messages import AIMessage, HumanMessage
from typing import List
from enum import Enum

class LLMEnums(Enum):
    GEMINI = "gemini-1.5-flash"

class LLMUtils:
    @staticmethod
    def construct_message_history(new_message: str, history: List[HumanMessage | AIMessage]) -> List[HumanMessage | AIMessage]:
        """
        Construct the message history.
        :param new_message:
        :param history:
        :return: The message history.
        """
        messages = []
        for message in history:
            if message.role == prisma.enums.Role.user:
                messages.append(HumanMessage(content=message.content))
            else:
                messages.append(AIMessage(content=message.content))
        messages.append(HumanMessage(content=new_message))
        return messages