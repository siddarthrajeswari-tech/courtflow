import React from 'react'
import { Menu, Bell, ShieldCheck, Home, LogIn, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'
import CaseSearchInspector from './CaseSearchInspector.jsx'

export default function DashboardHeader({
  toggleSidebar,
  searchQuery,
  setSearchQuery,
  selectedCase,
  setSelectedCase,
  user,
  onOpenLogin,
  onLogout
}) {
  return (
    <header className="dash-header">
      <div className="dash-header-left">
        <button className="menu-toggle-btn" onClick={toggleSidebar} aria-label="Toggle sidebar">
          <Menu size={20} />
        </button>
        <Link
          to="/"
          className="primary-btn"
          style={{
            padding: '7px 14px',
            fontSize: '13px',
            background: '#2563eb',
            color: '#ffffff',
            borderRadius: '8px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontWeight: 600,
            boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)'
          }}
          title="Go to Home page"
        >
          <Home size={16} /> Home
        </Link>
        <div className="header-greeting">
          <h2>{user ? `Good Morning, ${user.name || 'User'}` : 'Welcome to CourtFlow'}</h2>
          <div className="header-context">
            District Court, Chennai &bull; 11 August 2025, Monday &bull; 10:45 AM
          </div>
        </div>
      </div>

      {/* Global Interactive Case Search Bar & AI Inspector */}
      <CaseSearchInspector
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCase={selectedCase}
        setSelectedCase={setSelectedCase}
      />

      {/* Header Right Actions */}
      <div className="dash-header-right">
        <button className="notification-icon-btn" title="Notifications">
          <Bell size={18} />
          <span className="notif-badge">3</span>
        </button>

        <div className="secure-session-badge">
          <ShieldCheck size={15} />
          <span>Secure Session</span>
        </div>

        {user ? (
          <div className="admin-profile-pill">
            <div className="mini-avatar">{user.avatar || 'AD'}</div>
            <div className="mini-user-text">
              <strong>{user.name || 'User'}</strong>
              <span>{user.role || 'Court User'}</span>
            </div>
            <button className="dash-logout-mini-btn" onClick={onLogout} title="Logout">
              <LogOut size={15} />
            </button>
          </div>

        ) : (
          <button className="dash-login-btn" onClick={onOpenLogin}>
            <LogIn size={16} /> Login
          </button>
        )}
      </div>
    </header>
  )
}

