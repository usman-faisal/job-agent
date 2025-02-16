from pydantic_settings import BaseSettings

from src.core.llm.utils import LLMEnums

class Settings(BaseSettings):
    LLM_API_KEY: str
    LLM_MODEL: str = LLMEnums.GEMINI.value
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()
