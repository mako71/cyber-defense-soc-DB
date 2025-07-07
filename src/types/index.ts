export interface ThreatLevel {
  level: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  color: string;
  count: number;
}

export interface Asset {
  id: string;
  name: string;
  type: 'RF_RADIO' | 'SATCOM' | 'SERVER' | 'NETWORK' | 'VIRTUAL_ENV' | 'LRU' | 'AIRCRAFT';
  status: 'OPERATIONAL' | 'DEGRADED' | 'OFFLINE' | 'COMPROMISED';
  location: string;
  lastUpdate: string;
  criticality: 'MISSION_CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface Threat {
  id: string;
  title: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  type: 'SUPPLY_CHAIN' | 'MALWARE' | 'INTRUSION' | 'DATA_EXFILTRATION' | 'JAMMING' | 'SPOOFING';
  affectedAssets: string[];
  detectedAt: string;
  status: 'ACTIVE' | 'INVESTIGATING' | 'CONTAINED' | 'RESOLVED';
  playbook?: string;
}

export interface Playbook {
  id: string;
  name: string;
  threatType: string;
  severity: string;
  steps: PlaybookStep[];
  estimatedTime: string;
}

export interface PlaybookStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  assignee?: string;
}

export interface SystemMetrics {
  totalAssets: number;
  operationalAssets: number;
  activeThreats: number;
  incidentsToday: number;
  supplyChainRisk: number;
}