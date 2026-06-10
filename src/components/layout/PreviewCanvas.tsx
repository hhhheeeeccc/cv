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
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const padding = window.innerWidth < 768 ? 20 : 60;
      const availableWidth = containerWidth - padding;
      const cvWidth = 794; // 210mm in px

      const newScale = Math.min(availableWidth / cvWidth, 1);
      if (newScale > 0) {
        setScale(newScale);
      }
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener('resize', updateScale);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex-1 bg-gray-200 p-4 md:p-8 overflow-y-auto flex flex-col items-center no-scrollbar overflow-x-hidden relative">
      {/* Responsive Header Buttons */}
      <div className="mb-6 flex justify-center gap-2 md:gap-4 print:hidden sticky top-0 z-10 w-full max-w-2xl bg-gray-200/80 backdrop-blur-sm p-2 rounded-lg">
        <button
          onClick={() => exportToPDF()}
          className="flex-1 max-w-[200px] flex items-center justify-center gap-2 px-3 py-2.5 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition active:scale-95"
        >
          <Printer size={18} />
          <span className="text-xs md:text-sm font-bold">{t.printPdf}</span>
        </button>
        <button
          onClick={() => exportToDocx(data)}
          className="flex-1 max-w-[200px] flex items-center justify-center gap-2 px-3 py-2.5 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition active:scale-95"
        >
          <Download size={18} />
          <span className="text-xs md:text-sm font-bold">{t.wordDoc}</span>
        </button>
      </div>

      {/* CV Wrapper with Dynamic Height */}
      <div
        className="w-full flex justify-center pb-20"
        style={{
          height: `${297 * scale}mm`,
          minHeight: `${297 * scale}mm`,
        }}
      >
        <div
          id="cv-preview"
          className="bg-white shadow-2xl origin-top print:shadow-none print:m-0 transition-transform duration-300 shrink-0"
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
    </div>
  );
};
