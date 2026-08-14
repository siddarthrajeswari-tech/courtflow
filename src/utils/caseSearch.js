import dummyCases from '../data/dummy_court_cases_1200.json'

export const sampleCasesList = [
  {
    cnr_number: 'TNCH010045212021',
    case_id: 'SAMPLE-00001',
    title: 'State vs. R. Kumar & Ors',
    court: 'District & Sessions Court, XI - Chennai',
    case_type: 'Criminal Appeal',
    status: 'Pending',
    priority: 'High',
    complexity: 'High',
    days_pending: 1533,
    adjournment_count: 14,
    number_of_hearings: 18,
    evidence_count: 5,
    witness_count: 6,
    petitioner: 'State of Tamil Nadu',
    respondent: 'R. Kumar & Ors',
    law_reference: 'Section 302 IPC / Criminal Appeal Act',
    filing_date: '2021-03-15',
    predicted_delay_risk: 'Critical Risk',
    recommended_queue: 'Prioritize case conference + review pending applications.',
    description: 'Criminal appeal filed against conviction order. Key evidence and witness statements pending examination.'
  },
  {
    cnr_number: 'DLCT020089122019',
    case_id: 'SAMPLE-00002',
    title: 'Mehra vs. Apex Logistics Ltd',
    court: 'District Commercial Court, South - New Delhi',
    case_type: 'Civil Suit (Commercial)',
    status: 'Pending',
    priority: 'Critical',
    complexity: 'High',
    days_pending: 1861,
    adjournment_count: 21,
    number_of_hearings: 24,
    evidence_count: 8,
    witness_count: 4,
    petitioner: 'A. K. Mehra',
    respondent: 'Apex Logistics Ltd',
    law_reference: 'Commercial Courts Act 2015 / Breach of Contract',
    filing_date: '2019-06-10',
    predicted_delay_risk: 'Critical Risk',
    recommended_queue: 'Consolidate interim petitions + issue fixed timeline order.',
    description: 'Commercial suit for recovery of damages exceeding Rs. 4.5 Crores. Multiple interlocutory applications pending.'
  },
  {
    cnr_number: 'MHOS030012342022',
    case_id: 'SAMPLE-00003',
    title: 'Patel Builders vs. Municipal Corp',
    court: 'City Civil Court, Borivali - Mumbai',
    case_type: 'Property Dispute',
    status: 'Pending',
    priority: 'Medium',
    complexity: 'Medium',
    days_pending: 1022,
    adjournment_count: 9,
    number_of_hearings: 12,
    evidence_count: 4,
    witness_count: 3,
    petitioner: 'Patel Builders Pvt Ltd',
    respondent: 'Brihanmumbai Municipal Corporation',
    law_reference: 'MMC Act Section 351 / Specific Relief Act',
    filing_date: '2022-01-20',
    predicted_delay_risk: 'High Risk',
    recommended_queue: 'Schedule advocate conference + fast-track evidence recording.',
    description: 'Injunction suit against demolition notice issued by local municipal body.'
  },
  {
    cnr_number: 'KABA040056782023',
    case_id: 'SAMPLE-00004',
    title: 'Venkatesh vs. State of Karnataka',
    court: 'High Court of Karnataka - Bengaluru',
    case_type: 'Writ Petition',
    status: 'Notice Issued',
    priority: 'Medium',
    complexity: 'Low',
    days_pending: 584,
    adjournment_count: 5,
    number_of_hearings: 8,
    evidence_count: 2,
    witness_count: 2,
    petitioner: 'S. Venkatesh',
    respondent: 'State of Karnataka & Ors',
    law_reference: 'Article 226 of the Constitution of India',
    filing_date: '2023-02-14',
    predicted_delay_risk: 'Medium Risk',
    recommended_queue: 'Await counter-affidavit filing + set final hearing date.',
    description: 'Writ petition seeking quashing of administrative tender cancellation.'
  }
]

/**
 * Normalizes any case object so all frontend components get uniform properties.
 */
