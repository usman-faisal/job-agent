import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { Prisma } from '@prisma/client';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post()
  create(@Body() createResumeDto: CreateResumeDto) {
    return this.resumeService.create(createResumeDto.resumeId);
  }

  @Get()
  getResume(@Query() query: Prisma.ResumeWhereUniqueInput) {
    return this.resumeService.getResume(query)
  }
  
  @Get('all')
  getResumes() {
    return this.resumeService.getResumes();
  }

  @Post(':id/:section')
  update(@Param('id') id: string, @Param('section') section: string, @Body() updateResumeDto: any) {
    return this.resumeService.updateSectionItem(updateResumeDto, id, section);
  }

  @Patch(':id/:section/:itemId')
  updateItem(@Param('id') id: string, @Param('section') section: string, @Param('itemId') itemId: string, @Body() updateResumeDto: any) {
    return this.resumeService.updateSectionItem(updateResumeDto, id, section, itemId);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Body() updateResumeDto: {section: string, itemId: string}) {
    return this.resumeService.deleteSectionItem(id, updateResumeDto.section, updateResumeDto.itemId);
  }

}
