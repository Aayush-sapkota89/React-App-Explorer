import React, { useState } from 'react';
import { ArrowRightLeft, ArrowRight, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react';

interface MigrationPath {
  id: string;
  from: string;
  to: string;
  difficulty: 'easy' | 'moderate' | 'advanced';
  timeEstimate: string;
  description: string;
  steps: string[];
  considerations: string[];
  resources: { title: string; url: string }[];
}

const migrationPaths: MigrationPath[] = [
  {
    id: 'cra-to-vite',
    from: 'Create React App',
    to: 'Vite',
    difficulty: 'moderate',
    timeEstimate: '2-4 hours',
    description: 'Migrate from CRA to Vite for faster development and builds',
    steps: [
      'Install Vite and related dependencies',
      'Create vite.config.js configuration file',
      'Move index.html to root and update script references',
      'Update import statements for assets',
      'Replace react-scripts commands with Vite equivalents',
      'Update environment variable names (REACT_APP_ → VITE_)',
      'Test all functionality and fix any breaking changes'
    ],
    considerations: [
      'Environment variables need VITE_ prefix instead of REACT_APP_',
      'Some CRA-specific features may not work',
      'Bundle analysis tools differ between CRA and Vite',
      'HMR behavior may be different'
    ],
    resources: [
      { title: 'Official Vite Migration Guide', url: 'https://vitejs.dev/guide/migration.html' },
      { title: 'CRA to Vite Migration Tool', url: 'https://github.com/originjs/webpack-to-vite' }
    ]
  },
  {
    id: 'cra-to-nextjs',
    from: 'Create React App',
    to: 'Next.js',
    difficulty: 'advanced',
    timeEstimate: '1-2 days',
    description: 'Migrate to Next.js for SSR, SSG, and better performance',
    steps: [
      'Install Next.js and remove react-scripts',
      'Create pages/ directory and move components',
      'Update routing from React Router to Next.js router',
      'Convert components to Next.js page components',
      'Update import statements and asset handling',
      'Configure next.config.js for custom settings',
      'Update deployment configuration'
    ],
    considerations: [
      'Routing architecture completely changes',
      'Server-side rendering requires code adjustments',
      'Static file serving works differently',
      'API routes replace separate backend needs'
    ],
    resources: [
      { title: 'Next.js Migration Guide', url: 'https://nextjs.org/docs/migrating/from-create-react-app' },
      { title: 'Next.js Learning Course', url: 'https://nextjs.org/learn' }
    ]
  },
  {
    id: 'cra-eject',
    from: 'Create React App',
    to: 'Ejected CRA',
    difficulty: 'advanced',
    timeEstimate: '4-8 hours',
    description: 'Eject from CRA to have full control over build configuration',
    steps: [
      'Backup your project (ejecting is irreversible)',
      'Run npm run eject command',
      'Review generated config/ and scripts/ directories',
      'Understand webpack.config.js configuration',
      'Customize build process as needed',
      'Update package.json dependencies',
      'Test build and development processes'
    ],
    considerations: [
      'Ejecting is a one-way operation - cannot be undone',
      'You become responsible for maintaining build configuration',
      'Updates to react-scripts no longer apply automatically',
      'Significantly increases complexity'
    ],
    resources: [
      { title: 'CRA Ejecting Documentation', url: 'https://create-react-app.dev/docs/available-scripts/#npm-run-eject' },
      { title: 'Alternatives to Ejecting', url: 'https://create-react-app.dev/docs/alternatives-to-ejecting/' }
    ]
  },
  {
    id: 'cra-to-parcel',
    from: 'Create React App',
    to: 'Parcel',
    difficulty: 'easy',
    timeEstimate: '1-2 hours',
    description: 'Switch to Parcel for zero-configuration bundling',
    steps: [
      'Install Parcel bundler',
      'Remove react-scripts dependency',
      'Update package.json scripts to use Parcel',
      'Move index.html to src/ directory',
      'Update script src to point to index.js',
      'Test development and build processes',
      'Update deployment configuration if needed'
    ],
    considerations: [
      'Parcel has different HMR behavior',
      'Some advanced webpack features may not be available',
      'Plugin ecosystem is smaller than webpack',
      'Build output structure may differ'
    ],
    resources: [
      { title: 'Parcel Documentation', url: 'https://parceljs.org/getting-started/webapp/' },
      { title: 'Parcel vs Webpack Comparison', url: 'https://parceljs.org/getting-started/migration/' }
    ]
  }
];

const MigrationGuide: React.FC = () => {
  const [selectedMigration, setSelectedMigration] = useState<MigrationPath>(migrationPaths[0]);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const getDifficultyColor = (difficulty: MigrationPath['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'moderate': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'advanced': return 'text-red-400 bg-red-500/10 border-red-500/20';
    }
  };

  const toggleStep = (stepIndex: number) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepIndex)) {
      newCompleted.delete(stepIndex);
    } else {
      newCompleted.add(stepIndex);
    }
    setCompletedSteps(newCompleted);
  };

  const resetProgress = () => {
    setCompletedSteps(new Set());
  };

  return (
    <div className="space-y-8">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <div className="flex items-center space-x-2 mb-6">
          <ArrowRightLeft className="h-5 w-5 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">Migration Paths</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {migrationPaths.map((path) => (
            <button
              key={path.id}
              onClick={() => {
                setSelectedMigration(path);
                resetProgress();
              }}
              className={`p-4 rounded-lg text-left transition-all duration-200 ${
                selectedMigration.id === path.id
                  ? 'bg-blue-500/20 border border-blue-500/30 transform scale-105'
                  : 'bg-gray-700/30 hover:bg-gray-700/50 border border-transparent'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">{path.from}</span>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>
              <div className="font-medium text-white mb-2">{path.to}</div>
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded border ${getDifficultyColor(path.difficulty)}`}>
                  {path.difficulty}
                </span>
                <span className="text-xs text-gray-500">{path.timeEstimate}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {selectedMigration.from} → {selectedMigration.to}
                </h3>
                <p className="text-gray-400">{selectedMigration.description}</p>
              </div>
              <div className="text-right">
                <span className={`inline-block px-3 py-1 rounded border text-sm ${getDifficultyColor(selectedMigration.difficulty)}`}>
                  {selectedMigration.difficulty}
                </span>
                <p className="text-sm text-gray-400 mt-1">{selectedMigration.timeEstimate}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">Migration Steps</h4>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">
                  {completedSteps.size}/{selectedMigration.steps.length} completed
                </span>
                <button
                  onClick={resetProgress}
                  className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              {selectedMigration.steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-200 cursor-pointer ${
                    completedSteps.has(index)
                      ? 'bg-green-500/10 border border-green-500/20'
                      : 'bg-gray-700/30 hover:bg-gray-700/50'
                  }`}
                  onClick={() => toggleStep(index)}
                >
                  <div className="mt-1">
                    {completedSteps.has(index) ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-500 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="text-sm text-white font-medium">{index + 1}.</span>
                    <span className={`ml-2 text-sm ${
                      completedSteps.has(index) ? 'text-green-300 line-through' : 'text-gray-300'
                    }`}>
                      {step}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              <span>Important Considerations</span>
            </h4>
            
            <ul className="space-y-3">
              {selectedMigration.considerations.map((consideration, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{consideration}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h4 className="text-lg font-semibold text-white mb-4">Helpful Resources</h4>
            
            <div className="space-y-3">
              {selectedMigration.resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-gray-700/30 hover:bg-gray-700/50 rounded-lg transition-colors duration-200 group"
                >
                  <span className="text-sm text-white group-hover:text-blue-300">
                    {resource.title}
                  </span>
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-300" />
                </a>
              ))}
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
            <h4 className="text-blue-300 font-semibold mb-2">💡 Pro Tip</h4>
            <p className="text-gray-300 text-sm">
              Always create a backup branch before starting any migration. Test thoroughly in a development environment before applying changes to production.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MigrationGuide;