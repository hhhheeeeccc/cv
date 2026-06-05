import React from 'react';
import { useCVStore } from '../../store/useCVStore';
import { ModernTemplate } from '../templates/ModernTemplate';
import { ClassicTemplate } from '../templates/ClassicTemplate';
import { exportToPDF, exportToDocx } from '../../utils/exportUtils';
import { translations } from '../../utils/translations';
import { Download, Printer } from 'lucide-react';

export const PreviewCanvas: React.FC = () => {
  const data = useCVStore();
  const { templateId, language } = data;
  const t = translations[language];

  const renderTemplate = () => {
    switch (templateId) {
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'classic':
        return <ClassicTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-muted">
      {/* Toolbar */}
      <div className="flex flex-none items-center justify-between gap-3 border-b border-border bg-card/80 px-4 py-3 backdrop-blur sm:px-6 print:hidden">
        <span className="hidden text-xs font-medium text-muted-foreground sm:block">
          {t.livePreview}
        </span>
        <div className="flex w-full gap-2 sm:w-auto">
          <button
            onClick={() => exportToPDF()}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90 sm:flex-none"
          >
            <Printer size={16} />
            {t.printPdf}
          </button>
          <button
            onClick={() => exportToDocx(data)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground shadow-soft transition hover:bg-muted sm:flex-none"
          >
            <Download size={16} />
            {t.wordDoc}
          </button>
        </div>
      </div>

      {/* Scrollable sheet area */}
      <div className="flex-1 overflow-auto p-4 sm:p-8">
        <div className="mx-auto w-full max-w-[210mm]">
          {/* Responsive A4 wrapper: the sheet keeps A4 ratio and scales down on small screens */}
          <div
            id="cv-preview"
            dir={language === 'ar' ? 'rtl' : 'ltr'}
            className="mx-auto overflow-hidden rounded-lg bg-white shadow-sheet print:rounded-none print:shadow-none"
            style={{
              width: '210mm',
              minHeight: '297mm',
              maxWidth: '100%',
            }}
          >
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};
