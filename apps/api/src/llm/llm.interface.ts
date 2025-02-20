import { Message } from "@prisma/client";

export interface LLMInterface {
    chat(history: Message[]): Promise<string>
}