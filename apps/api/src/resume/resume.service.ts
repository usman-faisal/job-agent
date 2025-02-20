import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ResumeService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(resumeId: string) {
    try {
      const existingResume = await this.prismaService.resume.findUnique({
        where: {
          resumeIdentifier: resumeId
        },
        include: {
          educations: true,
          experiences: true,
          skills: true,
          projects: true,
          languages: true,
          certifications: true,
          profile: true
        }
      })
      if (existingResume) {
        await this.prismaService.resume.update({
          where: {
            id: existingResume.id
          },
          data: {
            active: true
          }
        })

        return existingResume
      }

      const resume = await this.prismaService.resume.create({
        data: {
          resumeIdentifier: resumeId,
          active: true
        },
        include: {
          educations: true,
          experiences: true,
          skills: true,
          projects: true,
          languages: true,
          certifications: true,
          profile: true
        }
      })

      return resume
    }
    catch (error) {
      throw new HttpException("Error creating resume", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updateSectionItem(data: any, resumeId: string, section: string, itemId?: string) {
    console.log(this.prismaService)
    const resume = await this.prismaService.resume.findUnique({
      where: {
        resumeIdentifier: resumeId
      }
    })
    if (!resume) {
      throw new HttpException("Resume not found", HttpStatus.NOT_FOUND)
    }

    const sectionHandlers = {
      education: this.updateEducation.bind(this),
      experience: this.updateExperience.bind(this),
      skills: this.updateSkills.bind(this),
      projects: this.updateProjects.bind(this),
      languages: this.updateLanguages.bind(this),
      certifications: this.updateCertifications.bind(this)
    }

    if (!sectionHandlers[section]) {
      throw new HttpException("Invalid section", HttpStatus.BAD_REQUEST)
    }

    return await sectionHandlers[section](data, resume.id, itemId)
  }

  async updateEducation(data: any, resumeId: string, itemId?: string) {
    data["resumeId"] = resumeId
    if (itemId) {
      console.log(itemId, 'sdklfj')
      return await this.prismaService.education.update({
        where: {
          id: itemId,
          resumeId: resumeId
        },
        data: data
      })
    }
    else {
      return await this.prismaService.education.create({
        data: data
      })
    }
  }

  async updateExperience(data: any, resumeId: string, itemId?: string) {
    data["resumeId"] = resumeId
    if (itemId) {
      return await this.prismaService.experience.update({
        where: {
          id: itemId,
          resumeId: resumeId
        },
        data: data
      })
    }
    else {
      return await this.prismaService.experience.create({
        data: data
      })
    }
  }

  async updateSkills(data: any, resumeId: string, itemId?: string) {
    data["resumeId"] = resumeId
    if (itemId) {
      return await this.prismaService.skill.update({
        where: {
          id: itemId,
          resumeId: resumeId
        },
        data: data
      })
    }
    else {
      return await this.prismaService.skill.create({
        data: data
      })
    }
  }

  async updateProjects(data: any, resumeId: string, itemId?: string) {
    data["resumeId"] = resumeId
    if (itemId) {
      return await this.prismaService.project.update({
        where: {
          id: itemId,
          resumeId: resumeId
        },
        data: data
      })
    }
    else {
      return await this.prismaService.project.create({
        data: data
      })
    }
  }

  async updateLanguages(data: any, resumeId: string, itemId?: string) {
    data["resumeId"] = resumeId
    if (itemId) {
      return await this.prismaService.language.update({
        where: {
          id: itemId,
          resumeId: resumeId
        },
        data: data
      })
    }
    else {
      return await this.prismaService.language.create({
        data: data
      })
    }
  }

  async updateCertifications(data: any, resumeId: string, itemId?: string) {
    data["resumeId"] = resumeId
    if (itemId) {
      return await this.prismaService.certification.update({
        where: {
          id: itemId,
          resumeId: resumeId
        },
        data: data
      })
    }
    else {
      return await this.prismaService.certification.create({
        data: data
      })
    }
  }

  async updateProfile(data: any, resumeId: string, itemId?: string) {
    data["resumeId"] = resumeId
    if (itemId) {
      return await this.prismaService.profile.update({
        where: {
          id: itemId,
          resumeId: resumeId
        },
        data: data
      })
    }
    else {
      return await this.prismaService.profile.create({
        data: data
      })
    }
  }

  async deleteSectionItem(resumeId: string, section: string, itemId: string) {
    const resume = await this.prismaService.resume.findUnique({
      where: {
        resumeIdentifier: resumeId
      }
    })
    if (!resume) {
      throw new HttpException("Resume not found", HttpStatus.NOT_FOUND)
    }

    const sectionHandlers = {
      education: this.deleteEducation.bind(this),
      experience: this.deleteExperience.bind(this),
      skills: this.deleteSkills.bind(this),
      projects: this.deleteProjects.bind(this),
      languages: this.deleteLanguages.bind(this),
      certifications: this.deleteCertifications.bind(this)
    }

    if (!sectionHandlers[section]) {
      throw new HttpException("Invalid section", HttpStatus.BAD_REQUEST)
    }

    return await sectionHandlers[section](resume.id, itemId)
  }


  async deleteEducation(resumeId: string, itemId: string) {
    return await this.prismaService.education.delete({
      where: {
        id: itemId,
        resumeId: resumeId
      }
    })
  }

  async deleteExperience(resumeId: string, itemId: string) {
    return await this.prismaService.experience.delete({
      where: {
        id: itemId,
        resumeId: resumeId
      }
    })
  }

  async deleteSkills(resumeId: string, itemId: string) {
    return await this.prismaService.skill.delete({
      where: {
        id: itemId,
        resumeId: resumeId
      }
    })
  }

  async deleteProjects(resumeId: string, itemId: string) {
    return await this.prismaService.project.delete({
      where: {
        id: itemId,
        resumeId: resumeId
      }
    })
  }

  async deleteLanguages(resumeId: string, itemId: string) {
    return await this.prismaService.language.delete({
      where: {
        id: itemId,
        resumeId: resumeId
      }
    })
  }

  async deleteCertifications(resumeId: string, itemId: string) {
    return await this.prismaService.certification.delete({
      where: {
        id: itemId,
        resumeId: resumeId
      }
    })
  }

  async deleteProfile(resumeId: string, itemId: string) {
    return await this.prismaService.profile.delete({
      where: {
        id: itemId,
        resumeId: resumeId
      }
    })
  }

  async getResume(query: Prisma.ResumeWhereInput) {
    return await this.prismaService.resume.findFirst({
      where: query
    })
  }

  async getResumes() {
    return await this.prismaService.resume.findMany()
  }

  async getResumeSection(resumeId: string, section: string) {
    switch (section) {
      case 'education':
        return this.prismaService.education.findMany({
          where: { resumeId }
        });
      case 'experience':
        return this.prismaService.experience.findMany({
          where: { resumeId }
        });
      case 'skills':
        return this.prismaService.skill.findMany({
          where: { resumeId }
        });
      case 'projects':
        return this.prismaService.project.findMany({
          where: { resumeId }
        });
      case 'languages':
        return this.prismaService.language.findMany({
          where: { resumeId }
        });
      case 'certifications':
        return this.prismaService.certification.findMany({
          where: { resumeId }
        });
      case 'profile':
        return this.prismaService.resume.findUnique({
          where: { id: resumeId },
          select: {
            profile: true
          }
        });
      case 'all':
        return this.prismaService.resume.findUnique({
          where: { id: resumeId },
          include: {
            educations: true,
            experiences: true,
            skills: true,
            projects: true,
            languages: true,
            certifications: true,
            profile: true
          }
        });
      default:
        throw new Error(`Invalid section: ${section}`);
    }
  }

}
