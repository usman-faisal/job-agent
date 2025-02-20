import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { ChatModule } from './chat/chat.module';
import { LlmService } from './llm/llm.service';
import { ConfigModule } from '@nestjs/config';
import { EnvModule } from './env/env.module';
import { envSchema } from './env/env';
import { ResumeModule } from './resume/resume.module';
import { LlmModule } from './llm/llm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    ChatModule,
    ResumeModule,
    LlmModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, LlmService],
})
export class AppModule {}
