import React from 'react';
import { useCVStore } from '../../store/useCVStore';
import { Languages } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useCVStore();

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-b print:hidden">
      <Languages size={18} className="text-gray-500" />
      <div className="flex bg-white border rounded p-1">
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 text-xs font-bold rounded ${
            language === 'en' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('ar')}
          className={`px-3 py-1 text-xs font-bold rounded ${
            language === 'ar' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          العربية
        </button>
      </div>
    </div>
  );
};
