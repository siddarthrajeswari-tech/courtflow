import React from 'react'
import { Info, ArrowRight } from 'lucide-react'

export default function BottlenecksWidget() {
  const bottlenecks = [
    { label: 'Evidence Stage', count: 284, color: '#ef4444', pct: 92 },
    { label: 'Witness Availability', count: 193, color: '#f97316', pct: 68 },
    { label: 'Document Deficiencies', count: 161, color: '#eab308', pct: 56 },
    { label: 'Repeated Adjournments', count: 142, color: '#16a34a', pct: 48 },
    { label: 'Administrative Processing', count: 98, color: '#2563eb', pct: 32 },
  ]

  return (
    <div className="dash-widget-card" style={{ height: '100%' }}>
      <div className="widget-header">
        <div className="widget-title-group">
          <h3>Top Bottlenecks</h3>
          <Info size={14} style={{ color: '#94a3b8', cursor: 'pointer' }} title="Key operational bottleneck areas causing delay" />
        </div>
      </div>

      <div className="bottlenecks-list" style={{ flex: 1 }}>
        {bottlenecks.map((item, idx) => (
          <div className="bottleneck-row" key={idx}>
            <div className="bottleneck-info-line">
              <span>{item.label}</span>
              <span className="bottleneck-count">{item.count}</span>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${item.pct}%`, backgroundColor: item.color }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="widget-footer-note" style={{ marginTop: '16px' }}>
        <span />
        <a href="#bottlenecks" className="widget-link-btn">
          View All Bottlenecks <ArrowRight size={13} />
        </a>
      </div>
    </div>
  )
}
