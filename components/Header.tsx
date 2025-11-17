
import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex-shrink-0 bg-slate-900/50 backdrop-blur-sm border-b border-slate-800 px-4 md:px-6 lg:px-8 py-4">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
    </header>
  );
};

export default Header;
