import React, { useState } from 'react';
import { Folder, File, ChevronDown, ChevronRight, Info, FolderTree } from 'lucide-react';

interface TreeNode {
  name: string;
  type: 'file' | 'folder';
  children?: TreeNode[];
  description?: string;
  important?: boolean;
}

const projectStructure: TreeNode = {
  name: 'my-react-app',
  type: 'folder',
  children: [
    {
      name: 'public',
      type: 'folder',
      description: 'Static assets served directly',
      children: [
        { name: 'index.html', type: 'file', description: 'Main HTML template', important: true },
        { name: 'favicon.ico', type: 'file', description: 'Website favicon' },
        { name: 'manifest.json', type: 'file', description: 'PWA manifest file' },
        { name: 'robots.txt', type: 'file', description: 'Search engine instructions' },
      ],
    },
    {
      name: 'src',
      type: 'folder',
      description: 'Main source code directory',
      important: true,
      children: [
        { name: 'App.js', type: 'file', description: 'Main application component', important: true },
        { name: 'App.css', type: 'file', description: 'App component styles' },
        { name: 'App.test.js', type: 'file', description: 'App component tests' },
        { name: 'index.js', type: 'file', description: 'Application entry point', important: true },
        { name: 'index.css', type: 'file', description: 'Global styles' },
        { name: 'logo.svg', type: 'file', description: 'React logo asset' },
        { name: 'reportWebVitals.js', type: 'file', description: 'Performance monitoring' },
        { name: 'setupTests.js', type: 'file', description: 'Test environment setup' },
      ],
    },
    { name: 'package.json', type: 'file', description: 'Project dependencies and scripts', important: true },
    { name: 'package-lock.json', type: 'file', description: 'Dependency lock file' },
    { name: 'README.md', type: 'file', description: 'Project documentation' },
    { name: '.gitignore', type: 'file', description: 'Git ignore rules' },
  ],
};

const ProjectStructure: React.FC = () => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['my-react-app', 'src', 'public']));
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

  const toggleNode = (path: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedNodes(newExpanded);
  };

  const renderNode = (node: TreeNode, path: string = '', depth: number = 0) => {
    const fullPath = path ? `${path}/${node.name}` : node.name;
    const isExpanded = expandedNodes.has(fullPath);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={fullPath} className="select-none">
        <div
          className={`flex items-center space-x-2 py-2 px-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-700/50 ${
            selectedNode?.name === node.name ? 'bg-blue-500/20 border border-blue-500/30' : ''
          } ${node.important ? 'ring-1 ring-yellow-500/30' : ''}`}
          style={{ marginLeft: `${depth * 20}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleNode(fullPath);
            }
            setSelectedNode(node);
          }}
        >
          {hasChildren && (
            <div className="text-gray-400">
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </div>
          )}
          {!hasChildren && <div className="w-4" />}
          
          {node.type === 'folder' ? (
            <Folder className={`h-4 w-4 ${isExpanded ? 'text-blue-400' : 'text-yellow-400'}`} />
          ) : (
            <File className="h-4 w-4 text-gray-400" />
          )}
          
          <span className={`text-sm ${node.important ? 'text-yellow-300 font-medium' : 'text-gray-300'}`}>
            {node.name}
          </span>
          
          {node.important && <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />}
        </div>

        {hasChildren && isExpanded && (
          <div className="mt-1">
            {node.children!.map(child => renderNode(child, fullPath, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <div className="flex items-center space-x-2 mb-6">
          <FolderTree className="h-5 w-5 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">Project Structure</h2>
        </div>
        
        <div className="space-y-1 max-h-96 overflow-y-auto custom-scrollbar">
          {renderNode(projectStructure)}
        </div>
        
        <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <div className="flex items-center space-x-2 text-yellow-300 mb-2">
            <Info className="h-4 w-4" />
            <span className="font-medium">Important Files</span>
          </div>
          <p className="text-sm text-gray-300">
            Files with yellow indicators are crucial for your app's functionality. Click on any item to see detailed information.
          </p>
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">File Details</h3>
        
        {selectedNode ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              {selectedNode.type === 'folder' ? (
                <Folder className="h-6 w-6 text-blue-400" />
              ) : (
                <File className="h-6 w-6 text-gray-400" />
              )}
              <div>
                <h4 className="text-white font-medium">{selectedNode.name}</h4>
                <span className="text-sm text-gray-400 capitalize">{selectedNode.type}</span>
              </div>
            </div>
            
            {selectedNode.description && (
              <div className="p-4 bg-gray-700/50 rounded-lg">
                <p className="text-gray-300">{selectedNode.description}</p>
              </div>
            )}
            
            {selectedNode.important && (
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-yellow-300 text-sm font-medium">⭐ Critical File</p>
                <p className="text-gray-300 text-sm mt-1">
                  This file is essential for your React application to function properly.
                </p>
              </div>
            )}

            {/* Specific file guidance */}
            {selectedNode.name === 'package.json' && (
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h5 className="text-blue-300 font-medium mb-2">Key Sections:</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• <code className="text-blue-300">dependencies</code> - Runtime packages</li>
                  <li>• <code className="text-blue-300">scripts</code> - Available commands</li>
                  <li>• <code className="text-blue-300">devDependencies</code> - Development tools</li>
                </ul>
              </div>
            )}
            
            {selectedNode.name === 'src' && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h5 className="text-green-300 font-medium mb-2">Best Practices:</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Organize components in separate folders</li>
                  <li>• Use meaningful file names</li>
                  <li>• Keep related files together</li>
                  <li>• Follow consistent naming conventions</li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <FolderTree className="h-12 w-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">Select a file or folder to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectStructure;