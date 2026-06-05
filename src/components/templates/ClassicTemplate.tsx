import React from 'react';
import { CVData } from '../../types/cv';
import { useCVStore } from '../../store/useCVStore';
import { translations } from '../../utils/translations';

interface Props {
  data: CVData;
}

export const ClassicTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, experiences, education, projects, skills } = data;
  const { language } = useCVStore();
  const t = translations[language];

  const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="mb-3 border-b border-slate-300 pb-1 text-base font-bold uppercase tracking-[0.15em] text-slate-800">
      {children}
    </h2>
  );

  return (
    <div className="flex min-h-full flex-col gap-7 bg-white p-12 font-serif text-slate-900">
      {/* Header */}
      <header className="border-b-2 border-slate-800 pb-5 text-center">
        <h1 className="text-4xl font-bold tracking-wide text-slate-900">
          {personalInfo.fullName || t.fullName}
        </h1>
        <p className="mt-1.5 text-base italic text-slate-600">
          {personalInfo.jobTitle || t.jobTitle}
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && (
            <span className="border-slate-300 ltr:border-l ltr:pl-4 rtl:border-r rtl:pr-4">
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.address && (
            <span className="border-slate-300 ltr:border-l ltr:pl-4 rtl:border-r rtl:pr-4">
              {personalInfo.address}
            </span>
          )}
          {personalInfo.website && (
            <span className="border-slate-300 ltr:border-l ltr:pl-4 rtl:border-r rtl:pr-4">
              {personalInfo.website}
            </span>
          )}
        </div>
      </header>

      {personalInfo.summary && (
        <section>
          <SectionTitle>{t.summary}</SectionTitle>
          <p className="text-[13px] leading-relaxed text-slate-700 ltr:text-justify rtl:text-justify">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {experiences.length > 0 && (
        <section>
          <SectionTitle>{t.experience}</SectionTitle>
          <div className="flex flex-col gap-4">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <span className="text-[15px] font-bold text-slate-900">{exp.company}</span>
                  <span className="text-xs italic text-slate-500">
                    {exp.startDate}
                    {exp.startDate && exp.endDate ? ' — ' : ''}
                    {exp.endDate}
                  </span>
                </div>
                <p className="mb-1 text-sm italic text-slate-700">{exp.position}</p>
                {exp.description && (
                  <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-slate-700">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section>
          <SectionTitle>{t.education}</SectionTitle>
          <div className="flex flex-col gap-2.5">
            {education.map((edu) => (
              <div key={edu.id} className="flex flex-wrap items-baseline justify-between gap-x-3">
                <div className="text-[13px]">
                  <span className="font-bold">{edu.school}</span>
                  {(edu.degree || edu.fieldOfStudy) && (
                    <>
                      <span className="mx-2 text-slate-400">|</span>
                      <span>
                        {edu.degree}
                        {edu.degree && edu.fieldOfStudy ? ' - ' : ''}
                        {edu.fieldOfStudy}
                      </span>
                    </>
                  )}
                </div>
                <span className="text-xs italic text-slate-500">
                  {edu.startDate}
                  {edu.startDate && edu.endDate ? ' — ' : ''}
                  {edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section>
          <SectionTitle>{t.projects}</SectionTitle>
          <div className="flex flex-col gap-3">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="text-[14px] font-bold text-slate-900">{project.name}</h3>
                {project.description && (
                  <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-slate-700">
                    {project.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <SectionTitle>{t.skills}</SectionTitle>
          <p className="text-[13px] text-slate-700">
            {skills.map((s) => s.name).join('  •  ')}
          </p>
        </section>
      )}
    </div>
  );
};
