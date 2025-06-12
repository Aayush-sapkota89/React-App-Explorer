import React, { useState } from 'react';
import { Settings, Copy, Check, FileText } from 'lucide-react';

interface ConfigFile {
  name: string;
  description: string;
  content: string;
  language: string;
  hidden?: boolean;
}

const configFiles: ConfigFile[] = [
  {
    name: 'package.json',
    description: 'Project metadata, dependencies, and scripts configuration',
    language: 'json',
    content: `{
  "name": "my-react-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^13.3.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}`
  },
  {
    name: 'public/index.html',
    description: 'Main HTML template where React app mounts',
    language: 'html',
    content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>`
  },
  {
    name: '.env (hidden)',
    description: 'Environment variables for different environments',
    language: 'bash',
    hidden: true,
    content: `# Environment variables for Create React App
# Variables must start with REACT_APP_

REACT_APP_API_URL=https://api.example.com
REACT_APP_VERSION=$npm_package_version
REACT_APP_TITLE=My Amazing App

# Development only variables
GENERATE_SOURCEMAP=true
BROWSER=chrome
PORT=3000

# Build configuration
BUILD_PATH=build
PUBLIC_URL=/my-app`
  },
  {
    name: '.gitignore',
    description: 'Files and directories to ignore in version control',
    language: 'text',
    content: `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*`
  }
];

const ConfigurationFiles: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<ConfigFile>(configFiles[0]);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const copyToClipboard = async (content: string, fileName: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedStates(prev => ({ ...prev, [fileName]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [fileName]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center space-x-2 mb-6">
            <Settings className="h-5 w-5 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Configuration Files</h2>
          </div>
          
          <div className="space-y-2">
            {configFiles.map((file) => (
              <button
                key={file.name}
                onClick={() => setSelectedFile(file)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                  selectedFile.name === file.name
                    ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300'
                    : 'bg-gray-700/30 hover:bg-gray-700/50 text-gray-300 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span className="font-medium">{file.name}</span>
                  {file.hidden && (
                    <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                  {file.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <div>
              <h3 className="text-lg font-semibold text-white">{selectedFile.name}</h3>
              <p className="text-sm text-gray-400 mt-1">{selectedFile.description}</p>
            </div>
            <button
              onClick={() => copyToClipboard(selectedFile.content, selectedFile.name)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
            >
              {copiedStates[selectedFile.name] ? (
                <>
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-green-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          
          <div className="relative">
            <pre className="p-6 text-sm text-gray-300 bg-gray-900/50 overflow-x-auto custom-scrollbar">
              <code>{selectedFile.content}</code>
            </pre>
          </div>
        </div>

        {/* File-specific explanations */}
        <div className="mt-6 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h4 className="text-white font-semibold mb-4">Key Points</h4>
          
          {selectedFile.name === 'package.json' && (
            <div className="space-y-3">
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h5 className="text-blue-300 font-medium">Scripts Section</h5>
                <p className="text-gray-300 text-sm mt-1">
                  Defines commands you can run with <code className="bg-gray-700 px-1 rounded">npm run</code>
                </p>
              </div>
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h5 className="text-green-300 font-medium">Dependencies</h5>
                <p className="text-gray-300 text-sm mt-1">
                  Runtime packages your app needs to function in production
                </p>
              </div>
              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <h5 className="text-purple-300 font-medium">Browserslist</h5>
                <p className="text-gray-300 text-sm mt-1">
                  Defines which browsers your app should support for CSS and JS compilation
                </p>
              </div>
            </div>
          )}

          {selectedFile.name === 'public/index.html' && (
            <div className="space-y-3">
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <h5 className="text-yellow-300 font-medium">%PUBLIC_URL% Variables</h5>
                <p className="text-gray-300 text-sm mt-1">
                  Replaced with the public folder path during build. Use for referencing static assets.
                </p>
              </div>
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <h5 className="text-red-300 font-medium">Root Element</h5>
                <p className="text-gray-300 text-sm mt-1">
                  The <code className="bg-gray-700 px-1 rounded">&lt;div id="root"&gt;</code> is where your React app mounts
                </p>
              </div>
            </div>
          )}

          {selectedFile.name === '.env (hidden)' && (
            <div className="space-y-3">
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h5 className="text-green-300 font-medium">REACT_APP_ Prefix</h5>
                <p className="text-gray-300 text-sm mt-1">
                  Only variables starting with REACT_APP_ are available in your React code
                </p>
              </div>
              <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <h5 className="text-orange-300 font-medium">Environment Files</h5>
                <p className="text-gray-300 text-sm mt-1">
                  Create .env.local, .env.development, .env.production for different environments
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfigurationFiles;