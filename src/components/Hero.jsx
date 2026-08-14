import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Building2, Landmark, ListChecks, Layers, Globe2, ChevronRight, X, AlertTriangle, Clock, Sparkles, ExternalLink } from 'lucide-react'
import { searchCases, findCaseByCNR } from '../utils/caseSearch.js'

export const sampleSearchCases = [
  {
    cnr: 'TNCH010045212021',
    title: 'State vs. R. Kumar & Ors',
    court: 'District & Sessions Court, XI - Chennai',
    category: 'Criminal Appeal',
    status: 'Pending (4.2 yrs)',
    riskLevel: 'Critical Risk',
    pendingYears: '4.2 years',
    previousAdjournments: 14,
    hearingsCompleted: 18,
    pendingApplications: 3,
    aiDelayRiskPct: 87,
    predictedAdditionalDelayMonths: '8.5 months',
    suggestedAction: 'Prioritize case conference + review pending applications.',
  },
  {
    cnr: 'DLCT020089122019',
    title: 'Mehra vs. Apex Logistics Ltd',
    court: 'District Commercial Court, South - New Delhi',
    category: 'Civil Suit (Commercial)',
    status: 'Pending (5.1 yrs)',
    riskLevel: 'Critical Risk',
    pendingYears: '5.1 years',
    previousAdjournments: 21,
    hearingsCompleted: 24,
    pendingApplications: 5,
    aiDelayRiskPct: 92,
    predictedAdditionalDelayMonths: '11.2 months',
    suggestedAction: 'Consolidate interim petitions + issue fixed timeline order.',
  },
  {
    cnr: 'MHOS030012342022',
    title: 'Patel Builders vs. Municipal Corp',
    court: 'City Civil Court, Borivali - Mumbai',
    category: 'Property Dispute',
    status: 'Pending (2.8 yrs)',
    riskLevel: 'High Risk',
    pendingYears: '2.8 years',
    previousAdjournments: 9,
    hearingsCompleted: 12,
    pendingApplications: 2,
    aiDelayRiskPct: 64,
    predictedAdditionalDelayMonths: '4.0 months',
    suggestedAction: 'Schedule advocate conference + fast-track evidence recording.',
  },
  {
    cnr: 'KABA040056782023',
    title: 'Venkatesh vs. State of Karnataka',
    court: 'High Court of Karnataka - Bengaluru',
    category: 'Writ Petition',
    status: 'Pending (1.6 yrs)',
    riskLevel: 'Medium Risk',
    pendingYears: '1.6 years',
    previousAdjournments: 5,
    hearingsCompleted: 8,
    pendingApplications: 1,
    aiDelayRiskPct: 38,
    predictedAdditionalDelayMonths: '2.1 months',
    suggestedAction: 'Await counter-affidavit filing + set final hearing date.',
  },
  {
    cnr: 'DLHC010099882021',
    title: 'Sharma & Sons vs. Union of India',
    court: 'High Court of Delhi - New Delhi',
    category: 'Taxation Appeal',
    status: 'Hearing Stage',
    riskLevel: 'High Risk',
    pendingYears: '3.4 years',
    previousAdjournments: 11,
    hearingsCompleted: 15,
    pendingApplications: 2,
    aiDelayRiskPct: 75,
    predictedAdditionalDelayMonths: '5.8 months',
    suggestedAction: 'Expedite written submissions review.',
  },
  {
    cnr: 'MHCC020044552020',
    title: 'Rajesh Verma vs. ICICI Bank',
    court: 'City Civil Court - Mumbai',
    category: 'Banking & Finance',
    status: 'Evidence Stage',
    riskLevel: 'Medium Risk',
    pendingYears: '4.0 years',
    previousAdjournments: 12,
    hearingsCompleted: 16,
    pendingApplications: 1,
    aiDelayRiskPct: 58,
    predictedAdditionalDelayMonths: '3.2 months',
    suggestedAction: 'Schedule cross-examination dates.',
  },
  {
    cnr: 'UPAH050011222022',
    title: 'Sunita Devi vs. State of UP',
    court: 'Allahabad High Court - Prayagraj',
    category: 'Criminal Writ',
    status: 'Notice Issued',
    riskLevel: 'High Risk',
    pendingYears: '2.1 years',
    previousAdjournments: 7,
    hearingsCompleted: 9,
    pendingApplications: 2,
    aiDelayRiskPct: 71,
    predictedAdditionalDelayMonths: '4.9 months',
    suggestedAction: 'Track service of notice to respondents.',
  },
]

