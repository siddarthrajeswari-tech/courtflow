import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function RiskDonutChart() {
  const [courtFilter, setCourtFilter] = useState('all')

  // Donut Ring Gauge SVG Math
  const radius = 54
  const strokeWidth = 14
  const circumference = 2 * Math.PI * radius
  const percentage = 82
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="dash-widget-card" style={{ height: '100%' }}>
      <div className="widget-header">
        <div className="widget-title-group">
          <h3>Pendency-Risk Prediction</h3>
        </div>
        <select
          className="widget-filter-select"
          value={courtFilter}
          onChange={(e) => setCourtFilter(e.target.value)}
        >
          <option value="all">All Courts</option>
          <option value="district">District Courts</option>
          <option value="high">High Courts</option>
          <option value="taluka">Taluka Courts</option>
        </select>
      </div>

      <div className="donut-widget-body">
        {/* Donut Chart Ring */}
        <div className="donut-chart-wrapper">
          <svg width="140" height="140" viewBox="0 0 140 140">
            {/* Background Ring Track */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke="#fee2e2"
              strokeWidth={strokeWidth}
            />
            {/* Red Donut Ring Fill */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke="#ef4444"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 70 70)"
              style={{ transition: 'stroke-dashoffset 0.6s ease' }}
            />
          </svg>

          {/* Donut Center Text */}
          <div className="donut-center-label">
            <span className="donut-center-val">82%</span>
            <span className="donut-center-sub">High Risk</span>
          </div>
        </div>

        {/* Risk Breakdown List */}
        <div className="risk-breakdown-list">
          <div className="risk-breakdown-item">
            <div className="risk-item-label">
              <span className="legend-dot" style={{ background: '#b91c1c' }} />
              <span>Critical Risk</span>
            </div>
            <span className="risk-item-val">84</span>
          </div>

          <div className="risk-breakdown-item">
            <div className="risk-item-label">
              <span className="legend-dot" style={{ background: '#ef4444' }} />
              <span>High Risk</span>
            </div>
            <span className="risk-item-val">312</span>
          </div>

          <div className="risk-breakdown-item">
            <div className="risk-item-label">
              <span className="legend-dot" style={{ background: '#f97316' }} />
              <span>Medium Risk</span>
            </div>
            <span className="risk-item-val">520</span>
          </div>

          <div className="risk-breakdown-item">
            <div className="risk-item-label">
              <span className="legend-dot" style={{ background: '#16a34a' }} />
              <span>Low Risk</span>
            </div>
            <span className="risk-item-val">960</span>
          </div>
        </div>
      </div>

      <div className="widget-footer-note">
        <span>Risk increased by 8% vs last month</span>
        <a href="#risk-analysis" className="widget-link-btn">
          View Risk Analysis <ArrowRight size={13} />
        </a>
      </div>
    </div>
  )
}
