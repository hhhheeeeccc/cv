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
    <div className="flex-1 bg-gray-200 p-8 overflow-y-auto flex flex-col items-center">
      <div className="mb-6 flex gap-4 print:hidden">
        <button
          onClick={() => exportToPDF()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
        >
          <Printer size={18} />
          {t.printPdf}
        </button>
        <button
          onClick={() => exportToDocx(data)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition"
        >
          <Download size={18} />
          {t.wordDoc}
        </button>
      </div>

      <div
        id="cv-preview"
        className="bg-white shadow-2xl origin-top print:shadow-none print:m-0 mb-8"
        style={{
          width: '210mm',
          minHeight: '297mm',
          padding: '0',
          boxSizing: 'border-box',
        }}
      >
        {renderTemplate()}
      </div>
    </div>
  );
};
