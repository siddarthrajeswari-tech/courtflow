import React, { useState, useEffect } from 'react'
import { ArrowLeft, Eye, EyeOff, X, Shield, Lock, CheckCircle } from 'lucide-react'
import './LoginModal.css'

export const ROLE_PRESETS = {
  Judge: {
    id: 'JDG-1024',
    name: 'Hon. Justice Verma',
    role: 'District Judge',
    avatar: 'JV',
    email: 'verma.judge@court.gov.in'
  },
  Advocate: {
    id: 'ADV-5831',
    name: 'Adv. R. K. Sharma',
    role: 'Senior Advocate',
    avatar: 'RS',
    email: 'sharma.adv@bar.in'
  },
  'Scrutiny Staff': {
    id: 'SCR-2045',
    name: 'P. Ramesh',
    role: 'Scrutiny Officer',
    avatar: 'PR',
    email: 'ramesh.scrutiny@court.gov.in'
  },
  'Admin Staff': {
    id: 'ADM-3098',
    name: 'Court Administrator',
    role: 'System Administrator',
    avatar: 'AD',
    email: 'admin.staff@court.gov.in'
  }
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess, initialTab = 'signIn' }) {
  const [tab, setTab] = useState(initialTab) // 'signIn' | 'createAccount'
  const [role, setRole] = useState('Judge') // 'Judge' | 'Advocate' | 'Scrutiny Staff' | 'Admin Staff'
  
  // Form fields
  const [fullName, setFullName] = useState('Hon. Justice Verma')
  const [email, setEmail] = useState('verma.judge@court.gov.in')
  const [idNumber, setIdNumber] = useState('JDG-1024')
  const [password, setPassword] = useState('••••••••')
  const [confirmPassword, setConfirmPassword] = useState('••••••••')
  const [showPassword, setShowPassword] = useState(false)
  const [agreedTerms, setAgreedTerms] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setTab(initialTab)
  }, [initialTab, isOpen])

  if (!isOpen) return null

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole)
    const preset = ROLE_PRESETS[selectedRole]
    if (preset) {
      setIdNumber(preset.id)
      setFullName(preset.name)
      setEmail(preset.email)
    }
  }

  const handleSignInSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      const preset = ROLE_PRESETS[role] || {
        id: idNumber,
        name: fullName || 'Court User',
        role: role,
        avatar: role.substring(0, 2).toUpperCase(),
        email: email
      }

      setIsSubmitting(false)
      onLoginSuccess({
        ...preset,
        idNumber: idNumber || preset.id
      })
    }, 350)
  }

  const handleRegisterSubmit = (e) => {
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
      onLoginSuccess({
        id: idNumber || 'REG-9999',
        name: fullName || 'New Registered User',
        role: role,
        avatar: fullName ? fullName.split(' ').map(n => n[0]).join('').substring(0, 2) : 'US',
        email: email
      })
    }, 400)
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

        {/* Primary Tabs (Sign In / Create Account) */}
        <div className="auth-tab-nav">
          <button
            type="button"
            className={`auth-tab-btn ${tab === 'signIn' ? 'active' : ''}`}
            onClick={() => setTab('signIn')}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${tab === 'createAccount' ? 'active' : ''}`}
            onClick={() => setTab('createAccount')}
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

        {/* TAB 1: SIGN IN FORM */}
        {tab === 'signIn' && (
          <form onSubmit={handleSignInSubmit} className="auth-form">
            <div className="auth-field">
              <label>ID / Email / Bar ID</label>
              <input
                type="text"
                required
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                placeholder="Enter ID (e.g. JDG-1024, ADV-5831)"
              />
              <span className="field-hint">
                Default ID: <strong>{ROLE_PRESETS[role]?.id}</strong>
              </span>
            </div>

            <div className="auth-field">
              <label>Password</label>
              <div className="password-input-row">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
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
        )}

        {/* TAB 2: CREATE ACCOUNT FORM */}
        {tab === 'createAccount' && (
          <form onSubmit={handleRegisterSubmit} className="auth-form">
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
                Role ID: <strong>{ROLE_PRESETS[role]?.id}</strong>
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
        )}

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
