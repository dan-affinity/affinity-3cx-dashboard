import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { HourlyVolume } from '../types'

export function CallVolumeChart({ data }: { data: HourlyVolume[] }) {
  return (
    <section className="panel chart-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Today</p>
          <h2>Hourly Call Volume</h2>
        </div>
      </div>

      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid vertical={false} stroke="rgba(148, 163, 184, 0.10)" />
            <XAxis dataKey="hour" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: '#0f1b2b', border: '1px solid #203044', borderRadius: 12 }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Legend wrapperStyle={{ color: '#cbd5e1', fontSize: 12 }} />
            <Bar dataKey="answered" name="Answered" fill="#4cc9f0" radius={[4,4,0,0]} />
            <Bar dataKey="missed" name="Missed" fill="#f59e0b" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
