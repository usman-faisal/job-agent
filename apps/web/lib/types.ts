import * as z from "zod";
import {
  CertificationSchema,
  EducationSchema,
  ExperienceSchema,
  LanguageSchema,
  ProfileSchema,
  ProjectSchema,
  PublicationSchema,
  SkillSchema,
} from "./constants/schema";
export type Profile = z.infer<typeof ProfileSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Language = z.infer<typeof LanguageSchema>;
export type Certification = z.infer<typeof CertificationSchema>;
export type Publication = z.infer<typeof PublicationSchema>;
export type Resume = {
  profile: Profile | undefined;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  projects: Project[];
  languages: Language[];
  certifications: Certification[];
  // publications?: Publication[];
  resumeId: string | null;
};

export type ResumeStore = Resume & {
  setProfile: (
    profileFieldName: string,
    profileFieldValue: string | number
  ) => void;
  setExperience: (experience: Experience) => void;
  setExperiences: (experiences: Experience[]) => void;
  setEducation: (education: Education) => void;
  setEducations: (educations: Education[]) => void;
  setSkill: (skill: Skill) => void;
  setSkills: (skills: Skill[]) => void;
  setProject: (project: Project) => void;
  setProjects: (projects: Project[]) => void;
  setLanguage: (language: Language) => void;
  setLanguages: (languages: Language[]) => void;
  setCertification: (certification: Certification) => void;
  setCertifications: (certifications: Certification[]) => void;
  // setPublications: (publication: Publication) => void;
  setResumeId: (resumeId: string) => void;
  //
  deleteExperience: (experienceId: string) => void;
  deleteEducation: (educationId: string) => void;
  deleteSkill: (skillId: string) => void;
  deleteProject: (projectId: string) => void;
  deleteLanguage: (languageId: string) => void;
  deleteCertification: (certificationId: string) => void;
  // deletePublication: (publicationId: string) => void;
  deleteResumeId: () => void;
  //
  updateExperience: (experienceId: string, experience: Experience) => void;
  updateEducation: (educationId: string, education: Education) => void;
  updateSkill: (skillId: string, skill: Skill) => void;
  updateProject: (projectId: string, project: Project) => void;
  updateLanguage: (languageId: string, language: Language) => void;
  updateCertification: (
    certificationId: string,
    certification: Certification
  ) => void;
  // updatePublication: (publicationId: string, publication: Publication) => void;
};

export interface ChatMessage {
    id: number;
    createdAt: string;
    updatedAt: string;
    content: string;
    role: "user" | "assistant" | "tool";
}