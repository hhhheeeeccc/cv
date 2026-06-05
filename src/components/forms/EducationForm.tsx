import React from 'react';
import { useCVStore } from '../../store/useCVStore';
import { translations } from '../../utils/translations';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

export const EducationForm: React.FC = () => {
  const { education, addEducation, updateEducation, removeEducation, language } =
    useCVStore();
  const t = translations[language];

  const handleAdd = () => {
    addEducation({
      id: crypto.randomUUID(),
      school: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">{t.education}</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-soft transition hover:opacity-90"
        >
          <Plus size={15} />
          {t.add}
        </button>
      </div>

      {education.length === 0 && (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border py-10 text-center">
          <GraduationCap size={24} className="text-muted-foreground/50" />
          <p className="px-6 text-xs text-muted-foreground">{t.noItems}</p>
        </div>
      )}

      <div className="space-y-4">
        {education.map((edu) => (
          <div
            key={edu.id}
            className="relative space-y-3 rounded-xl border border-border bg-muted/40 p-4"
          >
            <button
              onClick={() => removeEducation(edu.id)}
              className="absolute top-3 text-muted-foreground transition hover:text-red-500 ltr:right-3 rtl:left-3"
              aria-label="Remove"
            >
              <Trash2 size={16} />
            </button>

            <div className="ltr:pr-7 rtl:pl-7">
              <label className="field-label">{t.school}</label>
              <input
                value={edu.school}
                onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                placeholder={t.school}
                className="field-input"
              />
            </div>

            <div>
              <label className="field-label">{t.degree}</label>
              <input
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                placeholder={t.degree}
                className="field-input"
              />
            </div>

            <div>
              <label className="field-label">{t.fieldOfStudy}</label>
              <input
                value={edu.fieldOfStudy}
                onChange={(e) => updateEducation(edu.id, { fieldOfStudy: e.target.value })}
                placeholder={t.fieldOfStudy}
                className="field-input"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="field-label">{t.startDate}</label>
                <input
                  value={edu.startDate}
                  onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                  placeholder={t.startDate}
                  className="field-input"
                />
              </div>
              <div>
                <label className="field-label">{t.endDate}</label>
                <input
                  value={edu.endDate}
                  onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                  placeholder={t.endDate}
                  className="field-input"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
