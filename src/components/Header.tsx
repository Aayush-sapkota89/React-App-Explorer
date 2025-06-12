import React from 'react';
import { Code, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Code className="h-8 w-8 text-blue-400" />
              <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Aayush's React App Explorer</h1>
              <p className="text-gray-400 text-sm">Master CRA configurations and troubleshooting</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
              v5.0.1
            </span>
            <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-medium">
              React 18
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;