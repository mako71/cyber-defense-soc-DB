import { Asset, Threat, ThreatLevel, Playbook, SystemMetrics } from '../types';

export const systemMetrics: SystemMetrics = {
  totalAssets: 847,
  operationalAssets: 823,
  activeThreats: 12,
  incidentsToday: 3,
  supplyChainRisk: 23
};

export const threatLevels: ThreatLevel[] = [
  { level: 'CRITICAL', color: 'bg-red-500', count: 2 },
  { level: 'HIGH', color: 'bg-orange-500', count: 4 },
  { level: 'MEDIUM', color: 'bg-yellow-500', count: 6 },
  { level: 'LOW', color: 'bg-green-500', count: 15 }
];

export const assets: Asset[] = [
  {
    id: 'rf-001',
    name: 'HF Radio Array Alpha',
    type: 'RF_RADIO',
    status: 'OPERATIONAL',
    location: 'Forward Operating Base Bravo',
    lastUpdate: '2 min ago',
    criticality: 'MISSION_CRITICAL'
  },
  {
    id: 'sat-001',
    name: 'SATCOM Terminal 1',
    type: 'SATCOM',
    status: 'COMPROMISED',
    location: 'Command Center',
    lastUpdate: '15 min ago',
    criticality: 'MISSION_CRITICAL'
  },
  {
    id: 'srv-001',
    name: 'Mission Planning Server',
    type: 'SERVER',
    status: 'DEGRADED',
    location: 'Data Center Alpha',
    lastUpdate: '5 min ago',
    criticality: 'HIGH'
  },
  {
    id: 'net-001',
    name: 'Tactical Network Switch',
    type: 'NETWORK',
    status: 'OPERATIONAL',
    location: 'Network Operations Center',
    lastUpdate: '1 min ago',
    criticality: 'HIGH'
  },
  {
    id: 'vm-001',
    name: 'Virtual Environment Cluster',
    type: 'VIRTUAL_ENV',
    status: 'OPERATIONAL',
    location: 'Cloud Infrastructure',
    lastUpdate: '3 min ago',
    criticality: 'MEDIUM'
  },
  {
    id: 'lru-001',
    name: 'Navigation LRU-A4',
    type: 'LRU',
    status: 'OFFLINE',
    location: 'Aircraft Alpha-01',
    lastUpdate: '30 min ago',
    criticality: 'HIGH'
  }
];

export const threats: Threat[] = [
  {
    id: 'thr-001',
    title: 'Supply Chain Compromise Detected',
    severity: 'CRITICAL',
    type: 'SUPPLY_CHAIN',
    affectedAssets: ['sat-001', 'lru-001'],
    detectedAt: '14:23 UTC',
    status: 'ACTIVE',
    playbook: 'Supply Chain Incident Response'
  },
  {
    id: 'thr-002',
    title: 'Anomalous RF Signatures',
    severity: 'HIGH',
    type: 'JAMMING',
    affectedAssets: ['rf-001'],
    detectedAt: '13:45 UTC',
    status: 'INVESTIGATING',
    playbook: 'RF Threat Response'
  },
  {
    id: 'thr-003',
    title: 'Unauthorized Network Access',
    severity: 'HIGH',
    type: 'INTRUSION',
    affectedAssets: ['srv-001', 'net-001'],
    detectedAt: '12:15 UTC',
    status: 'CONTAINED',
    playbook: 'Network Intrusion Response'
  }
];

export const playbooks: Playbook[] = [
  {
    id: 'pb-001',
    name: 'Supply Chain Incident Response',
    threatType: 'SUPPLY_CHAIN',
    severity: 'CRITICAL',
    estimatedTime: '45 minutes',
    steps: [
      {
        id: 'step-001',
        title: 'Isolate Affected Components',
        description: 'Immediately disconnect compromised hardware from all networks',
        completed: true
      },
      {
        id: 'step-002',
        title: 'Asset Inventory Verification',
        description: 'Cross-reference component serial numbers with trusted supplier database',
        completed: true
      },
      {
        id: 'step-003',
        title: 'Forensic Analysis',
        description: 'Perform deep component analysis for hardware modifications',
        completed: false,
        assignee: 'Analyst Team Alpha'
      }
    ]
  },
  {
    id: 'pb-002',
    name: 'RF Threat Response',
    threatType: 'JAMMING',
    severity: 'HIGH',
    estimatedTime: '30 minutes',
    steps: [
      {
        id: 'step-004',
        title: 'Signal Analysis',
        description: 'Analyze RF spectrum for interference patterns',
        completed: true
      },
      {
        id: 'step-005',
        title: 'Alternative Communications',
        description: 'Switch to backup communication channels',
        completed: false,
        assignee: 'Communications Team'
      }
    ]
  }
];