import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Copy,
  Check,
  Building2,
  Calendar,
  Clock,
  FileText,
  AlertTriangle,
  Sparkles,
  Users,
  Scale,
  Download,
  Printer,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { findCaseByCNR } from '../utils/caseSearch.js'
import './CaseDetailsPage.css'

export default function CaseDetailsPage({ user, onOpenLogin }) {
  const { cnrNumber } = useParams()
  const navigate = useNavigate()
  const [caseData, setCaseData] = useState(null)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (cnrNumber) {
      const found = findCaseByCNR(cnrNumber)
      setCaseData(found)
    }
  }, [cnrNumber])

  const handleCopyCNR = () => {
    if (caseData?.cnr_number) {
      navigator.clipboard.writeText(caseData.cnr_number)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  if (!caseData) {
    return (
      <div className="case-details-wrapper">
        <div className="case-details-container">
          <div className="case-details-top-bar">
            <Link to="/" className="back-link-btn">
              <ArrowLeft size={16} /> Back to Search
            </Link>
          </div>
          <div className="not-found-card">
            <AlertCircle size={48} color="#ef4444" style={{ margin: '0 auto 16px' }} />
            <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 8px 0' }}>Case Not Found</h2>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
              No case details found for CNR / Case ID: "<strong>{cnrNumber}</strong>".
            </p>
            <Link to="/" className="action-primary-btn" style={{ display: 'inline-flex' }}>
              Try Searching Another CNR
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const statusClass = caseData.status.toLowerCase().includes('pending')
    ? 'pending'
    : caseData.status.toLowerCase().includes('reserved') || caseData.status.toLowerCase().includes('arguments')
    ? 'reserved'
    : 'evidence'

  const priorityClass = (caseData.priority || 'Medium').toLowerCase()
  const riskClass = (caseData.predicted_delay_risk || 'Low').toLowerCase()

  return (
    <div className="case-details-wrapper">
      <div className="case-details-container">
        {/* Top Navigation & Actions */}
        <div className="case-details-top-bar">
          <Link to="/" className="back-link-btn">
            <ArrowLeft size={16} /> Back to Home Search
          </Link>
          <div className="case-action-group">
            <button className="action-outline-btn" onClick={handlePrint} title="Print Case Summary">
              <Printer size={15} /> Print Record
            </button>
            <button
              className="action-primary-btn"
              onClick={() => navigate('/dashboard', { state: { selectedCase: caseData, searchQuery: caseData.cnr_number } })}
            >
              View in Dashboard <ExternalLink size={14} />
            </button>
          </div>
        </div>

        {/* Case Header Banner */}
        <div className="case-header-card">
          <div className="case-header-meta">
            <div className="case-cnr-badge">
              <span>CNR: {caseData.cnr_number}</span>
              <button className="copy-cnr-btn" onClick={handleCopyCNR} title="Copy CNR Number">
                {copied ? <Check size={14} color="#4ade80" /> : <Copy size={14} />}
              </button>
            </div>
            <span className={`case-status-badge ${statusClass}`}>{caseData.status}</span>
            <span className={`case-priority-badge ${priorityClass}`}>{caseData.priority} Priority</span>
            {caseData.case_id && (
              <span style={{ fontSize: '12px', color: '#94a3b8', background: 'rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: '6px' }}>
                Case ID: {caseData.case_id}
              </span>
            )}
          </div>

          <h1 className="case-header-title">{caseData.title}</h1>

          <div className="case-header-court">
            <Building2 size={16} color="#38bdf8" />
            <span>{caseData.court}</span>
          </div>
        </div>

        {/* Key Information Grid */}
        <div className="case-details-grid">
          <div className="detail-metric-card">
            <div className="metric-icon-box blue">
              <Scale size={22} />
            </div>
            <div className="metric-content">
              <div className="metric-label">Case Category</div>
              <div className="metric-val">{caseData.case_type}</div>
              {caseData.case_subtype && <div className="metric-sub">{caseData.case_subtype}</div>}
            </div>
          </div>

          <div className="detail-metric-card">
            <div className="metric-icon-box orange">
              <Clock size={22} />
            </div>
            <div className="metric-content">
              <div className="metric-label">Days Pending</div>
              <div className="metric-val">{caseData.days_pending} Days</div>
              <div className="metric-sub">~ {caseData.pendingYears}</div>
            </div>
          </div>

          <div className="detail-metric-card">
            <div className="metric-icon-box purple">
              <Calendar size={22} />
            </div>
            <div className="metric-content">
              <div className="metric-label">Filing Date</div>
              <div className="metric-val">{caseData.filing_date}</div>
              <div className="metric-sub">Registered Entry</div>
            </div>
          </div>

          <div className="detail-metric-card">
            <div className="metric-icon-box green">
              <FileText size={22} />
            </div>
            <div className="metric-content">
              <div className="metric-label">Hearings & Adjournments</div>
              <div className="metric-val">{caseData.number_of_hearings} Hearings</div>
              <div className="metric-sub">{caseData.adjournment_count} Adjournments Granted</div>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="case-content-layout">
          {/* Left Column: Details & Timeline */}
          <div className="left-column">
            {/* Parties Card */}
            <div className="case-section-card">
              <div className="section-title-bar">
                <Users size={18} color="#2563eb" />
                <h3>Parties Involved</h3>
              </div>
              <div className="parties-grid">
                <div className="party-box">
                  <div className="party-role">Petitioner / Plaintiff</div>
                  <div className="party-name">{caseData.petitioner}</div>
                </div>
                <div className="party-box">
                  <div className="party-role">Respondent / Defendant</div>
                  <div className="party-name">{caseData.respondent}</div>
                </div>
              </div>
            </div>

            {/* Case Details & Law Reference */}
            <div className="case-section-card">
              <div className="section-title-bar">
                <FileText size={18} color="#2563eb" />
                <h3>Case Summary & Statutory Reference</h3>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                  Law Reference / Act
                </span>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', marginTop: '4px' }}>
                  {caseData.law_reference}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                  Case Description
                </span>
                <p style={{ fontSize: '14px', color: '#334155', lineHeight: '1.6', marginTop: '6px' }}>
                  {caseData.description}
                </p>
              </div>
            </div>

            {/* Case Stage Lifecycle Timeline */}
            <div className="case-section-card">
              <div className="section-title-bar">
                <CheckCircle2 size={18} color="#16a34a" />
                <h3>Case Lifecycle & Stages</h3>
              </div>

              <div className="case-timeline">
                <div className="timeline-step completed">
                  <div className="timeline-dot" />
                  <div className="timeline-title">1. e-Filing & Registration Completed</div>
                  <div className="timeline-desc">Filed on {caseData.filing_date}</div>
                </div>

                <div className="timeline-step completed">
                  <div className="timeline-dot" />
                  <div className="timeline-title">2. Scrutiny & Compliance Check Pass</div>
                  <div className="timeline-desc">Registry verification completed</div>
                </div>

                <div className="timeline-step active">
                  <div className="timeline-dot" />
                  <div className="timeline-title">3. Notice Issued & Evidence Stage</div>
                  <div className="timeline-desc">Current Active Stage ({caseData.evidence_count} evidence records, {caseData.witness_count} witnesses)</div>
                </div>

                <div className="timeline-step">
                  <div className="timeline-dot" />
                  <div className="timeline-title">4. Arguments & Final Hearing</div>
                  <div className="timeline-desc">Pending completion of evidence examination</div>
                </div>

                <div className="timeline-step">
                  <div className="timeline-dot" />
                  <div className="timeline-title">5. Final Judgment & Order</div>
                  <div className="timeline-desc">Pending final bench order</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: AI Analytics & Recommendations */}
          <div className="right-column">
            {/* AI Risk & Delay Card */}
            <div className={`ai-risk-card ${riskClass}`}>
              <div className="ai-risk-header">
                <AlertTriangle size={20} />
                <span>AI Pendency & Delay Risk</span>
              </div>

              <div className="ai-risk-metrics">
                <div className="ai-stat-item">
                  <span className="ai-stat-label">Predicted Risk</span>
                  <span className="ai-stat-val">{caseData.predicted_delay_risk}</span>
                </div>
                <div className="ai-stat-item">
                  <span className="ai-stat-label">Complexity</span>
                  <span className="ai-stat-val">{caseData.complexity}</span>
                </div>
              </div>

              <div className="action-recommendation">
                <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <Sparkles size={14} color="#ea580c" /> Recommended Action Queue:
                </div>
                {caseData.recommended_queue}
              </div>
            </div>

            {/* Quick Metadata Box */}
            <div className="case-section-card">
              <div className="section-title-bar">
                <ShieldCheck size={18} color="#2563eb" />
                <h3>Case Attributes</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                  <span style={{ color: '#64748b' }}>Evidence Count</span>
                  <strong style={{ color: '#0f172a' }}>{caseData.evidence_count} Record(s)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                  <span style={{ color: '#64748b' }}>Witness Count</span>
                  <strong style={{ color: '#0f172a' }}>{caseData.witness_count} Witness(es)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                  <span style={{ color: '#64748b' }}>Hearings Conducted</span>
                  <strong style={{ color: '#0f172a' }}>{caseData.number_of_hearings}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: '#64748b' }}>Adjournments</span>
                  <strong style={{ color: '#b91c1c' }}>{caseData.adjournment_count} Times</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
