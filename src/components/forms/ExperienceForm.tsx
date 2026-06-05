import React from 'react';
import { useCVStore } from '../../store/useCVStore';
import { translations } from '../../utils/translations';
import { Plus, Trash2, Briefcase } from 'lucide-react';

export const ExperienceForm: React.FC = () => {
  const { experiences, addExperience, updateExperience, removeExperience, language } =
    useCVStore();
  const t = translations[language];

  const handleAdd = () => {
    addExperience({
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">{t.experience}</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-soft transition hover:opacity-90"
        >
          <Plus size={15} />
          {t.add}
        </button>
      </div>

      {experiences.length === 0 && (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border py-10 text-center">
          <Briefcase size={24} className="text-muted-foreground/50" />
          <p className="px-6 text-xs text-muted-foreground">{t.noItems}</p>
        </div>
      )}

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="relative space-y-3 rounded-xl border border-border bg-muted/40 p-4"
          >
            <button
              onClick={() => removeExperience(exp.id)}
              className="absolute top-3 text-muted-foreground transition hover:text-red-500 ltr:right-3 rtl:left-3"
              aria-label="Remove"
            >
              <Trash2 size={16} />
            </button>

            <div className="ltr:pr-7 rtl:pl-7">
              <label className="field-label">{t.company}</label>
              <input
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                placeholder={t.company}
                className="field-input"
              />
            </div>

            <div>
              <label className="field-label">{t.position}</label>
              <input
                value={exp.position}
                onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                placeholder={t.position}
                className="field-input"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="field-label">{t.startDate}</label>
                <input
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                  placeholder={t.startDate}
                  className="field-input"
                />
              </div>
              <div>
                <label className="field-label">{t.endDate}</label>
                <input
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                  placeholder={t.endDate}
                  className="field-input"
                />
              </div>
            </div>

            <div>
              <label className="field-label">{t.description}</label>
              <textarea
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                placeholder={t.description}
                rows={3}
                className="field-input resize-none leading-relaxed"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
