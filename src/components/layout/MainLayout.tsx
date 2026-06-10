import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { PreviewCanvas } from './PreviewCanvas';
import { useCVStore } from '../../store/useCVStore';
import { Eye, Edit3 } from 'lucide-react';
import { translations } from '../../utils/translations';

export const MainLayout: React.FC = () => {
  const { language } = useCVStore();
  const t = translations[language];
  const [mobileView, setMobileView] = useState<'edit' | 'preview'>('edit');
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div dir={dir} className="flex h-screen w-full bg-gray-100 overflow-hidden flex-col md:flex-row">
      {/* Sidebar for Desktop / Mobile Edit View */}
      <div className={`flex-none md:w-96 h-full ${mobileView === 'preview' ? 'hidden md:block' : 'w-full'}`}>
        <Sidebar />
      </div>

      {/* Preview Canvas for Desktop / Mobile Preview View */}
      <div className={`flex-1 h-full ${mobileView === 'edit' ? 'hidden md:block' : 'w-full'}`}>
        <PreviewCanvas />
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileView(mobileView === 'edit' ? 'preview' : 'edit')}
        aria-label={mobileView === 'edit' ? t.preview : t.edit}
        className={`md:hidden fixed bottom-6 ${dir === 'rtl' ? 'left-6' : 'right-6'} z-50 p-4 bg-blue-600 text-white rounded-full shadow-2xl flex items-center gap-2 font-bold transition-transform active:scale-95 animate-bounce-subtle`}
      >
        {mobileView === 'edit' ? (
          <>
            <Eye size={20} />
            <span className="text-sm">{t.preview}</span>
          </>
        ) : (
          <>
            <Edit3 size={20} />
            <span className="text-sm">{t.edit}</span>
          </>
        )}
      </button>
    </div>
  );
};
