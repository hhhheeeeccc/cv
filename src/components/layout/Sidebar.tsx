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
import { User, Briefcase, GraduationCap, Code, ListChecks, Layout, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { language } = useCVStore();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState('templates');
  const dir = language === 'ar' ? 'rtl' : 'ltr';

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
    <div className="flex flex-col h-full bg-white overflow-hidden relative">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          {language === 'ar' ? 'مصمم السيرة' : 'CV Pro'}
        </h1>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          {onClose && (
            <button onClick={onClose} className="md:hidden p-1 text-slate-400 hover:text-slate-600">
              {dir === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
            </button>
          )}
        </div>
      </div>

      <div className="flex border-b border-slate-100 overflow-x-auto no-scrollbar scroll-smooth">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-none w-20 py-3 flex flex-col items-center gap-1 border-b-2 transition-all duration-300 ${
              activeTab === tab.id
                ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50'
                : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <tab.icon size={20} className={activeTab === tab.id ? 'animate-pulse' : ''} />
            <span className="text-[10px] font-bold uppercase tracking-wider text-center">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30">
        <div className="max-w-md mx-auto">
          <ActiveComponent />
        </div>
      </div>

      <div className="p-4 bg-white border-t border-slate-100 text-[10px] text-slate-400 flex justify-between items-center">
        <span>CV Builder v2.0</span>
        <span className="font-medium text-indigo-500">Premium Pro</span>
      </div>
    </div>
  );
};
