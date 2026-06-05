import React, { useState } from 'react';
import { useCVStore } from '../../store/useCVStore';
import { translations } from '../../utils/translations';
import { Plus, Trash2, Zap } from 'lucide-react';

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
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b border-slate-100 pb-2">
        <h2 className="text-lg font-bold text-slate-800">{t.skills}</h2>
        <p className="text-xs text-slate-500 mt-1">Highlight your top abilities.</p>
      </div>

      <form onSubmit={handleAdd} className="flex gap-2">
        <div className="relative flex-1">
          <Zap size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder={t.skillPlaceholder}
            className="input-field pl-10"
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md transition-all"
        >
          <Plus size={20} />
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg group hover:border-indigo-300 hover:bg-indigo-50/30 transition-all shadow-sm"
          >
            <span className="text-sm font-medium">{skill.name}</span>
            <button
              onClick={() => removeSkill(skill.id)}
              className="text-slate-300 hover:text-red-500 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        {skills.length === 0 && (
          <div className="w-full py-8 text-center border-2 border-dashed border-slate-100 rounded-xl text-slate-400 text-sm">
            No skills added yet.
          </div>
        )}
      </div>
    </div>
  );
};
