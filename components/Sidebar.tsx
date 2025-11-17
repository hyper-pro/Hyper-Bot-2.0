
import React from 'react';
import { NAV_ITEMS, LOGO_URL } from '../constants';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  return (
    <aside className="w-16 md:w-64 bg-slate-950 p-2 md:p-4 flex flex-col space-y-2 border-r border-slate-800 transition-all duration-300">
      <div className="flex items-center justify-center md:justify-start space-x-3 mb-8 px-2">
        <img src={LOGO_URL} alt="Hyper Bot 2.0 Logo" className="w-8 h-8 rounded-lg flex-shrink-0" />
        <h1 className="text-xl font-bold text-white hidden md:block">Hyper Bot 2.0</h1>
      </div>
      <nav className="flex flex-col space-y-2">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 w-full text-left
              ${
                activeView === item.id
                  ? 'bg-cyan-500/20 text-cyan-300'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
          >
            {item.icon}
            <span className="hidden md:block font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;