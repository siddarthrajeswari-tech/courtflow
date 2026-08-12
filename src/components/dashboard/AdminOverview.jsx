import React, { useState } from 'react'
import {
  Calendar,
  AlertTriangle,
  PieChart,
  FileText,
  TrendingUp,
  TrendingDown,
  Info,
  ChevronDown,
  Building,
  Users,
  Briefcase,
  CheckCircle,
  RefreshCw,
  Sliders,
  GitBranch,
  CalendarCheck,
  UserCheck,
  Search,
  Bell,
  BarChart3,
  Activity,
  ShieldCheck
} from 'lucide-react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import './AdminOverview.css'

const GEO_URL =
  'https://raw.githubusercontent.com/udit-001/india-maps-data/main/topojson/india.json'

const STATE_KEY = 'st_nm'

// State risk levels mapping
const stateRiskLevels = {
  'uttar pradesh': 82,   // Very High (> 75%)
  'bihar': 78,           // Very High (> 75%)
  'maharashtra': 68,     // High (50% - 75%)
  'west bengal': 64,     // High (50% - 75%)
  'rajasthan': 58,       // High (50% - 75%)
  'madhya pradesh': 42,  // Medium (25% - 50%)
  'karnataka': 38,       // Medium (25% - 50%)
  'gujarat': 35,         // Medium (25% - 50%)
  'tamil nadu': 22,      // Low (< 25%)
  'kerala': 18,          // Low (< 25%)
  'telangana': 28,       // Medium (25% - 50%)
  'andhra pradesh': 32,  // Medium (25% - 50%)
  'punjab': 45,          // Medium (25% - 50%)
  'haryana': 52,         // High (50% - 75%)
  'delhi': 76,           // Very High (> 75%)
  'odisha': 48,          // Medium (25% - 50%)
  'assam': 39,           // Medium (25% - 50%)
  'jharkhand': 61,       // High (50% - 75%)
  'chhattisgarh': 31,    // Medium (25% - 50%)
  'uttarakhand': 21,     // Low (< 25%)
  'himachal pradesh': 14,// Low (< 25%)
  'jammu and kashmir': 44,// Medium (25% - 50%)
  'ladakh': 12,          // Low (< 25%)
}

function getRiskColor(val) {
  if (!val) return '#22c55e'
  if (val > 75) return '#ef4444' // Very High Red
  if (val > 50) return '#f97316' // High Orange
  if (val > 25) return '#eab308' // Medium Yellow
  return '#22c55e'                // Low Green
}

function normalizeStateName(name) {
  if (!name) return ''
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9 ]/g, '')
    .trim()
}

