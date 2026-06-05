import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { PreviewCanvas } from './PreviewCanvas';
import { useCVStore } from '../../store/useCVStore';
import { Menu, X } from 'lucide-react';

export const MainLayout: React.FC = () => {
  const { language } = useCVStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div dir={dir} className="flex h-screen w-full bg-slate-50 overflow-hidden relative">
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 right-4 z-50 p-2 bg-indigo-600 text-white rounded-full shadow-lg md:hidden"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} z-40 w-80 bg-white shadow-2xl transition-transform duration-300 transform ${
          isSidebarOpen ? 'translate-x-0' : (dir === 'rtl' ? 'translate-x-full' : '-translate-x-full')
        } md:relative md:translate-x-0 md:shadow-none md:flex-none`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      <main className="flex-1 h-full overflow-hidden relative">
        <PreviewCanvas />
      </main>
    </div>
  );
};
