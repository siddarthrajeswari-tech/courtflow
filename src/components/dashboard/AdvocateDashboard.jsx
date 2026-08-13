import React, { useState } from 'react'
import {
  Briefcase,
  FileText,
  Calendar,
  FileCheck,
  Bell,
  ChevronDown,
  Clock,
  Search,
  Download,
  PlusCircle,
  PieChart,
  Zap,
  Info,
  User,
  ArrowRight,
  Plus
} from 'lucide-react'
import './AdvocateDashboard.css'
import CaseRegistrationModal from './CaseRegistrationModal.jsx'

export default function AdvocateDashboard({ user, onLogout }) {
  const [dateFilter, setDateFilter] = useState('12 May 2025')
  const [caseFilter, setCaseFilter] = useState('All Cases')
  const [isRegModalOpen, setIsRegModalOpen] = useState(false)

  const [casesList, setCasesList] = useState([
    { caseNo: 'C/2024/1234', title: 'State vs. Rajesh Kumar', nextHearing: '15 May 2025', status: 'Pending', statusClass: 'status-pending', priority: 'High', priorityClass: 'p-high' },
    { caseNo: 'C/2023/5678', title: 'ABC Pvt Ltd vs. DEF Corp', nextHearing: '20 May 2025', status: 'Notice Issued', statusClass: 'status-notice', priority: 'Medium', priorityClass: 'p-med' },
    { caseNo: 'C/2024/9101', title: 'Suresh vs. Suresh', nextHearing: '22 May 2025', status: 'Evidence', statusClass: 'status-evidence', priority: 'Medium', priorityClass: 'p-med' },
    { caseNo: 'C/2023/1121', title: 'Mohit Verma vs. State', nextHearing: '28 May 2025', status: 'Pending', statusClass: 'status-pending', priority: 'Low', priorityClass: 'p-low' },
    { caseNo: 'C/2023/1314', title: 'XYZ Bank vs. PQR Ltd', nextHearing: '02 Jun 2025', status: 'Arguments', statusClass: 'status-arguments', priority: 'Low', priorityClass: 'p-low' },
  ])

  const handleAddNewCase = (newCase) => {
    setCasesList([newCase, ...casesList])
  }

  const upcomingHearings = [
    { day: 'WED', date: '15', month: 'MAY', title: 'State vs. Rajesh Kumar', caseNo: 'C/2024/1234', time: '10:30 AM', court: 'Court No. 5' },
    { day: 'FRI', date: '17', month: 'MAY', title: 'ABC Pvt Ltd vs. DEF Corp', caseNo: 'C/2023/5678', time: '11:30 AM', court: 'Court No. 3' },
    { day: 'MON', date: '20', month: 'MAY', title: 'Suresh vs. Suresh', caseNo: 'C/2024/9101', time: '02:00 PM', court: 'Court No. 2' },
    { day: 'WED', date: '22', month: 'MAY', title: 'Mohit Verma vs. State', caseNo: 'C/2023/1121', time: '10:45 AM', court: 'Court No. 4' },
    { day: 'FRI', date: '24', month: 'MAY', title: 'XYZ Bank vs. PQR Ltd', caseNo: 'C/2023/1314', time: '03:15 PM', court: 'Court No. 1' },
  ]

  const notifications = [
    { text: 'Hearing date updated in case C/2024/1234', time: '1h ago', color: '#8b5cf6' },
    { text: 'Order uploaded in case C/2023/5678', time: '3h ago', color: '#f97316' },
    { text: 'New notice issued in case C/2024/9101', time: '1d ago', color: '#22c55e' },
    { text: 'Hearing reminder for 15 May 2025', time: '1d ago', color: '#8b5cf6' },
  ]

  return (
    <div className="advocate-dashboard-container">
      {/* Top Header Bar */}
      <div className="advocate-top-bar">
        <div className="advocate-title-group">
          <h1>Welcome, Advocate 👋</h1>
          <p>Here's an overview of your cases and hearings.</p>
        </div>

        <div className="advocate-top-right">
          <button
            type="button"
            className="primary-btn"
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 700,
              background: '#2563eb',
              color: '#ffffff',
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={() => setIsRegModalOpen(true)}
          >
            <Plus size={16} /> Register New Case
          </button>

          <div className="advocate-date-btn">
            <Calendar size={15} />
            <span>{dateFilter}</span>
            <ChevronDown size={14} />
          </div>

          <div className="advocate-notif-btn">
            <Bell size={17} />
            <span className="advocate-notif-badge">6</span>
          </div>
        </div>
      </div>

      {/* Row 1: Top 5 KPI Cards */}
      <div className="advocate-kpi-grid">
        {/* Card 1 */}
        <div className="advocate-kpi-card">
          <div className="adv-icon-box purple-bg">
            <Briefcase size={20} />
          </div>
          <div className="adv-kpi-info">
            <span className="adv-kpi-title">Total Cases</span>
            <span className="adv-kpi-number">{casesList.length}</span>
            <span className="adv-kpi-sub">All Active Cases</span>
          </div>
          <a href="#" className="adv-kpi-link" onClick={(e) => e.preventDefault()}>View All &rarr;</a>
        </div>

        {/* Card 2 */}
        <div className="advocate-kpi-card">
          <div className="adv-icon-box green-bg">
            <FileText size={20} />
          </div>
          <div className="adv-kpi-info">
            <span className="adv-kpi-title">Pending Cases</span>
            <span className="adv-kpi-number">14</span>
            <span className="adv-kpi-sub">Awaiting Progress</span>
          </div>
          <a href="#" className="adv-kpi-link" onClick={(e) => e.preventDefault()}>View All &rarr;</a>
        </div>

        {/* Card 3 */}
        <div className="advocate-kpi-card">
          <div className="adv-icon-box orange-bg">
            <Calendar size={20} />
          </div>
          <div className="adv-kpi-info">
            <span className="adv-kpi-title">Upcoming Hearings</span>
            <span className="adv-kpi-number">5</span>
            <span className="adv-kpi-sub">Next 7 Days</span>
          </div>
          <a href="#" className="adv-kpi-link" onClick={(e) => e.preventDefault()}>View All &rarr;</a>
        </div>

        {/* Card 4 */}
        <div className="advocate-kpi-card">
          <div className="adv-icon-box blue-bg">
            <FileCheck size={20} />
          </div>
          <div className="adv-kpi-info">
            <span className="adv-kpi-title">Orders / Judgments</span>
            <span className="adv-kpi-number">7</span>
            <span className="adv-kpi-sub">This Month</span>
          </div>
          <a href="#" className="adv-kpi-link" onClick={(e) => e.preventDefault()}>View All &rarr;</a>
        </div>

        {/* Card 5 */}
        <div className="advocate-kpi-card">
          <div className="adv-icon-box red-bg">
            <Bell size={20} />
          </div>
          <div className="adv-kpi-info">
            <span className="adv-kpi-title">Unread Notifications</span>
            <span className="adv-kpi-number">6</span>
            <span className="adv-kpi-sub">New Updates</span>
          </div>
          <a href="#" className="adv-kpi-link" onClick={(e) => e.preventDefault()}>View All &rarr;</a>
        </div>
      </div>

      {/* Row 2: Middle Section (My Cases Table & Upcoming Hearings List) */}
      <div className="advocate-middle-grid">
        {/* Left: My Cases */}
        <div className="advocate-card my-cases-card">
          <div className="adv-card-header">
            <div className="adv-card-title">
              <Briefcase size={17} className="title-icon-purple" />
              <h3>My Cases</h3>
            </div>
            <select
              className="cases-filter-select"
              value={caseFilter}
              onChange={(e) => setCaseFilter(e.target.value)}
            >
              <option value="All Cases">All Cases</option>
              <option value="Pending">Pending</option>
              <option value="Evidence">Evidence</option>
            </select>
          </div>

          <div className="adv-table-wrapper">
            <table className="adv-table">
              <thead>
                <tr>
                  <th>Case Number</th>
                  <th>Case Title</th>
                  <th>Next Hearing</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {casesList.map((c, i) => (
                  <tr key={i}>
                    <td className="case-no-cell">{c.caseNo}</td>
                    <td className="title-cell">{c.title}</td>
                    <td className="date-cell">{c.nextHearing}</td>
                    <td>
                      <span className={`status-pill ${c.statusClass || 'status-pending'}`}>{c.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card-footer-link-left">
            <a href="#" onClick={(e) => e.preventDefault()}>View All Cases &rarr;</a>
          </div>
        </div>

        {/* Right: Upcoming Hearings */}
        <div className="advocate-card upcoming-hearings-card">
          <div className="adv-card-header">
            <div className="adv-card-title">
              <Calendar size={17} className="title-icon-purple" />
              <h3>Upcoming Hearings</h3>
            </div>
            <a href="#" className="view-all-link" onClick={(e) => e.preventDefault()}>View Calendar &rarr;</a>
          </div>

          <div className="hearings-date-list">
            {upcomingHearings.map((h, i) => (
              <div key={i} className="hearing-date-row">
                <div className="date-block-badge">
                  <span className="d-day">{h.day}</span>
                  <span className="d-num">{h.date}</span>
                  <span className="d-month">{h.month}</span>
                </div>

                <div className="hearing-info-col">
                  <strong>{h.title}</strong>
                  <span>{h.caseNo}</span>
                </div>

                <div className="hearing-time-col">
                  <strong className="h-time">{h.time}</strong>
                  <span className="h-court">{h.court}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="card-footer-link-left">
            <a href="#" onClick={(e) => e.preventDefault()}>View Full Calendar &rarr;</a>
          </div>
        </div>
      </div>

      {/* Row 3: Bottom Analytics Grid (3 Columns) */}
      <div className="advocate-bottom-grid">
        {/* Column 1: Case Status Overview (Donut Chart & Legend) */}
        <div className="advocate-card status-donut-card">
          <div className="adv-card-header">
            <div className="adv-card-title">
              <Info size={16} className="title-icon-purple" />
              <h3>Case Status Overview</h3>
            </div>
          </div>

          <div className="adv-donut-body">
            <div className="adv-donut-wrapper">
              <svg viewBox="0 0 100 100" className="adv-donut-svg">
                {/* Pending 14/24 = 58% */}
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#2563eb" strokeWidth="16" strokeDasharray="138 101" strokeDashoffset="0" />
                {/* Notice Issued 4/24 = 17% */}
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#eab308" strokeWidth="16" strokeDasharray="40 199" strokeDashoffset="-138" />
                {/* Evidence 3/24 = 13% */}
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#22c55e" strokeWidth="16" strokeDasharray="31 208" strokeDashoffset="-178" />
                {/* Arguments 2/24 = 8% */}
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#8b5cf6" strokeWidth="16" strokeDasharray="19 220" strokeDashoffset="-209" />
                {/* Orders 1/24 = 4% */}
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#38bdf8" strokeWidth="16" strokeDasharray="10 229" strokeDashoffset="-228" />
              </svg>
              <div className="donut-center-val">
                <strong>{casesList.length}</strong>
                <span>Total</span>
              </div>
            </div>

            <div className="adv-legend-list">
              <div className="adv-legend-item">
                <span className="dot blue-dot" />
                <span className="l-name">Pending</span>
                <strong className="l-val">14 (58%)</strong>
              </div>
              <div className="adv-legend-item">
                <span className="dot yellow-dot" />
                <span className="l-name">Notice Issued</span>
                <strong className="l-val">4 (17%)</strong>
              </div>
              <div className="adv-legend-item">
                <span className="dot green-dot" />
                <span className="l-name">Evidence</span>
                <strong className="l-val">3 (13%)</strong>
              </div>
              <div className="adv-legend-item">
                <span className="dot purple-dot" />
                <span className="l-name">Arguments</span>
                <strong className="l-val">2 (8%)</strong>
              </div>
              <div className="adv-legend-item">
                <span className="dot cyan-dot" />
                <span className="l-name">Orders / Judgment</span>
                <strong className="l-val">1 (4%)</strong>
              </div>
            </div>
          </div>

          <div className="card-footer-link-left">
            <a href="#" onClick={(e) => e.preventDefault()}>View Detailed Report &rarr;</a>
          </div>
        </div>

        {/* Column 2: Recent Notifications */}
        <div className="advocate-card recent-notif-card">
          <div className="adv-card-header">
            <div className="adv-card-title">
              <Bell size={16} className="title-icon-purple" />
              <h3>Recent Notifications</h3>
            </div>
            <a href="#" className="view-all-link" onClick={(e) => e.preventDefault()}>View All &rarr;</a>
          </div>

          <div className="adv-notif-list">
            {notifications.map((n, i) => (
              <div key={i} className="adv-notif-item">
                <span className="notif-dot" style={{ backgroundColor: n.color }} />
                <span className="notif-text">{n.text}</span>
                <span className="notif-time">{n.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Quick Actions Grid */}
        <div className="advocate-card quick-actions-card">
          <div className="adv-card-header">
            <div className="adv-card-title">
              <Zap size={16} className="title-icon-purple" />
              <h3>Quick Actions</h3>
            </div>
          </div>

          <div className="adv-actions-grid">
            <div className="adv-action-box blue-box" onClick={() => setIsRegModalOpen(true)} style={{ cursor: 'pointer' }}>
              <PlusCircle size={20} className="act-icon" />
              <span>Register New Case</span>
            </div>

            <div className="adv-action-box purple-box">
              <FileText size={20} className="act-icon" />
              <span>View My Documents</span>
            </div>

            <div className="adv-action-box green-box">
              <Search size={20} className="act-icon" />
              <span>Track Case Status</span>
            </div>

            <div className="adv-action-box orange-box">
              <Download size={20} className="act-icon" />
              <span>Download Orders</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Help Banner */}
      <div className="advocate-help-banner">
        <Info size={16} className="help-icon" />
        <span>Need help? Contact support or raise a request through Help &amp; Support.</span>
      </div>

      {/* Case Registration Wizard Modal */}
      <CaseRegistrationModal
        isOpen={isRegModalOpen}
        onClose={() => setIsRegModalOpen(false)}
        onSaveCase={handleAddNewCase}
      />
    </div>
  )
}
