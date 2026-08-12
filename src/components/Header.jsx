import { Link, NavLink } from 'react-router-dom'
import { Landmark, Scale, Ear, SunMedium, Moon, ChevronDown, LogIn, LogOut } from 'lucide-react'

export default function Header({ user, onOpenLogin, onLogout }) {
  return (
    <header className="site-header">
      <div className="topbar">
        <div className="topbar-left">
          <span><Landmark size={14} /> Government of India</span>
          <span><Scale size={14} /> Ministry of Law &amp; Justice</span>
        </div>
        <div className="topbar-right">
          <span><Ear size={14} /> Screen Reader</span>
          <span>Skip to Main Content</span>
          <span className="lang">English <ChevronDown size={12} /></span>
          <span><SunMedium size={14} /></span>
          <span><Moon size={14} /></span>
        </div>
      </div>

      <div className="mainbar">
        <Link to="/" className="brand">
          <img src="/emblem.svg" alt="" className="emblem" />
          <div className="brand-text">
            <strong>eCourts Services</strong>
            <span>District and Taluka Courts of India</span>
          </div>
        </Link>

        <div className="title-block">
          <h1>Legal Pendency Reduction &amp; Court Flow Management</h1>
          <p>AI Driven Analytics for Faster Justice</p>
        </div>

        <nav className="main-nav">
          <NavLink to="/" end className="nav-link">Home</NavLink>
          <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
          <NavLink to="/dashboard" className="nav-link">Court Flow</NavLink>
          <NavLink to="/dashboard" className="nav-link">Pendency Analysis</NavLink>
          <NavLink to="/dashboard" className="nav-link">Reports</NavLink>
          <NavLink to="/dashboard" className="nav-link">Alerts</NavLink>
        </nav>

        {user ? (
          <button className="login-btn logged-in" onClick={onLogout} title="Click to logout">
            <LogOut size={16} /> {user.name}
          </button>
        ) : (
          <button className="login-btn" onClick={onOpenLogin}>
            <LogIn size={16} /> Login
          </button>
        )}
      </div>
    </header>
  )
}

