import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Shield, Home } from 'lucide-react'
import { ROLE_PRESETS } from '../components/LoginModal.jsx'
import '../components/LoginModal.css'

export default function RegisterPage({ onLoginSuccess }) {
  const navigate = useNavigate()
  const [role, setRole] = useState('Judge')
  const [fullName, setFullName] = useState('Hon. Justice Verma')
  const [email, setEmail] = useState('verma.judge@court.gov.in')
  const [idNumber, setIdNumber] = useState('JDG-1024')
  const [password, setPassword] = useState('••••••••')
  const [confirmPassword, setConfirmPassword] = useState('••••••••')
  const [agreedTerms, setAgreedTerms] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole)
    const preset = ROLE_PRESETS[selectedRole]
    if (preset) {
      setIdNumber(preset.id)
      setFullName(preset.name)
      setEmail(preset.email)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!agreedTerms) {
      alert('Please agree to the Terms of Service and Privacy Policy.')
      return
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      const userData = {
        id: idNumber || 'REG-1001',
        name: fullName || 'Registered User',
        role: role,
        avatar: fullName ? fullName.split(' ').map(n => n[0]).join('').substring(0, 2) : 'RU',
        email: email
      }
      if (onLoginSuccess) {
        onLoginSuccess(userData)
      }
      navigate('/dashboard')
    }, 400)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0b1e42 0%, #1e3a8a 50%, #0f172a 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justify(c) { return 'center' },
      padding: '40px 16px'
    }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/" style={{
          color: '#ffffff',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: 600,
          fontSize: '14px',
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '8px 16px',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)'
        }}>
          <Home size={16} /> Back to Home Page
        </Link>
      </div>

      <div className="court-auth-card" style={{ boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)' }}>
        {/* Card Header Title */}
        <div className="auth-header-block">
          <h2>Court Services</h2>
          <p>Secure Portal &bull; Account Registration</p>
        </div>

        {/* Primary Tabs (Sign In / Create Account) */}
        <div className="auth-tab-nav">
          <button
            type="button"
            className="auth-tab-btn"
            onClick={() => navigate('/login')}
          >
            Sign In
          </button>
          <button
            type="button"
            className="auth-tab-btn active"
          >
            Create Account
          </button>
        </div>

        {/* Role Selection */}
        <div className="auth-role-section">
          <label className="auth-role-label">Select Your Role</label>
          <div className="auth-role-grid">
            {['Judge', 'Advocate', 'Scrutiny Staff', 'Admin Staff'].map((r) => (
              <button
                key={r}
                type="button"
                className={`auth-role-pill ${role === r ? 'selected' : ''}`}
                onClick={() => handleRoleChange(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* CREATE ACCOUNT FORM */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label>Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full legal name"
            />
          </div>

          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@court.gov"
            />
          </div>

          <div className="auth-field">
            <label>Bar ID / Employee ID</label>
            <input
              type="text"
              required
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              placeholder="Enter ID number"
            />
            <span className="field-hint">
              Assigned ID: <strong>{ROLE_PRESETS[role]?.id}</strong>
            </span>
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <div className="auth-field">
            <label>Confirm Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {/* Terms Checkbox */}
          <label className="terms-checkbox-row">
            <input
              type="checkbox"
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
            />
            <span>
              I agree to the <strong>Terms of Service</strong> and{' '}
              <strong>Privacy Policy</strong>.
            </span>
          </label>

          {/* Important Notice Box */}
          <div className="registration-notice-box">
            Please verify your email to complete registration. <strong>Note:</strong> No changes
            can be made to your role or professional ID once registered.
          </div>

          <button type="submit" className="auth-primary-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Footer Security Note */}
        <div className="auth-card-footer">
          <div className="monitoring-tag">
            <Shield size={13} />
            <span>AUTHORIZED USERS ONLY. ALL ACTIVITY IS MONITORED.</span>
          </div>
          <div className="footer-policy-links">
            <a href="#" onClick={(e) => e.preventDefault()}>Security Policy</a>
            <span className="dot-sep">&bull;</span>
            <a href="#" onClick={(e) => e.preventDefault()}>Help Desk</a>
          </div>
        </div>
      </div>
    </div>
  )
}
