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

  return (
    <div className="p-12 h-full bg-white text-gray-900 font-serif flex flex-col gap-8">
      <header className="text-center border-b border-gray-400 pb-6">
        <h1 className="text-5xl font-bold mb-2">
          {personalInfo.fullName || t.fullName}
        </h1>
        <p className="text-lg italic text-gray-600 mb-4">
          {personalInfo.jobTitle || t.jobTitle}
        </p>
        <div className="text-sm flex justify-center gap-4 text-gray-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
        </div>
      </header>

      {personalInfo.summary && (
        <section>
          <h2 className="text-xl font-bold border-b border-gray-300 mb-4 pb-1">
            {t.summary}
          </h2>
          <p className="text-sm leading-relaxed text-justify italic">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {experiences.length > 0 && (
        <section>
          <h2 className="text-xl font-bold border-b border-gray-300 mb-4 pb-1">
            {t.experience}
          </h2>
          <div className="space-y-6">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-base">
                  <span>{exp.company}</span>
                  <span>{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="italic text-gray-700 mb-2">{exp.position}</p>
                <p className="text-sm whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section>
          <h2 className="text-xl font-bold border-b border-gray-300 mb-4 pb-1">
            {t.education}
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold">{edu.school}</span>
                  <span className="mx-2 text-gray-400">|</span>
                  <span>{edu.degree} - {edu.fieldOfStudy}</span>
                </div>
                <span className="text-sm italic">{edu.startDate} - {edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h2 className="text-xl font-bold border-b border-gray-300 mb-4 pb-1">
            {t.skills}
          </h2>
          <p className="text-sm">
            {skills.map(s => s.name).join(' • ')}
          </p>
        </section>
      )}
    </div>
  );
};
