import React from 'react';

interface StatusBadgeProps {
  status: string;
  type?: 'asset' | 'threat' | 'general';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = 'general' }) => {
  const getStatusColor = (status: string, type: string) => {
    if (type === 'asset') {
      switch (status) {
        case 'OPERATIONAL': return 'bg-green-500 text-white';
        case 'DEGRADED': return 'bg-yellow-500 text-black';
        case 'OFFLINE': return 'bg-gray-500 text-white';
        case 'COMPROMISED': return 'bg-red-500 text-white';
        default: return 'bg-gray-400 text-white';
      }
    } else if (type === 'threat') {
      switch (status) {
        case 'CRITICAL': return 'bg-red-500 text-white';
        case 'HIGH': return 'bg-orange-500 text-white';
        case 'MEDIUM': return 'bg-yellow-500 text-black';
        case 'LOW': return 'bg-green-500 text-white';
        default: return 'bg-gray-400 text-white';
      }
    }
    return 'bg-gray-400 text-white';
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(status, type)}`}>
      {status}
    </span>
  );
};