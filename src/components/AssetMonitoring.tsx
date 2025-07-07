import React, { useState } from 'react';
import { Server, Radio, Satellite, HardDrive, Wifi, Plane } from 'lucide-react';
import { Card } from './ui/Card';
import { StatusBadge } from './ui/StatusBadge';
import { assets } from '../data/mockData';

const getAssetIcon = (type: string) => {
  switch (type) {
    case 'RF_RADIO': return <Radio size={20} />;
    case 'SATCOM': return <Satellite size={20} />;
    case 'SERVER': return <Server size={20} />;
    case 'NETWORK': return <Wifi size={20} />;
    case 'VIRTUAL_ENV': return <HardDrive size={20} />;
    case 'LRU': return <HardDrive size={20} />;
    case 'AIRCRAFT': return <Plane size={20} />;
    default: return <Server size={20} />;
  }
};

export const AssetMonitoring: React.FC = () => {
  const [selectedAssetType, setSelectedAssetType] = useState<string>('ALL');
  const [selectedAsset, setSelectedAsset] = useState(assets[0]);

  const assetTypes = ['ALL', 'RF_RADIO', 'SATCOM', 'SERVER', 'NETWORK', 'VIRTUAL_ENV', 'LRU', 'AIRCRAFT'];
  
  const filteredAssets = selectedAssetType === 'ALL' 
    ? assets 
    : assets.filter(asset => asset.type === selectedAssetType);

  const assetStatusCounts = {
    OPERATIONAL: assets.filter(a => a.status === 'OPERATIONAL').length,
    DEGRADED: assets.filter(a => a.status === 'DEGRADED').length,
    OFFLINE: assets.filter(a => a.status === 'OFFLINE').length,
    COMPROMISED: assets.filter(a => a.status === 'COMPROMISED').length,
  };

  return (
    <div className="space-y-6">
      {/* Asset Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(assetStatusCounts).map(([status, count]) => (
          <Card key={status} gradient>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">{count}</div>
              <div className="text-sm text-gray-400">{status}</div>
              <div className="mt-2">
                <StatusBadge status={status} type="asset" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Asset Type Filter */}
      <Card>
        <div className="flex flex-wrap gap-2">
          {assetTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedAssetType(type)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedAssetType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {type.replace('_', ' ')}
            </button>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Asset List */}
        <Card gradient className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Server className="mr-2 text-blue-400" size={20} />
            Assets ({filteredAssets.length})
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedAsset.id === asset.id
                    ? 'bg-blue-600 bg-opacity-50 border border-blue-500'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
                onClick={() => setSelectedAsset(asset)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="text-gray-400">
                      {getAssetIcon(asset.type)}
                    </div>
                    <StatusBadge status={asset.status} type="asset" />
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    asset.criticality === 'MISSION_CRITICAL' ? 'bg-red-600 text-white' :
                    asset.criticality === 'HIGH' ? 'bg-orange-600 text-white' :
                    'bg-gray-600 text-white'
                  }`}>
                    {asset.criticality}
                  </span>
                </div>
                <h4 className="text-white font-medium text-sm mb-1">{asset.name}</h4>
                <p className="text-gray-400 text-xs">{asset.location}</p>
                <p className="text-gray-400 text-xs">Updated {asset.lastUpdate}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Asset Details */}
        <Card gradient className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              {getAssetIcon(selectedAsset.type)}
              <span className="ml-2">{selectedAsset.name}</span>
            </h3>
            <StatusBadge status={selectedAsset.status} type="asset" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-white font-medium mb-3">Asset Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Asset ID:</span>
                  <span className="text-white font-mono">{selectedAsset.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Type:</span>
                  <span className="text-white">{selectedAsset.type.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Location:</span>
                  <span className="text-white">{selectedAsset.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Criticality:</span>
                  <span className={`${
                    selectedAsset.criticality === 'MISSION_CRITICAL' ? 'text-red-400' :
                    selectedAsset.criticality === 'HIGH' ? 'text-orange-400' :
                    'text-gray-400'
                  }`}>
                    {selectedAsset.criticality}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Update:</span>
                  <span className="text-white">{selectedAsset.lastUpdate}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-3">Health Metrics</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-sm">Performance</span>
                    <span className="text-white text-sm">87%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-sm">Security Score</span>
                    <span className="text-white text-sm">
                      {selectedAsset.status === 'COMPROMISED' ? '23%' : '94%'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${selectedAsset.status === 'COMPROMISED' ? 'bg-red-500' : 'bg-green-500'}`}
                      style={{ width: selectedAsset.status === 'COMPROMISED' ? '23%' : '94%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-sm">Connectivity</span>
                    <span className="text-white text-sm">
                      {selectedAsset.status === 'OFFLINE' ? '0%' : '100%'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${selectedAsset.status === 'OFFLINE' ? 'bg-gray-500' : 'bg-green-500'}`}
                      style={{ width: selectedAsset.status === 'OFFLINE' ? '0%' : '100%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mb-6">
            <h4 className="text-white font-medium mb-3">Recent Activity</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-3 p-2 bg-gray-700 rounded">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-400">14:45 UTC</span>
                <span className="text-white">Performance metrics updated</span>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-gray-700 rounded">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-400">13:30 UTC</span>
                <span className="text-white">Configuration change detected</span>
              </div>
              {selectedAsset.status === 'COMPROMISED' && (
                <div className="flex items-center space-x-3 p-2 bg-red-900 bg-opacity-50 rounded">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-400">12:15 UTC</span>
                  <span className="text-red-400">Security compromise detected</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              View Logs
            </button>
            <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors">
              Run Diagnostics
            </button>
            {selectedAsset.status === 'COMPROMISED' && (
              <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                Isolate Asset
              </button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};