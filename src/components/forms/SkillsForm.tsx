import React, { useState } from 'react';
import { useCVStore } from '../../store/useCVStore';
import { translations } from '../../utils/translations';
import { Plus, X } from 'lucide-react';

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
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-bold text-foreground">{t.skills}</h2>
        <p className="mt-0.5 text-xs text-muted-foreground">{t.skillPlaceholder}</p>
      </div>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder={t.skillPlaceholder}
          className="field-input flex-1"
        />
        <button
          type="submit"
          className="flex flex-none items-center justify-center rounded-lg bg-primary px-3.5 text-primary-foreground shadow-soft transition hover:opacity-90"
          aria-label={t.add}
        >
          <Plus size={18} />
        </button>
      </form>

      {skills.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-10 text-center">
          <p className="px-6 text-xs text-muted-foreground">{t.noItems}</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="group flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1.5 text-sm text-foreground"
            >
              <span>{skill.name}</span>
              <button
                onClick={() => removeSkill(skill.id)}
                className="text-muted-foreground transition hover:text-red-500"
                aria-label="Remove"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
