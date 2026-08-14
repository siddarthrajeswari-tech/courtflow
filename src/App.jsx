import React, { useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import CaseDetailsPage from './pages/CaseDetailsPage.jsx'
import LoginModal from './components/LoginModal.jsx'

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const isDashboard = location.pathname.startsWith('/dashboard')
  const isStandaloneAuth = location.pathname === '/register' || location.pathname === '/login'
  const [user, setUser] = useState(null) // null when logged out by default
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [modalTab, setModalTab] = useState('signIn')

  const handleOpenLogin = (tab = 'signIn') => {
    setModalTab(tab)
    setIsLoginModalOpen(true)
  }
  const handleCloseLogin = () => setIsLoginModalOpen(false)

  const handleLogout = () => {
    setUser(null)
    navigate('/')
  }

  const handleLoginSuccess = (userData) => {
    setUser(userData)
    setIsLoginModalOpen(false)
    navigate('/dashboard')
  }

  return (
    <div className="app-shell">
      {!isDashboard && !isStandaloneAuth && (
        <Header
          user={user}
          onOpenLogin={() => handleOpenLogin('signIn')}
          onLogout={handleLogout}
        />
      )}
      <main style={{ minHeight: isDashboard || isStandaloneAuth ? '100vh' : 'auto' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                user={user}
                onOpenLogin={() => handleOpenLogin('signIn')}
                onLogout={handleLogout}
              />
            }
          />
          <Route
            path="/case-details/:cnrNumber"
            element={<CaseDetailsPage user={user} onOpenLogin={() => handleOpenLogin('signIn')} />}
          />
          <Route
            path="/case/:cnrNumber"
            element={<CaseDetailsPage user={user} onOpenLogin={() => handleOpenLogin('signIn')} />}
          />
          <Route
            path="/register"
            element={<RegisterPage onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/login"
            element={<RegisterPage onLoginSuccess={handleLoginSuccess} />}
          />
        </Routes>
      </main>
      {!isDashboard && !isStandaloneAuth && <Footer />}

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseLogin}
        onLoginSuccess={handleLoginSuccess}
        initialTab={modalTab}
      />
    </div>
  )
}
