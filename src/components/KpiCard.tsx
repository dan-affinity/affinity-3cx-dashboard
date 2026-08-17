import type { LucideIcon } from 'lucide-react'

interface Props {
  label: string
  value: string | number
  hint: string
  icon: LucideIcon
  tone?: 'default' | 'warning' | 'critical' | 'good'
}

export function KpiCard({ label, value, hint, icon: Icon, tone = 'default' }: Props) {
  return (
    <article className={`kpi-card tone-${tone}`}>
      <div className="kpi-icon"><Icon size={18} /></div>
      <div>
        <p className="eyebrow">{label}</p>
        <strong className="kpi-value">{value}</strong>
        <p className="muted">{hint}</p>
      </div>
    </article>
  )
}
