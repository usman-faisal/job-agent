import { EnvService } from "src/env/env.service";
import { LLMInterface } from "../llm.interface";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { AIMessage, HumanMessage, ToolMessage } from "@langchain/core/messages";
import { Runnable } from "@langchain/core/runnables";
import { AIMessageChunk } from "@langchain/core/messages";
import { GoogleGenerativeAIChatCallOptions } from "@langchain/google-genai";
import { BaseLanguageModelInput } from "@langchain/core/language_models/base";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { Message } from "@prisma/client";
import { Role } from "@prisma/client";
import { getSystemPrompt } from "../prompts/system-prompt";
import { createGetResumeSectionTool } from "../tools/get-resume-section";
import { ResumeService } from "src/resume/resume.service";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { createResumeMutationTool } from "../tools/create-resume-section";
import { ChatResponse } from "src/lib/types";


export class GeminiAdapter implements LLMInterface {
    gemini: Runnable<BaseLanguageModelInput, AIMessageChunk, GoogleGenerativeAIChatCallOptions>
    getResumeSectionTool: DynamicStructuredTool
    createResumeSectionTool: DynamicStructuredTool
    constructor(
        apiKey: string,
        model: string,
        private readonly resumeService: ResumeService
    ) {
        this.getResumeSectionTool = createGetResumeSectionTool(this.resumeService);
        this.createResumeSectionTool = createResumeMutationTool(this.resumeService);

        this.gemini = new ChatGoogleGenerativeAI(
            {
                apiKey: apiKey,
                model: model,
                temperature: 0,
                maxRetries: 2,
            }
        ).bindTools([this.createResumeSectionTool])
    }

    async chat(history: Message[]): Promise<ChatResponse> {
        try {
            const activeResume = await this.resumeService.getResume({ active: true })
            
            if (!activeResume) {
                return [{role: Role.assistant, content: "No active resume found"}]
            }
            const systemPrompt = getSystemPrompt(activeResume)
            const promptTemplate = ChatPromptTemplate.fromMessages([
                ["system", systemPrompt],
                new MessagesPlaceholder("msgs"),
            ]);

            const chain = promptTemplate.pipe(this.gemini)
            const response = await chain.invoke({
                msgs: this._constructHistory(history)
            })
            if (response.content && typeof response.content === 'string') {
                return [{role: Role.assistant, content: response.content}]
            }
            if (response.tool_calls && response.tool_calls.length > 0) {
                const toolCall = response.tool_calls[0]
                const toolName = toolCall.name
                const toolArgs = toolCall.args
                if (toolName === "mutate_resume_section") {
                    console.log('hi im here', toolArgs)
                    const { operation, section, sectionId, data } = toolArgs;
                    let result = null
                    try {
                        result = await this.createResumeSectionTool.func({ operation, section, sectionId, data })
                    }
                    catch (e) {
                        if (e instanceof Error) {
                            return [{role: Role.assistant, content: "Error in GeminiAdapter.chat: " + e.message}]
                        }
                        return [{role: Role.assistant, content: "Error in GeminiAdapter.chat: " + e}]
                    }
                    const formattedResult = JSON.stringify({ section, data: result });
                    const toolMessage = {content: `Response returned after mutating done: ${formattedResult}`, role: Role.tool}
                    const newHistory = [...history, toolMessage]
                    const newResponse = await chain.invoke({
                        msgs: this._constructHistory(newHistory as Message[]),
                    });
                    console.log(newResponse, 'new Response')
                    if (newResponse.content && typeof newResponse.content === 'string') {
                        return [toolMessage,{role: Role.assistant, content: newResponse.content}]
                    }
                }
            }
            throw new Error("No response from Gemini")
        } catch (error) {
            throw new Error("Error in GeminiAdapter.chat: " + error)
        }
    }

    _constructHistory(history: Message[]): (AIMessage | HumanMessage | ToolMessage)[] {
        return history.map(message => {
            if (message.role === Role.user) {
                return new HumanMessage(message.content)
            } else if(message.role === Role.assistant) {
                return new AIMessage(message.content)
            } else if(message.role === Role.tool) {
                return new ToolMessage({content: message.content, name: '', tool_call_id: ''})
            }
            throw new Error("Invalid role in message: " + message.role)
        })
    }
}