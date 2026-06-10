import React, { useState } from 'react';
import { useCVStore } from '../../store/useCVStore';
import { translations } from '../../utils/translations';
import { Plus, Trash2 } from 'lucide-react';

export const SkillsForm: React.FC = () => {
  const { skills, addSkill, removeSkill, language } = useCVStore();
  const t = translations[language];
  const [newSkill, setNewSkill] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim()) {
      addSkill({ id: crypto.randomUUID(), name: newSkill.trim(), level: 5 });
      setNewSkill('');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">{t.skills}</h2>
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder={t.skillPlaceholder}
          aria-label={t.skillPlaceholder}
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          aria-label={t.addSkill}
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
        </button>
      </form>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="flex items-center gap-2 px-3 py-1 bg-gray-100 border rounded-full group hover:bg-gray-200 transition-colors"
          >
            <span className="text-sm">{skill.name}</span>
            <button
              onClick={() => removeSkill(skill.id)}
              aria-label={`${t.remove} ${skill.name}`}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
