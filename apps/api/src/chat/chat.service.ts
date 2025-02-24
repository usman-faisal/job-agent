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
      Promise.all(
        response.map(r => 
          this.prismaService.message.create({
            data: {
              content: r.content,
              role: r.role
            }
          })
        )
      ).catch(error => {
        console.error("Failed to save assistant messages:", error);
      });
  
      return response.find(message => message.role === Role.assistant)?.content || "No response from assistant"
    } catch(error) {
      if (error instanceof Error) {
        throw new Error("Error in ChatService.create: " + error.message)
      }
      throw new InternalServerErrorException("Error in ChatService.create: " + error)
    }
  }

  async get() {
    try{
      const messages = await this.prismaService.message.findMany({
        where: {
          role: {
            not: Role.tool
          }
        }
      })
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
