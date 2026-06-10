import React, { useState } from 'react';
import { PersonalInfoForm } from '../forms/PersonalInfoForm';
import { ExperienceForm } from '../forms/ExperienceForm';
import { EducationForm } from '../forms/EducationForm';
import { ProjectsForm } from '../forms/ProjectsForm';
import { SkillsForm } from '../forms/SkillsForm';
import { TemplateSelector } from '../forms/TemplateSelector';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useCVStore } from '../../store/useCVStore';
import { translations } from '../../utils/translations';
import { User, Briefcase, GraduationCap, Code, ListChecks, Layout } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { language } = useCVStore();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState('templates');

  const tabs = [
    { id: 'templates', label: t.templates, icon: Layout, component: TemplateSelector },
    { id: 'personal', label: t.personal, icon: User, component: PersonalInfoForm },
    { id: 'experience', label: t.experience, icon: Briefcase, component: ExperienceForm },
    { id: 'education', label: t.education, icon: GraduationCap, component: EducationForm },
    { id: 'projects', label: t.projects, icon: Code, component: ProjectsForm },
    { id: 'skills', label: t.skills, icon: ListChecks, component: SkillsForm },
  ];

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component || TemplateSelector;

  return (
    <div className="w-96 bg-white border-r flex flex-col h-screen print:hidden shadow-lg z-10">
      <LanguageSwitcher />

      <div className="flex border-b overflow-x-auto no-scrollbar" role="tablist" aria-label="Editor sections">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-none w-20 p-4 flex flex-col items-center gap-1 border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <tab.icon size={20} aria-hidden="true" />
            <span className="text-[9px] font-bold uppercase tracking-wider">{tab.label}</span>
          </button>
        ))}
      </div>

      <div
        className="flex-1 overflow-y-auto p-6"
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        <ActiveComponent />
      </div>

      <div className="p-4 bg-gray-50 border-t text-[10px] text-gray-400 text-center">
        CV Builder v1.0 • Built with Clean Architecture
      </div>
    </div>
  );
};
