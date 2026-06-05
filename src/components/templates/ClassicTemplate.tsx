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
  const isRtl = language === 'ar';

  return (
    <div className={`p-16 h-full bg-white text-slate-900 flex flex-col gap-10 ${isRtl ? 'font-arabic' : 'font-serif'}`}>
      {/* Header */}
      <header className="text-center space-y-3">
        <h1 className="text-5xl font-bold tracking-tight text-slate-900">
          {personalInfo.fullName || t.fullName}
        </h1>
        <p className="text-lg italic text-slate-600 font-medium">
          {personalInfo.jobTitle || t.jobTitle}
        </p>
        <div className="text-xs flex justify-center gap-x-6 text-slate-500 font-sans border-y border-slate-200 py-2">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section>
          <h2 className="text-sm font-bold border-b-2 border-slate-900 mb-3 pb-0.5 uppercase tracking-[0.2em] font-sans">
            {t.summary}
          </h2>
          <p className="text-[13px] leading-relaxed text-slate-700 text-justify italic">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section>
          <h2 className="text-sm font-bold border-b-2 border-slate-900 mb-4 pb-0.5 uppercase tracking-[0.2em] font-sans">
            {t.experience}
          </h2>
          <div className="space-y-6">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-bold text-sm">
                  <span className="text-base">{exp.company}</span>
                  <span className="font-sans text-[11px] text-slate-500 uppercase tracking-widest">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="italic text-slate-600 text-[13px] mb-2">{exp.position}</p>
                <p className="text-[13px] text-slate-700 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section>
          <h2 className="text-sm font-bold border-b-2 border-slate-900 mb-4 pb-0.5 uppercase tracking-[0.2em] font-sans">
            {t.education}
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div className="text-[13px]">
                  <span className="font-bold text-sm">{edu.school}</span>
                  <span className="mx-2 text-slate-300">|</span>
                  <span className="italic">{edu.degree}</span>
                  {edu.fieldOfStudy && <span className="text-slate-500 text-xs ml-1">({edu.fieldOfStudy})</span>}
                </div>
                <span className="font-sans text-[10px] text-slate-500 uppercase tracking-widest">{edu.startDate} - {edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-sm font-bold border-b-2 border-slate-900 mb-3 pb-0.5 uppercase tracking-[0.2em] font-sans">
            {t.skills}
          </h2>
          <p className="text-[13px] leading-loose text-slate-700">
            {skills.map(s => s.name).join(' • ')}
          </p>
        </section>
      )}
    </div>
  );
};
