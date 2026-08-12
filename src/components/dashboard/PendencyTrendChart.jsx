import React, { useState } from 'react'

export default function PendencyTrendChart() {
  const [timeRange, setTimeRange] = useState('6m')
  const [hoverIndex, setHoverIndex] = useState(null)

  const data6m = [
    { month: "Mar '25", total: 19500, pending: 10800, disposed: 6200 },
    { month: "Apr '25", total: 21000, pending: 11500, disposed: 6700 },
    { month: "May '25", total: 22400, pending: 12100, disposed: 7200 },
    { month: "Jun '25", total: 23100, pending: 12800, disposed: 7600 },
    { month: "Jul '25", total: 23900, pending: 12700, disposed: 8000 },
    { month: "Aug '25", total: 24850, pending: 12420, disposed: 8320 },
  ]

  const width = 420
  const height = 180
  const paddingX = 40
  const paddingY = 20
  const graphW = width - paddingX * 2
  const graphH = height - paddingY * 2

  const maxVal = 30000
  const minVal = 0

  const getX = (i) => paddingX + (i / (data6m.length - 1)) * graphW
  const getY = (val) => height - paddingY - ((val - minVal) / (maxVal - minVal)) * graphH

  // Generate smooth SVG bezier path points
  const makePath = (key) => {
    return data6m.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d[key])}`).join(' ')
  }

  return (
    <div className="dash-widget-card" style={{ height: '100%' }}>
      <div className="widget-header">
        <div className="widget-title-group">
          <h3>Pendency Trend (All Courts)</h3>
        </div>
        <select
          className="widget-filter-select"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="6m">Last 6 Months</option>
          <option value="3m">Last 3 Months</option>
          <option value="1y">Last 1 Year</option>
        </select>
      </div>

      <div className="chart-legend-row">
        <div className="chart-legend-item">
          <span className="legend-dot" style={{ background: '#2563eb' }} />
          <span>Total Cases</span>
        </div>
        <div className="chart-legend-item">
          <span className="legend-dot" style={{ background: '#ef4444' }} />
          <span>Pending Cases</span>
        </div>
        <div className="chart-legend-item">
          <span className="legend-dot" style={{ background: '#16a34a' }} />
          <span>Disposed Cases</span>
        </div>
      </div>

      <div style={{ position: 'relative', width: '100%', flex: 1, minHeight: '180px' }}>
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          {/* Horizontal gridlines */}
          {[0, 10000, 20000, 30000].map((val) => {
            const y = getY(val)
            return (
              <g key={val}>
                <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
                <text x={paddingX - 8} y={y + 4} textAnchor="end" fontSize="9" fill="#94a3b8">
                  {val === 0 ? '0' : `${val / 1000}K`}
                </text>
              </g>
            )
          })}

          {/* Month X-axis labels */}
          {data6m.map((d, i) => (
            <text key={i} x={getX(i)} y={height - 2} textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="500">
              {d.month}
            </text>
          ))}

          {/* Trend Lines */}
          <path d={makePath('total')} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
          <path d={makePath('pending')} fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
          <path d={makePath('disposed')} fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />

          {/* Data point dots and hover listeners */}
          {data6m.map((d, i) => {
            const x = getX(i)
            const yTot = getY(d.total)
            const yPen = getY(d.pending)
            const yDis = getY(d.disposed)
            const isHover = hoverIndex === i

            return (
              <g key={i} onMouseEnter={() => setHoverIndex(i)} onMouseLeave={() => setHoverIndex(null)}>
                <circle cx={x} cy={yTot} r={isHover ? 5 : 3.5} fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx={x} cy={yPen} r={isHover ? 5 : 3.5} fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx={x} cy={yDis} r={isHover ? 5 : 3.5} fill="#16a34a" stroke="#ffffff" strokeWidth="1.5" />

                {isHover && (
                  <line x1={x} y1={paddingY} x2={x} y2={height - paddingY} stroke="#94a3b8" strokeDasharray="2 2" />
                )}
              </g>
            )
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoverIndex !== null && (
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: `${(hoverIndex / (data6m.length - 1)) * 75 + 10}%`,
              background: '#0f172a',
              color: '#ffffff',
              padding: '6px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              pointerEvents: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              zIndex: 10,
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: '2px' }}>{data6m[hoverIndex].month}</div>
            <div>Total: <strong style={{ color: '#60a5fa' }}>{data6m[hoverIndex].total.toLocaleString()}</strong></div>
            <div>Pending: <strong style={{ color: '#f87171' }}>{data6m[hoverIndex].pending.toLocaleString()}</strong></div>
            <div>Disposed: <strong style={{ color: '#4ade80' }}>{data6m[hoverIndex].disposed.toLocaleString()}</strong></div>
          </div>
        )}
      </div>
    </div>
  )
}
