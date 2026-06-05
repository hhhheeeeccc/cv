import React from 'react';
import { CVData } from '../../types/cv';
import { useCVStore } from '../../store/useCVStore';
import { translations } from '../../utils/translations';
import { Mail, Phone, MapPin, Globe, Award, Briefcase, GraduationCap, Code2 } from 'lucide-react';

interface Props {
  data: CVData;
}

export const ModernTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, experiences, education, projects, skills } = data;
  const { language } = useCVStore();
  const t = translations[language];
  const isRtl = language === 'ar';

  return (
    <div className={`h-full bg-white text-slate-800 flex flex-col ${isRtl ? 'font-arabic' : 'font-sans'}`}>
      {/* Header */}
      <header className="bg-slate-900 text-white p-10 flex flex-col gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold tracking-tight uppercase">
            {personalInfo.fullName || t.fullName}
          </h1>
          <p className="text-xl text-indigo-400 font-semibold tracking-wide">
            {personalInfo.jobTitle || t.jobTitle}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-slate-300">
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-indigo-400" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-indigo-400" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.address && (
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-indigo-400" />
              <span>{personalInfo.address}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-indigo-400" />
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </header>

      <div className="p-10 flex-1 grid grid-cols-12 gap-10">
        {/* Main Content */}
        <div className="col-span-8 flex flex-col gap-10">
          {personalInfo.summary && (
            <section>
              <h2 className={`text-lg font-bold text-slate-900 uppercase tracking-widest ${isRtl ? 'border-r-4 pr-3' : 'border-l-4 pl-3'} border-indigo-600 mb-4 flex items-center gap-2`}>
                <Award size={18} className="text-indigo-600" />
                {t.summary}
              </h2>
              <p className="text-[13px] leading-relaxed text-slate-600 text-justify">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {experiences.length > 0 && (
            <section>
              <h2 className={`text-lg font-bold text-slate-900 uppercase tracking-widest ${isRtl ? 'border-r-4 pr-3' : 'border-l-4 pl-3'} border-indigo-600 mb-6 flex items-center gap-2`}>
                <Briefcase size={18} className="text-indigo-600" />
                {t.experience}
              </h2>
              <div className="flex flex-col gap-8">
                {experiences.map((exp) => (
                  <div key={exp.id} className={`relative ${isRtl ? 'pr-6' : 'pl-6'} ${isRtl ? 'before:right-0' : 'before:left-0'} before:absolute before:top-2 before:bottom-0 before:w-px before:bg-slate-200`}>
                    <div className={`absolute ${isRtl ? 'right-[-4px]' : 'left-[-4px]'} top-2 w-2 h-2 rounded-full bg-indigo-600 ring-4 ring-white`} />
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-base font-bold text-slate-800">{exp.position}</h3>
                      <span className="text-[11px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <p className="text-sm text-indigo-600 font-bold mb-2">{exp.company}</p>
                    <p className="text-[13px] text-slate-600 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2 className={`text-lg font-bold text-slate-900 uppercase tracking-widest ${isRtl ? 'border-r-4 pr-3' : 'border-l-4 pl-3'} border-indigo-600 mb-6 flex items-center gap-2`}>
                <Code2 size={18} className="text-indigo-600" />
                {t.projects}
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <h3 className="font-bold text-slate-800 flex justify-between items-center">
                      {project.name}
                      {project.link && <span className="text-[10px] text-indigo-500 underline">{project.link}</span>}
                    </h3>
                    <p className="text-[12px] text-slate-600 mt-2 leading-relaxed">{project.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="col-span-4 flex flex-col gap-10">
          {skills.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b-2 border-slate-100 pb-2 mb-4">
                {t.skills}
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded uppercase tracking-wider border border-indigo-100"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b-2 border-slate-100 pb-2 mb-4">
                {t.education}
              </h2>
              <div className="flex flex-col gap-6">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-[13px] font-bold text-slate-800">{edu.degree}</h3>
                    <p className="text-[12px] text-indigo-600 font-medium mt-0.5">{edu.school}</p>
                    <p className="text-[10px] text-slate-400 mt-1 font-semibold uppercase">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
