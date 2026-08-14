import React, { useState, useEffect } from 'react'
import { ArrowLeft, Eye, EyeOff, X, Shield, Lock, AlertCircle } from 'lucide-react'
import './LoginModal.css'

export const ROLE_PRESETS = {
  Judge: {
    id: 'JDG-1024',
    password: 'judge123',
    name: 'Hon. Justice Verma',
    role: 'District Judge',
    avatar: 'JV',
    email: 'verma.judge@court.gov.in',
    idLabel: 'Judicial Service ID'
  },
  Advocate: {
    id: 'ADV-5831',
    password: 'advocate123',
    name: 'Adv. R. K. Sharma',
    role: 'Senior Advocate',
    avatar: 'RS',
    email: 'sharma.adv@bar.in',
    idLabel: 'Bar Council ID / Bar ID'
  },
  'Scrutiny Staff': {
    id: 'SCR-2045',
    password: 'scrutiny123',
    name: 'P. Ramesh',
    role: 'Scrutiny Officer',
    avatar: 'PR',
    email: 'ramesh.scrutiny@court.gov.in',
    idLabel: 'Scrutiny Officer ID'
  },
  'Admin Staff': {
    id: 'ADM-3098',
    password: 'admin123',
    name: 'Court Administrator',
    role: 'System Administrator',
    avatar: 'AD',
    email: 'admin.staff@court.gov.in',
    idLabel: 'Admin Employee ID'
  }
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess, initialTab = 'signIn' }) {
  const [tab, setTab] = useState(initialTab)
  const [role, setRole] = useState('Judge')
  
  // Form fields - empty by default (no auto-fill)
  const [idNumber, setIdNumber] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset all fields whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setTab(initialTab)
      setErrorMessage('')
      setIdNumber('')
      setPassword('')
      setShowPassword(false)
    }
  }, [initialTab, isOpen])

  if (!isOpen) return null

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole)
    setErrorMessage('')
    setIdNumber('')
    setPassword('')
  }

  const handleSignInSubmit = (e) => {
    e.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)

    setTimeout(() => {
      const preset = ROLE_PRESETS[role]
      const inputId = (idNumber || '').trim().toUpperCase()
      const inputPass = (password || '').trim()

      if (!preset || inputId !== preset.id.toUpperCase() || inputPass !== preset.password) {
        setIsSubmitting(false)
        setErrorMessage('Invalid username or password')
        return
      }

      setIsSubmitting(false)
      // Reset inputs before completing login
      setIdNumber('')
      setPassword('')
      onLoginSuccess({
        ...preset,
        idNumber: preset.id
      })
    }, 350)
  }

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="court-auth-card" onClick={(e) => e.stopPropagation()}>
        {/* Top Close Button */}
        <button className="auth-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {/* Card Header Title */}
        <div className="auth-header-block">
          <h2>Court Services</h2>
          <p>Secure Portal</p>
        </div>

        {/* Sign In Header */}
        <div className="auth-tab-nav" style={{ justifyContent: 'center' }}>
          <button
            type="button"
            className="auth-tab-btn active"
            style={{ width: '100%', cursor: 'default' }}
          >
            Sign In to Portal
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

        {/* ERROR BANNER */}
        {errorMessage && (
          <div className="auth-error-banner">
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* SIGN IN FORM */}
        <form onSubmit={handleSignInSubmit} className="auth-form" autoComplete="off">
          <div className="auth-field">
            <label>{ROLE_PRESETS[role]?.idLabel || 'ID / Email / Bar ID'}</label>
            <input
              type="text"
              required
              value={idNumber}
              onChange={(e) => {
                setIdNumber(e.target.value)
                if (errorMessage) setErrorMessage('')
              }}
              placeholder={`Enter your ${ROLE_PRESETS[role]?.idLabel || 'ID'}`}
              autoComplete="off"
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <div className="password-input-row">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (errorMessage) setErrorMessage('')
                }}
                placeholder="Enter password"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="eye-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="auth-primary-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Authenticating...' : 'Sign In as ' + role}
          </button>
        </form>
      </div>
    </div>
  )
}
