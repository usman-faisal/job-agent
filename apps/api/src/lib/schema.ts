import * as z from "zod";

export const ProfileSchema = z.object({
  id: z.number(),
  resumeId: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  address: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  website: z.string().optional(),
  summary: z.string().optional(),
  role: z.string().optional(),
});

export const EducationSchema = z.object({
  resumeId: z.string(),
  id: z.string(),
  institution: z.string(),
  degree: z.string(),
  fieldOfStudy: z.string(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
  score: z.coerce.number().optional(),
});

export const ExperienceSchema = z.object({
  id: z.string(),
  resumeId: z.string(),
  role: z.string(),
  company: z.string(),
  location: z.string(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

export const ProjectSchema = z.object({
  id: z.string(),
  resumeId: z.string(),
  projectName: z.string(),
  deploymentLink: z.string().optional(),
  repoLink: z.string().optional(),
  projectDescription: z.string().optional(),
});

// export const SkillSchema1 = z.object({
//   skillId: z.string(),
//   resumeIdentifier: z.string(),
//   skillName: z.string(),
//   level: z.string().optional(),
// });
export const SkillSchema = z.object({
  id: z.string(),
  resumeId: z.string(),
  skillCategories: z.string(),
  skillList: z.string(),
});

export const LanguageSchema = z.object({
  id: z.string(),
  resumeId: z.string(),
  languageName: z.string(),
  proficiency: z.string().optional(),
});

export const CertificationSchema = z.object({
  id: z.string(),
  resumeId: z.string(),
  certificationName: z.string(),
  certificationAuthority: z.string(),
  certificationProof: z.string().optional(),
  date: z.string().optional(),
  description: z.string().optional(),
});

export const PublicationSchema = z.object({
  id: z.string(),
  resumeId: z.string(),
  publicationName: z.string(),
  publicationLink: z.string().optional(),
  publicationPublisher: z.string().optional(),
  publicationDate: z.string().optional(),
  publicationDescription: z.string().optional(),
});

export const ResumeSchema = z.object({
  id: z.number().optional(),
  profile: ProfileSchema,
  education: z.array(EducationSchema),
  experience: z.array(ExperienceSchema),
  skills: z.array(SkillSchema),
  projects: z.array(ProjectSchema),
  languages: z.array(LanguageSchema),
  certifications: z.array(CertificationSchema),
  publications: z.array(PublicationSchema).optional(),
});