import React from 'react';
import { useCVStore } from '../../store/useCVStore';
import { translations } from '../../utils/translations';
import { Plus, Trash2, Code2, Link as LinkIcon } from 'lucide-react';

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
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
        <div>
          <h2 className="text-lg font-bold text-slate-800">{t.projects}</h2>
          <p className="text-xs text-slate-500 mt-1">Showcase your best work.</p>
        </div>
        <button
          onClick={handleAdd}
          className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md transition-all hover:scale-110"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((p) => (
          <div key={p.id} className="p-5 bg-white border border-slate-200 rounded-xl relative space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <button
              onClick={() => removeProject(p.id)}
              className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
            >
              <Trash2 size={18} />
            </button>

            <div className="space-y-4">
              <div>
                <label className="form-label flex items-center gap-2">
                  <Code2 size={14} className="text-indigo-500" />
                  {t.projectName}
                </label>
                <input
                  value={p.name}
                  onChange={(e) => updateProject(p.id, { name: e.target.value })}
                  placeholder={t.projectName}
                  className="input-field"
                />
              </div>

              <div>
                <label className="form-label flex items-center gap-2">
                  <LinkIcon size={14} className="text-indigo-500" />
                  {t.projectLink}
                </label>
                <input
                  value={p.link}
                  onChange={(e) => updateProject(p.id, { link: e.target.value })}
                  placeholder="https://..."
                  className="input-field"
                />
              </div>

              <div>
                <label className="form-label">{t.description}</label>
                <textarea
                  value={p.description}
                  onChange={(e) => updateProject(p.id, { description: e.target.value })}
                  placeholder={t.description}
                  rows={4}
                  className="input-field resize-none text-sm"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
