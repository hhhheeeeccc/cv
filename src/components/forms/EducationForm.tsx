import React from 'react';
import { useCVStore } from '../../store/useCVStore';
import { translations } from '../../utils/translations';
import { Plus, Trash2 } from 'lucide-react';

export const EducationForm: React.FC = () => {
  const { education, addEducation, updateEducation, removeEducation, language } = useCVStore();
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

  const handleRemove = (id: string) => {
    if (window.confirm(t.confirmDelete)) {
      removeEducation(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">{t.education}</h2>
        <button
          onClick={handleAdd}
          aria-label={t.addEducation}
          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>
      {education.map((edu) => (
        <div key={edu.id} className="p-4 border rounded relative space-y-4 bg-white shadow-sm">
          <button
            onClick={() => handleRemove(edu.id)}
            aria-label={t.deleteEntry}
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={18} />
          </button>
          <input
            value={edu.school}
            onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
            placeholder={t.school}
            aria-label={t.school}
            className="w-full p-2 border rounded"
          />
          <input
            value={edu.degree}
            onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
            placeholder={t.degree}
            aria-label={t.degree}
            className="w-full p-2 border rounded"
          />
          <input
            value={edu.fieldOfStudy}
            onChange={(e) => updateEducation(edu.id, { fieldOfStudy: e.target.value })}
            placeholder={t.fieldOfStudy}
            aria-label={t.fieldOfStudy}
            className="w-full p-2 border rounded"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              value={edu.startDate}
              onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
              placeholder={t.startDate}
              aria-label={t.startDate}
              className="p-2 border rounded"
            />
            <input
              value={edu.endDate}
              onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
              placeholder={t.endDate}
              aria-label={t.endDate}
              className="p-2 border rounded"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
