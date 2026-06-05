import React from 'react';
import { useCVStore } from '../../store/useCVStore';
import { translations } from '../../utils/translations';
import { Plus, Trash2, Code } from 'lucide-react';

export const ProjectsForm: React.FC = () => {
  const { projects, addProject, updateProject, removeProject, language } = useCVStore();
  const t = translations[language];

  const handleAdd = () => {
    addProject({
      id: crypto.randomUUID(),
      name: '',
      description: '',
      link: '',
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">{t.projects}</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-soft transition hover:opacity-90"
        >
          <Plus size={15} />
          {t.add}
        </button>
      </div>

      {projects.length === 0 && (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border py-10 text-center">
          <Code size={24} className="text-muted-foreground/50" />
          <p className="px-6 text-xs text-muted-foreground">{t.noItems}</p>
        </div>
      )}

      <div className="space-y-4">
        {projects.map((p) => (
          <div
            key={p.id}
            className="relative space-y-3 rounded-xl border border-border bg-muted/40 p-4"
          >
            <button
              onClick={() => removeProject(p.id)}
              className="absolute top-3 text-muted-foreground transition hover:text-red-500 ltr:right-3 rtl:left-3"
              aria-label="Remove"
            >
              <Trash2 size={16} />
            </button>

            <div className="ltr:pr-7 rtl:pl-7">
              <label className="field-label">{t.projectName}</label>
              <input
                value={p.name}
                onChange={(e) => updateProject(p.id, { name: e.target.value })}
                placeholder={t.projectName}
                className="field-input"
              />
            </div>

            <div>
              <label className="field-label">{t.projectLink}</label>
              <input
                value={p.link}
                onChange={(e) => updateProject(p.id, { link: e.target.value })}
                placeholder={t.projectLink}
                className="field-input"
              />
            </div>

            <div>
              <label className="field-label">{t.description}</label>
              <textarea
                value={p.description}
                onChange={(e) => updateProject(p.id, { description: e.target.value })}
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
