import React, { useState } from 'react';
import { Shield, AlertTriangle, Server, Radio, Satellite, TrendingUp, Clock, Users, CheckCircle, XCircle, Eye, Zap } from 'lucide-react';
import { MetricCard } from './ui/MetricCard';
import { Card } from './ui/Card';
import { StatusBadge } from './ui/StatusBadge';
import { systemMetrics, threatLevels, threats, assets } from '../data/mockData';

export const ExecutiveDashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [showRecommendations, setShowRecommendations] = useState(true);

  const criticalThreats = threats.filter(t => t.severity === 'CRITICAL').length;
  const highThreats = threats.filter(t => t.severity === 'HIGH').length;
  const operationalPercentage = Math.round((systemMetrics.operationalAssets / systemMetrics.totalAssets) * 100);
  const compromisedAssets = assets.filter(a => a.status === 'COMPROMISED').length;
  const offlineAssets = assets.filter(a => a.status === 'OFFLINE').length;

  // Calculate overall readiness score
  const readinessScore = Math.round(
    (operationalPercentage * 0.4) + 
    (Math.max(0, 100 - (criticalThreats * 20 + highThreats * 10)) * 0.3) +
    (Math.max(0, 100 - (systemMetrics.supplyChainRisk * 2)) * 0.3)
  );

  const getReadinessColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getInfoconLevel = () => {
    if (criticalThreats > 0 || readinessScore < 60) return { level: 1, color: 'bg-red-500', text: 'INFOCON 1 - CRITICAL' };
    if (highThreats > 2 || readinessScore < 75) return { level: 2, color: 'bg-orange-500', text: 'INFOCON 2 - HIGH' };
    if (highThreats > 0 || readinessScore < 90) return { level: 3, color: 'bg-yellow-500', text: 'INFOCON 3 - MEDIUM' };
    if (readinessScore < 95) return { level: 4, color: 'bg-blue-500', text: 'INFOCON 4 - LOW' };
    return { level: 5, color: 'bg-green-500', text: 'INFOCON 5 - NORMAL' };
  };

  const infocon = getInfoconLevel();

  return (
    <div className="space-y-6">
      {/* Command Header */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Mission Readiness Status</h1>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded-full ${infocon.color}`}></div>
                <span className="text-white font-semibold">{infocon.text}</span>
              </div>
              <div className="text-gray-400">
                <Clock size={16} className="inline mr-1" />
                Last Update: {new Date().toLocaleTimeString()} UTC
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-4xl font-bold ${getReadinessColor(readinessScore)} mb-1`}>
              {readinessScore}%
            </div>
            <div className="text-gray-400 text-sm">Overall Readiness</div>
          </div>
        </div>

        {/* Time Filter */}
        <div className="flex space-x-2">
          {['1h', '6h', '24h', '7d'].map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                selectedTimeframe === timeframe
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>

      {/* Critical Decision Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Mission Critical Assets"
          value={operationalPercentage}
          subtitle="% Operational"
          color={operationalPercentage >= 95 ? "green" : operationalPercentage >= 85 ? "yellow" : "red"}
          icon={<Shield size={32} />}
          trend={operationalPercentage >= 95 ? "stable" : "down"}
          trendValue={`${systemMetrics.totalAssets - systemMetrics.operationalAssets} degraded`}
        />
        <MetricCard
          title="Active Threats"
          value={criticalThreats + highThreats}
          subtitle={`${criticalThreats} Critical, ${highThreats} High`}
          color="red"
          icon={<AlertTriangle size={32} />}
          trend="up"
          trendValue="2 new in last hour"
        />
        <MetricCard
          title="Supply Chain Risk"
          value={systemMetrics.supplyChainRisk}
          subtitle="Components flagged"
          color={systemMetrics.supplyChainRisk <= 10 ? "green" : systemMetrics.supplyChainRisk <= 25 ? "yellow" : "red"}
          icon={<Server size={32} />}
          trend="down"
          trendValue="3 resolved today"
        />
        <MetricCard
          title="Response Teams"
          value={3}
          subtitle="Teams active"
          color="blue"
          icon={<Users size={32} />}
          trend="stable"
          trendValue="All teams ready"
        />
      </div>

      {/* Immediate Action Required */}
      {(criticalThreats > 0 || compromisedAssets > 0 || offlineAssets > 0) && (
        <Card gradient className="border-red-500 border-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-red-400 flex items-center">
              <Zap className="mr-2" size={24} />
              IMMEDIATE ACTION REQUIRED
            </h3>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold">
              ACKNOWLEDGE
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {criticalThreats > 0 && (
              <div className="bg-red-900 bg-opacity-50 p-4 rounded-lg">
                <div className="text-red-400 font-semibold mb-2">{criticalThreats} Critical Threats</div>
                <div className="text-white text-sm">Supply chain compromise detected</div>
                <button className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                  View Details
                </button>
              </div>
            )}
            {compromisedAssets > 0 && (
              <div className="bg-red-900 bg-opacity-50 p-4 rounded-lg">
                <div className="text-red-400 font-semibold mb-2">{compromisedAssets} Compromised Assets</div>
                <div className="text-white text-sm">SATCOM Terminal 1 breached</div>
                <button className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                  Isolate Now
                </button>
              </div>
            )}
            {offlineAssets > 0 && (
              <div className="bg-yellow-900 bg-opacity-50 p-4 rounded-lg">
                <div className="text-yellow-400 font-semibold mb-2">{offlineAssets} Assets Offline</div>
                <div className="text-white text-sm">Navigation LRU-A4 down</div>
                <button className="mt-2 px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700">
                  Investigate
                </button>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Decision Support Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat Landscape */}
        <Card gradient>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <AlertTriangle className="mr-2 text-red-400" size={20} />
              Threat Landscape
            </h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm">
              <Eye size={16} className="inline mr-1" />
              View All
            </button>
          </div>
          <div className="space-y-4">
            {threatLevels.map((level) => (
              <div key={level.level} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${level.color}`}></div>
                  <span className="text-gray-300 font-medium">{level.level}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-bold text-lg">{level.count}</span>
                  {level.level === 'CRITICAL' && level.count > 0 && (
                    <span className="text-red-400 text-xs">↑ +2</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Recommended Action:</span>
              <span className="text-yellow-400 font-semibold">Elevate to INFOCON 2</span>
            </div>
          </div>
        </Card>

        {/* Asset Status Overview */}
        <Card gradient>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Server className="mr-2 text-blue-400" size={20} />
              Asset Health
            </h3>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{systemMetrics.operationalAssets}</div>
              <div className="text-xs text-gray-400">of {systemMetrics.totalAssets} operational</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-green-400 flex items-center">
                <CheckCircle size={16} className="mr-2" />
                Operational
              </span>
              <span className="text-white font-semibold">{assets.filter(a => a.status === 'OPERATIONAL').length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-yellow-400 flex items-center">
                <AlertTriangle size={16} className="mr-2" />
                Degraded
              </span>
              <span className="text-white font-semibold">{assets.filter(a => a.status === 'DEGRADED').length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-red-400 flex items-center">
                <XCircle size={16} className="mr-2" />
                Compromised
              </span>
              <span className="text-white font-semibold">{compromisedAssets}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 flex items-center">
                <XCircle size={16} className="mr-2" />
                Offline
              </span>
              <span className="text-white font-semibold">{offlineAssets}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all duration-500" 
                style={{ width: `${operationalPercentage}%` }}
              ></div>
            </div>
            <div className="text-center text-white font-semibold mt-2">{operationalPercentage}% Mission Ready</div>
          </div>
        </Card>

        {/* Command Recommendations */}
        <Card gradient>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <TrendingUp className="mr-2 text-green-400" size={20} />
              Command Recommendations
            </h3>
            <button 
              onClick={() => setShowRecommendations(!showRecommendations)}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              {showRecommendations ? 'Hide' : 'Show'}
            </button>
          </div>
          
          {showRecommendations && (
            <div className="space-y-3">
              <div className="bg-red-900 bg-opacity-30 p-3 rounded-lg border border-red-600">
                <div className="text-red-400 font-semibold text-sm mb-1">HIGH PRIORITY</div>
                <div className="text-white text-sm">Isolate compromised SATCOM terminal immediately</div>
                <button className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700">
                  Execute
                </button>
              </div>
              
              <div className="bg-yellow-900 bg-opacity-30 p-3 rounded-lg border border-yellow-600">
                <div className="text-yellow-400 font-semibold text-sm mb-1">MEDIUM PRIORITY</div>
                <div className="text-white text-sm">Deploy backup communication systems</div>
                <button className="mt-2 px-3 py-1 bg-yellow-600 text-white rounded text-xs hover:bg-yellow-700">
                  Prepare
                </button>
              </div>
              
              <div className="bg-blue-900 bg-opacity-30 p-3 rounded-lg border border-blue-600">
                <div className="text-blue-400 font-semibold text-sm mb-1">STRATEGIC</div>
                <div className="text-white text-sm">Review supply chain verification protocols</div>
                <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">
                  Schedule
                </button>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Critical Assets Status */}
      <Card gradient>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Server className="mr-2 text-blue-400" size={20} />
            Mission Critical Assets Status
          </h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
              View All Assets
            </button>
            <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700">
              Generate Report
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm border-b border-gray-700">
                <th className="pb-3 font-semibold">Asset</th>
                <th className="pb-3 font-semibold">Type</th>
                <th className="pb-3 font-semibold">Location</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Criticality</th>
                <th className="pb-3 font-semibold">Last Update</th>
                <th className="pb-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="text-white text-sm">
              {assets.slice(0, 6).map((asset) => (
                <tr key={asset.id} className="border-t border-gray-700 hover:bg-gray-700 hover:bg-opacity-50">
                  <td className="py-3">
                    <div className="flex items-center space-x-2">
                      <div className="text-gray-400">
                        {asset.type === 'RF_RADIO' && <Radio size={16} />}
                        {asset.type === 'SATCOM' && <Satellite size={16} />}
                        {asset.type === 'SERVER' && <Server size={16} />}
                      </div>
                      <span className="font-medium">{asset.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-gray-300">{asset.type.replace('_', ' ')}</td>
                  <td className="py-3 text-gray-300">{asset.location}</td>
                  <td className="py-3">
                    <StatusBadge status={asset.status} type="asset" />
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      asset.criticality === 'MISSION_CRITICAL' ? 'bg-red-600 text-white' :
                      asset.criticality === 'HIGH' ? 'bg-orange-600 text-white' :
                      'bg-gray-600 text-white'
                    }`}>
                      {asset.criticality}
                    </span>
                  </td>
                  <td className="py-3 text-gray-300">{asset.lastUpdate}</td>
                  <td className="py-3">
                    <div className="flex space-x-1">
                      <button className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">
                        View
                      </button>
                      {asset.status === 'COMPROMISED' && (
                        <button className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700">
                          Isolate
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};