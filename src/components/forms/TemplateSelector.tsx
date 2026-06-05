import React from 'react';
import { useCVStore } from '../../store/useCVStore';
import { translations } from '../../utils/translations';
import { CVTemplateId } from '../../types/cv';
import { Check } from 'lucide-react';

export const TemplateSelector: React.FC = () => {
  const { templateId, setTemplate, language } = useCVStore();
  const t = translations[language];

  const templates: { id: CVTemplateId; name: string; description: string }[] = [
    { id: 'modern', name: t.modern, description: 'Clean & minimal layout' },
    { id: 'classic', name: t.classic, description: 'Traditional serif design' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b border-slate-100 pb-2">
        <h2 className="text-lg font-bold text-slate-800">{t.selectTemplate}</h2>
        <p className="text-xs text-slate-500 mt-1">Choose a style for your resume.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => setTemplate(t.id)}
            className={`group relative p-4 border-2 rounded-xl text-left transition-all duration-300 ${
              templateId === t.id
                ? 'border-indigo-600 bg-indigo-50/50 ring-4 ring-indigo-500/10'
                : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-md'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className={`font-bold ${templateId === t.id ? 'text-indigo-600' : 'text-slate-700'}`}>
                  {t.name}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{t.description}</p>
              </div>
              {templateId === t.id && (
                <div className="bg-indigo-600 text-white p-1 rounded-full">
                  <Check size={12} />
                </div>
              )}
            </div>

            <div className={`mt-3 w-full h-2 rounded-full overflow-hidden bg-slate-100 ${templateId === t.id ? 'opacity-100' : 'opacity-0 transition-opacity group-hover:opacity-100'}`}>
              <div
                className={`h-full bg-indigo-600 transition-all duration-500 ${templateId === t.id ? 'w-full' : 'w-0'}`}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
