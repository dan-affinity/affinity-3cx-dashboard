import type { QueueMetric } from '../types'
import { formatDuration } from '../utils'

export function QueueStats({ queues }: { queues: QueueMetric[] }) {
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Service levels</p>
          <h2>Queue Performance</h2>
        </div>
      </div>

      <div className="queue-grid">
        {queues.map(queue => (
          <article className="queue-card" key={queue.id}>
            <div className="queue-card-top">
              <div>
                <strong>{queue.queue}</strong>
                <span>{queue.waiting} waiting</span>
              </div>
              <span className={`sla-badge ${queue.slaPercent < 85 ? 'bad' : 'good'}`}>{queue.slaPercent}% SLA</span>
            </div>
            <div className="progress-track">
              <div className="progress-bar" style={{ width: `${Math.min(queue.slaPercent, 100)}%` }} />
            </div>
            <dl className="queue-metrics">
              <div><dt>Avg wait</dt><dd>{formatDuration(queue.avgWaitSeconds)}</dd></div>
              <div><dt>Longest</dt><dd>{formatDuration(queue.longestWaitSeconds)}</dd></div>
              <div><dt>Answered</dt><dd>{queue.answered}</dd></div>
              <div><dt>Abandoned</dt><dd>{queue.abandoned}</dd></div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}
