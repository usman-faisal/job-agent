import { Module } from '@nestjs/common';
import { LlmService } from './llm.service';
import { ResumeService } from 'src/resume/resume.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { EnvService } from 'src/env/env.service';
import { EnvModule } from 'src/env/env.module';
import { ResumeModule } from 'src/resume/resume.module';

@Module({
    imports: [ResumeModule],
    providers: [LlmService, ResumeService, PrismaService, EnvService],
    exports: [LlmService]
})
export class LlmModule {} 
