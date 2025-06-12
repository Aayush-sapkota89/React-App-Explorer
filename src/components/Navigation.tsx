import React from 'react';
import { FolderTree, Settings, Play, AlertTriangle, ArrowRightLeft } from 'lucide-react';

type ActiveSection = 'structure' | 'config' | 'scripts' | 'issues' | 'migration';

interface NavigationProps {
  activeSection: ActiveSection;
  onSectionChange: (section: ActiveSection) => void;
}

const navigationItems = [
  { id: 'structure', label: 'Project Structure', icon: FolderTree },
  { id: 'config', label: 'Configuration', icon: Settings },
  { id: 'scripts', label: 'Scripts', icon: Play },
  { id: 'issues', label: 'Common Issues', icon: AlertTriangle },
  { id: 'migration', label: 'Migration Guide', icon: ArrowRightLeft },
] as const;

const Navigation: React.FC<NavigationProps> = ({ activeSection, onSectionChange }) => {
  return (
    <nav className="flex flex-wrap gap-2 mb-8">
      {navigationItems.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onSectionChange(id as ActiveSection)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            activeSection === id
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25 transform scale-105'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-102'
          }`}
        >
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;