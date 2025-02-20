from fastapi import APIRouter

router = APIRouter(tags=["agent"])

@router.get("/test")
async def get_chat():
    return "Hello World"