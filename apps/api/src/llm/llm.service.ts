import { Injectable } from '@nestjs/common';
import { LLM_MODELS } from 'src/lib/constants';
import { EnvService } from 'src/env/env.service';
import { GeminiAdapter } from './implementations/gemini.adapter';
import { LLMInterface } from './llm.interface';
import { Message } from '@prisma/client';
import { ResumeService } from 'src/resume/resume.service';
import { ChatResponse } from 'src/lib/types';

@Injectable()
export class LlmService implements LLMInterface {
    private readonly llm: LLMInterface
    constructor(private readonly envService: EnvService, private readonly resumeService: ResumeService) {
        const LLM_API_KEY = this.envService.get('LLM_API_KEY')
        const LLM_MODEL = this.envService.get('LLM_MODEL')

        switch(LLM_MODEL) {
            case LLM_MODELS.GEMINI:
                this.llm = new GeminiAdapter(LLM_API_KEY, LLM_MODEL, this.resumeService)
                break
            default:
                throw new Error(`Unsupported LLM model: ${LLM_MODEL}`)
        }
    }

    async chat(history: Message[]): Promise<ChatResponse> {
        return this.llm.chat(history)
    }
}
