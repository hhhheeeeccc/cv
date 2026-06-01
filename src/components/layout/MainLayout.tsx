import React from 'react';
import { Sidebar } from './Sidebar';
import { PreviewCanvas } from './PreviewCanvas';

export const MainLayout: React.FC = () => {
  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden">
      <Sidebar />
      <PreviewCanvas />
    </div>
  );
};
