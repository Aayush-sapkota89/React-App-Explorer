import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ProjectStructure from './components/ProjectStructure';
import ConfigurationFiles from './components/ConfigurationFiles';
import CommonIssues from './components/CommonIssues';
import ScriptsBreakdown from './components/ScriptsBreakdown';
import MigrationGuide from './components/MigrationGuide';

type ActiveSection = 'structure' | 'config' | 'scripts' | 'issues' | 'migration';

function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('structure');

  const renderSection = () => {
    switch (activeSection) {
      case 'structure':
        return <ProjectStructure />;
      case 'config':
        return <ConfigurationFiles />;
      case 'scripts':
        return <ScriptsBreakdown />;
      case 'issues':
        return <CommonIssues />;
      case 'migration':
        return <MigrationGuide />;
      default:
        return <ProjectStructure />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="mt-8">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}

export default App;