import type { DashboardData } from '../types'

function todayMinutesAgo(minutesAgo: number) {
  const date = new Date()
  const currentMinute = date.getHours() * 60 + date.getMinutes()
  date.setHours(0, Math.max(1, currentMinute - minutesAgo), 0, 0)
  return date.toISOString()
}

const baseData: DashboardData = {
  kpis: {
    activeCalls: 7,
    waitingCalls: 3,
    availableAgents: 5,
    missedToday: 22,
    slaPercent: 87,
    slaTargetPercent: 85
  },
  attention: [
    {
      id: 'a1',
      severity: 'critical',
      title: 'Support queue has no available agents',
      detail: '2 callers are waiting. Longest wait is 6m 42s.'
    },
    {
      id: 'a2',
      severity: 'warning',
      title: 'SLA below target',
      detail: 'Support is at 71% against the 85% target.'
    },
    {
      id: 'a3',
      severity: 'warning',
      title: 'Missed calls trending high',
      detail: '22 missed calls today, including 7 in Sales.'
    }
  ],
  liveCalls: [
    { id: 'c1', direction: 'Inbound', caller: '03 9123 4478', queue: 'Support', agent: 'Michael', status: 'Connected', durationSeconds: 384 },
    { id: 'c2', direction: 'Queued', caller: '0412 778 219', queue: 'Support', agent: 'Unassigned', status: 'Waiting', durationSeconds: 402 },
    { id: 'c3', direction: 'Inbound', caller: '02 8011 3922', queue: 'Sales', agent: 'Sarah', status: 'Connected', durationSeconds: 128 },
    { id: 'c4', direction: 'Outbound', caller: '03 9988 1212', queue: 'Accounts', agent: 'Jenny', status: 'Connected', durationSeconds: 241 }
  ],
  queues: [
    { id: 'q1', queue: 'Support', waiting: 2, avgWaitSeconds: 198, longestWaitSeconds: 402, answered: 86, abandoned: 13, missedToday: 13, slaPercent: 71 },
    { id: 'q2', queue: 'Sales', waiting: 1, avgWaitSeconds: 74, longestWaitSeconds: 113, answered: 61, abandoned: 4, missedToday: 7, slaPercent: 91, isPriority: true },
    { id: 'q3', queue: 'Accounts', waiting: 0, avgWaitSeconds: 42, longestWaitSeconds: 88, answered: 38, abandoned: 2, missedToday: 2, slaPercent: 95 }
  ],
  agents: [
    { id: 'u1', name: 'Michael', extension: '201', status: 'On Call', queue: 'Support', currentCallSeconds: 384 },
    { id: 'u2', name: 'Sarah', extension: '204', status: 'On Call', queue: 'Sales', currentCallSeconds: 128 },
    { id: 'u3', name: 'Jenny', extension: '207', status: 'On Call', queue: 'Accounts', currentCallSeconds: 241 },
    { id: 'u4', name: 'Paul', extension: '210', status: 'Available', queue: 'Support' },
    { id: 'u5', name: 'Eric', extension: '214', status: 'Wrap-up', queue: 'Support' },
    { id: 'u6', name: 'Tarryn', extension: '218', status: 'Available', queue: 'Sales' },
    { id: 'u7', name: 'Adrian', extension: '220', status: 'Away', queue: 'Support' },
    { id: 'u8', name: 'Ken', extension: '224', status: 'Offline', queue: 'Support' }
  ],
  hourlyVolume: [
    { hour: '08:00', answered: 12, missed: 2 },
    { hour: '09:00', answered: 21, missed: 4 },
    { hour: '10:00', answered: 28, missed: 2 },
    { hour: '11:00', answered: 24, missed: 4 },
    { hour: '12:00', answered: 18, missed: 3 },
    { hour: '13:00', answered: 31, missed: 3 },
    { hour: '14:00', answered: 27, missed: 4 }
  ],
  missedCalls: [
    { id: 'm1', caller: '0412 889 103', queue: 'Support', missedAt: todayMinutesAgo(8) },
    { id: 'm2', caller: '03 9555 0188', queue: 'Sales', missedAt: todayMinutesAgo(14) },
    { id: 'm3', caller: '0401 661 834', queue: 'Support', missedAt: todayMinutesAgo(31) },
    { id: 'm4', caller: '02 8123 9021', queue: 'Accounts', missedAt: todayMinutesAgo(48) },
    { id: 'm5', caller: '0418 204 771', queue: 'Sales', missedAt: todayMinutesAgo(63) },
    { id: 'm6', caller: '07 3120 8842', queue: 'Sales', missedAt: todayMinutesAgo(91) },
    { id: 'm7', caller: '0433 719 052', queue: 'Sales', missedAt: todayMinutesAgo(126) },
    { id: 'm8', caller: '02 8199 3360', queue: 'Sales', missedAt: todayMinutesAgo(178) },
    { id: 'm9', caller: '0402 551 906', queue: 'Sales', missedAt: todayMinutesAgo(224) }
  ],
  lastUpdated: new Date().toISOString()
}

const clone = (): DashboardData => structuredClone(baseData)

export async function getDashboardData(): Promise<DashboardData> {
  await new Promise(resolve => setTimeout(resolve, 250))
  const data = clone()

  // Small realistic variation so refreshes feel live.
  const drift = Math.floor(Math.random() * 3) - 1
  data.kpis.activeCalls = Math.max(0, data.kpis.activeCalls + drift)
  data.kpis.waitingCalls = Math.max(0, data.kpis.waitingCalls + (Math.random() > 0.65 ? 1 : 0))
  data.lastUpdated = new Date().toISOString()
  return data
}
