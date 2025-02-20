import { create } from "zustand";
import { defaultProfile } from "@/lib/constants/default-values";
import { Education, Experience, Language, Project, ResumeStore, Skill, Certification } from "@/lib/types";

const useResumeStore = create<ResumeStore>((set) => ({
  profile: defaultProfile,
  experiences: [],
  educations: [],
  skills: [],
  projects: [],
  languages: [],
  certifications: [],
  resumeId: null,

  setProfile: (profileFieldName, profileFieldValue) =>
    set((state) => ({
      profile: {
        ...state.profile,
        [profileFieldName]: profileFieldValue,
      } as ResumeStore["profile"],
    })),

  setResumeId: (newResumeId) => set({ resumeId: newResumeId }),
  
  setExperiences: (experiences: Experience[]) =>
    set((state) => ({ experiences: [...state.experiences, ...experiences] })),

  setExperience: (experience: Experience) =>
    set((state) => ({ experiences: [...state.experiences, experience] })),
  
  setEducation: (education) =>
    set((state) => ({ educations: [...state.educations, education] })),
  
  setEducations: (educations: Education[]) =>
    set((state) => ({ educations: [...state.educations, ...educations] })),
  
  setSkills: (skills: Skill[]) =>
    set((state) => ({ skills: [...state.skills, ...skills] })),
  
  setSkill: (skill: Skill) =>
    set((state) => ({ skills: [...state.skills, skill] })),
  
  setProjects: (projects: Project[]) =>
    set((state) => ({ projects: [...state.projects, ...projects] })),
  
  setProject: (project: Project) =>
    set((state) => ({ projects: [...state.projects, project] })),
  
  setLanguages: (languages: Language[]) =>
    set((state) => ({ languages: [...state.languages, ...languages] })),
  
  setLanguage: (language: Language) =>
    set((state) => ({ languages: [...state.languages, language] })),

  setCertifications: (certifications: Certification[]) =>
    set((state) => ({ certifications: [...state.certifications, ...certifications] })),
  
  setCertification: (certification: Certification) =>
    set((state) => ({ certifications: [...state.certifications, certification] })),

  deleteResumeId: () => set({ resumeId: null }),
  
  deleteEducation: (educationId) =>
    set((state) => ({
      educations: state.educations.filter((edu) => edu.id !== educationId),
    })),
  
  deleteExperience: (experienceId) =>
    set((state) => ({
      experiences: state.experiences.filter(
        (experience) => experience.id !== experienceId
      ),
    })),
  
  deleteSkill: (skillId) =>
    set((state) => ({
      skills: state.skills.filter((skill) => skill.id !== skillId),
    })),
  
  deleteProject: (projectId) =>
    set((state) => ({
      projects: state.projects.filter(
        (project) => project.id !== projectId
      ),
    })),
  
  deleteLanguage: (languageId) =>
    set((state) => ({
      languages: state.languages.filter(
        (language) => language.id !== languageId
      ),
    })),

  deleteCertification: (certificationId) =>
    set((state) => ({
      certifications: state.certifications.filter(
        (certification) => certification.id !== certificationId
      ),
    })),

  updateEducation: (educationId, education) =>
    set((state) => ({
      educations: state.educations.map((edu) =>
        edu.id === educationId ? education : edu
      ),
    })),
  
  updateExperience: (experienceId, experience) =>
    set((state) => ({
      experiences: state.experiences.map((exp) =>
        exp.id === experienceId ? experience : exp
      ),
    })),
  
  updateSkill: (skillId, skill) =>
    set((state) => ({
      skills: state.skills.map((sk) =>
        sk.id === skillId ? skill : sk
      ),
    })),
  
  updateProject: (projectId, project) =>
    set((state) => ({
      projects: state.projects.map((pro) =>
        pro.id === projectId ? project : pro
      ),
    })),
  
  updateLanguage: (languageId, language) =>
    set((state) => ({
      languages: state.languages.map((lan) =>
        lan.id === languageId ? language : lan
      ),
    })),
  
  updateCertification: (certificationId, certification) =>
    set((state) => ({
      certifications: state.certifications.map((cer) =>
        cer.id === certificationId ? certification : cer
      ),
    })),
}));

export default useResumeStore;