import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { MainLayout } from './components/layout/MainLayout';

function App() {
  return (
    <div className="App">
      <MainLayout />
      <Analytics />
    </div>
  );
}

export default App;
