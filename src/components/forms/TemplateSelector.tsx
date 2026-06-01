import React from 'react';
import { useCVStore } from '../../store/useCVStore';
import { translations } from '../../utils/translations';
import { CVTemplateId } from '../../types/cv';

export const TemplateSelector: React.FC = () => {
  const { templateId, setTemplate, language } = useCVStore();
  const t = translations[language];

  const templates: { id: CVTemplateId; name: string }[] = [
    { id: 'modern', name: t.modern },
    { id: 'classic', name: t.classic },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">{t.selectTemplate}</h2>
      <div className="grid grid-cols-2 gap-4">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => setTemplate(t.id)}
            className={`p-4 border-2 rounded-lg text-sm font-bold transition ${
              templateId === t.id
                ? 'border-blue-600 bg-blue-50 text-blue-600'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
};
