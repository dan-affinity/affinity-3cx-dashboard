import type { Agent } from '../types'
import { formatDuration } from '../utils'

export function AgentGrid({ agents }: { agents: Agent[] }) {
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Team presence</p>
          <h2>Agent Status</h2>
        </div>
      </div>

      <div className="agent-grid">
        {agents.map(agent => (
          <article className="agent-card" key={agent.id}>
            <div className="avatar">{agent.name.slice(0, 1)}</div>
            <div className="agent-info">
              <strong>{agent.name}</strong>
              <span>{agent.queue} · Ext {agent.extension}</span>
            </div>
            <div className="agent-state">
              <span className={`agent-dot state-${agent.status.toLowerCase().replace(' ', '-')}`} />
              <span>{agent.status}</span>
              {agent.currentCallSeconds !== undefined && <span className="mono">{formatDuration(agent.currentCallSeconds)}</span>}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
