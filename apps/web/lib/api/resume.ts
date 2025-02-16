// api/resume.ts
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import useResumeStore from '@/hooks/useResumeStore';
import { Education, Experience, Profile, Skill, Project, Language, Certification } from '../types';

// Types for API responses
type ResumeResponse = {
  id: string;
  resumeIdentifier: number;
  profile: Profile;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  languages: Language[];
  certifications: Certification[];
  // ... other fields
};

// Generic type for section items
type SectionItem = {
  id: string;
  resumeId: string;
  [key: string]: any;
};

// Unified API functions
const api = {
  getResume: async (resumeId: string) => {
    const response = await axios.get<ResumeResponse>(`/api/resumes/${resumeId}`);
    return response.data;
  },

  updateSection: async <T extends SectionItem>({
    resumeId,
    sectionName,
    data,
    itemId,
  }: {
    resumeId: string;
    sectionName: string;
    data: T;
    itemId?: string;
  }) => {
    const endpoint = itemId 
      ? `/api/resumes/${resumeId}/${sectionName}/${itemId}`
      : `/api/resumes/${resumeId}/${sectionName}`;
    
    const response = await axios[itemId ? 'put' : 'post']<T>(endpoint, data);
    return response.data;
  },

  deleteSection: async ({
    resumeId,
    sectionName,
    itemId,
  }: {
    resumeId: string;
    sectionName: string;
    itemId: string;
  }) => {
    await axios.delete(`/api/resumes/${resumeId}/${sectionName}/${itemId}`);
  },
};

// Custom hooks for resume data management
export const useResume = (resumeId: string) => {
  const setStoreData = useResumeStore((state) => ({
    setProfile: state.setProfile,
    setExperiences: state.setExperiences,
    setEducations: state.setEducations,
    setSkills: state.setSkills,
    setProjects: state.setProjects,
    setLanguages: state.setLanguages,
    setCertifications: state.setCertifications,
  }));

  return useQuery({
    queryKey: ['resume', resumeId],
    queryFn: () => api.getResume(resumeId),
    // onSuccess: (data) => {
    //   // Update store with all resume data
    //   Object.entries(data.profile).forEach(([key, value]) => {
    //     setStoreData.setProfile(key as string, value as string);
    //   });
      
    //   data.education.forEach(setStoreData.setEducations);
    //   data.experience.forEach(setStoreData.setExperiences);
    //   data.skills.forEach(setStoreData.setSkills);
    //   data.projects.forEach(setStoreData.setProjects);
    //   data.languages.forEach(setStoreData.setLanguages);
    //   data.certifications.forEach(setStoreData.setCertifications);
    // },
  });
};


// Generic mutation hook for all section operations
export const useSectionMutation = <T extends SectionItem>(
  sectionName: string,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
  }
) => {
  return useMutation({
    mutationFn: (variables: {
      resumeId: string;
      data: T;
      itemId?: string;
    }) => api.updateSection<T>({
      ...variables,
      sectionName,
    }),
    ...options,
  });
};

// Generic delete mutation hook
export const useDeleteSectionItem = (
  sectionName: string,
  options?: {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
  }
) => {
  return useMutation({
    mutationFn: (variables: { resumeId: string; itemId: string }) =>
      api.deleteSection({
        ...variables,
        sectionName,
      }),
    ...options,
  });
};