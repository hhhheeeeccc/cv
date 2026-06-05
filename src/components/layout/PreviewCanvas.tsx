import React, { useState, useEffect, useRef } from 'react';
import { useCVStore } from '../../store/useCVStore';
import { ModernTemplate } from '../templates/ModernTemplate';
import { ClassicTemplate } from '../templates/ClassicTemplate';
import { exportToPDF, exportToDocx } from '../../utils/exportUtils';
import { translations } from '../../utils/translations';
import { Download, Printer, ZoomIn, ZoomOut, Maximize } from 'lucide-react';

export const PreviewCanvas: React.FC = () => {
  const data = useCVStore();
  const { templateId, language } = data;
  const t = translations[language];
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth - 64; // 64px for padding
        const cvWidth = 794; // 210mm in pixels at 96 DPI
        if (containerWidth < cvWidth) {
          setScale(containerWidth / cvWidth);
        } else {
          setScale(1);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <div className="flex-1 bg-slate-200 h-screen overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 print:hidden z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setScale(s => Math.max(0.4, s - 0.1))}
            className="p-1.5 hover:bg-slate-100 rounded-md transition-colors text-slate-600"
            title="Zoom Out"
          >
            <ZoomOut size={18} />
          </button>
          <span className="text-xs font-medium text-slate-500 w-12 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => setScale(s => Math.min(1.5, s + 0.1))}
            className="p-1.5 hover:bg-slate-100 rounded-md transition-colors text-slate-600"
            title="Zoom In"
          >
            <ZoomIn size={18} />
          </button>
          <div className="w-px h-4 bg-slate-200 mx-2" />
          <button
            onClick={() => {
               if (containerRef.current) {
                const containerWidth = containerRef.current.clientWidth - 64;
                setScale(containerWidth / 794);
              }
            }}
            className="p-1.5 hover:bg-slate-100 rounded-md transition-colors text-slate-600"
            title="Fit to Screen"
          >
            <Maximize size={18} />
          </button>
        </div>

        <div className="flex gap-3">
          <button onClick={() => exportToPDF()} className="btn-secondary py-1.5 px-3 text-sm">
            <Printer size={16} />
            <span className="hidden sm:inline">{t.printPdf}</span>
          </button>
          <button onClick={() => exportToDocx(data)} className="btn-primary py-1.5 px-3 text-sm">
            <Download size={16} />
            <span className="hidden sm:inline">{t.wordDoc}</span>
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div
        ref={containerRef}
        className="flex-1 p-8 overflow-y-auto overflow-x-hidden flex justify-center items-start bg-slate-100"
      >
        <div
          id="cv-preview"
          className="bg-white shadow-2xl origin-top print:shadow-none print:m-0 mb-8 transition-transform duration-200 ease-out"
          style={{
            width: '210mm',
            minHeight: '297mm',
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};
