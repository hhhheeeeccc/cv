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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">{t.experience}</h2>
        <button
          onClick={handleAdd}
          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          <Plus size={20} />
        </button>
      </div>
      {experiences.map((exp) => (
        <div key={exp.id} className="p-4 border rounded relative space-y-4">
          <button
            onClick={() => removeExperience(exp.id)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
          <input
            value={exp.company}
            onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
            placeholder={t.company}
            className="w-full p-2 border rounded"
          />
          <input
            value={exp.position}
            onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
            placeholder={t.position}
            className="w-full p-2 border rounded"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              value={exp.startDate}
              onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
              placeholder={t.startDate}
              className="p-2 border rounded"
            />
            <input
              value={exp.endDate}
              onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
              placeholder={t.endDate}
              className="p-2 border rounded"
            />
          </div>
          <textarea
            value={exp.description}
            onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
            placeholder={t.description}
            rows={3}
            className="w-full p-2 border rounded"
          />
        </div>
      ))}
    </div>
  );
};
