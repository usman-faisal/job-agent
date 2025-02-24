import { Message } from "@prisma/client";
import { ChatResponse } from "src/lib/types";

export interface LLMInterface {
    chat(history: Message[]): Promise<ChatResponse>
}