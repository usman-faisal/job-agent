import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { LlmService } from 'src/llm/llm.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { EnvService } from 'src/env/env.service';
import { ResumeService } from 'src/resume/resume.service';

@Module({
  imports: [],
  controllers: [ChatController],
  providers: [ChatService, LlmService, PrismaService, EnvService, ResumeService],
})
export class ChatModule {}
