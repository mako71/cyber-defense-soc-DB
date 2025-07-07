import React from 'react';
import { X, Shield, AlertTriangle, Eye, Activity, CheckCircle } from 'lucide-react';

interface InfoconLegendProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoconLegend: React.FC<InfoconLegendProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const infoconLevels = [
    {
      level: 1,
      name: 'CRITICAL',
      color: 'bg-red-500',
      textColor: 'text-red-400',
      icon: <AlertTriangle size={20} />,
      description: 'Immediate cyber threat requiring urgent action',
      triggers: [
        'Critical threats detected',
        'System readiness < 60%',
        'Active compromise in progress',
        'Mission-critical assets offline'
      ],
      actions: [
        'Implement emergency protocols',
        'Activate all response teams',
        'Consider mission abort/delay',
        'Isolate compromised systems'
      ]
    },
    {
      level: 2,
      name: 'HIGH',
      color: 'bg-orange-500',
      textColor: 'text-orange-400',
      icon: <Shield size={20} />,
      description: 'Elevated cyber threat posture requiring increased vigilance',
      triggers: [
        'Multiple high-severity threats',
        'System readiness < 75%',
        'Supply chain compromise detected',
        'Persistent threat activity'
      ],
      actions: [
        'Enhanced monitoring protocols',
        'Deploy additional analysts',
        'Restrict non-essential access',
        'Prepare backup systems'
      ]
    },
    {
      level: 3,
      name: 'MEDIUM',
      color: 'bg-yellow-500',
      textColor: 'text-yellow-400',
      icon: <Eye size={20} />,
      description: 'Moderate cyber threat level with enhanced monitoring',
      triggers: [
        'High-severity threats present',
        'System readiness < 90%',
        'Suspicious activity detected',
        'Vulnerability exploitation attempts'
      ],
      actions: [
        'Increase scan frequency',
        'Review security policies',
        'Validate asset integrity',
        'Brief command staff'
      ]
    },
    {
      level: 4,
      name: 'LOW',
      color: 'bg-blue-500',
      textColor: 'text-blue-400',
      icon: <Activity size={20} />,
      description: 'Low cyber threat level with standard security measures',
      triggers: [
        'Minor threats detected',
        'System readiness < 95%',
        'Routine security events',
        'Preventive maintenance required'
      ],
      actions: [
        'Standard monitoring',
        'Routine security updates',
        'Scheduled maintenance',
        'Training exercises'
      ]
    },
    {
      level: 5,
      name: 'NORMAL',
      color: 'bg-green-500',
      textColor: 'text-green-400',
      icon: <CheckCircle size={20} />,
      description: 'Normal operations with routine cyber security posture',
      triggers: [
        'No active threats',
        'System readiness ≥ 95%',
        'All systems operational',
        'Routine security posture'
      ],
      actions: [
        'Baseline monitoring',
        'Routine operations',
        'Preventive measures',
        'Standard protocols'
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <Shield className="text-blue-400" size={24} />
            <h2 className="text-xl font-bold text-white">INFOCON Level Reference</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <p className="text-gray-300 text-sm leading-relaxed">
              Information Operations Condition (INFOCON) levels indicate the current cyber threat posture 
              and required defensive measures for weapon system protection. Each level defines specific 
              triggers, monitoring requirements, and response actions.
            </p>
          </div>

          <div className="space-y-4">
            {infoconLevels.map((level) => (
              <div
                key={level.level}
                className="bg-gray-700 rounded-lg p-4 border border-gray-600"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full ${level.color} flex items-center justify-center text-white`}>
                      {level.icon}
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold ${level.textColor}`}>
                        INFOCON {level.level} - {level.name}
                      </h3>
                      <p className="text-gray-300 text-sm">{level.description}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="text-white font-semibold mb-2 text-sm">Activation Triggers:</h4>
                    <ul className="space-y-1">
                      {level.triggers.map((trigger, index) => (
                        <li key={index} className="text-gray-300 text-xs flex items-start">
                          <span className="text-gray-500 mr-2">•</span>
                          {trigger}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2 text-sm">Required Actions:</h4>
                    <ul className="space-y-1">
                      {level.actions.map((action, index) => (
                        <li key={index} className="text-gray-300 text-xs flex items-start">
                          <span className="text-gray-500 mr-2">•</span>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-700">
            <div className="bg-blue-900 bg-opacity-30 p-3 rounded-lg border border-blue-600">
              <div className="flex items-start space-x-2">
                <Shield className="text-blue-400 mt-0.5" size={16} />
                <div>
                  <h4 className="text-blue-400 font-semibold text-sm mb-1">Command Authority</h4>
                  <p className="text-gray-300 text-xs">
                    INFOCON levels are automatically calculated based on threat intelligence and system status. 
                    Manual override requires command authorization and documented justification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};