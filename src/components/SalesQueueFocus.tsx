import { CheckCircle2, Clock3, PhoneIncoming, PhoneMissed } from 'lucide-react'
import type { MissedCall, QueueMetric } from '../types'
import { formatCallTime, formatDuration } from '../utils'

interface Props {
  queue: QueueMetric
  calls: MissedCall[]
}

export function SalesQueueFocus({ queue, calls }: Props) {
  const orderedCalls = [...calls].sort(
    (first, second) => new Date(second.missedAt).getTime() - new Date(first.missedAt).getTime(),
  )

  return (
    <section className="sales-focus" aria-labelledby="sales-focus-title">
      <div className="sales-focus-summary">
        <div className="sales-focus-heading">
          <div className="priority-icon"><PhoneMissed size={22} /></div>
          <div>
            <p className="eyebrow">Priority queue - Today</p>
            <h2 id="sales-focus-title">SALES Missed Calls</h2>
            <p>Calls that reached Sales but ended before an agent answered.</p>
          </div>
        </div>

        <div className="sales-focus-metrics">
          <div className="sales-metric critical-metric">
            <span>Missed today</span>
            <strong>{queue.missedToday}</strong>
          </div>
          <div className="sales-metric warning-metric">
            <span>Average wait</span>
            <strong>{formatDuration(queue.avgWaitSeconds)}</strong>
          </div>
          <div className="sales-metric">
            <span>Answered</span>
            <strong>{queue.answered}</strong>
          </div>
          <div className="sales-metric">
            <span>SLA</span>
            <strong>{queue.slaPercent}%</strong>
          </div>
        </div>
      </div>

      <div className="sales-calls">
        <div className="sales-calls-heading">
          <div>
            <span className="list-label">Recent callers</span>
            <strong>{orderedCalls.length} recent missed calls</strong>
          </div>
          <span className="count-pill">Today</span>
        </div>

        <div className="sales-call-list">
          {orderedCalls.length === 0 && (
            <div className="sales-empty-state">
              <CheckCircle2 size={20} />
              <div><strong>No missed Sales calls today</strong><span>All incoming calls have been answered.</span></div>
            </div>
          )}
          {orderedCalls.map(call => (
            <article className="sales-call" key={call.id}>
              <div className="sales-call-icon" aria-hidden="true"><PhoneIncoming size={16} /></div>
              <div className="sales-caller">
                <strong>{call.caller}</strong>
                <span><Clock3 size={12} /> Missed at {formatCallTime(call.missedAt)}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