export default function AdminOverview({ onModuleClick }) {
  const [dateFilter, setDateFilter] = useState('12 May 2025')
  const [riskFilter, setRiskFilter] = useState('Backlog Risk %')

  const stages = [
    { name: 'Filing', count: 820, color: '#8b5cf6', width: '38%' },
    { name: 'Scrutiny', count: 1120, color: '#3b82f6', width: '52%' },
    { name: 'Notice', count: 1560, color: '#06b6d4', width: '72%' },
    { name: 'Evidence', count: 2140, color: '#ef4444', width: '100%', isMajor: true },
    { name: 'Arguments', count: 1780, color: '#f97316', width: '83%' },
    { name: 'Judgment', count: 1580, color: '#22c55e', width: '74%' },
  ]

  const modules = [
    {
      num: 1,
      name: 'Priority Configurator',
      desc: 'Configure dynamic priority scoring rules and weights.',
      colorClass: 'mod-green',
      icon: Sliders
    },
    {
      num: 2,
      name: 'Bottleneck Pipeline',
      desc: 'Analyze case flow and identify stage bottlenecks.',
      colorClass: 'mod-blue',
      icon: GitBranch
    },
    {
      num: 3,
      name: 'Scheduler Controls',
      desc: 'Manage hearing limits and overload thresholds.',
      colorClass: 'mod-purple',
      icon: CalendarCheck
    },
    {
      num: 4,
      name: 'Workload Intelligence',
      desc: 'Monitor court & judge workload and performance.',
      colorClass: 'mod-orange',
      icon: UserCheck
    },
    {
      num: 5,
      name: 'Delay Inspector',
      desc: 'Deep-dive delay analysis for any case (CNR).',
      colorClass: 'mod-red',
      icon: Search
    },
    {
      num: 6,
      name: 'Alert & SLA Engine',
      desc: 'Configure alerts, SLA rules and notifications.',
      colorClass: 'mod-yellow',
      icon: Bell
    },
    {
      num: 7,
      name: 'Pattern Benchmarks',
      desc: 'Compare cases with historical disposal benchmarks.',
      colorClass: 'mod-teal',
      icon: BarChart3
    },
    {
      num: 8,
      name: 'Backlog Simulator',
      desc: 'Simulate capacity scenarios and backlog projections.',
      colorClass: 'mod-navy',
      icon: Activity
    },
  ]

  return (
    <div className="admin-overview-container">
      {/* Top Header Controls Bar */}
      <div className="admin-top-bar">
        <div className="admin-header-title">
          <h1>Central Executive Overview</h1>
          <p>Real-time oversight and intelligence for judicial case management</p>
        </div>

        <div className="admin-top-controls">
          <div className="admin-date-picker">
            <Calendar size={16} />
            <span>{dateFilter}</span>
            <ChevronDown size={14} />
          </div>

          <div className="admin-user-pill">
            <ShieldCheck size={16} className="shield-icon" />
            <div className="admin-user-text">
              <strong>Admin</strong>
              <span>Central Executive</span>
            </div>
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      {/* Row 1: Top 4 KPI Cards */}
      <div className="admin-kpi-row">
        {/* KPI 1 */}
        <div className="admin-kpi-card">
          <div className="admin-kpi-icon-box purple-bg">
            <Calendar size={22} />
          </div>
          <div className="admin-kpi-body">
            <span className="admin-kpi-label">Total Backlog</span>
            <div className="admin-kpi-val-row">
              <span className="admin-kpi-val">10,000</span>
              <span className="admin-kpi-unit">Cases</span>
            </div>
            <span className="admin-kpi-delta purple-text">
              <TrendingUp size={13} /> ↑ 2.8% vs last month
            </span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="admin-kpi-card">
          <div className="admin-kpi-icon-box red-bg">
            <AlertTriangle size={22} />
          </div>
          <div className="admin-kpi-body">
            <span className="admin-kpi-label">High-Risk Cases</span>
            <div className="admin-kpi-val-row">
              <span className="admin-kpi-val">2,140</span>
              <span className="admin-kpi-unit">Cases</span>
            </div>
            <span className="admin-kpi-delta red-text">
              <TrendingUp size={13} /> ↑ 6.4% vs last month
            </span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="admin-kpi-card">
          <div className="admin-kpi-icon-box green-bg">
            <PieChart size={22} />
          </div>
          <div className="admin-kpi-body">
            <span className="admin-kpi-label">System Utilization</span>
            <div className="admin-kpi-val-row">
              <span className="admin-kpi-val">68%</span>
            </div>
            <span className="admin-kpi-subtext">Avg. Capacity Used</span>
            <span className="admin-kpi-delta green-text">
              <TrendingUp size={13} /> ↑ 4% vs last month
            </span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="admin-kpi-card">
          <div className="admin-kpi-icon-box orange-bg">
            <FileText size={22} />
          </div>
          <div className="admin-kpi-body">
            <span className="admin-kpi-label">Pending Defect Memos</span>
            <div className="admin-kpi-val-row">
              <span className="admin-kpi-val">320</span>
              <span className="admin-kpi-unit">Memos</span>
            </div>
            <span className="admin-kpi-delta orange-text">
              <TrendingDown size={13} /> ↓ 3.1% vs last month
            </span>
          </div>
        </div>
      </div>

      {/* Row 2: Analytics & Map (Macro Bottleneck & Risk Heatmap) */}
      <div className="admin-middle-row">
        {/* Left: Macro Bottleneck Bar Chart */}
        <div className="admin-card macro-bottleneck-card">
          <div className="admin-card-header">
            <h3>Macro Bottleneck – Cases per Stage <Info size={14} className="info-icon" /></h3>
          </div>

          <div className="bottleneck-chart-body">
            <div className="chart-header-row">
              <span>Stage</span>
              <span>Cases</span>
            </div>

            <div className="stage-bars-list">
              {stages.map((st) => (
                <div key={st.name} className={`stage-bar-item ${st.isMajor ? 'major-highlight' : ''}`}>
                  <div className="stage-name-col">
                    <span className="stage-dot" style={{ backgroundColor: st.color }} />
                    <span className="stage-name">{st.name}</span>
                  </div>

                  <div className="stage-bar-track">
                    <div
                      className="stage-bar-fill"
                      style={{ width: st.width, backgroundColor: st.color }}
                    />
                  </div>

                  <div className="stage-count">{st.count.toLocaleString()}</div>
                </div>
              ))}
            </div>

            <div className="bottleneck-alert-note">
              <span className="red-alert-dot" />
              <span>Evidence stage is the major bottleneck</span>
            </div>
          </div>
        </div>

        {/* Right: High-Level Risk Heatmap */}
        <div className="admin-card heatmap-card">
          <div className="admin-card-header">
            <h3>High-Level Risk Heatmap (Backlog by State) <Info size={14} className="info-icon" /></h3>
          </div>

          <div className="heatmap-body">
            <div className="map-canvas-col">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ scale: 850, center: [82.5, 22.0] }}
                width={500}
                height={550}
                style={{ width: '100%', height: 'auto', maxHeight: '240px' }}
              >
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const stateName = geo.properties[STATE_KEY]
                      const normName = normalizeStateName(stateName)
                      const riskVal = stateRiskLevels[normName] || 35
                      const fill = getRiskColor(riskVal)

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={fill}
                          stroke="#ffffff"
                          strokeWidth={0.6}
                          style={{
                            default: { outline: 'none' },
                            hover: { outline: 'none', opacity: 0.85, cursor: 'pointer', stroke: '#0f172a', strokeWidth: 1.2 },
                            pressed: { outline: 'none' },
                          }}
                        >
                          <title>{`${stateName}: ${riskVal}% Backlog Risk`}</title>
                        </Geography>
                      )
                    })
                  }
                </Geographies>
              </ComposableMap>

              {/* Bottom Right Select Filter */}
              <div className="map-filter-dropdown">
                <select
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                >
                  <option value="Backlog Risk %">Backlog Risk %</option>
                  <option value="Disposal Rate">Disposal Rate</option>
                  <option value="Judge Vacancy">Judge Vacancy</option>
                </select>
              </div>
            </div>

            {/* Risk Legend on Right */}
            <div className="heatmap-legend">
              <div className="legend-row">
                <span className="legend-box red-bg" />
                <span>Very High (&gt; 75%)</span>
              </div>
              <div className="legend-row">
                <span className="legend-box orange-bg" />
                <span>High (50% – 75%)</span>
              </div>
              <div className="legend-row">
                <span className="legend-box yellow-bg" />
                <span>Medium (25% – 50%)</span>
              </div>
              <div className="legend-row">
                <span className="legend-box green-bg" />
                <span>Low (&lt; 25%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Quick Launch – 8 Intelligence Modules Grid */}
      <div className="admin-modules-section">
        <div className="section-title">Quick Launch – 8 Intelligence Modules</div>

        <div className="modules-grid">
          {modules.map((m) => {
            const Icon = m.icon
            return (
              <div
                key={m.num}
                className={`module-card ${m.colorClass}`}
                onClick={() => onModuleClick && onModuleClick(m)}
              >
                <div className="module-card-top">
                  <div className="module-num-badge">{m.num}</div>
                  <div className="module-info-col">
                    <span className="module-title">{m.name}</span>
                    <p className="module-desc">{m.desc}</p>
                  </div>
                  <span className="arrow-icon">&rsaquo;</span>
                </div>
                <div className="module-icon-footer">
                  <Icon size={18} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Row 4: Bottom Quick Metrics Bar */}
      <div className="admin-footer-metrics-bar">
        <div className="metric-item">
          <Building size={16} className="m-icon" />
          <div className="m-text">
            <span>Total Courts</span>
            <strong>1,245</strong>
          </div>
        </div>

        <div className="metric-item">
          <Users size={16} className="m-icon" />
          <div className="m-text">
            <span>Total Judges</span>
            <strong>2,350</strong>
          </div>
        </div>

        <div className="metric-item">
          <Briefcase size={16} className="m-icon" />
          <div className="m-text">
            <span>Active Cases</span>
            <strong>78,500</strong>
          </div>
        </div>

        <div className="metric-item">
          <Calendar size={16} className="m-icon" />
          <div className="m-text">
            <span>Cases Disposed (This Year)</span>
            <strong>18,450</strong>
          </div>
        </div>

        <div className="metric-last-updated">
          <RefreshCw size={13} />
          <span>Last Updated: 10:30 AM</span>
        </div>
      </div>
    </div>
  )
}
