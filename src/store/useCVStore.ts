import { create } from 'zustand';
import { CVState, CVData, CVTemplateId, Language } from '../types/cv';

const initialState: CVData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    summary: '',
  },
  experiences: [],
  education: [],
  projects: [],
  skills: [],
  languages: [],
};

export const useCVStore = create<CVState>((set) => ({
  ...initialState,
  templateId: 'modern',
  language: 'en',
  mobileView: 'editor',

  setMobileView: (mobileView) => set({ mobileView }),

  setLanguage: (language: Language) => set({ language }),

  updatePersonalInfo: (info) =>
    set((state) => ({
      personalInfo: { ...state.personalInfo, ...info },
    })),

  addExperience: (exp) =>
    set((state) => ({
      experiences: [...state.experiences, exp],
    })),

  updateExperience: (id, updatedExp) =>
    set((state) => ({
      experiences: state.experiences.map((exp) =>
        exp.id === id ? { ...exp, ...updatedExp } : exp
      ),
    })),

  removeExperience: (id) =>
    set((state) => ({
      experiences: state.experiences.filter((exp) => exp.id !== id),
    })),

  addEducation: (edu) =>
    set((state) => ({
      education: [...state.education, edu],
    })),

  updateEducation: (id, updatedEdu) =>
    set((state) => ({
      education: state.education.map((edu) =>
        edu.id === id ? { ...edu, ...updatedEdu } : edu
      ),
    })),

  removeEducation: (id) =>
    set((state) => ({
      education: state.education.filter((edu) => edu.id !== id),
    })),

  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),

  updateProject: (id, updatedProject) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, ...updatedProject } : p
      ),
    })),

  removeProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
    })),

  addSkill: (skill) =>
    set((state) => ({
      skills: [...state.skills, skill],
    })),

  removeSkill: (id) =>
    set((state) => ({
      skills: state.skills.filter((s) => s.id !== id),
    })),

  setTemplate: (id) => set({ templateId: id }),
}));
