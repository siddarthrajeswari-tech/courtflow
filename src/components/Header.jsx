import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Landmark, Scale, Ear, SunMedium, Moon, ChevronDown, LogIn, LogOut } from 'lucide-react'

export default function Header({ user, onOpenLogin, onLogout }) {
  const [darkMode, setDarkMode] = useState(false)
  const [lang, setLang] = useState('English')

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.body.classList.toggle('dark-mode')
  }

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="topbar-left">
          <span><Landmark size={14} /> Government of India</span>
          <span><Scale size={14} /> Ministry of Law &amp; Justice</span>
        </div>
        <div className="topbar-right">
          <span style={{ cursor: 'pointer' }} onClick={() => alert('Screen Reader Mode activated.')}>
            <Ear size={14} /> Screen Reader
          </span>
          <a href="#main-content" style={{ color: 'inherit', textDecoration: 'none' }}>Skip to Main Content</a>
          <span
            className="lang"
            style={{ cursor: 'pointer' }}
            onClick={() => setLang(lang === 'English' ? 'Hindi' : 'English')}
            title="Toggle Language"
          >
            {lang} <ChevronDown size={12} />
          </span>
          <span
            style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
            onClick={toggleDarkMode}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <SunMedium size={14} /> : <Moon size={14} />}
          </span>
        </div>
      </div>

      <div className="mainbar">
        <Link to="/" className="brand">
          <img src="/emblem.svg" alt="" className="emblem" />
          <div className="brand-text">
            <strong>LawNexus Services</strong>
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

