import React from 'react';
import { CVData } from '../../types/cv';

interface Props {
  data: CVData;
}

export const ModernTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, experiences, education, projects, skills } = data;

  return (
    <div className="p-8 h-full bg-white text-gray-800 font-sans flex flex-col gap-6">
      {/* Header */}
      <header className="border-b-2 border-blue-600 pb-4">
        <h1 className="text-4xl font-bold uppercase tracking-wider text-blue-800">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-xl text-blue-600 font-medium">
          {personalInfo.jobTitle || 'Target Job Title'}
        </p>
        <div className="mt-2 text-sm text-gray-600 flex flex-wrap gap-4">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
          {personalInfo.website && (
            <a href={personalInfo.website} className="text-blue-500 hover:underline">
              {personalInfo.website}
            </a>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section>
          <h2 className="text-lg font-bold text-blue-800 uppercase border-b border-gray-200 mb-2">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      <div className="grid grid-cols-3 gap-8 flex-1">
        {/* Main Column */}
        <div className="col-span-2 flex flex-col gap-6">
          {/* Experience */}
          {experiences.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-blue-800 uppercase border-b border-gray-200 mb-3">
                Experience
              </h2>
              <div className="flex flex-col gap-4">
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-gray-900">{exp.position}</h3>
                      <span className="text-xs text-gray-500 italic">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <p className="text-sm text-blue-700 font-medium">{exp.company}</p>
                    <p className="text-sm mt-1 whitespace-pre-wrap">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-blue-800 uppercase border-b border-gray-200 mb-3">
                Projects
              </h2>
              <div className="flex flex-col gap-4">
                {projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    {project.link && (
                      <a href={project.link} className="text-xs text-blue-500 mb-1 block">
                        {project.link}
                      </a>
                    )}
                    <p className="text-sm whitespace-pre-wrap">{project.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="col-span-1 flex flex-col gap-6">
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-blue-800 uppercase border-b border-gray-200 mb-3">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-2 py-1 bg-gray-100 text-xs font-medium rounded border border-gray-200"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-blue-800 uppercase border-b border-gray-200 mb-3">
                Education
              </h2>
              <div className="flex flex-col gap-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-sm font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-xs text-blue-700">{edu.school}</p>
                    <p className="text-[10px] text-gray-500 italic">
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
