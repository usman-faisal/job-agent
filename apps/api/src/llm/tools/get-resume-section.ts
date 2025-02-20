import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { ResumeService } from "src/resume/resume.service";

export const createGetResumeSectionTool = (resumeService: ResumeService) => {
  return new DynamicStructuredTool({
      name: "get_resume_section",
      description: "Get information from the active resume. Specify which section you want to retrieve.",
      schema: z.object({
          section: z.enum([
              "profile",
              "education",
              "experience",
              "skills",
              "projects",
              "languages",
              "certifications",
              "all"
          ]).describe("The section of the resume you want to retrieve"),
      }),
      func: async ({ section }) => {
          try {
              const resume = await resumeService.getResume({active: true})
              if (!resume) {
                  throw new Error("No active resume found");
              }
              const data = await resumeService.getResumeSection(resume.id, section);
              console.log(data, 'data')
              return JSON.stringify(data);
          } catch (error) {
              throw new Error(`Failed to retrieve ${section} section: ${error.message}`);
          }
      }
  });
};