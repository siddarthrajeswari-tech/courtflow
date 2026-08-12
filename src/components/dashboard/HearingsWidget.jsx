import React from 'react'
import { ArrowRight } from 'lucide-react'

export default function HearingsWidget() {
  const hearings = [
    { time: '09:30 AM', category: 'Civil Cases', count: 126 },
    { time: '11:00 AM', category: 'Criminal Cases', count: 98 },
    { time: '02:30 PM', category: 'Family Cases', count: 64 },
    { time: '04:00 PM', category: 'Appeals', count: 48 },
  ]

  return (
    <div className="dash-widget-card" style={{ height: '100%' }}>
      <div className="widget-header">
        <div className="widget-title-group">
          <h3>Today's Hearings</h3>
        </div>
        <a href="#calendar" className="widget-link-btn" style={{ fontSize: '12px' }}>
          View Calendar
        </a>
      </div>

      <div style={{ flex: 1 }}>
        <table className="hearings-table">
          <tbody>
            {hearings.map((h, i) => (
              <tr key={i}>
                <td className="time-cell">{h.time}</td>
                <td className="category-cell">{h.category}</td>
                <td className="count-cell">{h.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="widget-footer-note" style={{ marginTop: '16px' }}>
        <span />
        <a href="#cause-list" className="widget-link-btn">
          View Full Cause List <ArrowRight size={13} />
        </a>
      </div>
    </div>
  )
}
