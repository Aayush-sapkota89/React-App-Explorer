import React, { useState } from 'react';
import { Play, Terminal, Info, Clock, Settings, TestTube } from 'lucide-react';

interface Script {
  name: string;
  command: string;
  description: string;
  icon: React.ElementType;
  purpose: string;
  commonOptions?: string[];
  examples?: string[];
}

const scripts: Script[] = [
  {
    name: 'start',
    command: 'react-scripts start',
    description: 'Starts the development server',
    icon: Play,
    purpose: 'Launch your app in development mode with hot reloading',
    commonOptions: [
      'PORT=3001 npm start - Run on different port',
      'BROWSER=none npm start - Don\'t open browser',
      'HTTPS=true npm start - Use HTTPS'
    ],
    examples: [
      'npm start',
      'yarn start',
      'PORT=8080 npm start'
    ]
  },
  {
    name: 'build',
    command: 'react-scripts build',
    description: 'Creates an optimized production build',
    icon: Settings,
    purpose: 'Bundle your app for production deployment',
    commonOptions: [
      'CI=true npm run build - Treat warnings as errors',
      'GENERATE_SOURCEMAP=false npm run build - Skip source maps',
      'BUILD_PATH=dist npm run build - Change output directory'
    ],
    examples: [
      'npm run build',
      'yarn build',
      'CI=true npm run build'
    ]
  },
  {
    name: 'test',
    command: 'react-scripts test',
    description: 'Runs the test suite in watch mode',
    icon: TestTube,
    purpose: 'Execute Jest tests with file watching',
    commonOptions: [
      'npm test -- --coverage - Show coverage report',
      'npm test -- --watchAll=false - Run once without watching',
      'npm test -- --verbose - Show individual test results'
    ],
    examples: [
      'npm test',
      'npm test -- --coverage',
      'npm test -- --watchAll=false'
    ]
  },
  {
    name: 'eject',
    command: 'react-scripts eject',
    description: 'Exposes all configuration files',
    icon: Terminal,
    purpose: 'Remove the build tool abstraction (irreversible)',
    commonOptions: [
      '⚠️ This is a one-way operation',
      'Creates config/ and scripts/ directories',
      'Copies all dependencies to package.json'
    ],
    examples: [
      'npm run eject',
      'yarn eject'
    ]
  }
];

const ScriptsBreakdown: React.FC = () => {
  const [selectedScript, setSelectedScript] = useState<Script>(scripts[0]);
  const [terminalOutput, setTerminalOutput] = useState<string>('');

  const simulateCommand = (script: Script) => {
    setTerminalOutput(`$ ${script.command}\n\nRunning ${script.name} script...\n`);
    
    setTimeout(() => {
      let output = `$ ${script.command}\n\n`;
      
      switch (script.name) {
        case 'start':
          output += `webpack compiled with 0 errors
Local:            http://localhost:3000
On Your Network:  http://192.168.1.100:3000

Note that the development build is not optimized.
To create a production build, use npm run build.`;
          break;
        case 'build':
          output += `Creating an optimized production build...
Compiled successfully.

File sizes after gzip:

  47.2 KB  build/static/js/main.8b7e3a4d.js
  1.78 KB  build/static/css/main.073c9b0a.css

The project was built assuming it is hosted at /.
You can control this with the homepage field in your package.json.`;
          break;
        case 'test':
          output += `PASS  src/App.test.js
  ✓ renders learn react link (23ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.234s
Ran all test suites related to changed files.

Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press q to quit watch mode.`;
          break;
        case 'eject':
          output += `NOTE: Create React App 2+ supports TypeScript, Sass, CSS Modules and more without ejecting: https://bit.ly/CRA-feature-requests

? Are you sure you want to eject? This action is permanent. Yes
Ejecting...

Copying files into my-react-app
  Adding /config/env.js to the project
  Adding /config/getHttpsConfig.js to the project
  Adding /config/modules.js to the project
  ...

Updating the dependencies
  Removing react-scripts from dependencies
  Adding @babel/core to dependencies
  Adding @pmmmwh/react-refresh-webpack-plugin to dependencies
  ...

Ejected successfully!`;
          break;
      }
      
      setTerminalOutput(output);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <div className="flex items-center space-x-2 mb-6">
          <Play className="h-5 w-5 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">Available Scripts</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {scripts.map((script) => {
            const Icon = script.icon;
            return (
              <button
                key={script.name}
                onClick={() => setSelectedScript(script)}
                className={`p-4 rounded-lg text-left transition-all duration-200 ${
                  selectedScript.name === script.name
                    ? 'bg-blue-500/20 border border-blue-500/30 transform scale-105'
                    : 'bg-gray-700/30 hover:bg-gray-700/50 border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Icon className="h-5 w-5 text-blue-400" />
                  <span className="font-medium text-white">{script.name}</span>
                </div>
                <p className="text-sm text-gray-400">{script.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-4">Script Details</h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <selectedScript.icon className="h-6 w-6 text-blue-400 mt-1" />
              <div>
                <h4 className="text-white font-medium">{selectedScript.name}</h4>
                <code className="text-sm text-gray-400 bg-gray-900/50 px-2 py-1 rounded">
                  {selectedScript.command}
                </code>
              </div>
            </div>
            
            <div className="p-4 bg-gray-700/30 rounded-lg">
              <h5 className="text-white font-medium mb-2 flex items-center space-x-2">
                <Info className="h-4 w-4" />
                <span>Purpose</span>
              </h5>
              <p className="text-gray-300 text-sm">{selectedScript.purpose}</p>
            </div>

            {selectedScript.commonOptions && (
              <div>
                <h5 className="text-white font-medium mb-3">Common Options</h5>
                <div className="space-y-2">
                  {selectedScript.commonOptions.map((option, index) => (
                    <div key={index} className="p-3 bg-gray-900/30 rounded-lg">
                      <code className="text-sm text-green-400">{option}</code>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedScript.examples && (
              <div>
                <h5 className="text-white font-medium mb-3">Examples</h5>
                <div className="space-y-2">
                  {selectedScript.examples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => simulateCommand(selectedScript)}
                      className="w-full p-3 bg-gray-900/50 hover:bg-gray-900/70 rounded-lg text-left transition-colors duration-200"
                    >
                      <code className="text-sm text-blue-300">{example}</code>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedScript.name === 'eject' && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center space-x-2 text-red-300 mb-2">
                  <Terminal className="h-4 w-4" />
                  <span className="font-medium">⚠️ Warning</span>
                </div>
                <p className="text-sm text-gray-300">
                  Ejecting is irreversible! Consider alternatives like CRACO or react-app-rewired for configuration changes.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="flex items-center space-x-2 p-4 border-b border-gray-700/50 bg-gray-800/50">
            <Terminal className="h-4 w-4 text-green-400" />
            <span className="text-white font-medium">Terminal Output</span>
            <div className="flex space-x-1 ml-auto">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
          
          <div className="p-4 h-80 overflow-y-auto">
            {terminalOutput ? (
              <pre className="text-sm text-green-400 whitespace-pre-wrap">
                {terminalOutput}
              </pre>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2" />
                  <p>Click on an example command to see output</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptsBreakdown;