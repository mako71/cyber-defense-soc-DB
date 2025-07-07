import React, { useState } from 'react';
import { Search, Filter, AlertTriangle, Clock, Users, Target } from 'lucide-react';
import { Card } from './ui/Card';
import { StatusBadge } from './ui/StatusBadge';
import { threats, playbooks } from '../data/mockData';

export const ThreatDashboard: React.FC = () => {
  const [selectedThreat, setSelectedThreat] = useState(threats[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredThreats = threats.filter(threat =>
    threat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    threat.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const recommendedPlaybook = playbooks.find(p => 
    p.threatType === selectedThreat.type && p.name === selectedThreat.playbook
  );

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search threats, indicators, or asset names..."
              className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
            <Filter className="mr-2" size={16} />
            Advanced Filters
          </button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat List */}
        <Card gradient className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <AlertTriangle className="mr-2 text-red-400" size={20} />
            Active Threats ({filteredThreats.length})
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredThreats.map((threat) => (
              <div
                key={threat.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedThreat.id === threat.id
                    ? 'bg-blue-600 bg-opacity-50 border border-blue-500'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
                onClick={() => setSelectedThreat(threat)}
              >
                <div className="flex items-center justify-between mb-2">
                  <StatusBadge status={threat.severity} type="threat" />
                  <span className="text-gray-400 text-xs">{threat.detectedAt}</span>
                </div>
                <h4 className="text-white font-medium text-sm mb-1">{threat.title}</h4>
                <p className="text-gray-400 text-xs">{threat.type.replace('_', ' ')}</p>
                <p className="text-gray-400 text-xs">{threat.affectedAssets.length} assets affected</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Threat Details */}
        <Card gradient className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Target className="mr-2 text-red-400" size={20} />
              Threat Analysis: {selectedThreat.title}
            </h3>
            <StatusBadge status={selectedThreat.status} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-white font-medium mb-2">Threat Intelligence</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Severity:</span>
                  <StatusBadge status={selectedThreat.severity} type="threat" />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Type:</span>
                  <span className="text-white">{selectedThreat.type.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Detection Time:</span>
                  <span className="text-white">{selectedThreat.detectedAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Affected Assets:</span>
                  <span className="text-white">{selectedThreat.affectedAssets.length}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-2">MITRE ATT&CK Mapping</h4>
              <div className="space-y-2 text-sm">
                <div className="bg-gray-700 p-2 rounded">
                  <span className="text-blue-400">T1195.002</span>
                  <p className="text-gray-300">Supply Chain Compromise</p>
                </div>
                <div className="bg-gray-700 p-2 rounded">
                  <span className="text-blue-400">T1078</span>
                  <p className="text-gray-300">Valid Accounts</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-6">
            <h4 className="text-white font-medium mb-3 flex items-center">
              <Clock className="mr-2" size={16} />
              Investigation Timeline
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-400 text-sm">14:23 UTC</span>
                <span className="text-white text-sm">Initial detection via supply chain monitoring</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-400 text-sm">14:25 UTC</span>
                <span className="text-white text-sm">Automated isolation of affected components</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-400 text-sm">14:30 UTC</span>
                <span className="text-white text-sm">Analyst assigned for investigation</span>
              </div>
            </div>
          </div>

          {/* Recommended Actions */}
          <div>
            <h4 className="text-white font-medium mb-3 flex items-center">
              <Users className="mr-2" size={16} />
              Recommended Response Playbook
            </h4>
            {recommendedPlaybook ? (
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <h5 className="text-white font-medium">{recommendedPlaybook.name}</h5>
                  <span className="text-gray-400 text-sm">Est. {recommendedPlaybook.estimatedTime}</span>
                </div>
                <div className="space-y-2">
                  {recommendedPlaybook.steps.map((step) => (
                    <div key={step.id} className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded ${step.completed ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                      <span className={`text-sm ${step.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
                        {step.title}
                      </span>
                      {step.assignee && (
                        <span className="text-xs text-blue-400">({step.assignee})</span>
                      )}
                    </div>
                  ))}
                </div>
                <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  Execute Playbook
                </button>
              </div>
            ) : (
              <div className="text-gray-400 text-sm">No specific playbook available. Contact SOC lead.</div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};