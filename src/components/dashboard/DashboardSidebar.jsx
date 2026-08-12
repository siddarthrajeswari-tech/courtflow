import React from 'react'
import { Link } from 'react-router-dom'
import {
  Scale,
  Home,
  Briefcase,
  Calendar,
  FileCheck,
  FileText,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  LogIn,
  Building2,
  GitBranch,
  Layers,
  AlertTriangle,
  Award,
  Sliders,
  CalendarCheck,
  UserCheck,
  Search,
  BarChart3,
  Activity,
  ChevronRight,
  FileSearch,
  FileEdit,
  ShieldCheck,
  Target,
  BarChart2,
  HeartPulse,
  User
} from 'lucide-react'

export default function DashboardSidebar({
  activeTab,
  setActiveTab,
  isOpen,
  setIsOpen,
  user,
  onOpenLogin,
  onLogout
}) {
  const isJudge = Boolean(
    user && (
      user.role === 'District Judge' ||
      user.role === 'Judge' ||
      user.idNumber === 'JDG-1024' ||
      user.id === 'JDG-1024' ||
      (typeof user.name === 'string' && (user.name.includes('Justice') || user.name.includes('Judge')))
    )
  )

  const isScrutiny = Boolean(
    user && (
      user.role === 'Scrutiny Officer' ||
      user.role === 'Scrutiny Staff' ||
      user.idNumber === 'SCR-2045' ||
      user.id === 'SCR-2045' ||
      (typeof user.name === 'string' && user.name.includes('Scrutiny'))
    )
  )

  const isAdvocate = Boolean(
    user && (
      user.role === 'Senior Advocate' ||
      user.role === 'Advocate' ||
      user.idNumber === 'ADV-5831' ||
      user.id === 'ADV-5831' ||
      (typeof user.name === 'string' && user.name.includes('Advocate'))
    )
  )

  // Advocate Sidebar Items matching screenshot
  const advocateNav = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'my-cases', label: 'My Cases', icon: Briefcase },
    { id: 'hearing-dates', label: 'Hearing Dates', icon: Calendar },
    { id: 'case-status', label: 'Case Status', icon: FileCheck },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: '6' },
  ]

  const advocateSettingsNav = [
    { id: 'profile-settings', label: 'Profile Settings', icon: Settings },
    { id: 'help-support', label: 'Help & Support', icon: HelpCircle },
  ]

  // Scrutiny Staff Sidebar Items matching screenshot
  const scrutinyNav = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'scrutiny-queue', label: 'Scrutiny Queue', icon: FileSearch },
    { id: 'pending-scrutiny', label: 'Pending Scrutiny', icon: FileEdit },
    { id: 'doc-verification', label: 'Document Verification', icon: FileCheck },
    { id: 'compliance-check', label: 'Compliance Check', icon: ShieldCheck },
    { id: 'scrutiny-reports', label: 'Scrutiny Reports', icon: BarChart2 },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: '8' },
  ]

  // Judge Bench Modules matching screenshot
  const judgeModules = [
    { id: 'courtroom', label: 'Courtroom / Bench', icon: Building2 },
    { id: 'evidence-stages', label: 'Evidence / Trial Stages', icon: GitBranch },
    { id: 'bench-specific', label: 'Bench Specific', icon: Layers },
    { id: 'bench-perf', label: 'Bench Performance', icon: BarChart2 },
    { id: 'bench-cases', label: 'Bench Cases', icon: Briefcase },
    { id: 'inactivity-overload', label: 'Inactivity & Overload', icon: AlertTriangle },
    { id: 'bench-benchmarks', label: 'Bench Benchmarks', icon: Award },
  ]

  const judgeOthers = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ]

  // Admin Modules matching screenshot
  const adminModules = [
    { id: 'module-1', num: 1, label: 'Priority Configurator', icon: Sliders, color: '#16a34a' },
    { id: 'module-2', num: 2, label: 'Bottleneck Pipeline', icon: GitBranch, color: '#2563eb' },
    { id: 'module-3', num: 3, label: 'Scheduler Controls', icon: CalendarCheck, color: '#9333ea' },
    { id: 'module-4', num: 4, label: 'Workload Intelligence', icon: UserCheck, color: '#ea580c' },
    { id: 'module-5', num: 5, label: 'Delay Inspector', icon: Search, color: '#dc2626' },
    { id: 'module-6', num: 6, label: 'Alert & SLA Engine', icon: Bell, color: '#ca8a04' },
    { id: 'module-7', num: 7, label: 'Pattern Benchmarks', icon: BarChart3, color: '#0d9488' },
    { id: 'module-8', num: 8, label: 'Backlog Simulator', icon: Activity, color: '#1e293b' },
  ]

  const adminSystemNav = [
    { id: 'sys-audit', label: 'System Audit', icon: FileCheck },
    { id: 'sys-health', label: 'System Health', icon: HeartPulse },
    { id: 'sys-benchmarks', label: 'Policy Benchmarks', icon: Award },
    { id: 'sys-config', label: 'Global Configuration', icon: Settings },
  ]

  return (
    <aside className={`dashboard-sidebar ${isOpen ? 'open' : ''}`}>
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="brand-icon" style={{ background: '#2563eb' }}>
          <Scale size={22} />
        </div>
        <div className="brand-title">
          <span className="brand-name" style={{ fontSize: '15px', fontWeight: 800 }}>
            SMART COURT
          </span>
          <span className="brand-sub" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>
            INTELLIGENCE
          </span>
        </div>
      </div>

      {/* Navigation Sections */}
      <nav className="sidebar-nav">
        {/* ADVOCATE SIDEBAR VIEW */}
        {isAdvocate ? (
          <>
            {/* Profile Card */}
            <div style={{ margin: '14px', padding: '12px 14px', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#3b82f6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={20} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: '13px', color: '#ffffff' }}>Advocate</strong>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>{user?.idNumber || 'ADV-5831'}</span>
                <span style={{ fontSize: '10px', color: '#22c55e', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} /> Online
                </span>
              </div>
            </div>

            {/* Main Navigation List */}
            <ul className="nav-list" style={{ padding: '0 14px' }}>
              {advocateNav.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id || (activeTab === 'overview' && item.id === 'dashboard')
                return (
                  <li key={item.id}>
                    <button
                      className={`nav-item ${isActive ? 'active' : ''}`}
                      onClick={() => {
                        setActiveTab(item.id)
                        if (window.innerWidth < 900) setIsOpen(false)
                      }}
                      style={{
                        background: isActive ? '#4f46e5' : 'transparent',
                        color: isActive ? '#ffffff' : '#cbd5e1',
                        borderRadius: '8px',
                        padding: '10px 14px'
                      }}
                    >
                      <div className="nav-item-left">
                        <Icon size={16} />
                        <span style={{ fontSize: '13px', fontWeight: 600 }}>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span style={{ background: '#8b5cf6', color: '#fff', fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '10px' }}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>

            {/* Settings & Support Links */}
            <ul className="nav-list" style={{ padding: '0 14px', marginTop: '24px' }}>
              {advocateSettingsNav.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id
                return (
                  <li key={item.id}>
                    <button
                      className={`nav-item ${isActive ? 'active' : ''}`}
                      onClick={() => {
                        setActiveTab(item.id)
                        if (window.innerWidth < 900) setIsOpen(false)
                      }}
                      style={{ color: '#94a3b8', padding: '9px 14px' }}
                    >
                      <div className="nav-item-left">
                        <Icon size={16} />
                        <span style={{ fontSize: '13px' }}>{item.label}</span>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </>
        ) : isScrutiny ? (
          /* SCRUTINY STAFF SIDEBAR VIEW */
          <>
            <div style={{ margin: '14px', padding: '12px 14px', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileSearch size={18} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: '13px', color: '#ffffff' }}>Scrutiny Staff</strong>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>{user?.idNumber || 'SCR-2045'}</span>
                <span style={{ fontSize: '10px', color: '#22c55e', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} /> Online
                </span>
              </div>
            </div>

            <ul className="nav-list" style={{ padding: '0 14px' }}>
              {scrutinyNav.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id || (activeTab === 'overview' && item.id === 'dashboard')
                return (
                  <li key={item.id}>
                    <button
                      className={`nav-item ${isActive ? 'active' : ''}`}
                      onClick={() => {
                        setActiveTab(item.id)
                        if (window.innerWidth < 900) setIsOpen(false)
                      }}
                      style={{
                        background: isActive ? '#2563eb' : 'transparent',
                        color: isActive ? '#ffffff' : '#cbd5e1',
                        borderRadius: '8px',
                        padding: '10px 14px'
                      }}
                    >
                      <div className="nav-item-left">
                        <Icon size={16} />
                        <span style={{ fontSize: '13px', fontWeight: 600 }}>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span style={{ background: '#ef4444', color: '#fff', fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '10px' }}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </>
        ) : isJudge ? (
          /* JUDGE SIDEBAR VIEW */
          <>
            <div style={{ marginBottom: '16px' }}>
              <button
                className={`nav-item ${activeTab === 'judge-dashboard' || activeTab === 'overview' || activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('judge-dashboard')
                  if (window.innerWidth < 900) setIsOpen(false)
                }}
                style={{
                  background: activeTab === 'judge-dashboard' || activeTab === 'overview' || activeTab === 'dashboard' ? '#2563eb' : 'transparent',
                  color: '#ffffff',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  fontWeight: 700
                }}
              >
                <div className="nav-item-left">
                  <Home size={18} />
                  <span>Dashboard</span>
                </div>
              </button>
            </div>

            {/* BENCH MODULES SECTION */}
            <div className="nav-section">
              <div className="nav-section-label" style={{ color: '#94a3b8', fontSize: '10.5px', fontWeight: 700, letterSpacing: '1px' }}>
                BENCH MODULES
              </div>
              <ul className="nav-list">
                {judgeModules.map((m) => {
                  const Icon = m.icon
                  const isActive = activeTab === m.id
                  return (
                    <li key={m.id}>
                      <button
                        className={`nav-item ${isActive ? 'active' : ''}`}
                        onClick={() => {
                          setActiveTab(m.id)
                          if (window.innerWidth < 900) setIsOpen(false)
                        }}
                      >
                        <div className="nav-item-left">
                          <Icon size={16} />
                          <span style={{ fontSize: '12.5px', fontWeight: 600 }}>{m.label}</span>
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </>
        ) : (
          /* ADMIN SIDEBAR VIEW */
          <>
            <div style={{ marginBottom: '16px' }}>
              <button
                className={`nav-item ${activeTab === 'overview' || activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('overview')
                  if (window.innerWidth < 900) setIsOpen(false)
                }}
                style={{
                  background: activeTab === 'overview' || activeTab === 'dashboard' ? '#2563eb' : 'transparent',
                  color: '#ffffff',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  fontWeight: 700
                }}
              >
                <div className="nav-item-left">
                  <Home size={18} />
                  <span>Overview</span>
                </div>
              </button>
            </div>

            {/* MODULES SECTION */}
            <div className="nav-section">
              <div className="nav-section-label" style={{ color: '#94a3b8', fontSize: '10.5px', fontWeight: 700, letterSpacing: '1px' }}>
                MODULES
              </div>
              <ul className="nav-list">
                {adminModules.map((m) => {
                  const Icon = m.icon
                  const isActive = activeTab === m.id
                  return (
                    <li key={m.id}>
                      <button
                        className={`nav-item ${isActive ? 'active' : ''}`}
                        onClick={() => {
                          setActiveTab(m.id)
                          if (window.innerWidth < 900) setIsOpen(false)
                        }}
                      >
                        <div className="nav-item-left">
                          <span
                            style={{
                              width: '18px',
                              height: '18px',
                              borderRadius: '50%',
                              backgroundColor: m.color,
                              color: '#fff',
                              fontSize: '10px',
                              fontWeight: 800,
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginRight: '4px'
                            }}
                          >
                            {m.num}
                          </span>
                          <span style={{ fontSize: '12.5px', fontWeight: 600 }}>{m.label}</span>
                        </div>
                        <ChevronRight size={14} style={{ opacity: 0.5 }} />
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </>
        )}
      </nav>

      {/* User Footer Profile or Logout */}
      <div className="sidebar-user">
        {user ? (
          <>
            <div className="user-info-group">
              <div className="user-avatar">{user.avatar || 'AD'}</div>
              <div className="user-details">
                <span className="user-name">{user.name}</span>
                <span className="user-role">{user.role}</span>
                <span className="user-login-time">Active Session</span>
              </div>
            </div>
            <button className="logout-btn" onClick={onLogout} title="Log Out">
              <LogOut size={16} />
            </button>
          </>
        ) : (
          <button className="sidebar-login-btn" onClick={onOpenLogin}>
            <LogIn size={16} /> Login to Access Full Portal
          </button>
        )}
      </div>
    </aside>
  )
}
