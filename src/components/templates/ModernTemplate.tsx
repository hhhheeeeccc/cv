import React from 'react';
import { CVData } from '../../types/cv';
import { useCVStore } from '../../store/useCVStore';
import { translations } from '../../utils/translations';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface Props {
  data: CVData;
}

const NAVY = '#1e3a5f';
const ACCENT = '#c2823a';

export const ModernTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, experiences, education, projects, skills } = data;
  const { language } = useCVStore();
  const t = translations[language];

  const SectionTitle: React.FC<{ children: React.ReactNode; light?: boolean }> = ({
    children,
    light,
  }) => (
    <h2
      className="mb-3 text-[13px] font-bold uppercase tracking-[0.12em]"
      style={{ color: light ? '#ffffff' : NAVY }}
    >
      <span
        className="inline-block border-b-2 pb-1"
        style={{ borderColor: light ? ACCENT : ACCENT }}
      >
        {children}
      </span>
    </h2>
  );

  return (
    <div className="flex min-h-full font-sans text-slate-800">
      {/* Sidebar */}
      <aside
        className="flex w-[35%] flex-col gap-7 p-7 text-white"
        style={{ backgroundColor: NAVY }}
      >
        <div>
          <h1 className="text-2xl font-extrabold leading-tight text-white">
            {personalInfo.fullName || t.fullName}
          </h1>
          <p className="mt-1 text-sm font-medium" style={{ color: ACCENT }}>
            {personalInfo.jobTitle || t.jobTitle}
          </p>
        </div>

        <div>
          <SectionTitle light>{t.contact}</SectionTitle>
          <div className="flex flex-col gap-2.5 text-[11px] text-slate-200">
            {personalInfo.email && (
              <span className="flex items-center gap-2 break-all">
                <Mail size={13} style={{ color: ACCENT }} className="flex-none" />
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-2">
                <Phone size={13} style={{ color: ACCENT }} className="flex-none" />
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.address && (
              <span className="flex items-center gap-2">
                <MapPin size={13} style={{ color: ACCENT }} className="flex-none" />
                {personalInfo.address}
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-2 break-all">
                <Globe size={13} style={{ color: ACCENT }} className="flex-none" />
                {personalInfo.website}
              </span>
            )}
          </div>
        </div>

        {skills.length > 0 && (
          <div>
            <SectionTitle light>{t.skills}</SectionTitle>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="rounded px-2 py-1 text-[10px] font-medium text-white"
                  style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div>
            <SectionTitle light>{t.education}</SectionTitle>
            <div className="flex flex-col gap-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="text-xs font-bold text-white">{edu.degree}</h3>
                  {edu.fieldOfStudy && (
                    <p className="text-[11px] text-slate-300">{edu.fieldOfStudy}</p>
                  )}
                  <p className="text-[11px]" style={{ color: ACCENT }}>
                    {edu.school}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {edu.startDate}
                    {edu.startDate && edu.endDate ? ' — ' : ''}
                    {edu.endDate}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main column */}
      <main className="flex flex-1 flex-col gap-6 p-8">
        {personalInfo.summary && (
          <section>
            <SectionTitle>{t.summary}</SectionTitle>
            <p className="text-[12.5px] leading-relaxed text-slate-700">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {experiences.length > 0 && (
          <section>
            <SectionTitle>{t.experience}</SectionTitle>
            <div className="flex flex-col gap-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="border-slate-200 ltr:border-l-2 ltr:pl-4 rtl:border-r-2 rtl:pr-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <h3 className="text-sm font-bold text-slate-900">{exp.position}</h3>
                    <span className="text-[10px] font-medium text-slate-500">
                      {exp.startDate}
                      {exp.startDate && exp.endDate ? ' — ' : ''}
                      {exp.endDate}
                    </span>
                  </div>
                  <p className="text-xs font-semibold" style={{ color: NAVY }}>
                    {exp.company}
                  </p>
                  {exp.description && (
                    <p className="mt-1 whitespace-pre-wrap text-[12px] leading-relaxed text-slate-600">
                      {exp.description}
                    </p>
                  )}
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
                  <h3 className="text-sm font-bold text-slate-900">{project.name}</h3>
                  {project.link && (
                    <p className="text-[11px]" style={{ color: ACCENT }}>
                      {project.link}
                    </p>
                  )}
                  {project.description && (
                    <p className="mt-0.5 whitespace-pre-wrap text-[12px] leading-relaxed text-slate-600">
                      {project.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
