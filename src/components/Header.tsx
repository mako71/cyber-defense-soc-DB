import React from 'react';
import { Bell, User, AlertTriangle, Clock } from 'lucide-react';

interface HeaderProps {
  activeView: string;
}

const viewTitles: { [key: string]: string } = {
  'executive': 'Executive Dashboard',
  'threats': 'Threat Intelligence & Analysis',
  'assets': 'Asset Monitoring & Control',
  'supply-chain': 'Supply Chain Security',
  'team': 'SOC Team Management',
  'settings': 'System Configuration'
};

export const Header: React.FC<HeaderProps> = ({ activeView }) => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            {viewTitles[activeView] || 'Dashboard'}
          </h2>
          <div className="flex items-center space-x-4 mt-1">
            <span className="text-gray-400 text-sm flex items-center">
              <Clock className="mr-1" size={14} />
              Last Update: {new Date().toLocaleTimeString()} UTC
            </span>
            <span className="text-green-400 text-sm">● Systems Operational</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Active Alerts */}
          <div className="relative">
            <button className="flex items-center space-x-2 bg-red-600 px-3 py-1 rounded-full text-white text-sm hover:bg-red-700 transition-colors">
              <AlertTriangle size={16} />
              <span>2 Critical</span>
            </button>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                5
              </span>
            </button>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <div className="text-white text-sm font-medium">SOC Analyst</div>
              <div className="text-gray-400 text-xs">Alpha Team Lead</div>
            </div>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
              <User size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};