export function normalizeCaseData(rawCase) {
  if (!rawCase) return null

  const cnr = rawCase.cnr_number || rawCase.cnr || rawCase.case_id || ''
  const petitioner = rawCase.petitioner || 'Petitioner'
  const respondent = rawCase.respondent || 'Respondent'
  const title = rawCase.title || `${petitioner} vs. ${respondent}`
  const caseType = rawCase.case_type || rawCase.category || 'General Civil/Criminal'
  const caseSubtype = rawCase.case_subtype || ''
  const court = rawCase.court || 'District & Sessions Court'
  const status = rawCase.status || 'Pending'
  const priority = rawCase.priority || 'Medium'
  const complexity = rawCase.complexity || 'Medium'
  const lawReference = rawCase.law_reference || 'Relevant Statutory Provision'
  const filingDate = rawCase.filing_date || '2022-01-01'
  
  const daysPending = rawCase.days_pending ?? (rawCase.pendingYears ? Math.round(parseFloat(rawCase.pendingYears) * 365) : 365)
  const pendingYearsNum = (daysPending / 365).toFixed(1)

  const hearings = rawCase.number_of_hearings ?? rawCase.hearingsCompleted ?? 5
  const adjournments = rawCase.adjournment_count ?? rawCase.previousAdjournments ?? 4
  const evidenceCount = rawCase.evidence_count ?? 3
  const witnessCount = rawCase.witness_count ?? 2
  
  const description = rawCase.description || `Record for case ${cnr} (${caseType}). Proceeding under ${lawReference}.`
  const predictedRisk = rawCase.predicted_delay_risk || rawCase.riskLevel || (daysPending > 1000 ? 'Critical' : daysPending > 500 ? 'High' : 'Low')
  const recommendedQueue = rawCase.recommended_queue || rawCase.suggestedAction || 'Regular Review & Hearing Schedule'

  return {
    ...rawCase,
    cnr_number: cnr,
    cnr: cnr,
    case_id: rawCase.case_id || `ID-${cnr}`,
    title,
    court,
    case_type: caseType,
    category: caseType,
    case_subtype: caseSubtype,
    petitioner,
    respondent,
    law_reference: lawReference,
    filing_date: filingDate,
    status,
    priority,
    complexity,
    number_of_hearings: hearings,
    hearingsCompleted: hearings,
    days_pending: daysPending,
    pendingYears: `${pendingYearsNum} years`,
    adjournment_count: adjournments,
    previousAdjournments: adjournments,
    evidence_count: evidenceCount,
    witness_count: witnessCount,
    description,
    predicted_delay_risk: predictedRisk,
    riskLevel: predictedRisk.includes('Risk') ? predictedRisk : `${predictedRisk} Risk`,
    recommended_queue: recommendedQueue,
    suggestedAction: recommendedQueue
  }
}

// Combine 1,200 dummy cases + sample cases
export const allCasesDatabase = [
  ...sampleCasesList.map(normalizeCaseData),
  ...(Array.isArray(dummyCases) ? dummyCases.map(normalizeCaseData) : [])
]

/**
 * Find an exact case by CNR Number or Case ID
 */
export function findCaseByCNR(cnrQuery) {
  if (!cnrQuery || typeof cnrQuery !== 'string') return null
  const clean = cnrQuery.trim().toLowerCase()

  // Match exact cnr_number or case_id
  const match = allCasesDatabase.find(
    (c) =>
      c.cnr_number.toLowerCase() === clean ||
      c.cnr.toLowerCase() === clean ||
      c.case_id.toLowerCase() === clean ||
      c.cnr_number.toLowerCase().replace(/[^a-z0-9]/g, '') === clean.replace(/[^a-z0-9]/g, '')
  )

  if (match) return match

  // Substring match if no exact match found
  return allCasesDatabase.find((c) => c.cnr_number.toLowerCase().includes(clean)) || null
}

/**
 * Fuzzy search across all 1,200 court cases by CNR number, Title, Petitioner, Respondent, or Court
 */
export function searchCases(query, limit = 10) {
  if (!query || typeof query !== 'string' || !query.trim()) return []
  const q = query.trim().toLowerCase()
  const qClean = q.replace(/[^a-z0-9]/g, '')

  const matches = []

  for (const c of allCasesDatabase) {
    const cnr = c.cnr_number.toLowerCase()
    const cnrClean = cnr.replace(/[^a-z0-9]/g, '')
    const caseId = c.case_id.toLowerCase()
    const title = c.title.toLowerCase()
    const petitioner = c.petitioner.toLowerCase()
    const respondent = c.respondent.toLowerCase()
    const caseType = c.case_type.toLowerCase()
    const court = c.court.toLowerCase()

    if (
      cnr.includes(q) ||
      cnrClean.includes(qClean) ||
      caseId.includes(q) ||
      title.includes(q) ||
      petitioner.includes(q) ||
      respondent.includes(q) ||
      caseType.includes(q) ||
      court.includes(q)
    ) {
      matches.push(c)
      if (matches.length >= limit) break
    }
  }

  return matches
}
