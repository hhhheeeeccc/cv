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
import { User, Briefcase, GraduationCap, Code, ListChecks, LayoutTemplate } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { language } = useCVStore();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState('templates');

  const tabs = [
    { id: 'templates', label: t.templates, icon: LayoutTemplate, component: TemplateSelector },
    { id: 'personal', label: t.personal, icon: User, component: PersonalInfoForm },
    { id: 'experience', label: t.experience, icon: Briefcase, component: ExperienceForm },
    { id: 'education', label: t.education, icon: GraduationCap, component: EducationForm },
    { id: 'projects', label: t.projects, icon: Code, component: ProjectsForm },
    { id: 'skills', label: t.skills, icon: ListChecks, component: SkillsForm },
  ];

  const ActiveComponent =
    tabs.find((tab) => tab.id === activeTab)?.component || TemplateSelector;

  return (
    <div className="flex h-full w-full flex-col border-border bg-card ltr:border-r rtl:border-l print:hidden">
      <LanguageSwitcher />

      {/* Tab strip */}
      <nav className="no-scrollbar flex flex-none gap-1 overflow-x-auto border-b border-border px-2 py-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-none flex-col items-center gap-1 rounded-lg px-3 py-2 transition ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <tab.icon size={18} strokeWidth={2} />
              <span className="text-[10px] font-semibold">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Active form */}
      <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
        <ActiveComponent />
      </div>

      <div className="flex-none border-t border-border bg-muted px-4 py-3 text-center text-[10px] text-muted-foreground">
        {t.footer}
      </div>
    </div>
  );
};
