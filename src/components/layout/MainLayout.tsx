import React from 'react';
import { Sidebar } from './Sidebar';
import { PreviewCanvas } from './PreviewCanvas';
import { useCVStore } from '../../store/useCVStore';
import { translations } from '../../utils/translations';
import { FileText, PencilLine, Eye } from 'lucide-react';

export const MainLayout: React.FC = () => {
  const { language, mobileView, setMobileView } = useCVStore();
  const t = translations[language];
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div dir={dir} className="flex h-screen w-full flex-col bg-background overflow-hidden">
      {/* Top app bar */}
      <header className="flex h-14 flex-none items-center justify-between border-b border-border bg-card px-4 sm:px-6 print:hidden">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FileText size={18} />
          </div>
          <div className="leading-tight">
            <h1 className="text-sm font-bold text-foreground sm:text-base">{t.appName}</h1>
            <p className="hidden text-[11px] text-muted-foreground sm:block">{t.appTagline}</p>
          </div>
        </div>

        {/* Mobile editor/preview toggle */}
        <div className="flex items-center gap-1 rounded-lg bg-muted p-1 lg:hidden">
          <button
            onClick={() => setMobileView('editor')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition ${
              mobileView === 'editor'
                ? 'bg-card text-primary shadow-soft'
                : 'text-muted-foreground'
            }`}
          >
            <PencilLine size={14} />
            {t.editor}
          </button>
          <button
            onClick={() => setMobileView('preview')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition ${
              mobileView === 'preview'
                ? 'bg-card text-primary shadow-soft'
                : 'text-muted-foreground'
            }`}
          >
            <Eye size={14} />
            {t.preview}
          </button>
        </div>
      </header>

      {/* Workspace */}
      <div className="flex min-h-0 flex-1">
        <div
          className={`${
            mobileView === 'editor' ? 'flex' : 'hidden'
          } w-full flex-none lg:flex lg:w-[400px] xl:w-[440px]`}
        >
          <Sidebar />
        </div>
        <div
          className={`${
            mobileView === 'preview' ? 'flex' : 'hidden'
          } min-w-0 flex-1 lg:flex`}
        >
          <PreviewCanvas />
        </div>
      </div>
    </div>
  );
};
