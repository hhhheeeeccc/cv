import React from 'react';
import { useCVStore } from '../../store/useCVStore';
import { Languages } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useCVStore();

  return (
    <div className="flex flex-none items-center justify-between border-b border-border bg-muted px-4 py-2.5 print:hidden">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Languages size={16} />
        <span className="text-xs font-medium">{language === 'ar' ? 'اللغة' : 'Language'}</span>
      </div>
      <div className="flex gap-1 rounded-lg border border-border bg-card p-1">
        <button
          onClick={() => setLanguage('en')}
          className={`rounded-md px-3 py-1 text-xs font-bold transition ${
            language === 'en'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('ar')}
          className={`rounded-md px-3 py-1 text-xs font-bold transition ${
            language === 'ar'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          العربية
        </button>
      </div>
    </div>
  );
};
