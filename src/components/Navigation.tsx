import React, { useState } from 'react';
import { Shield, Target, Radar, Package, Users, Settings } from 'lucide-react';
import { InfoconLegend } from './ui/InfoconLegend';

interface NavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const navigationItems = [
  { id: 'executive', label: 'Executive Dashboard', icon: Shield },
  { id: 'threats', label: 'Threat Intelligence', icon: Target },
  { id: 'assets', label: 'Asset Monitoring', icon: Radar },
  { id: 'supply-chain', label: 'Supply Chain', icon: Package },
  { id: 'team', label: 'SOC Team', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Navigation: React.FC<NavigationProps> = ({ activeView, onViewChange }) => {
  const [showInfoconLegend, setShowInfoconLegend] = useState(false);

  return (
    <>
      <nav className="bg-gray-900 border-r border-gray-700 w-64 min-h-screen p-4">
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <Shield className="text-blue-400" size={32} />
            <div>
              <h1 className="text-white text-lg font-bold">CyberDefense SOC</h1>
              <p className="text-gray-400 text-xs">Weapon Systems Protection</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeView === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700">
          <button
            onClick={() => setShowInfoconLegend(true)}
            className="w-full bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-xs">INFOCON Level</span>
              <span className="text-orange-400 text-xs font-bold">2</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1">
              <div className="bg-orange-500 h-1 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <p className="text-gray-400 text-xs mt-1">High Alert Status</p>
            <p className="text-blue-400 text-xs mt-1 opacity-75">Click for legend</p>
          </button>
        </div>
      </nav>

      <InfoconLegend 
        isOpen={showInfoconLegend} 
        onClose={() => setShowInfoconLegend(false)} 
      />
    </>
  );
};