import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { PreviewCanvas } from './PreviewCanvas';
import { useCVStore } from '../../store/useCVStore';
import { Menu, X } from 'lucide-react';

export const MainLayout: React.FC = () => {
  const { language } = useCVStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleCloseSidebar = () => setIsSidebarOpen(false);

  const sidebarTransform = isSidebarOpen
    ? 'translate-x-0'
    : (dir === 'rtl' ? 'translate-x-full' : '-translate-x-full');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleCloseSidebar();
    }
  };

  return (
    <div dir={dir} className="flex h-screen w-full bg-slate-50 overflow-hidden relative">
      {/* Mobile Menu Toggle */}
      <button
        onClick={handleToggleSidebar}
        className="fixed top-4 right-4 z-50 p-2 bg-indigo-600 text-white rounded-full shadow-lg md:hidden"
        aria-label="Toggle Menu"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden"
          onClick={handleCloseSidebar}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-label="Close Sidebar"
        />
      )}

      <div
        className={`fixed inset-y-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} z-40 w-80 bg-white shadow-2xl transition-transform duration-300 transform ${sidebarTransform} md:relative md:translate-x-0 md:shadow-none md:flex-none`}
      >
        <Sidebar onClose={handleCloseSidebar} />
      </div>

      <main className="flex-1 h-full overflow-hidden relative">
        <PreviewCanvas />
      </main>
    </div>
  );
};
