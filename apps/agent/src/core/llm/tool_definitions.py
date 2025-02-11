from langchain_core.tools import tool
from langchain_core.pydantic_v1 import BaseModel, Field

class multiply(BaseModel):
    """Multiply two integers together."""

    a: int = Field(description="First integer")
    b: int = Field(description="Second integer")


tools = [multiply]