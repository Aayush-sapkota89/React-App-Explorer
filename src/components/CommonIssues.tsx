import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Lightbulb, Search } from 'lucide-react';

interface Issue {
  id: string;
  title: string;
  description: string;
  category: 'build' | 'development' | 'deployment' | 'dependencies' | 'performance';
  severity: 'low' | 'medium' | 'high';
  solution: string;
  codeExample?: string;
  preventionTips?: string[];
}

const issues: Issue[] = [
  {
    id: 'npm-start-error',
    title: 'npm start fails with port already in use',
    description: 'Error: Something is already running on port 3000',
    category: 'development',
    severity: 'medium',
    solution: 'Kill the process using port 3000 or start on a different port',
    codeExample: `# Find process using port 3000
lsof -ti:3000

# Kill the process
kill -9 $(lsof -ti:3000)

# Or start on different port
PORT=3001 npm start`,
    preventionTips: [
      'Always stop dev server before closing terminal',
      'Use process managers like PM2 for production',
      'Check running processes before starting new ones'
    ]
  },
  {
    id: 'build-fails',
    title: 'Build fails with out of memory error',
    description: 'JavaScript heap out of memory during build process',
    category: 'build',
    severity: 'high',
    solution: 'Increase Node.js memory limit or optimize your bundle size',
    codeExample: `# Increase memory limit
node --max_old_space_size=4096 node_modules/.bin/react-scripts build

# Or set environment variable
export NODE_OPTIONS="--max_old_space_size=4096"
npm run build`,
    preventionTips: [
      'Analyze bundle size regularly',
      'Use code splitting and lazy loading',
      'Remove unused dependencies',
      'Optimize images and assets'
    ]
  },
  {
    id: 'module-not-found',
    title: 'Module not found errors',
    description: 'Cannot resolve module or dependency not found',
    category: 'dependencies',
    severity: 'medium',
    solution: 'Install missing dependencies or fix import paths',
    codeExample: `# Install missing dependency
npm install <package-name>

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for typos in import paths
import Component from './Component'; // Correct
import Component from './component'; // Wrong case`,
    preventionTips: [
      'Use absolute imports with jsconfig.json',
      'Keep dependencies up to date',
      'Use TypeScript for better import validation',
      'Check package.json for missing dependencies'
    ]
  },
  {
    id: 'white-screen',
    title: 'White screen of death in production',
    description: 'App works in development but shows blank page in production',
    category: 'deployment',
    severity: 'high',
    solution: 'Check console errors and ensure correct build configuration',
    codeExample: `// Check for console errors in browser
// Common causes:

// 1. Incorrect homepage in package.json
{
  "homepage": "https://myusername.github.io/my-app"
}

// 2. Missing PUBLIC_URL environment variable
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />

// 3. Runtime errors not caught in development
try {
  // Your code here
} catch (error) {
  console.error('Runtime error:', error);
}`,
    preventionTips: [
      'Test production build locally with npm run build && npx serve -s build',
      'Check browser console for errors',
      'Verify all environment variables are set',
      'Use error boundaries to catch runtime errors'
    ]
  },
  {
    id: 'slow-reload',
    title: 'Slow hot reload in development',
    description: 'Development server takes too long to reload changes',
    category: 'performance',
    severity: 'low',
    solution: 'Optimize file watching and reduce bundle size',
    codeExample: `// In src/index.js, disable source maps for faster builds
// (for debugging only)
process.env.GENERATE_SOURCEMAP = 'false';

// Exclude large directories from watching
// Create .env file:
CHOKIDAR_USEPOLLING=false
FAST_REFRESH=true

// Optimize imports
import { Button } from '@material-ui/core'; // Slower
import Button from '@material-ui/core/Button'; // Faster`,
    preventionTips: [
      'Use tree shaking friendly imports',
      'Minimize the number of dependencies',
      'Use React.memo for expensive components',
      'Split large components into smaller ones'
    ]
  },
  {
    id: 'proxy-errors',
    title: 'API proxy configuration issues',
    description: 'CORS errors or proxy not working in development',
    category: 'development',
    severity: 'medium',
    solution: 'Configure proxy in package.json or use setupProxy.js',
    codeExample: `// Method 1: Simple proxy in package.json
{
  "name": "my-app",
  "proxy": "http://localhost:3001"
}

// Method 2: Advanced proxy with setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
    })
  );
};`,
    preventionTips: [
      'Use relative URLs for API calls in development',
      'Configure CORS properly on your backend',
      'Test proxy configuration with different routes',
      'Use environment variables for different API endpoints'
    ]
  }
];

const CommonIssues: React.FC = () => {
  const [selectedIssue, setSelectedIssue] = useState<Issue>(issues[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'build', 'development', 'deployment', 'dependencies', 'performance'];

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || issue.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getSeverityColor = (severity: Issue['severity']) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/10 border-green-500/20';
    }
  };

  const getSeverityIcon = (severity: Issue['severity']) => {
    switch (severity) {
      case 'high': return XCircle;
      case 'medium': return AlertTriangle;
      case 'low': return CheckCircle;
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <div className="flex items-center space-x-2 mb-6">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
          <h2 className="text-xl font-semibold text-white">Common Issues & Solutions</h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Issues ({filteredIssues.length})</h3>
            
            <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
              {filteredIssues.map((issue) => {
                const SeverityIcon = getSeverityIcon(issue.severity);
                return (
                  <button
                    key={issue.id}
                    onClick={() => setSelectedIssue(issue)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      selectedIssue.id === issue.id
                        ? 'bg-blue-500/20 border border-blue-500/30'
                        : 'bg-gray-700/30 hover:bg-gray-700/50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-start space-x-2 mb-2">
                      <SeverityIcon className="h-4 w-4 mt-1 text-current" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-white text-sm line-clamp-2">
                          {issue.title}
                        </h4>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                          {issue.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded border ${getSeverityColor(issue.severity)}`}>
                        {issue.severity}
                      </span>
                      <span className="text-xs text-gray-500 capitalize">
                        {issue.category}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-start space-x-3 mb-4">
              {React.createElement(getSeverityIcon(selectedIssue.severity), {
                className: "h-6 w-6 mt-1 text-current " + getSeverityColor(selectedIssue.severity).split(' ')[0]
              })}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white">{selectedIssue.title}</h3>
                <p className="text-gray-400 mt-1">{selectedIssue.description}</p>
                <div className="flex items-center space-x-3 mt-2">
                  <span className={`text-xs px-2 py-1 rounded border ${getSeverityColor(selectedIssue.severity)}`}>
                    {selectedIssue.severity} severity
                  </span>
                  <span className="text-xs text-gray-500 capitalize">
                    {selectedIssue.category}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <h4 className="text-green-300 font-medium mb-2 flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Solution</span>
              </h4>
              <p className="text-gray-300 text-sm">{selectedIssue.solution}</p>
            </div>
          </div>

          {selectedIssue.codeExample && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h4 className="text-white font-medium mb-4">Code Example</h4>
              <div className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300">
                  <code>{selectedIssue.codeExample}</code>
                </pre>
              </div>
            </div>
          )}

          {selectedIssue.preventionTips && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h4 className="text-white font-medium mb-4 flex items-center space-x-2">
                <Lightbulb className="h-4 w-4 text-yellow-400" />
                <span>Prevention Tips</span>
              </h4>
              <ul className="space-y-2">
                {selectedIssue.preventionTips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommonIssues;