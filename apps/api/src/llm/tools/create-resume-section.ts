import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { ResumeService } from "src/resume/resume.service";

export const createResumeMutationTool = (resumeService: ResumeService) => {
    return new DynamicStructuredTool({
      name: "mutate_resume_section",
      description: `Create or update a section in the active resume. 
      
      You MUST use this tool directly to make changes to the resume.
      DO NOT return JSON to the user - use this tool to perform the operation.
      
      For create operations: Provide all required fields according to the section schema.
      For update operations: 
      - Use the sectionId shown in the resume sections above (listed as "ID: <value>" for each entry)
      - Only provide the fields that need to be modified. Other fields will remain unchanged.
      - Example: To update an education entry, find its ID in the EDUCATION section above

      Section schemas:

      Profile: {
        name: string
        email: string
        phone?: string
        address?: string
        linkedin?: string
        github?: string
        website?: string
        summary?: string
        role?: string
      }
  
      Education: {
        institution: string
        degree: string
        fieldOfStudy: string
        startDate?: string (YYYY-MM-DD)
        endDate?: string (YYYY-MM-DD)
        description?: string
        score?: number
      }
  
      Experience: {
        role: string
        company: string
        location: string
        startDate?: string (YYYY-MM-DD)
        endDate?: string (YYYY-MM-DD)
        description?: string
      }
  
      Projects: {
        projectName: string
        deploymentLink?: string
        repoLink?: string
        projectDescription?: string
      }
  
      Skills: {
        skillCategories: string
        skillList: string
      }
  
      Languages: {
        languageName: string
        proficiency?: string
      }
  
      Certifications: {
        certificationName: string
        certificationAuthority: string
        certificationProof?: string
        date?: string (YYYY-MM-DD)
        description?: string
      }`,
      schema: z.object({
        operation: z.enum(["create", "update"])
          .describe("The operation to perform. For updates, only include fields that need to be modified"),
        section: z.enum([
          "profile",
          "education",
          "experience",
          "skills",
          "projects",
          "languages",
          "certifications"
        ]),
        sectionId: z.string().optional().describe("The id of the section to update. Only required for update operations"),
        data: z.object({
            // Profile fields
            name: z.string().optional(),
            email: z.string().optional(),
            phone: z.string().optional(),
            address: z.string().optional(),
            linkedin: z.string().optional(),
            github: z.string().optional(),
            website: z.string().optional(),
            summary: z.string().optional(),
            role: z.string().optional(),
    
            // Education fields
            institution: z.string().optional(),
            degree: z.string().optional(),
            fieldOfStudy: z.string().optional(),
            score: z.number().optional(),
    
            // Experience fields
            company: z.string().optional(),
            location: z.string().optional(),
    
            // Project fields
            projectName: z.string().optional(),
            deploymentLink: z.string().optional(),
            repoLink: z.string().optional(),
            projectDescription: z.string().optional(),
    
            // Skills fields
            skillCategories: z.string().optional(),
            skillList: z.string().optional(),
    
            // Language fields
            languageName: z.string().optional(),
            proficiency: z.string().optional(),
    
            // Certification fields
            certificationName: z.string().optional(),
            certificationAuthority: z.string().optional(),
            certificationProof: z.string().optional(),
    
            // Common fields that might be shared
            description: z.string().optional(),
            startDate: z.string().optional(),
            endDate: z.string().optional(),
            date: z.string().optional(),
          }).describe("Section-specific data object. Required fields depend on the section type."),
        }),
      func: async ({ operation, section, sectionId, data }) => {
        try {
          // Get active resume
          const resume = await resumeService.getResume({ active: true }, {resumeIdentifier: true});
          if (!resume) {
            throw new Error("No active resume found");
          }

          // format date to ISO-8601
          if (data?.startDate) {
            data.startDate = new Date(data.startDate).toISOString();
          }
          if (data?.endDate) {
            data.endDate = new Date(data.endDate).toISOString();
          }
  
          let result;
          if (operation === "create") {
            result = await resumeService.updateSectionItem(data, resume.resumeIdentifier, section);
          } else if (operation === "update") {
            if (!sectionId) {
              throw new Error("ID is required for update operations");
            }
            result = await resumeService.updateSectionItem(data, resume.resumeIdentifier, section, sectionId);
          }
          console.log(result, 'result')
          return JSON.stringify({
            success: true,
            operation,
            section,
            data: result
          });
        } catch (error) {
          throw new Error(`Failed to ${operation} ${section} section: ${error.message}`);
        }
      }
    });
  };