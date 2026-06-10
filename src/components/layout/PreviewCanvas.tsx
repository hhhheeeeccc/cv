import React, { useEffect, useRef, useState } from 'react';
import { useCVStore } from '../../store/useCVStore';
import { ModernTemplate } from '../templates/ModernTemplate';
import { ClassicTemplate } from '../templates/ClassicTemplate';
import { ATSTemplate } from '../templates/ATSTemplate';
import { exportToPDF, exportToDocx } from '../../utils/exportUtils';
import { translations } from '../../utils/translations';
import { Download, Printer } from 'lucide-react';

export const PreviewCanvas: React.FC = () => {
  const data = useCVStore();
  const { templateId, language } = data;
  const t = translations[language];
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const renderTemplate = () => {
    switch (templateId) {
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'classic':
        return <ClassicTemplate data={data} />;
      case 'ats':
        return <ATSTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth - 32;
        const cvWidth = 794; // 210mm in pixels at 96dpi
        const newScale = Math.min(containerWidth / cvWidth, 1);
        setScale(newScale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    const timer = setTimeout(updateScale, 100);
    return () => {
      window.removeEventListener('resize', updateScale);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex-1 bg-gray-200 p-4 md:p-8 overflow-y-auto flex flex-col items-center no-scrollbar">
      <div className="mb-6 flex gap-4 print:hidden sticky top-0 z-10">
        <button
          onClick={() => exportToPDF()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded shadow-lg hover:bg-blue-700 transition active:scale-95"
        >
          <Printer size={18} />
          <span className="text-sm font-bold">{t.printPdf}</span>
        </button>
        <button
          onClick={() => exportToDocx(data)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded shadow-lg hover:bg-green-700 transition active:scale-95"
        >
          <Download size={18} />
          <span className="text-sm font-bold">{t.wordDoc}</span>
        </button>
      </div>

      <div
        id="cv-preview"
        className="bg-white shadow-2xl origin-top print:shadow-none print:m-0 mb-8 transition-transform duration-300"
        style={{
          width: '210mm',
          minHeight: '297mm',
          padding: '0',
          boxSizing: 'border-box',
          transform: `scale(${scale})`,
        }}
      >
        {renderTemplate()}
      </div>
    </div>
  );
};
