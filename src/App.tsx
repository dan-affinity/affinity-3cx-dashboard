import { useEffect, useState } from 'react'
import { Activity, Clock3, Headphones, PhoneCall, PhoneMissed, RefreshCw, ShieldCheck } from 'lucide-react'
import { KpiCard } from './components/KpiCard'
import { AttentionPanel } from './components/AttentionPanel'
import { LiveCallsTable } from './components/LiveCallsTable'
import { QueueStats } from './components/QueueStats'
import { AgentGrid } from './components/AgentGrid'
import { CallVolumeChart } from './components/CallVolumeChart'
import { MissedCalls } from './components/MissedCalls'
import { SalesQueueFocus } from './components/SalesQueueFocus'
import { useThreeCxDashboard } from './hooks/useThreeCxDashboard'
import { relativeUpdated } from './utils'

export default function App() {
  const { data, loading, refreshing, error, refresh } = useThreeCxDashboard()
  const [, tick] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => tick(value => value + 1), 1000)
    return () => window.clearInterval(timer)
  }, [])

  if (loading && !data) {
    return <div className="state-page"><div className="spinner" /> Loading 3CX Command Centre…</div>
  }

  if (error && !data) {
    return (
      <div className="state-page">
        <strong>Unable to load dashboard</strong>
        <span>{error}</span>
        <button onClick={() => refresh()}>Retry</button>
      </div>
    )
  }

  if (!data) return null

  const kpis = data.kpis
  const priorityQueue = data.queues.find(queue => queue.isPriority)
  const priorityCalls = priorityQueue
    ? data.missedCalls.filter(call => call.queue === priorityQueue.queue)
    : []
  const otherMissedCalls = priorityQueue
    ? data.missedCalls.filter(call => call.queue !== priorityQueue.queue)
    : data.missedCalls
  const longestQueueWait = Math.max(0, ...data.queues.map(queue => queue.longestWaitSeconds))
  const availableAgentHint = `${kpis.availableAgents} of ${data.agents.length} agents ready`
  const slaDifference = kpis.slaPercent - kpis.slaTargetPercent
  const slaHint = slaDifference >= 0
    ? `${slaDifference} pts above ${kpis.slaTargetPercent}% target`
    : `${Math.abs(slaDifference)} pts below ${kpis.slaTargetPercent}% target`

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">A</div>
          <div>
            <strong>AffinityMSP</strong>
            <span>3CX Command Center</span>
          </div>
        </div>

        <div className="header-actions">
          <div className="updated">
            <Clock3 size={15} />
            <span>Updated {relativeUpdated(data.lastUpdated)}</span>
          </div>
          <button className="refresh-button" onClick={() => refresh(true)} disabled={refreshing}>
            <RefreshCw size={16} className={refreshing ? 'spin' : ''} />
            Refresh
          </button>
        </div>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">AffinityMSP · Managed Voice Operations</p>
          <h1>3CX Operations Dashboard</h1>
          <p>Real-time view of call activity, queue performance and agent availability.</p>
        </div>
        <div className="hero-status">
          <span className="live-dot" />
          <div>
            <strong>Monitoring active</strong>
            <span>Auto-refresh every 10 seconds</span>
          </div>
        </div>
      </section>

      <section className="kpi-grid">
        <KpiCard label="Active Calls" value={kpis.activeCalls} hint="Across all queues" icon={PhoneCall} />
        <KpiCard label="Waiting" value={kpis.waitingCalls} hint={`Longest wait ${Math.floor(longestQueueWait / 60)}m ${longestQueueWait % 60}s`} icon={Activity} tone={kpis.waitingCalls > 2 ? 'warning' : 'default'} />
        <KpiCard label="Available Agents" value={kpis.availableAgents} hint={availableAgentHint} icon={Headphones} tone="good" />
        <KpiCard label="Missed Today" value={kpis.missedToday} hint={`${priorityQueue?.missedToday ?? 0} from priority queue`} icon={PhoneMissed} tone={kpis.missedToday > 10 ? 'warning' : 'default'} />
        <KpiCard label="SLA" value={`${kpis.slaPercent}%`} hint={slaHint} icon={ShieldCheck} tone={kpis.slaPercent >= kpis.slaTargetPercent ? 'good' : 'critical'} />
      </section>

      {priorityQueue && <SalesQueueFocus queue={priorityQueue} calls={priorityCalls} />}

      <div className="content-grid">
        <div className="main-column">
          <AttentionPanel items={data.attention} />
          <LiveCallsTable calls={data.liveCalls} />
          <QueueStats queues={data.queues} />
          <CallVolumeChart data={data.hourlyVolume} />
        </div>
        <aside className="side-column">
          <AgentGrid agents={data.agents} />
          <MissedCalls calls={otherMissedCalls} />
        </aside>
      </div>
    </main>
  )
}
