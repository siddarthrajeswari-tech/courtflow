import React, { useState, useEffect, useRef } from 'react'
import { Search, AlertTriangle, Clock, Calendar, FileText, CheckCircle2, Sparkles, X, ChevronRight, History, ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { searchCases, findCaseByCNR } from '../../utils/caseSearch.js'
import Stack from '../ui/Stack.jsx'

export const sampleCasesData = [
  {
    cnr: 'TNCH010045212021',
    title: 'State vs. R. Kumar & Ors',
    court: 'District & Sessions Court, XI - Chennai',
    category: 'Criminal Appeal',
    pendingYears: '4.2 years',
    previousAdjournments: 14,
    hearingsCompleted: 18,
    pendingApplications: 3,
    aiDelayRiskPct: 87,
    riskLevel: 'Critical Risk',
    predictedAdditionalDelayMonths: '8.5 months',
    suggestedAction: 'Prioritize case conference + review pending applications.',
  },
  {
    cnr: 'DLCT020089122019',
    title: 'Mehra vs. Apex Logistics Ltd',
    court: 'District Commercial Court, South - New Delhi',
    category: 'Civil Suit (Commercial)',
    pendingYears: '5.1 years',
    previousAdjournments: 21,
    hearingsCompleted: 24,
    pendingApplications: 5,
    aiDelayRiskPct: 92,
    riskLevel: 'Critical Risk',
    predictedAdditionalDelayMonths: '11.2 months',
    suggestedAction: 'Consolidate interim petitions + issue fixed timeline order.',
  },
  {
    cnr: 'MHOS030012342022',
    title: 'Patel Builders vs. Municipal Corp',
    court: 'City Civil Court, Borivali - Mumbai',
    category: 'Property Dispute',
    pendingYears: '2.8 years',
    previousAdjournments: 9,
    hearingsCompleted: 12,
    pendingApplications: 2,
    aiDelayRiskPct: 64,
    riskLevel: 'High Risk',
    predictedAdditionalDelayMonths: '4.0 months',
    suggestedAction: 'Schedule advocate conference + fast-track evidence recording.',
  },
  {
    cnr: 'KABA040056782023',
    title: 'Venkatesh vs. State of Karnataka',
    court: 'High Court of Karnataka - Bengaluru',
    category: 'Writ Petition',
    pendingYears: '1.6 years',
    previousAdjournments: 5,
    hearingsCompleted: 8,
    pendingApplications: 1,
    aiDelayRiskPct: 38,
    riskLevel: 'Medium Risk',
    predictedAdditionalDelayMonths: '2.1 months',
    suggestedAction: 'Await counter-affidavit filing + set final hearing date.',
  },
]

export default function CaseSearchInspector({ searchQuery, setSearchQuery, selectedCase, setSelectedCase }) {
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [historyStack, setHistoryStack] = useState(() => [
    sampleCasesData[0],
    sampleCasesData[1]
  ])
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  // Search live from 1,200 court cases dataset
  const filteredCases = searchQuery.trim() ? searchCases(searchQuery, 10) : []

  // Ctrl+K / Cmd+K global shortcut listener
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      setDropdownOpen(true)
    } else {
      setDropdownOpen(false)
    }
  }, [searchQuery])

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setDropdownOpen(false)
        setHistoryOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (c) => {
    setSelectedCase(c)
    setDropdownOpen(false)
    setHistoryOpen(false)
    setHistoryStack((prev) => [c, ...prev.filter((item) => (item.cnr_number || item.cnr) !== (c.cnr_number || c.cnr))])
    navigate(`/case-details/${encodeURIComponent(c.cnr_number || c.cnr)}`)
  }

  const handleClearHistory = () => {
    setHistoryStack([])
    setHistoryOpen(false)
  }

  return (
    <div className="case-inspector-wrapper" ref={containerRef}>
      {/* Global Search Bar with Live Suggestions & History Stack Button */}
      <div className="dash-search-container" style={{ display: 'flex', alignItems: 'center' }}>
        <Search size={16} className="search-icon-left" />
        <input
          ref={inputRef}
          type="text"
          className="dash-search-input"
          placeholder="Search CNR (e.g. TNCH010045212021), Case No., Party... (Ctrl + K)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery.trim() && setDropdownOpen(true)}
        />

        {searchQuery ? (
          <button
            className="clear-search-btn"
            onClick={() => {
              setSearchQuery('')
              setDropdownOpen(false)
            }}
          >
            <X size={14} />
          </button>
        ) : (
          <button
            type="button"
            className="stack-action-btn"
            onClick={() => setHistoryOpen(!historyOpen)}
            title="Recent Search History Stack"
            style={{ marginRight: '6px' }}
          >
            <History size={13} /> History ({historyStack.length})
          </button>
        )}

        {/* Recent Search History Stack Dropdown */}
        {historyOpen && !dropdownOpen && (
          <div
            className="search-results-dropdown"
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: '6px',
              background: '#ffffff',
              borderRadius: '10px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              border: '1px solid #e2e8f0',
              zIndex: 100,
            }}
          >
            <Stack
              items={historyStack}
              onSelectItem={handleSelect}
              onClearStack={handleClearHistory}
            />
          </div>
        )}

        {/* Live Search Suggestions Dropdown */}
        {dropdownOpen && (
          <div className="search-results-dropdown">
            <div className="search-dropdown-header">
              <span>Matching Cases ({filteredCases.length})</span>
              <span className="search-hint">Click a case to inspect AI Risk analysis</span>
            </div>
            {filteredCases.length > 0 ? (
              filteredCases.map((c) => (
                <div
                  key={c.cnr}
                  className={`search-result-item ${selectedCase?.cnr === c.cnr ? 'selected' : ''}`}
                  onClick={() => handleSelect(c)}
                >
                  <div className="result-item-top">
                    <span className="result-cnr">{c.cnr}</span>
                    <span className={`result-risk-badge risk-${c.aiDelayRiskPct > 80 ? 'red' : 'orange'}`}>
                      {c.aiDelayRiskPct}% AI Risk
                    </span>
                  </div>
                  <div className="result-item-title">{c.title}</div>
                  <div className="result-item-court">{c.court}</div>
                </div>
              ))
            ) : (
              <div className="no-search-results">
                No matching case found. Try searching <strong>TNCH010045212021</strong> or <strong>State vs. R. Kumar</strong>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Selected Case Inspection Drawer / Banner */}
      {selectedCase && (
        <div className="case-ai-card-modal">
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

          {/* User Requested Case Metrics Grid */}
          <div className="case-metrics-grid">
            <div className="case-metric-box">
              <span className="case-metric-label">Pending</span>
              <span className="case-metric-val">{selectedCase.pendingYears}</span>
            </div>

            <div className="case-metric-box">
              <span className="case-metric-label">Previous adjournments</span>
              <span className="case-metric-val">{selectedCase.previousAdjournments} adjournments</span>
            </div>

            <div className="case-metric-box">
              <span className="case-metric-label">Hearings completed</span>
              <span className="case-metric-val">{selectedCase.hearingsCompleted} hearings</span>
            </div>

            <div className="case-metric-box">
              <span className="case-metric-label">Pending applications</span>
              <span className="case-metric-val">{selectedCase.pendingApplications} interim applications</span>
            </div>
          </div>

          {/* User Requested AI Delay Risk & Predicted Additional Delay */}
          <div className="case-ai-risk-row">
            <div className="ai-risk-item red-tone">
              <AlertTriangle size={20} className="ai-risk-icon" />
              <div className="ai-risk-info">
                <span className="ai-risk-label">AI Delay Risk</span>
                <span className="ai-risk-val">{selectedCase.aiDelayRiskPct}%</span>
              </div>
            </div>

            <div className="ai-risk-item orange-tone">
              <Clock size={20} className="ai-risk-icon" />
              <div className="ai-risk-info">
                <span className="ai-risk-label">Predicted Additional Delay</span>
                <span className="ai-risk-val">{selectedCase.predictedAdditionalDelayMonths}</span>
              </div>
            </div>
          </div>

          {/* User Requested Suggested Action */}
          <div className="case-suggested-action-box">
            <div className="action-box-header">
              <Sparkles size={16} className="action-sparkle-icon" />
              <span>Suggested Action:</span>
            </div>
            <div className="action-box-text">
              {selectedCase.suggestedAction}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
