import React, { useState } from 'react';
import { PersonalInfoForm } from '../forms/PersonalInfoForm';
import { ExperienceForm } from '../forms/ExperienceForm';
import { EducationForm } from '../forms/EducationForm';
import { ProjectsForm } from '../forms/ProjectsForm';
import { SkillsForm } from '../forms/SkillsForm';
import { TemplateSelector } from '../forms/TemplateSelector';
import { User, Briefcase, GraduationCap, Code, ListChecks, Layout } from 'lucide-react';

const tabs = [
  { id: 'templates', label: 'Template', icon: Layout, component: TemplateSelector },
  { id: 'personal', label: 'Personal', icon: User, component: PersonalInfoForm },
  { id: 'experience', label: 'Experience', icon: Briefcase, component: ExperienceForm },
  { id: 'education', label: 'Education', icon: GraduationCap, component: EducationForm },
  { id: 'projects', label: 'Projects', icon: Code, component: ProjectsForm },
  { id: 'skills', label: 'Skills', icon: ListChecks, component: SkillsForm },
];

export const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('templates');

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component || TemplateSelector;

  return (
    <div className="w-96 bg-white border-r flex flex-col h-screen print:hidden">
      <div className="flex border-b overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-none w-20 p-4 flex flex-col items-center gap-1 border-b-2 transition ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon size={20} />
            <span className="text-[9px] font-bold uppercase">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <ActiveComponent />
      </div>

      <div className="p-4 bg-gray-50 border-t text-[10px] text-gray-400 text-center">
        CV Builder v1.0 • Built with Clean Architecture
      </div>
    </div>
  );
};
