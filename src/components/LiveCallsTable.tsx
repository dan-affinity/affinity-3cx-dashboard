import type { LiveCall } from '../types'
import { formatDuration } from '../utils'

export function LiveCallsTable({ calls }: { calls: LiveCall[] }) {
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Real-time activity</p>
          <h2>Live Calls</h2>
        </div>
        <span className="live-pill"><span className="live-dot" /> Live</span>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Direction</th>
              <th>Caller</th>
              <th>Queue</th>
              <th>Agent</th>
              <th>Status</th>
              <th className="align-right">Duration</th>
            </tr>
          </thead>
          <tbody>
            {calls.map(call => (
              <tr key={call.id}>
                <td><span className={`direction direction-${call.direction.toLowerCase()}`}>{call.direction}</span></td>
                <td className="strong-cell">{call.caller}</td>
                <td>{call.queue}</td>
                <td>{call.agent}</td>
                <td><span className={`status-text ${call.status === 'Waiting' ? 'warn' : ''}`}>{call.status}</span></td>
                <td className="align-right mono">{formatDuration(call.durationSeconds)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
