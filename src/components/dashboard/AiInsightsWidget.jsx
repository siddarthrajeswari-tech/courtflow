import React from 'react'
import { Hourglass, Gavel, TrendingUp, ArrowRight } from 'lucide-react'

export default function AiInsightsWidget() {
  const insights = [
    {
      icon: Hourglass,
      iconTone: 'insight-icon-amber',
      text: 'Criminal cases in evidence stage are delayed by 23% more than average',
      linkText: 'View Analysis',
      linkHref: '#analysis',
    },
    {
      icon: Gavel,
      iconTone: 'insight-icon-purple',
      text: 'High adjournments expected in Family Courts next week',
      linkText: 'View Forecast',
      linkHref: '#forecast',
    },
    {
      icon: TrendingUp,
      iconTone: 'insight-icon-green',
      text: 'Court utilization likely to cross 95% in November',
      linkText: 'View Prediction',
      linkHref: '#prediction',
    },
  ]

  return (
    <div className="dash-widget-card" style={{ height: '100%' }}>
      <div className="widget-header">
        <div className="widget-title-group">
          <h3>AI Insights</h3>
          <span className="badge-pill badge-orange">New</span>
        </div>
      </div>

      <div className="ai-insights-list" style={{ flex: 1 }}>
        {insights.map((item, idx) => {
          const Icon = item.icon
          return (
            <div className="ai-insight-card" key={idx}>
              <div className={`ai-insight-icon ${item.iconTone}`}>
                <Icon size={18} />
              </div>
              <div className="ai-insight-content">
                <div className="ai-insight-text">{item.text}</div>
                <a href={item.linkHref} className="widget-link-btn" style={{ fontSize: '11.5px', marginTop: '2px' }}>
                  {item.linkText} <ArrowRight size={12} />
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
