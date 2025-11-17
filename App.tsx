
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ChatView from './views/ChatView';
import ImageGeneratorView from './views/ImageGeneratorView';
import SummarizerView from './views/SummarizerView';
import RecipeGeneratorView from './views/RecipeGeneratorView';
import { NAV_ITEMS } from './constants';
import type { NavItem } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<string>(NAV_ITEMS[0].id);

  const renderActiveView = () => {
    switch (activeView) {
      case 'chat':
        return <ChatView />;
      case 'image':
        return <ImageGeneratorView />;
      case 'summarizer':
        return <SummarizerView />;
      case 'recipes':
        return <RecipeGeneratorView />;
      default:
        return <ChatView />;
    }
  };

  const activeNavItem = NAV_ITEMS.find(item => item.id === activeView) || NAV_ITEMS[0];

  return (
    <div className="flex h-screen bg-slate-900 text-slate-200 font-sans">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={activeNavItem.label} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};

export default App;
