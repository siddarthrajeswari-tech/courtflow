import React, { useState } from 'react'
import DashboardSidebar from '../components/dashboard/DashboardSidebar.jsx'
import DashboardHeader from '../components/dashboard/DashboardHeader.jsx'
import AdminOverview from '../components/dashboard/AdminOverview.jsx'
import JudgeDashboard from '../components/dashboard/JudgeDashboard.jsx'
import ScrutinyDashboard from '../components/dashboard/ScrutinyDashboard.jsx'
import AdvocateDashboard from '../components/dashboard/AdvocateDashboard.jsx'
import { sampleCasesData } from '../components/dashboard/CaseSearchInspector.jsx'
import '../components/dashboard/dashboard.css'
import { ShieldCheck } from 'lucide-react'

export default function Dashboard({ user, onOpenLogin, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCase, setSelectedCase] = useState(sampleCasesData[0])

  const isAdvocate = Boolean(
    (user && (
      user.role === 'Senior Advocate' ||
      user.role === 'Advocate' ||
      user.idNumber === 'ADV-5831' ||
      user.id === 'ADV-5831' ||
      (typeof user.name === 'string' && user.name.includes('Advocate'))
    )) || activeTab === 'my-cases' || activeTab === 'hearing-dates' || activeTab === 'case-status' || activeTab === 'documents'
  )

  const isScrutiny = Boolean(
    !isAdvocate && ((user && (
      user.role === 'Scrutiny Officer' ||
      user.role === 'Scrutiny Staff' ||
      user.idNumber === 'SCR-2045' ||
      user.id === 'SCR-2045' ||
      (typeof user.name === 'string' && user.name.includes('Scrutiny'))
    )) || activeTab.startsWith('scrutiny-') || activeTab === 'pending-scrutiny' || activeTab === 'doc-verification' || activeTab === 'compliance-check')
  )

  const isJudge = Boolean(
    !isAdvocate && !isScrutiny && ((user && (
      user.role === 'District Judge' ||
      user.role === 'Judge' ||
      user.idNumber === 'JDG-1024' ||
      user.id === 'JDG-1024' ||
      (typeof user.name === 'string' && (user.name.includes('Justice') || user.name.includes('Judge')))
    )) || activeTab === 'judge-dashboard')
  )

  const handleModuleClick = (moduleItem) => {
    alert(`Launching Module ${moduleItem.num}: ${moduleItem.name}\n${moduleItem.desc}`)
  }

  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
      <DashboardSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        user={user}
        onOpenLogin={onOpenLogin}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <div className="dashboard-main">
        {/* Top Sticky Header with Case Search Bar */}
        <DashboardHeader
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCase={selectedCase}
          setSelectedCase={setSelectedCase}
          user={user}
          onOpenLogin={onOpenLogin}
          onLogout={onLogout}
        />

        {/* Dynamic View Rendering based on Role */}
        {isAdvocate ? (
          <AdvocateDashboard user={user} onLogout={onLogout} />
        ) : isScrutiny ? (
          <ScrutinyDashboard user={user} onLogout={onLogout} />
        ) : isJudge ? (
          <JudgeDashboard user={user} onLogout={onLogout} />
        ) : (
          <AdminOverview onModuleClick={handleModuleClick} />
        )}

        {/* Dashboard Footer Bar */}
        <footer className="dash-footer-bar">
          <div>All times shown in IST</div>
          <div>Smart Court Intelligence v2.5.0</div>
          <div className="footer-secure-tag">
            <ShieldCheck size={14} /> Secured &amp; Encrypted
          </div>
        </footer>
      </div>
    </div>
  )
}
