import React, { useState } from 'react'
import {
  Folder,
  Calendar,
  FileCheck,
  Hourglass,
  Clock,
  Pin,
  PieChart,
  Flag,
  Bell,
  AlertTriangle,
  Info,
  TrendingUp,
  BarChart2,
  ChevronDown,
  Menu,
  User,
  LogOut,
  ChevronRight
} from 'lucide-react'
import './JudgeDashboard.css'

export default function JudgeDashboard({ user, onLogout }) {
  const [dateFilter, setDateFilter] = useState('12 May 2025')

  const todaysHearings = [
    { time: '10:30 AM', caseNo: 'C/2024/1234', title: 'State vs. Rajesh Kumar', stage: 'Evidence', category: 'Criminal' },
    { time: '11:30 AM', caseNo: 'C/2023/5678', title: 'ABC Pvt Ltd vs. DEF Corp', stage: 'Arguments', category: 'Civil' },
    { time: '12:30 PM', caseNo: 'C/2024/9101', title: 'Suresh vs. Suresh', stage: 'Evidence', category: 'Civil' },
    { time: '02:00 PM', caseNo: 'C/2024/1121', title: 'State vs. Mohan Singh', stage: 'Trial', category: 'Criminal' },
    { time: '03:30 PM', caseNo: 'C/2023/1314', title: 'XYZ Bank vs. PQR Ltd', stage: 'Arguments', category: 'Civil' },
  ]

  const highPriorityCases = [
    { caseNo: 'C/2022/0456', title: 'State vs. Arjun Singh', stage: 'Evidence', duration: '612 Days' },
    { caseNo: 'C/2023/0789', title: 'Ramesh vs. Suresh', stage: 'Evidence', duration: '489 Days' },
    { caseNo: 'C/2023/0999', title: 'ABC Pvt Ltd vs. DEF Corp', stage: 'Arguments', duration: '412 Days' },
  ]

  const alerts = [
    { type: 'warning', text: '12 cases are inactive for more than 90 days.', time: '2h ago' },
    { type: 'calendar', text: '5 hearings scheduled for tomorrow.', time: '3h ago' },
    { type: 'info', text: '22 orders are pending for approval.', time: '1d ago' },
    { type: 'alert', text: '3 cases crossed benchmark duration at current stage.', time: '1d ago' },
  ]

  return (
    <div className="judge-dashboard-container">
      {/* Header Bar */}
      <div className="judge-top-bar">
        <div className="judge-title-group">
          <h1>Judge Dashboard</h1>
          <p>Welcome, Judge ({user?.idNumber || 'JDG-1024'})</p>
        </div>

        <div className="judge-top-right">
          <div className="judge-date-btn">
            <Calendar size={15} />
            <span>{dateFilter}</span>
            <ChevronDown size={14} />
          </div>

          <div className="judge-notif-btn">
            <Bell size={17} />
            <span className="notif-badge-count">4</span>
          </div>

          <div className="judge-user-pill">
            <div className="judge-avatar">
              <User size={15} />
            </div>
            <span>Judge ({user?.idNumber || 'JDG-1024'})</span>
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      {/* Row 1: Top 4 KPI Cards */}
      <div className="judge-kpi-grid">
        {/* Card 1 */}
        <div className="judge-kpi-card">
          <div className="kpi-icon-box blue-bg">
            <Folder size={22} />
          </div>
          <div className="kpi-info">
            <span className="kpi-title">Assigned Cases</span>
            <span className="kpi-number">128</span>
            <span className="kpi-subtitle">Total Cases</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="judge-kpi-card">
          <div className="kpi-icon-box light-blue-bg">
            <Calendar size={22} />
          </div>
          <div className="kpi-info">
            <span className="kpi-title">Today's Hearings</span>
            <span className="kpi-number">14</span>
            <span className="kpi-subtitle">Scheduled Today</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="judge-kpi-card">
          <div className="kpi-icon-box navy-bg">
            <FileCheck size={22} />
          </div>
          <div className="kpi-info">
            <span className="kpi-title">Orders Passed</span>
            <span className="kpi-number">8</span>
            <span className="kpi-subtitle">This Week</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="judge-kpi-card">
          <div className="kpi-icon-box soft-blue-bg">
            <Hourglass size={22} />
          </div>
          <div className="kpi-info">
            <span className="kpi-title">Pending Orders</span>
            <span className="kpi-number">22</span>
            <span className="kpi-subtitle">Awaiting Orders</span>
          </div>
        </div>
      </div>

      {/* Row 2: Middle Section (Hearings List & Status Donut) */}
      <div className="judge-middle-grid">
        {/* Today's Hearing List */}
        <div className="judge-card hearings-card">
          <div className="card-header-row">
            <div className="card-header-title">
              <Pin size={16} className="pin-icon" />
              <h3>Today's Hearing List</h3>
            </div>
            <a href="#" className="view-all-link" onClick={(e) => e.preventDefault()}>View All</a>
          </div>

          <div className="hearings-table-wrapper">
            <table className="hearings-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Case Number</th>
                  <th>Case Title</th>
                  <th>Stage</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {todaysHearings.map((h, i) => (
                  <tr key={i}>
                    <td className="time-col">{h.time}</td>
                    <td className="case-no-col">{h.caseNo}</td>
                    <td className="title-col">{h.title}</td>
                    <td>
                      <span className={`stage-tag ${h.stage.toLowerCase()}`}>{h.stage}</span>
                    </td>
                    <td className="category-col">{h.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card-footer-link">
            <a href="#" onClick={(e) => e.preventDefault()}>View Full Cause List &rsaquo;</a>
          </div>
        </div>

        {/* Bench Case Status Overview Donut */}
        <div className="judge-card status-overview-card">
          <div className="card-header-row">
            <div className="card-header-title">
              <PieChart size={16} />
              <h3>Bench Case Status Overview</h3>
            </div>
          </div>

          <div className="status-donut-body">
            <div className="donut-chart-wrapper">
              <svg viewBox="0 0 100 100" className="donut-svg">
                {/* 52/128 = 41% */}
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#2563eb" strokeWidth="16" strokeDasharray="98 141" strokeDashoffset="0" />
                {/* 36/128 = 28% */}
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#eab308" strokeWidth="16" strokeDasharray="67 172" strokeDashoffset="-98" />
                {/* 20/128 = 16% */}
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#f97316" strokeWidth="16" strokeDasharray="38 201" strokeDashoffset="-165" />
                {/* 12/128 = 9% */}
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#22c55e" strokeWidth="16" strokeDasharray="21 218" strokeDashoffset="-203" />
                {/* 8/128 = 6% */}
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#8b5cf6" strokeWidth="16" strokeDasharray="15 224" strokeDashoffset="-224" />
              </svg>
              <div className="donut-center-text">
                <strong>128</strong>
                <span>Total</span>
              </div>
            </div>

            <div className="status-legend-list">
              <div className="status-legend-item">
                <span className="dot blue-dot" />
                <span className="legend-name">Evidence / Trial</span>
                <strong className="legend-val">52 (41%)</strong>
              </div>
              <div className="status-legend-item">
                <span className="dot yellow-dot" />
                <span className="legend-name">Arguments</span>
                <strong className="legend-val">36 (28%)</strong>
              </div>
              <div className="status-legend-item">
                <span className="dot orange-dot" />
                <span className="legend-name">Orders Reserved</span>
                <strong className="legend-val">20 (16%)</strong>
              </div>
              <div className="status-legend-item">
                <span className="dot green-dot" />
                <span className="legend-name">Judgment Delivered</span>
                <strong className="legend-val">12 (9%)</strong>
              </div>
              <div className="status-legend-item">
                <span className="dot purple-dot" />
                <span className="legend-name">Others</span>
                <strong className="legend-val">8 (6%)</strong>
              </div>
            </div>
          </div>

          <div className="card-footer-link">
            <a href="#" onClick={(e) => e.preventDefault()}>View Details &rsaquo;</a>
          </div>
        </div>
      </div>

      {/* Row 3: Bottom Grid (Case Priority & Alerts) */}
      <div className="judge-bottom-grid">
        {/* Case Priority (High Priority) */}
        <div className="judge-card priority-card">
          <div className="card-header-row">
            <div className="card-header-title">
              <Flag size={16} className="flag-icon" />
              <h3>Case Priority (High Priority)</h3>
            </div>
            <a href="#" className="view-all-link" onClick={(e) => e.preventDefault()}>View All</a>
          </div>

          <div className="priority-table-wrapper">
            <table className="priority-table">
              <tbody>
                {highPriorityCases.map((c, i) => (
                  <tr key={i}>
                    <td>
                      <span className="high-badge">High</span>
                    </td>
                    <td className="case-no-cell">{c.caseNo}</td>
                    <td className="title-cell">{c.title}</td>
                    <td className="stage-cell">{c.stage}</td>
                    <td className="duration-cell">{c.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card-footer-link">
            <a href="#" onClick={(e) => e.preventDefault()}>Go to Case Priority List &rsaquo;</a>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="judge-card alerts-card">
          <div className="card-header-row">
            <div className="card-header-title">
              <Bell size={16} className="bell-icon" />
              <h3>Alerts &amp; Notifications</h3>
            </div>
            <a href="#" className="view-all-link" onClick={(e) => e.preventDefault()}>View All</a>
          </div>

          <div className="alerts-list">
            {alerts.map((a, i) => (
              <div key={i} className="alert-item">
                <div className="alert-icon-col">
                  {a.type === 'warning' && <AlertTriangle size={15} className="warning-icon" />}
                  {a.type === 'calendar' && <Calendar size={15} className="cal-icon" />}
                  {a.type === 'info' && <Info size={15} className="info-icon" />}
                  {a.type === 'alert' && <AlertTriangle size={15} className="danger-icon" />}
                </div>
                <div className="alert-text-col">
                  <span>{a.text}</span>
                </div>
                <div className="alert-time-col">{a.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4: Bench Performance Summary */}
      <div className="judge-card bench-summary-card">
        <div className="card-header-row">
          <div className="card-header-title">
            <BarChart2 size={16} />
            <h3>Bench Performance Summary (This Month)</h3>
          </div>
        </div>

        <div className="bench-metrics-row">
          <div className="b-metric">
            <span className="b-label">Cases Disposed</span>
            <strong className="b-val">45</strong>
          </div>

          <div className="b-metric">
            <span className="b-label">Avg. Disposal Time</span>
            <strong className="b-val">62 Days</strong>
          </div>

          <div className="b-metric">
            <span className="b-label">Hearing Conducted</span>
            <strong className="b-val">28</strong>
          </div>

          <div className="b-metric">
            <span className="b-label">Adjournment Rate</span>
            <strong className="b-val">12%</strong>
          </div>

          <div className="b-metric">
            <span className="b-label">Orders Passed</span>
            <strong className="b-val">31</strong>
          </div>

          <div className="b-metric highlight-metric">
            <span className="b-label">Bench Rank</span>
            <strong className="b-val rank-val">#3 / 12</strong>
          </div>
        </div>
      </div>
    </div>
  )
}
