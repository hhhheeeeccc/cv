import React from 'react';
import { useCVStore } from '../../store/useCVStore';
import { translations } from '../../utils/translations';
import { CVTemplateId } from '../../types/cv';
import { Check } from 'lucide-react';

export const TemplateSelector: React.FC = () => {
  const { templateId, setTemplate, language } = useCVStore();
  const t = translations[language];

  const templates: { id: CVTemplateId; name: string; desc: string }[] = [
    { id: 'modern', name: t.modern, desc: language === 'ar' ? 'تخطيط عمودين بلمسة لون' : 'Two-column with color accent' },
    { id: 'classic', name: t.classic, desc: language === 'ar' ? 'تصميم تقليدي أنيق' : 'Elegant traditional layout' },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-bold text-foreground">{t.selectTemplate}</h2>
        <p className="mt-0.5 text-xs text-muted-foreground">{t.appTagline}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {templates.map((tpl) => {
          const isActive = templateId === tpl.id;
          return (
            <button
              key={tpl.id}
              onClick={() => setTemplate(tpl.id)}
              className={`group relative overflow-hidden rounded-xl border-2 text-start transition ${
                isActive
                  ? 'border-primary shadow-panel'
                  : 'border-border hover:border-primary/40'
              }`}
            >
              {isActive && (
                <span className="absolute top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground ltr:right-2 rtl:left-2">
                  <Check size={14} />
                </span>
              )}

              {/* Mini visual preview */}
              <div className="aspect-[3/4] w-full bg-white p-2.5">
                {tpl.id === 'modern' ? (
                  <div className="flex h-full flex-col gap-1.5">
                    <div className="border-b-2 border-primary pb-1.5">
                      <div className="h-2 w-3/4 rounded-sm bg-primary" />
                      <div className="mt-1 h-1.5 w-1/2 rounded-sm bg-accent" />
                    </div>
                    <div className="flex flex-1 gap-1.5">
                      <div className="flex-[2] space-y-1">
                        <div className="h-1 w-full rounded-sm bg-slate-300" />
                        <div className="h-1 w-5/6 rounded-sm bg-slate-200" />
                        <div className="h-1 w-full rounded-sm bg-slate-200" />
                        <div className="mt-2 h-1 w-2/3 rounded-sm bg-slate-300" />
                        <div className="h-1 w-full rounded-sm bg-slate-200" />
                      </div>
                      <div className="flex-1 space-y-1 border-slate-200 ltr:border-l ltr:pl-1.5 rtl:border-r rtl:pr-1.5">
                        <div className="h-1 w-full rounded-sm bg-slate-300" />
                        <div className="h-1 w-3/4 rounded-sm bg-slate-200" />
                        <div className="h-1 w-full rounded-sm bg-slate-200" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full flex-col gap-1.5">
                    <div className="flex flex-col items-center border-b border-slate-300 pb-1.5">
                      <div className="h-2 w-2/3 rounded-sm bg-slate-700" />
                      <div className="mt-1 h-1.5 w-1/3 rounded-sm bg-slate-400" />
                    </div>
                    <div className="space-y-1">
                      <div className="h-1.5 w-1/3 rounded-sm bg-slate-600" />
                      <div className="h-1 w-full rounded-sm bg-slate-200" />
                      <div className="h-1 w-5/6 rounded-sm bg-slate-200" />
                      <div className="mt-2 h-1.5 w-1/3 rounded-sm bg-slate-600" />
                      <div className="h-1 w-full rounded-sm bg-slate-200" />
                      <div className="h-1 w-3/4 rounded-sm bg-slate-200" />
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-border bg-card p-3">
                <p
                  className={`text-sm font-bold ${
                    isActive ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {tpl.name}
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{tpl.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
