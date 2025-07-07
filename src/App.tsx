import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Header } from './components/Header';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { ThreatDashboard } from './components/ThreatDashboard';
import { AssetMonitoring } from './components/AssetMonitoring';
import { SupplyChainMonitoring } from './components/SupplyChainMonitoring';

function App() {
  const [activeView, setActiveView] = useState('executive');

  const renderActiveView = () => {
    switch (activeView) {
      case 'executive':
        return <ExecutiveDashboard />;
      case 'threats':
        return <ThreatDashboard />;
      case 'assets':
        return <AssetMonitoring />;
      case 'supply-chain':
        return <SupplyChainMonitoring />;
      case 'team':
        return (
          <div className="text-white text-center py-20">
            <h2 className="text-2xl mb-4">SOC Team Management</h2>
            <p className="text-gray-400">Team management interface coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-white text-center py-20">
            <h2 className="text-2xl mb-4">System Configuration</h2>
            <p className="text-gray-400">Configuration interface coming soon...</p>
          </div>
        );
      default:
        return <ExecutiveDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <Navigation activeView={activeView} onViewChange={setActiveView} />
      <div className="flex-1">
        <Header activeView={activeView} />
        <main className="p-6">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
}

export default App;