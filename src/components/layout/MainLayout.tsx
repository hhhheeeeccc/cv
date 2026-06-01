import React from 'react';
import { Sidebar } from './Sidebar';
import { PreviewCanvas } from './PreviewCanvas';
import { useCVStore } from '../../store/useCVStore';

export const MainLayout: React.FC = () => {
  const { language } = useCVStore();
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div dir={dir} className="flex h-screen w-full bg-gray-100 overflow-hidden">
      <Sidebar />
      <PreviewCanvas />
    </div>
  );
};
