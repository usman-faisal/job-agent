import { EnvService } from "src/env/env.service";
import { LLMInterface } from "../llm.interface";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { AIMessage, HumanMessage, ToolMessage } from "@langchain/core/messages";
import { Runnable } from "@langchain/core/runnables";
import { AIMessageChunk } from "@langchain/core/messages";
import { GoogleGenerativeAIChatCallOptions } from "@langchain/google-genai";
import { BaseLanguageModelInput } from "@langchain/core/language_models/base";
import { calculatorTool } from "../tools/calculator-tool";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { Message } from "@prisma/client";
import { Role } from "@prisma/client";
import { systemPrompt } from "../prompts/system-prompt";
import { createGetResumeSectionTool } from "../tools/get-resume-section";
import { ResumeService } from "src/resume/resume.service";
import { DynamicStructuredTool } from "@langchain/core/tools";

export class GeminiAdapter implements LLMInterface {
    gemini: Runnable<BaseLanguageModelInput, AIMessageChunk, GoogleGenerativeAIChatCallOptions>
    getResumeSectionTool: DynamicStructuredTool
    constructor(
        apiKey: string,
        model: string,
        resumeService: ResumeService
    ) {
        this.getResumeSectionTool = createGetResumeSectionTool(resumeService);

        this.gemini = new ChatGoogleGenerativeAI(
            {
                apiKey: apiKey,
                model: model,
                temperature: 0,
                maxRetries: 2,
            }
        ).bindTools([calculatorTool, this.getResumeSectionTool])
    }

    async chat(history: Message[]): Promise<string> {
        try {
            const promptTemplate = ChatPromptTemplate.fromMessages([
                ["system", systemPrompt],
                new MessagesPlaceholder("msgs"),
            ]);

            const chain = promptTemplate.pipe(this.gemini)
            const response = await chain.invoke({
                msgs: this._constructHistory(history)
            })
            if (response.content && typeof response.content === 'string') {
                return response.content
            }
            if (response.tool_calls && response.tool_calls.length > 0) {
                const toolCall = response.tool_calls[0]
                const toolName = toolCall.name
                const toolArgs = toolCall.args
                if (toolName === "get_resume_section") {
                    const { section } = toolArgs;
                    let result = null
                    try {
                        result = await this.getResumeSectionTool.func({ section })
                    }
                    catch (e) {
                        if (e instanceof Error) {
                            return e.message
                        }
                        return "Error in GeminiAdapter.chat: " + JSON.stringify(e)
                    }
                    const formattedResult = JSON.stringify({ section, data: result });
                    const newHistory = [...history, { role: Role.assistant, content: `the result of the tool call is ${formattedResult}` }]
                    const newResponse = await chain.invoke({
                        msgs: [this._constructHistory(newHistory as Message[])],
                    });
                    if (newResponse.content && typeof newResponse.content === 'string') {
                        return newResponse.content
                    }
                }
            }
            throw new Error("No response from Gemini")
        } catch (error) {
            throw new Error("Error in GeminiAdapter.chat: " + error)
        }
    }

    _constructHistory(history: Message[]): (AIMessage | HumanMessage)[] {
        return history.map(message => {
            if (message.role === Role.user) {
                return new HumanMessage(message.content)
            } else {
                return new AIMessage(message.content)
            }
        })
    }
}