import React, { useState } from 'react';
import { Package, AlertTriangle, Shield, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import { Card } from './ui/Card';
import { StatusBadge } from './ui/StatusBadge';

interface SupplyChainComponent {
  id: string;
  name: string;
  supplier: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  verification: 'VERIFIED' | 'PENDING' | 'FAILED';
  serialNumber: string;
  installDate: string;
  location: string;
  vulnerabilities: number;
  lastAudit: string;
}

const supplyChainComponents: SupplyChainComponent[] = [
  {
    id: 'sc-001',
    name: 'RF Amplifier Module',
    supplier: 'TechCorp Industries',
    riskLevel: 'CRITICAL',
    verification: 'FAILED',
    serialNumber: 'RF-2024-0847',
    installDate: '2024-01-15',
    location: 'HF Radio Array Alpha',
    vulnerabilities: 3,
    lastAudit: '2024-01-10'
  },
  {
    id: 'sc-002',
    name: 'Satellite Modem Chipset',
    supplier: 'Secure Communications Ltd',
    riskLevel: 'HIGH',
    verification: 'PENDING',
    serialNumber: 'SAT-2024-1205',
    installDate: '2024-01-20',
    location: 'SATCOM Terminal 1',
    vulnerabilities: 1,
    lastAudit: '2024-01-18'
  },
  {
    id: 'sc-003',
    name: 'Network Security Module',
    supplier: 'CyberDefense Systems',
    riskLevel: 'MEDIUM',
    verification: 'VERIFIED',
    serialNumber: 'NSM-2024-3401',
    installDate: '2024-01-12',
    location: 'Network Operations Center',
    vulnerabilities: 0,
    lastAudit: '2024-01-22'
  },
  {
    id: 'sc-004',
    name: 'Flight Computer LRU',
    supplier: 'Aerospace Technologies',
    riskLevel: 'HIGH',
    verification: 'PENDING',
    serialNumber: 'FC-2024-7789',
    installDate: '2024-01-08',
    location: 'Aircraft Alpha-01',
    vulnerabilities: 2,
    lastAudit: '2024-01-05'
  }
];

export const SupplyChainMonitoring: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState(supplyChainComponents[0]);
  const [riskFilter, setRiskFilter] = useState<string>('ALL');

  const filteredComponents = riskFilter === 'ALL' 
    ? supplyChainComponents 
    : supplyChainComponents.filter(comp => comp.riskLevel === riskFilter);

  const riskCounts = {
    CRITICAL: supplyChainComponents.filter(c => c.riskLevel === 'CRITICAL').length,
    HIGH: supplyChainComponents.filter(c => c.riskLevel === 'HIGH').length,
    MEDIUM: supplyChainComponents.filter(c => c.riskLevel === 'MEDIUM').length,
    LOW: supplyChainComponents.filter(c => c.riskLevel === 'LOW').length,
  };

  return (
    <div className="space-y-6">
      {/* Risk Level Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(riskCounts).map(([risk, count]) => (
          <Card key={risk} gradient>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">{count}</div>
              <div className="text-sm text-gray-400">{risk} RISK</div>
              <div className="mt-2">
                <StatusBadge status={risk} type="threat" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Supply Chain Intelligence Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card gradient>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Shield className="mr-2 text-green-400" size={20} />
            Verification Status
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Verified Components</span>
              <span className="text-green-400 font-semibold">156</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Pending Verification</span>
              <span className="text-yellow-400 font-semibold">23</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Failed Verification</span>
              <span className="text-red-400 font-semibold">4</span>
            </div>
          </div>
        </Card>

        <Card gradient>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <TrendingUp className="mr-2 text-blue-400" size={20} />
            Risk Trends
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">New Vulnerabilities</span>
              <span className="text-red-400 font-semibold">↑ 12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Mitigated Threats</span>
              <span className="text-green-400 font-semibold">↓ 8</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Supplier Audits</span>
              <span className="text-blue-400 font-semibold">→ 15</span>
            </div>
          </div>
        </Card>

        <Card gradient>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Package className="mr-2 text-purple-400" size={20} />
            Component Health
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-400 text-sm">Overall Trust Score</span>
                <span className="text-white text-sm">74%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '74%' }}></div>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              23 components require immediate attention
            </div>
          </div>
        </Card>
      </div>

      {/* Risk Filter */}
      <Card>
        <div className="flex flex-wrap gap-2">
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((risk) => (
            <button
              key={risk}
              onClick={() => setRiskFilter(risk)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                riskFilter === risk
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {risk}
            </button>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Component List */}
        <Card gradient className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Package className="mr-2 text-purple-400" size={20} />
            Components ({filteredComponents.length})
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredComponents.map((component) => (
              <div
                key={component.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedComponent.id === component.id
                    ? 'bg-blue-600 bg-opacity-50 border border-blue-500'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
                onClick={() => setSelectedComponent(component)}
              >
                <div className="flex items-center justify-between mb-2">
                  <StatusBadge status={component.riskLevel} type="threat" />
                  <div className="flex items-center space-x-1">
                    {component.verification === 'VERIFIED' && <CheckCircle className="text-green-400" size={16} />}
                    {component.verification === 'FAILED' && <XCircle className="text-red-400" size={16} />}
                    {component.verification === 'PENDING' && <AlertTriangle className="text-yellow-400" size={16} />}
                  </div>
                </div>
                <h4 className="text-white font-medium text-sm mb-1">{component.name}</h4>
                <p className="text-gray-400 text-xs">{component.supplier}</p>
                <p className="text-gray-400 text-xs">{component.location}</p>
                {component.vulnerabilities > 0 && (
                  <p className="text-red-400 text-xs mt-1">{component.vulnerabilities} vulnerabilities</p>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Component Details */}
        <Card gradient className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Package className="mr-2 text-purple-400" size={20} />
              {selectedComponent.name}
            </h3>
            <div className="flex items-center space-x-2">
              <StatusBadge status={selectedComponent.riskLevel} type="threat" />
              {selectedComponent.verification === 'VERIFIED' && <CheckCircle className="text-green-400" size={20} />}
              {selectedComponent.verification === 'FAILED' && <XCircle className="text-red-400" size={20} />}
              {selectedComponent.verification === 'PENDING' && <AlertTriangle className="text-yellow-400" size={20} />}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-white font-medium mb-3">Component Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Component ID:</span>
                  <span className="text-white font-mono">{selectedComponent.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Serial Number:</span>
                  <span className="text-white font-mono">{selectedComponent.serialNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Supplier:</span>
                  <span className="text-white">{selectedComponent.supplier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Install Date:</span>
                  <span className="text-white">{selectedComponent.installDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Location:</span>
                  <span className="text-white">{selectedComponent.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Audit:</span>
                  <span className="text-white">{selectedComponent.lastAudit}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-3">Risk Assessment</h4>
              <div className="space-y-3">
                <div className="bg-gray-700 p-3 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Verification Status</span>
                    <span className={`text-sm font-medium ${
                      selectedComponent.verification === 'VERIFIED' ? 'text-green-400' :
                      selectedComponent.verification === 'FAILED' ? 'text-red-400' :
                      'text-yellow-400'
                    }`}>
                      {selectedComponent.verification}
                    </span>
                  </div>
                  {selectedComponent.verification === 'FAILED' && (
                    <p className="text-red-400 text-xs">Component failed authenticity verification</p>
                  )}
                  {selectedComponent.verification === 'PENDING' && (
                    <p className="text-yellow-400 text-xs">Awaiting supplier verification response</p>
                  )}
                </div>

                <div className="bg-gray-700 p-3 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Active Vulnerabilities</span>
                    <span className={`text-sm font-medium ${
                      selectedComponent.vulnerabilities === 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {selectedComponent.vulnerabilities}
                    </span>
                  </div>
                  {selectedComponent.vulnerabilities > 0 && (
                    <p className="text-red-400 text-xs">Critical security issues identified</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Threat Intelligence */}
          {selectedComponent.riskLevel === 'CRITICAL' && (
            <div className="mb-6">
              <h4 className="text-white font-medium mb-3 flex items-center">
                <AlertTriangle className="mr-2 text-red-400" size={16} />
                Critical Security Findings
              </h4>
              <div className="space-y-2 text-sm">
                <div className="bg-red-900 bg-opacity-50 p-3 rounded border border-red-600">
                  <div className="flex items-center space-x-2 mb-1">
                    <XCircle className="text-red-400" size={16} />
                    <span className="text-red-400 font-medium">Hardware Tampering Detected</span>
                  </div>
                  <p className="text-gray-300">Component shows signs of unauthorized modification during manufacturing</p>
                </div>
                <div className="bg-red-900 bg-opacity-50 p-3 rounded border border-red-600">
                  <div className="flex items-center space-x-2 mb-1">
                    <XCircle className="text-red-400" size={16} />
                    <span className="text-red-400 font-medium">Supplier Risk Flag</span>
                  </div>
                  <p className="text-gray-300">Supplier flagged in recent intelligence reports for security concerns</p>
                </div>
              </div>
            </div>
          )}

          {/* Recommended Actions */}
          <div className="mb-6">
            <h4 className="text-white font-medium mb-3">Recommended Actions</h4>
            <div className="space-y-2">
              {selectedComponent.riskLevel === 'CRITICAL' && (
                <>
                  <div className="flex items-center space-x-2 text-red-400 text-sm">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Immediate isolation and replacement required</span>
                  </div>
                  <div className="flex items-center space-x-2 text-red-400 text-sm">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Conduct forensic analysis before disposal</span>
                  </div>
                </>
              )}
              {selectedComponent.verification === 'PENDING' && (
                <div className="flex items-center space-x-2 text-yellow-400 text-sm">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Escalate verification request to supplier</span>
                </div>
              )}
              <div className="flex items-center space-x-2 text-blue-400 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Schedule enhanced monitoring</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Request Verification
            </button>
            <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors">
              View Documentation
            </button>
            {selectedComponent.riskLevel === 'CRITICAL' && (
              <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                Initiate Replacement
              </button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};