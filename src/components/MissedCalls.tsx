import type { MissedCall } from '../types'
import { formatCallTime } from '../utils'

export function MissedCalls({ calls }: { calls: MissedCall[] }) {
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Call history</p>
          <h2>Recent Missed Calls</h2>
        </div>
      </div>

      <div className="missed-list">
        {calls.length === 0 && <p className="empty-state">No recent missed calls in other queues.</p>}
        {calls.map(call => (
          <div className="missed-row" key={call.id}>
            <div>
              <strong>{call.caller}</strong>
              <span>{call.queue}</span>
            </div>
            <time dateTime={call.missedAt}>{formatCallTime(call.missedAt)}</time>
          </div>
        ))}
      </div>
    </section>
  )
}
