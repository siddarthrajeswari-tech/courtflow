import React, { useState } from 'react'
import {
  FileSearch,
  FileEdit,
  FileCheck,
  Clock,
  PieChart,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Bell,
  Calendar,
  ChevronDown,
  Target,
  ArrowRight,
  FileText,
  ShieldCheck,
  FilePlus,
  BarChart2
} from 'lucide-react'
import './ScrutinyDashboard.css'

export default function ScrutinyDashboard({ user, onLogout }) {
  const [dateFilter, setDateFilter] = useState('12 May 2025')

  const pendingScrutinyCases = [
    { caseNo: 'C/2025/0456', filingDate: '08 May 2025', petitioner: 'Ramesh Kumar', caseType: 'Civil', daysPending: 5, priority: 'High' },
    { caseNo: 'C/2025/0457', filingDate: '09 May 2025', petitioner: 'Sunita Devi', caseType: 'Criminal', daysPending: 4, priority: 'Medium' },
    { caseNo: 'C/2025/0458', filingDate: '10 May 2025', petitioner: 'ABC Pvt. Ltd.', caseType: 'Civil', daysPending: 3, priority: 'Medium' },
    { caseNo: 'C/2025/0459', filingDate: '10 May 2025', petitioner: 'Mohit Verma', caseType: 'Criminal', daysPending: 2, priority: 'Low' },
    { caseNo: 'C/2025/0460', filingDate: '11 May 2025', petitioner: 'State vs. Raj', caseType: 'Criminal', daysPending: 1, priority: 'Low' },
  ]

  const slaBreaches = [
    { caseNo: 'C/2025/0401', defectDate: 'Defect Raised: 02 May 2025', overdue: '10 Days Overdue' },
    { caseNo: 'C/2025/0405', defectDate: 'Defect Raised: 03 May 2025', overdue: '9 Days Overdue' },
    { caseNo: 'C/2025/0410', defectDate: 'Defect Raised: 04 May 2025', overdue: '8 Days Overdue' },
  ]

  const notifications = [
    { text: 'New case C/2025/0461 added to scrutiny queue.', time: '10 min ago', color: '#2563eb' },
    { text: 'Case C/2025/0432 returned for defect rectification.', time: '1 hour ago', color: '#8b5cf6' },
  ]

  return (
    <div className="scrutiny-dashboard-container">
      {/* Top Header Bar */}
      <div className="scrutiny-top-bar">
        <div className="scrutiny-title-group">
          <h1>Welcome, Scrutiny Staff 👋</h1>
          <p>Here's what's happening in the Scrutiny Department today.</p>
        </div>

        <div className="scrutiny-top-right">
          <div className="scrutiny-date-btn">
            <Calendar size={15} />
            <span>{dateFilter}</span>
            <ChevronDown size={14} />
          </div>

          <div className="scrutiny-notif-btn">
            <Bell size={17} />
            <span className="scrutiny-notif-badge">8</span>
          </div>
        </div>
      </div>

      {/* Row 1: Top 4 KPI Cards */}
      <div className="scrutiny-kpi-grid">
        {/* Card 1 */}
        <div className="scrutiny-kpi-card">
          <div className="scrutiny-icon-box blue-bg">
            <FileSearch size={22} />
          </div>
          <div className="scrutiny-kpi-info">
            <span className="scrutiny-kpi-title">Scrutiny Queue</span>
            <span className="scrutiny-kpi-number">128</span>
            <span className="scrutiny-kpi-sub">Total Cases</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="scrutiny-kpi-card">
          <div className="scrutiny-icon-box orange-bg">
            <FileEdit size={22} />
          </div>
          <div className="scrutiny-kpi-info">
            <span className="scrutiny-kpi-title">Pending Scrutiny</span>
            <span className="scrutiny-kpi-number">32</span>
            <span className="scrutiny-kpi-sub">Cases</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="scrutiny-kpi-card">
          <div className="scrutiny-icon-box green-bg">
            <FileCheck size={22} />
          </div>
          <div className="scrutiny-kpi-info">
            <span className="scrutiny-kpi-title">Verified Today</span>
            <span className="scrutiny-kpi-number">18</span>
            <span className="scrutiny-kpi-sub">Cases</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="scrutiny-kpi-card">
          <div className="scrutiny-icon-box purple-bg">
            <Clock size={22} />
          </div>
          <div className="scrutiny-kpi-info">
            <span className="scrutiny-kpi-title">Avg. Scrutiny Time</span>
            <span className="scrutiny-kpi-number">2.4</span>
            <span className="scrutiny-kpi-sub">Hours</span>
          </div>
        </div>
      </div>

      {/* Row 2: Middle Analytics (Queue Overview Donut & Defects) */}
      <div className="scrutiny-middle-grid">
        {/* Left: Scrutiny Queue Overview */}
        <div className="scrutiny-card queue-overview-card">
          <div className="scrutiny-card-header">
            <div className="scrutiny-card-title">
              <PieChart size={17} className="title-icon-blue" />
              <h3>Scrutiny Queue Overview</h3>
            </div>
            <a href="#" className="view-all-link" onClick={(e) => e.preventDefault()}>View All</a>
          </div>

          <div className="queue-donut-body">
            <div className="queue-donut-wrapper">
              <svg viewBox="0 0 100 100" className="queue-donut-svg">
                {/* Pending Scrutiny 32/128 = 25% */}
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#2563eb" strokeWidth="16" strokeDasharray="60 178" strokeDashoffset="0" />
                {/* In Progress 12/128 = 9% */}
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#f59e0b" strokeWidth="16" strokeDasharray="21 217" strokeDashoffset="-60" />
                {/* Returned for Defect 16/128 = 12% */}
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#8b5cf6" strokeWidth="16" strokeDasharray="28 210" strokeDashoffset="-81" />
                {/* Completed 68/128 = 53% */}
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#22c55e" strokeWidth="16" strokeDasharray="126 112" strokeDashoffset="-109" />
              </svg>
              <div className="donut-center-val">
                <strong>128</strong>
                <span>Total</span>
              </div>
            </div>

            <div className="queue-legend-list">
              <div className="queue-legend-item">
                <div className="legend-left">
                  <span className="dot blue-dot" />
                  <span>Pending Scrutiny</span>
                </div>
                <div className="legend-right">
                  <strong>32</strong>
                  <span className="percent-pill blue-pill">25%</span>
                </div>
              </div>

              <div className="queue-legend-item">
                <div className="legend-left">
                  <span className="dot yellow-dot" />
                  <span>In Progress</span>
                </div>
                <div className="legend-right">
                  <strong>12</strong>
                  <span className="percent-pill yellow-pill">9%</span>
                </div>
              </div>

              <div className="queue-legend-item">
                <div className="legend-left">
                  <span className="dot purple-dot" />
                  <span>Returned for Defect</span>
                </div>
                <div className="legend-right">
                  <strong>16</strong>
                  <span className="percent-pill purple-pill">12%</span>
                </div>
              </div>

              <div className="queue-legend-item">
                <div className="legend-left">
                  <span className="dot green-dot" />
                  <span>Completed</span>
                </div>
                <div className="legend-right">
                  <strong>68</strong>
                  <span className="percent-pill green-pill">53%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Filing Defect Delay */}
        <div className="scrutiny-card defect-delay-card">
          <div className="scrutiny-card-header">
            <div className="scrutiny-card-title">
              <AlertTriangle size={17} className="title-icon-red" />
              <h3>Filing Defect Delay</h3>
            </div>
            <a href="#" className="view-all-link" onClick={(e) => e.preventDefault()}>View All</a>
          </div>

          <div className="defect-delay-list">
            <div className="defect-delay-row high-delay-box">
              <div className="delay-left">
                <span className="delay-circle-icon red-circle">!</span>
                <span className="delay-label">High Delay (&gt; 7 Days)</span>
              </div>
              <div className="delay-right">
                <div className="delay-count-col">
                  <strong>08</strong>
                  <span>Cases</span>
                </div>
                <span className="arrow-next">&rsaquo;</span>
              </div>
            </div>

            <div className="defect-delay-row medium-delay-box">
              <div className="delay-left">
                <span className="delay-circle-icon orange-circle"><Clock size={14} /></span>
                <span className="delay-label">Medium Delay (3 - 7 Days)</span>
              </div>
              <div className="delay-right">
                <div className="delay-count-col">
                  <strong>14</strong>
                  <span>Cases</span>
                </div>
                <span className="arrow-next">&rsaquo;</span>
              </div>
            </div>

            <div className="defect-delay-row low-delay-box">
              <div className="delay-left">
                <span className="delay-circle-icon green-circle"><CheckCircle2 size={14} /></span>
                <span className="delay-label">Low Delay (&lt; 3 Days)</span>
              </div>
              <div className="delay-right">
                <div className="delay-count-col">
                  <strong>10</strong>
                  <span>Cases</span>
                </div>
                <span className="arrow-next">&rsaquo;</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Pending Scrutiny Cases & Defect SLA Breaches */}
      <div className="scrutiny-cases-grid">
        {/* Left: Pending Scrutiny Cases */}
        <div className="scrutiny-card cases-table-card">
          <div className="scrutiny-card-header">
            <h3>Pending Scrutiny Cases</h3>
            <a href="#" className="view-all-link" onClick={(e) => e.preventDefault()}>View All</a>
          </div>

          <div className="scrutiny-table-wrapper">
            <table className="scrutiny-table">
              <thead>
                <tr>
                  <th>Case Number</th>
                  <th>Filing Date</th>
                  <th>Petitioner</th>
                  <th>Case Type</th>
                  <th>Days Pending</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                {pendingScrutinyCases.map((c, i) => (
                  <tr key={i}>
                    <td className="case-no">{c.caseNo}</td>
                    <td className="date-col">{c.filingDate}</td>
                    <td className="petitioner-col">{c.petitioner}</td>
                    <td>{c.caseType}</td>
                    <td className="days-col">{c.daysPending}</td>
                    <td>
                      <span className={`p-badge ${c.priority.toLowerCase()}`}>{c.priority}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card-footer-link-left">
            <a href="#" onClick={(e) => e.preventDefault()}>View Full Queue &rarr;</a>
          </div>
        </div>

        {/* Right: Defect SLA Breaches */}
        <div className="scrutiny-card sla-breaches-card">
          <div className="scrutiny-card-header">
            <div className="scrutiny-card-title">
              <ShieldAlert size={17} className="title-icon-red" />
              <h3>Defect SLA Breaches</h3>
            </div>
            <a href="#" className="view-all-link" onClick={(e) => e.preventDefault()}>View All</a>
          </div>

          <div className="sla-alert-banner">
            <div className="sla-banner-left">
              <AlertTriangle size={20} className="banner-alert-icon" />
              <div>
                <span className="banner-sub">Total Breaches</span>
                <strong className="banner-num">06</strong>
              </div>
            </div>
            <span className="urgent-tag">Urgent Action Required</span>
          </div>

          <div className="sla-breaches-list">
            {slaBreaches.map((b, i) => (
              <div key={i} className="sla-breach-item">
                <div className="sla-item-info">
                  <span className="sla-case-no">{b.caseNo}</span>
                  <span className="sla-date">{b.defectDate}</span>
                </div>
                <span className="overdue-tag">{b.overdue}</span>
              </div>
            ))}
          </div>

          <div className="card-footer-link-left">
            <a href="#" onClick={(e) => e.preventDefault()}>View All Breaches &rarr;</a>
          </div>
        </div>
      </div>

      {/* Row 4: Quick Actions & Notifications */}
      <div className="scrutiny-bottom-grid">
        {/* Left: Quick Actions */}
        <div className="scrutiny-card quick-actions-card">
          <div className="scrutiny-card-header">
            <h3>Quick Actions</h3>
          </div>

          <div className="quick-actions-grid">
            <div className="action-btn-item blue-action">
              <FileSearch size={18} className="act-icon" />
              <span>New Filing Verification</span>
            </div>

            <div className="action-btn-item green-action">
              <FileCheck size={18} className="act-icon" />
              <span>Document Verification</span>
            </div>

            <div className="action-btn-item purple-action">
              <ShieldCheck size={18} className="act-icon" />
              <span>Compliance Check</span>
            </div>

            <div className="action-btn-item orange-action">
              <BarChart2 size={18} className="act-icon" />
              <span>Generate Report</span>
            </div>
          </div>
        </div>

        {/* Right: Notifications */}
        <div className="scrutiny-card notif-card">
          <div className="scrutiny-card-header">
            <div className="scrutiny-card-title">
              <Bell size={17} className="title-icon-blue" />
              <h3>Notifications</h3>
            </div>
            <a href="#" className="view-all-link" onClick={(e) => e.preventDefault()}>View All</a>
          </div>

          <div className="scrutiny-notif-list">
            {notifications.map((n, i) => (
              <div key={i} className="scrutiny-notif-item">
                <span className="notif-dot" style={{ backgroundColor: n.color }} />
                <span className="notif-text">{n.text}</span>
                <span className="notif-time">{n.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
