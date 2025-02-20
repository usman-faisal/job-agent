import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { LlmService } from 'src/llm/llm.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(private readonly llmService: LlmService, private readonly prismaService: PrismaService) {}
  async create(createChatDto: CreateChatDto): Promise<string> {
    try{
      const messages = await this.prismaService.message.findMany({})
  
      const newMessage = await this.prismaService.message.create({
        data: {
          content: createChatDto.user_query,
          role: Role.user
        }
      })
  
      const response = await this.llmService.chat([...messages, newMessage])

    // Fire and forget (don't await)
    this.prismaService.message.create({
      data: {
        content: response,
        role: Role.assistant
      }
    }).catch(error => console.error("Failed to save assistant message:", error))
  
      return response
    } catch(error) {
      if (error instanceof Error) {
        throw new Error("Error in ChatService.create: " + error.message)
      }
      throw new InternalServerErrorException("Error in ChatService.create: " + error)
    }
  }

  async get() {
    try{
      const messages = await this.prismaService.message.findMany({})
      return messages
    } catch(error) {
      throw new InternalServerErrorException("Error in ChatService.getChat: " + error)
    }
  }

  async clear() {
    try{
      await this.prismaService.message.deleteMany({})
    } catch(error) {
      throw new InternalServerErrorException("Error in ChatService.clearChat: " + error)
    }
  }
}
