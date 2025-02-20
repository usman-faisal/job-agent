// api/resume.ts
import {api as axios} from '../api/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import useResumeStore from '@/hooks/useResumeStore';
import { Education, Experience, Profile, Skill, Project, Language, Certification } from '../types';

// Types for API responses
type ResumeResponse = {
  id: string;
  resumeIdentifier: number;
  profile: Profile;
  educations: Education[];
  experiences: Experience[];
  skills: Skill[];
  projects: Project[];
  languages: Language[];
  certifications: Certification[];
  active: boolean;
};

// Generic type for section items
type SectionItem = {

  [key: string]: any;
};

// Unified API functions
const api = {
  getResume: async (resumeId: string) => {
    const response = await axios.post<ResumeResponse>(`/resume`, {resumeId});
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
      ? `/resume/${resumeId}/${sectionName}/${itemId}`
      : `/resume/${resumeId}/${sectionName}`;

    const response = await axios[itemId ? 'patch' : 'post']<T>(endpoint, data);
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
    await axios.delete(`/resume/${resumeId}`, {data: {section: sectionName, itemId}});
  },
};

export const useResume = (resumeId: string) => {
  return useMutation({
    mutationKey: ['resume', resumeId],
    mutationFn: async () => {
      const data = await api.getResume(resumeId);
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      const store = useResumeStore.getState();
      store.setResumeId(data.resumeIdentifier.toString());
      if (data.profile) {
        Object.entries(data.profile).forEach(([key, value]) => {
          store.setProfile(key as string, value as string);
        });
      }
      
      if (data.educations) {
        store.setEducations(data.educations);
      }
      if (data.experiences) {
        store.setExperiences(data.experiences);
      }
      if (data.skills) {
        store.setSkills(data.skills);
      }
      if (data.projects) {
        store.setProjects(data.projects);
      }
      if (data.languages) {
        store.setLanguages(data.languages);
      }
      if (data.certifications) {
        store.setCertifications(data.certifications);
      }
    },
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
      itemId: variables.itemId || undefined,
      resumeId: variables.resumeId,
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