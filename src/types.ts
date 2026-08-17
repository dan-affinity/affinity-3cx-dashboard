export type AgentStatus = 'Available' | 'On Call' | 'Wrap-up' | 'Away' | 'Offline'
export type CallDirection = 'Inbound' | 'Outbound' | 'Queued'
export type AlertSeverity = 'warning' | 'critical'

export interface DashboardKpis {
  activeCalls: number
  waitingCalls: number
  availableAgents: number
  missedToday: number
  slaPercent: number
  slaTargetPercent: number
}

export interface AttentionItem {
  id: string
  severity: AlertSeverity
  title: string
  detail: string
}

export interface LiveCall {
  id: string
  direction: CallDirection
  caller: string
  queue: string
  agent: string
  status: string
  durationSeconds: number
}

export interface QueueMetric {
  id: string
  queue: string
  waiting: number
  avgWaitSeconds: number
  longestWaitSeconds: number
  answered: number
  abandoned: number
  missedToday: number
  slaPercent: number
  isPriority?: boolean
}

export interface Agent {
  id: string
  name: string
  extension: string
  status: AgentStatus
  queue: string
  currentCallSeconds?: number
}

export interface HourlyVolume {
  hour: string
  answered: number
  missed: number
}

export interface MissedCall {
  id: string
  caller: string
  queue: string
  missedAt: string
}

export interface DashboardData {
  kpis: DashboardKpis
  attention: AttentionItem[]
  liveCalls: LiveCall[]
  queues: QueueMetric[]
  agents: Agent[]
  hourlyVolume: HourlyVolume[]
  missedCalls: MissedCall[]
  lastUpdated: string
}
