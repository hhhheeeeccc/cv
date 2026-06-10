import React from 'react';
import { useCVStore } from '../../store/useCVStore';
import { translations } from '../../utils/translations';
import { Plus, Trash2 } from 'lucide-react';

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

  const handleRemove = (id: string) => {
    if (window.confirm(t.confirmDelete)) {
      removeProject(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">{t.projects}</h2>
        <button
          onClick={handleAdd}
          aria-label={t.addProject}
          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>
      {projects.map((p) => (
        <div key={p.id} className="p-4 border rounded relative space-y-4 bg-white shadow-sm">
          <button
            onClick={() => handleRemove(p.id)}
            aria-label={t.deleteEntry}
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={18} />
          </button>
          <input
            value={p.name}
            onChange={(e) => updateProject(p.id, { name: e.target.value })}
            placeholder={t.projectName}
            aria-label={t.projectName}
            className="w-full p-2 border rounded"
          />
          <input
            value={p.link}
            onChange={(e) => updateProject(p.id, { link: e.target.value })}
            placeholder={t.projectLink}
            aria-label={t.projectLink}
            className="w-full p-2 border rounded"
          />
          <textarea
            value={p.description}
            onChange={(e) => updateProject(p.id, { description: e.target.value })}
            placeholder={t.description}
            aria-label={t.description}
            rows={3}
            className="w-full p-2 border rounded"
          />
        </div>
      ))}
    </div>
  );
};
