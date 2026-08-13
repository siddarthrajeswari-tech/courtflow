import React, { useState } from 'react'
import {
  X,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Save,
  Plus,
  Trash2,
  UploadCloud,
  FileText,
  UserPlus,
  Scale,
  Building,
  Calendar,
  DollarSign,
  AlertCircle,
  Sparkles,
  Tag
} from 'lucide-react'
import './CaseRegistrationModal.css'

const DEFAULT_CLIENTS = [
  { id: 'CLI-001', name: 'Rajesh Kumar & Sons', phone: '+91 98765 43210', email: 'rajesh@kumar.in' },
  { id: 'CLI-002', name: 'Apex Logistics Pvt Ltd', phone: '+91 98123 45678', email: 'legal@apexlogistics.com' },
  { id: 'CLI-003', name: 'Sunita Devi', phone: '+91 99887 76655', email: 'sunita.devi@gmail.com' },
  { id: 'CLI-004', name: 'Patel Builders Group', phone: '+91 97654 32109', email: 'contact@patelbuilders.in' },
]

export default function CaseRegistrationModal({ isOpen, onClose, onSaveCase }) {
  const [step, setStep] = useState(1)

  // Step 1: Case & Court Basics
  const [refId, setRefId] = useState(() => `REF-2025-${Math.floor(1000 + Math.random() * 9000)}`)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Civil')
  const [court, setCourt] = useState('')
  const [cnr, setCnr] = useState('')
  const [caseNo, setCaseNo] = useState('')
  const [filingNo, setFilingNo] = useState('')
  const [stage, setStage] = useState('Pre-Filing')

  // Step 2: Parties & Representation
  const [clientRole, setClientRole] = useState('Petitioner/Plaintiff')
  const [clientList, setClientList] = useState(DEFAULT_CLIENTS)
  const [selectedClientId, setSelectedClientId] = useState('')
  const [clientName, setClientName] = useState('')
  const [opposingParty, setOpposingParty] = useState('')
  const [opposingAddress, setOpposingAddress] = useState('')
  const [opposingCounsel, setOpposingCounsel] = useState('')
  const [opposingFirm, setOpposingFirm] = useState('')

  // Quick Add Client Sub-Modal
  const [quickClientOpen, setQuickClientOpen] = useState(false)
  const [newClientName, setNewClientName] = useState('')
  const [newClientPhone, setNewClientPhone] = useState('')
  const [newClientEmail, setNewClientEmail] = useState('')

  // Step 3: Legal Details & Dates
  const [actsTags, setActsTags] = useState(['IPC Sec 420', 'NI Act Sec 138'])
  const [tagInput, setTagInput] = useState('')
  const [caseBrief, setCaseBrief] = useState('')
  const [reliefSought, setReliefSought] = useState('')
  const [filingDate, setFilingDate] = useState('2025-05-15')
  const [firstHearingDate, setFirstHearingDate] = useState('2025-06-10')
  const [limitationDate, setLimitationDate] = useState('')

  // Step 4: Financials & Documents
  const [billingType, setBillingType] = useState('Flat Fee')
  const [agreedFee, setAgreedFee] = useState(50000)
  const [advanceAmount, setAdvanceAmount] = useState(15000)
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: 'Vakalatnama_Signed.pdf', size: '1.2 MB' },
    { name: 'Plaint_Copy_Draft.pdf', size: '2.8 MB' }
  ])

  // Validation & Toast state
  const [errors, setErrors] = useState({})
  const [toastMsg, setToastMsg] = useState('')

  if (!isOpen) return null

  const showToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 3000)
  }

  // Handle Tag Input for Acts & Sections
  const handleAddTag = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault()
      if (!actsTags.includes(tagInput.trim())) {
        setActsTags([...actsTags, tagInput.trim()])
      }
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setActsTags(actsTags.filter((t) => t !== tagToRemove))
  }

  // Quick Add Client Submit
  const handleCreateClient = (e) => {
    e.preventDefault()
    if (!newClientName.trim()) return

    const created = {
      id: `CLI-${Math.floor(100 + Math.random() * 900)}`,
      name: newClientName,
      phone: newClientPhone,
      email: newClientEmail
    }

    setClientList([...clientList, created])
    setSelectedClientId(created.id)
    setClientName(created.name)
    setQuickClientOpen(false)
    setNewClientName('')
    setNewClientPhone('')
    setNewClientEmail('')
    showToast(`Client "${created.name}" added successfully!`)
  }

  // Client Selection Change
  const handleClientSelect = (id) => {
    setSelectedClientId(id)
    const found = clientList.find((c) => c.id === id)
    if (found) {
      setClientName(found.name)
    }
  }

  // File Upload Simulator
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || [])
    const formatted = files.map((f) => ({
      name: f.name,
      size: (f.size / (1024 * 1024)).toFixed(2) + ' MB'
    }))
    setUploadedFiles([...uploadedFiles, ...formatted])
    showToast(`${files.length} document(s) attached.`)
  }

  const handleRemoveFile = (idx) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== idx))
  }

  // Step Validation Check
  const validateCurrentStep = () => {
    const errs = {}
    if (step === 1) {
      if (!title.trim()) errs.title = 'Case Title is required.'
      if (!court.trim()) errs.court = 'Court Name is required.'
    } else if (step === 2) {
      if (!clientName.trim()) errs.clientName = 'Client selection or name is required.'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNext = () => {
    if (validateCurrentStep()) {
      setStep((prev) => Math.min(prev + 1, 4))
    }
  }

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSaveDraft = () => {
    showToast('Case draft saved successfully!')
  }

  const handleSubmitCase = (e) => {
    e.preventDefault()
    if (!validateCurrentStep()) return

    const newCase = {
      caseNo: caseNo || `C/2025/${Math.floor(1000 + Math.random() * 9000)}`,
      title: title || 'Untitled Case',
      nextHearing: firstHearingDate ? new Date(firstHearingDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '10 Jun 2025',
      status: stage || 'Pending',
      statusClass: 'status-pending',
      priority: 'High',
      priorityClass: 'p-high',
      cnr: cnr || 'TNCH0100' + Math.floor(10000000 + Math.random() * 90000000),
      court: court || 'District Court, Chennai',
      category: category,
      clientName: clientName,
      billingType: billingType,
      agreedFee: agreedFee,
      advanceAmount: advanceAmount,
      actsTags: actsTags,
    }

    if (onSaveCase) {
      onSaveCase(newCase)
    }

    showToast('Case Registered Successfully!')
    setTimeout(() => {
      onClose()
    }, 600)
  }

  return (
    <div className="case-reg-overlay" onClick={onClose}>
      <div className="case-reg-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="case-reg-header">
          <div className="case-reg-title-group">
            <h2>
              <Scale size={20} className="text-blue-400" /> New Case Entry &amp; Registration
            </h2>
            <p>Reference Ref ID: <strong>{refId}</strong></p>
          </div>
          <button className="case-reg-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* 4-Step Wizard Stepper Header */}
        <div className="wizard-stepper">
          <div
            className={`step-item ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}`}
            onClick={() => setStep(1)}
          >
            <div className="step-number">{step > 1 ? <CheckCircle size={16} /> : 1}</div>
            <div className="step-text">
              <span className="step-label">Step 1</span>
              <span className="step-title">Basics &amp; Court</span>
            </div>
          </div>

          <div className="step-divider" />

          <div
            className={`step-item ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}`}
            onClick={() => validateCurrentStep() && setStep(2)}
          >
            <div className="step-number">{step > 2 ? <CheckCircle size={16} /> : 2}</div>
            <div className="step-text">
              <span className="step-label">Step 2</span>
              <span className="step-title">Parties</span>
            </div>
          </div>

          <div className="step-divider" />

          <div
            className={`step-item ${step === 3 ? 'active' : step > 3 ? 'completed' : ''}`}
            onClick={() => validateCurrentStep() && setStep(3)}
          >
            <div className="step-number">{step > 3 ? <CheckCircle size={16} /> : 3}</div>
            <div className="step-text">
              <span className="step-label">Step 3</span>
              <span className="step-title">Legal Details</span>
            </div>
          </div>

          <div className="step-divider" />

          <div
            className={`step-item ${step === 4 ? 'active' : ''}`}
            onClick={() => validateCurrentStep() && setStep(4)}
          >
            <div className="step-number">4</div>
            <div className="step-text">
              <span className="step-label">Step 4</span>
              <span className="step-title">Billing &amp; Docs</span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="case-reg-body">
          {/* STEP 1: CASE & COURT BASICS */}
          {step === 1 && (
            <div className="form-step-content">
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Internal Reference ID</label>
                  <input type="text" className="form-control" value={refId} readOnly style={{ background: '#f1f5f9' }} />
                </div>

                <div className="form-group">
                  <label>
                    Case Category <span className="req-star">*</span>
                  </label>
                  <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Civil">Civil Suit</option>
                    <option value="Criminal">Criminal Appeal / Writ</option>
                    <option value="Family">Family / Matrimonial</option>
                    <option value="High Court">High Court Writ</option>
                    <option value="Consumer">Consumer Dispute</option>
                    <option value="Tax">Taxation &amp; Revenue</option>
                    <option value="Commercial">Commercial Dispute</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>
                  Case Title / Name <span className="req-star">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.title ? 'has-error' : ''}`}
                  placeholder="e.g. Mehra vs. Apex Logistics Ltd"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && <span className="form-error-msg">{errors.title}</span>}
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>
                    Court / Forum Name <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.court ? 'has-error' : ''}`}
                    placeholder="e.g. District Commercial Court, South Delhi"
                    value={court}
                    onChange={(e) => setCourt(e.target.value)}
                  />
                  {errors.court && <span className="form-error-msg">{errors.court}</span>}
                </div>

                <div className="form-group">
                  <label>CNR Number (Unique ID)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. DLCT020089122019"
                    value={cnr}
                    onChange={(e) => setCnr(e.target.value.toUpperCase())}
                  />
                  <span className="field-hint">16-character unique court case identification code</span>
                </div>
              </div>

              <div className="form-grid-3">
                <div className="form-group">
                  <label>Court Case Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. C/2025/0891"
                    value={caseNo}
                    onChange={(e) => setCaseNo(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Filing Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. FL/2025/1122"
                    value={filingNo}
                    onChange={(e) => setFilingNo(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Initial Case Stage</label>
                  <select className="form-control" value={stage} onChange={(e) => setStage(e.target.value)}>
                    <option value="Pre-Filing">Pre-Filing</option>
                    <option value="Admission">Admission / Notice</option>
                    <option value="Pleadings">Pleadings Stage</option>
                    <option value="Evidence">Evidence Stage</option>
                    <option value="Arguments">Arguments Stage</option>
                    <option value="Disposed">Disposed / Judgment</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: PARTIES & REPRESENTATION */}
          {step === 2 && (
            <div className="form-step-content">
              <div className="form-group">
                <label>Client Role in Litigation</label>
                <div className="radio-pill-group">
                  <button
                    type="button"
                    className={`radio-pill-btn ${clientRole === 'Petitioner/Plaintiff' ? 'selected' : ''}`}
                    onClick={() => setClientRole('Petitioner/Plaintiff')}
                  >
                    Petitioner / Plaintiff (Applicant)
                  </button>
                  <button
                    type="button"
                    className={`radio-pill-btn ${clientRole === 'Respondent/Defendant' ? 'selected' : ''}`}
                    onClick={() => setClientRole('Respondent/Defendant')}
                  >
                    Respondent / Defendant (Opposite)
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>
                  Select Client <span className="req-star">*</span>
                </label>
                <div className="client-select-bar">
                  <select
                    className={`form-control ${errors.clientName ? 'has-error' : ''}`}
                    value={selectedClientId}
                    onChange={(e) => handleClientSelect(e.target.value)}
                  >
                    <option value="">-- Choose Existing Client --</option>
                    {clientList.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.phone})
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="quick-add-client-btn"
                    onClick={() => setQuickClientOpen(true)}
                  >
                    <UserPlus size={15} /> + Quick Add Client
                  </button>
                </div>
                {errors.clientName && <span className="form-error-msg">{errors.clientName}</span>}
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Opposing Party Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. State of UP / ICICI Bank"
                    value={opposingParty}
                    onChange={(e) => setOpposingParty(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Opposing Counsel / Advocate</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Adv. V. K. Sharma"
                    value={opposingCounsel}
                    onChange={(e) => setOpposingCounsel(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Opposing Party Address</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter office / residential address"
                    value={opposingAddress}
                    onChange={(e) => setOpposingAddress(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Opposing Law Firm</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. LexCorp Legal Associates"
                    value={opposingFirm}
                    onChange={(e) => setOpposingFirm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: LEGAL DETAILS & DATES */}
          {step === 3 && (
            <div className="form-step-content">
              <div className="form-group">
                <label>Relevant Acts &amp; Sections</label>
                <div className="acts-tag-container">
                  {actsTags.map((tag) => (
                    <span key={tag} className="act-tag-badge">
                      <Tag size={12} /> {tag}
                      <button type="button" className="act-tag-remove" onClick={() => handleRemoveTag(tag)}>
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    className="act-tag-input"
                    placeholder="Type act &amp; press Enter (e.g. IPC Sec 420)..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                  />
                </div>
                <span className="field-hint">Press Enter or comma to add multiple statutory section tags</span>
              </div>

              <div className="form-group">
                <label>Case Brief / Summary</label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Provide a brief overview of facts and background..."
                  value={caseBrief}
                  onChange={(e) => setCaseBrief(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Relief Sought</label>
                <textarea
                  className="form-control"
                  rows={2}
                  placeholder="Specify primary claims, damages, or injunctions requested..."
                  value={reliefSought}
                  onChange={(e) => setReliefSought(e.target.value)}
                />
              </div>

              <div className="form-grid-3">
                <div className="form-group">
                  <label>Filing Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={filingDate}
                    onChange={(e) => setFilingDate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>First Hearing Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={firstHearingDate}
                    onChange={(e) => setFirstHearingDate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Limitation Expiry Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={limitationDate}
                    onChange={(e) => setLimitationDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: FINANCIALS & DOCUMENTS */}
          {step === 4 && (
            <div className="form-step-content">
              <div className="form-grid-3">
                <div className="form-group">
                  <label>Billing Type</label>
                  <select className="form-control" value={billingType} onChange={(e) => setBillingType(e.target.value)}>
                    <option value="Flat Fee">Flat Agreed Fee</option>
                    <option value="Per Appearance">Per Appearance Fee</option>
                    <option value="Retainer">Monthly Retainer</option>
                    <option value="Hourly">Hourly Billing</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Agreed Professional Fee (₹)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={agreedFee}
                    onChange={(e) => setAgreedFee(Number(e.target.value))}
                  />
                </div>

                <div className="form-group">
                  <label>Advance Received (₹)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={advanceAmount}
                    onChange={(e) => setAdvanceAmount(Number(e.target.value))}
                  />
                </div>
              </div>

              {/* Document Upload Area */}
              <div className="form-group">
                <label>Upload Case Documents (Vakalatnama, Plaint, Orders)</label>
                <label className="dropzone-box">
                  <input type="file" multiple onChange={handleFileUpload} style={{ display: 'none' }} />
                  <div className="dropzone-icon">
                    <UploadCloud size={24} />
                  </div>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#1e293b' }}>
                    Click or Drag &amp; Drop files here to attach
                  </div>
                  <span className="field-hint">Supports PDF, DOCX, PNG up to 25MB</span>
                </label>

                {uploadedFiles.length > 0 && (
                  <div className="uploaded-files-list">
                    {uploadedFiles.map((file, idx) => (
                      <div className="file-preview-card" key={idx}>
                        <div className="file-info">
                          <FileText size={16} className="text-blue-600" />
                          <span>{file.name}</span>
                          <span style={{ fontSize: '11px', color: '#64748b' }}>({file.size})</span>
                        </div>
                        <button type="button" className="remove-file-btn" onClick={() => handleRemoveFile(idx)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Footer Bar */}
        <div className="case-reg-footer">
          <div className="footer-left-actions">
            <button type="button" className="btn-secondary" onClick={handleSaveDraft}>
              <Save size={15} /> Save as Draft
            </button>
          </div>

          <div className="footer-right-actions">
            {step > 1 && (
              <button type="button" className="btn-secondary" onClick={handleBack}>
                <ChevronLeft size={16} /> Back
              </button>
            )}

            {step < 4 ? (
              <button type="button" className="btn-primary" onClick={handleNext}>
                Next Step <ChevronRight size={16} />
              </button>
            ) : (
              <button type="button" className="btn-success" onClick={handleSubmitCase}>
                <CheckCircle size={16} /> Complete Case Entry
              </button>
            )}
          </div>
        </div>

        {/* Quick Add Client Sub-Modal Overlay */}
        {quickClientOpen && (
          <div className="quick-client-overlay" onClick={() => setQuickClientOpen(false)}>
            <div className="quick-client-card" onClick={(e) => e.stopPropagation()}>
              <h3 style={{ margin: '0 0 16px', fontSize: '16px', color: '#0f172a' }}>+ Add New Client</h3>
              <form onSubmit={handleCreateClient}>
                <div className="form-group" style={{ marginBottom: '12px' }}>
                  <label>Full Client / Entity Name *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Ramesh Chandra &amp; Co"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '12px' }}>
                  <label>Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="+91 98765 43210"
                    value={newClientPhone}
                    onChange={(e) => setNewClientPhone(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="client@email.com"
                    value={newClientEmail}
                    onChange={(e) => setNewClientEmail(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button type="button" className="btn-secondary" onClick={() => setQuickClientOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Save Client
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Toast Notification Notification */}
        {toastMsg && (
          <div className="case-reg-toast">
            <Sparkles size={16} style={{ color: '#60a5fa' }} />
            <span>{toastMsg}</span>
          </div>
        )}
      </div>
    </div>
  )
}
