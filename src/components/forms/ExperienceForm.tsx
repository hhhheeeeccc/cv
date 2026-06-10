import React from 'react';
import { useCVStore } from '../../store/useCVStore';
import { translations } from '../../utils/translations';
import { Plus, Trash2 } from 'lucide-react';

export const ExperienceForm: React.FC = () => {
  const { experiences, addExperience, updateExperience, removeExperience, language } = useCVStore();
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

  const handleRemove = (id: string) => {
    if (window.confirm(t.confirmDelete)) {
      removeExperience(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">{t.experience}</h2>
        <button
          onClick={handleAdd}
          aria-label={t.addExperience}
          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>
      {experiences.map((exp) => (
        <div key={exp.id} className="p-4 border rounded relative space-y-4 bg-white shadow-sm">
          <button
            onClick={() => handleRemove(exp.id)}
            aria-label={t.deleteEntry}
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={18} />
          </button>
          <input
            value={exp.company}
            onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
            placeholder={t.company}
            aria-label={t.company}
            className="w-full p-2 border rounded"
          />
          <input
            value={exp.position}
            onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
            placeholder={t.position}
            aria-label={t.position}
            className="w-full p-2 border rounded"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              value={exp.startDate}
              onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
              placeholder={t.startDate}
              aria-label={t.startDate}
              className="p-2 border rounded"
            />
            <input
              value={exp.endDate}
              onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
              placeholder={t.endDate}
              aria-label={t.endDate}
              className="p-2 border rounded"
            />
          </div>
          <textarea
            value={exp.description}
            onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
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