export default function Hero() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All India')
  const [selectedCase, setSelectedCase] = useState(null)
  const navigate = useNavigate()
  const searchContainerRef = useRef(null)

  const filteredCases = query.trim() ? searchCases(query, 12) : []

  useEffect(() => {
    if (query.trim().length > 0) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [query])

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectCase = (c) => {
    setSelectedCase(c)
    setIsOpen(false)
    navigate(`/case-details/${encodeURIComponent(c.cnr_number || c.cnr)}`)
  }

  const handleOpenDashboard = (c) => {
    navigate('/dashboard', { state: { selectedCase: c, searchQuery: c ? c.cnr : query } })
  }

  const handleFilterClick = (filterName, presetQuery = '') => {
    setActiveFilter(filterName)
    if (presetQuery) {
      setQuery(presetQuery)
    }
  }

  const handleSubmitSearch = (e) => {
    e.preventDefault()
    const q = query.trim()
    if (q) {
      const match = findCaseByCNR(q) || (searchCases(q, 1)[0])
      const cnrToNavigate = match ? (match.cnr_number || match.cnr) : q
      navigate(`/case-details/${encodeURIComponent(cnrToNavigate)}`)
    }
  }

  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <h2>
            Smarter Insights.<br />
            Faster Disposal. Less Pendency.
          </h2>
          <p>
            Real-time analytics and AI-driven insights to reduce legal pendency
            and improve court flow management across India.
          </p>

          <div className="hero-search-wrapper" ref={searchContainerRef}>
            <form className="search-bar" onSubmit={handleSubmitSearch}>
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Enter CNR Number"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                
              />
              {query && (
                <button
                  type="button"
                  className="clear-hero-search-btn"
                  onClick={() => {
                    setQuery('')
                    setIsOpen(false)
                  }}
                  title="Clear search"
                >
                  <X size={16} />
                </button>
              )}
              <button type="submit">
                <Search size={16} /> Search
              </button>
            </form>
          </div>

          {/* In-place Case Inspector Modal for Home Page */}
          {selectedCase && (
            <div className="case-ai-card-modal" style={{ marginTop: '16px', border: '1px solid #cbd5e1', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}>
              <div className="case-card-header">
                <div className="case-header-title-group">
                  <div className="case-badge-pill">{selectedCase.category}</div>
                  <h3 className="case-title">{selectedCase.title}</h3>
                  <div className="case-subtitle">
                    <span>CNR: <strong>{selectedCase.cnr}</strong></span> &bull; <span>{selectedCase.court}</span>
                  </div>
                </div>
                <button className="close-card-btn" onClick={() => setSelectedCase(null)} title="Close Inspector">
                  <X size={18} />
                </button>
              </div>

              <div className="case-metrics-grid">
                <div className="case-metric-box">
                  <span className="case-metric-label">Pending</span>
                  <span className="case-metric-val">{selectedCase.pendingYears || selectedCase.status}</span>
                </div>
                <div className="case-metric-box">
                  <span className="case-metric-label">Previous adjournments</span>
                  <span className="case-metric-val">{selectedCase.previousAdjournments || 12} adjournments</span>
                </div>
                <div className="case-metric-box">
                  <span className="case-metric-label">Hearings completed</span>
                  <span className="case-metric-val">{selectedCase.hearingsCompleted || 15} hearings</span>
                </div>
                <div className="case-metric-box">
                  <span className="case-metric-label">Pending applications</span>
                  <span className="case-metric-val">{selectedCase.pendingApplications || 2} interim applications</span>
                </div>
              </div>

              <div className="case-ai-risk-row">
                <div className="ai-risk-item red-tone">
                  <AlertTriangle size={20} className="ai-risk-icon" />
                  <div className="ai-risk-info">
                    <span className="ai-risk-label">AI Delay Risk</span>
                    <span className="ai-risk-val">{selectedCase.aiDelayRiskPct || 85}%</span>
                  </div>
                </div>
                <div className="ai-risk-item orange-tone">
                  <Clock size={20} className="ai-risk-icon" />
                  <div className="ai-risk-info">
                    <span className="ai-risk-label">Predicted Additional Delay</span>
                    <span className="ai-risk-val">{selectedCase.predictedAdditionalDelayMonths || '8 months'}</span>
                  </div>
                </div>
              </div>

              <div className="case-suggested-action-box">
                <div className="action-box-header">
                  <Sparkles size={16} className="action-sparkle-icon" />
                  <span>Suggested Action:</span>
                </div>
                <div className="action-box-text">
                  {selectedCase.suggestedAction || 'Prioritize case conference + review pending applications.'}
                </div>
              </div>

              <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => handleOpenDashboard(selectedCase)}
                  className="primary-btn"
                  style={{ fontSize: '13px', padding: '8px 16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  View Full Analytics in Dashboard <ExternalLink size={14} />
                </button>
              </div>
            </div>
          )}

          <div className="filter-chips">
            <button
              className={`chip ${activeFilter === 'All India' ? 'chip-active' : ''}`}
              onClick={() => handleFilterClick('All India', '')}
            >
              <Globe2 size={14} /> All India
            </button>
            <button
              className={`chip ${activeFilter === 'High Courts' ? 'chip-active' : ''}`}
              onClick={() => handleFilterClick('High Courts', 'High Court')}
            >
              <Landmark size={14} /> High Courts
            </button>
            <button
              className={`chip ${activeFilter === 'District Courts' ? 'chip-active' : ''}`}
              onClick={() => handleFilterClick('District Courts', 'District Court')}
            >
              <Building2 size={14} /> District Courts
            </button>
            <button
              className={`chip ${activeFilter === 'Case Status' ? 'chip-active' : ''}`}
              onClick={() => handleFilterClick('Case Status', 'State')}
            >
              <ListChecks size={14} /> Case Status
            </button>
            <button
              className={`chip ${activeFilter === 'Case Type' ? 'chip-active' : ''}`}
              onClick={() => handleFilterClick('Case Type', 'Appeal')}
            >
              <Layers size={14} /> Case Type
            </button>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="hero-art-glow" />
          <img
            src="/court_ai_building.png"
            alt="AI Smart Court Architecture"
            className="courthouse-ai-img"
          />
        </div>
      </div>
    </section>
  )
}
