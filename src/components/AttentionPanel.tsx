import { AlertTriangle, CircleAlert } from 'lucide-react'
import type { AttentionItem } from '../types'

export function AttentionPanel({ items }: { items: AttentionItem[] }) {
  return (
    <section className="panel attention-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Operational focus</p>
          <h2>Attention Required</h2>
        </div>
        <span className="count-pill">{items.length} active</span>
      </div>

      <div className="attention-list">
        {items.map(item => {
          const Icon = item.severity === 'critical' ? CircleAlert : AlertTriangle
          return (
            <div className={`attention-item ${item.severity}`} key={item.id}>
              <Icon size={20} />
              <div>
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
