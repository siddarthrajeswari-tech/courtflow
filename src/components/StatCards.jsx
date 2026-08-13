import { Folder, Hourglass, CheckCircle2, FilePlus2, Clock, AlertTriangle, ArrowUp, ArrowDown } from 'lucide-react'
import { statCards } from '../data/mockData.js'

const iconMap = {
  folder: Folder,
  hourglass: Hourglass,
  check: CheckCircle2,
  filePlus: FilePlus2,
  clock: Clock,
  alert: AlertTriangle,
}

const toneMap = {
  folder: 'blue',
  hourglass: 'orange',
  check: 'green',
  filePlus: 'blue',
  clock: 'violet',
  alert: 'red',
}

export default function StatCards() {
  return (
    <section className="stats-grid">
      {statCards.map((card) => {
        const Icon = iconMap[card.icon]
        const tone = toneMap[card.icon]
        return (
          <div className="stat-card" key={card.label}>
            <div className={`stat-icon tone-${tone}`}>
              <Icon size={22} />
            </div>
            <div className="stat-body">
              <span className="stat-label">{card.label}</span>
              <span className="stat-value">
                {card.value}
                {card.suffix && <span className="stat-suffix"> {card.suffix}</span>}
              </span>
              {card.delta && (
                <span
                  className={`stat-delta ${
                    card.sentiment === 'negative'
                      ? 'red'
                      : card.sentiment === 'positive'
                      ? 'green'
                      : card.trend === 'up'
                      ? 'green'
                      : 'red'
                  }`}
                >
                  {card.trend === 'up' ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                  {card.delta} vs Apr 2025
                </span>
              )}
            </div>
          </div>
        )
      })}
    </section>
  )
}
