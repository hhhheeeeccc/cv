import React from 'react';
import { CVData } from '../../types/cv';
import { useCVStore } from '../../store/useCVStore';
import { translations } from '../../utils/translations';

interface Props {
  data: CVData;
}

export const ATSTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, experiences, education, projects, skills } = data;
  const { language } = useCVStore();
  const t = translations[language];

  return (
    <div className="p-10 h-full bg-white text-black font-sans flex flex-col gap-6 max-w-[210mm]">
      {/* Header - Simple and centered for ATS */}
      <header className="text-center space-y-1 border-b pb-4">
        <h1 className="text-2xl font-bold uppercase tracking-tight">
          {personalInfo.fullName || t.fullName}
        </h1>
        <p className="text-lg font-medium text-gray-700">
          {personalInfo.jobTitle || t.jobTitle}
        </p>
        <div className="text-sm text-gray-600 flex flex-wrap justify-center gap-x-3 gap-y-1">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="space-y-2">
          <h2 className="text-sm font-bold uppercase border-b border-black">
            {t.summary}
          </h2>
          <p className="text-sm leading-normal whitespace-pre-wrap">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-sm font-bold uppercase border-b border-black">
            {t.experience}
          </h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex justify-between font-bold text-sm">
                  <span>{exp.company}</span>
                  <span>{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="text-sm font-medium italic">{exp.position}</div>
                <p className="text-sm whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-sm font-bold uppercase border-b border-black">
            {t.projects}
          </h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id} className="space-y-1">
                <h3 className="font-bold text-sm">{project.name}</h3>
                <p className="text-sm whitespace-pre-wrap">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills - Simple list for ATS parsing */}
      {skills.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-sm font-bold uppercase border-b border-black">
            {t.skills}
          </h2>
          <p className="text-sm leading-normal">
            {skills.map(s => s.name).join(', ')}
          </p>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-sm font-bold uppercase border-b border-black">
            {t.education}
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="space-y-1">
                <div className="flex justify-between font-bold text-sm">
                  <span>{edu.school}</span>
                  <span>{edu.startDate} - {edu.endDate}</span>
                </div>
                <div className="text-sm italic">{edu.degree} - {edu.fieldOfStudy}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
