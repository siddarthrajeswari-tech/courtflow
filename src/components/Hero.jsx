import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Building2, Landmark, ListChecks, Layers, Globe2, ChevronRight, X } from 'lucide-react'

const sampleSearchCases = [
  {
    cnr: 'TNCH010045212021',
    title: 'State vs. R. Kumar & Ors',
    court: 'District & Sessions Court, XI - Chennai',
    category: 'Criminal Appeal',
    status: 'Pending (4.2 yrs)',
    riskLevel: 'Critical Risk',
  },
  {
    cnr: 'DLCT020089122019',
    title: 'Mehra vs. Apex Logistics Ltd',
    court: 'District Commercial Court, South - New Delhi',
    category: 'Civil Suit (Commercial)',
    status: 'Pending (5.1 yrs)',
    riskLevel: 'Critical Risk',
  },
  {
    cnr: 'MHOS030012342022',
    title: 'Patel Builders vs. Municipal Corp',
    court: 'City Civil Court, Borivali - Mumbai',
    category: 'Property Dispute',
    status: 'Pending (2.8 yrs)',
    riskLevel: 'High Risk',
  },
  {
    cnr: 'KABA040056782023',
    title: 'Venkatesh vs. State of Karnataka',
    court: 'High Court of Karnataka - Bengaluru',
    category: 'Writ Petition',
    status: 'Pending (1.6 yrs)',
    riskLevel: 'Medium Risk',
  },
  {
    cnr: 'DLHC010099882021',
    title: 'Sharma & Sons vs. Union of India',
    court: 'High Court of Delhi - New Delhi',
    category: 'Taxation Appeal',
    status: 'Hearing Stage',
    riskLevel: 'High Risk',
  },
  {
    cnr: 'MHCC020044552020',
    title: 'Rajesh Verma vs. ICICI Bank',
    court: 'City Civil Court - Mumbai',
    category: 'Banking & Finance',
    status: 'Evidence Stage',
    riskLevel: 'Medium Risk',
  },
  {
    cnr: 'UPAH050011222022',
    title: 'Sunita Devi vs. State of UP',
    court: 'Allahabad High Court - Prayagraj',
    category: 'Criminal Writ',
    status: 'Notice Issued',
    riskLevel: 'High Risk',
  },
]

export default function Hero() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All India')
  const navigate = useNavigate()
  const searchContainerRef = useRef(null)

  const filteredCases = sampleSearchCases.filter((c) => {
    const q = query.toLowerCase().trim()
    if (!q) return false
    return (
      c.title.toLowerCase().includes(q) ||
      c.cnr.toLowerCase().includes(q) ||
      c.court.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q)
    )
  })

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
    setIsOpen(false)
    navigate('/dashboard')
  }

  const handleFilterClick = (filterName, presetQuery = '') => {
    setActiveFilter(filterName)
    if (presetQuery) {
      setQuery(presetQuery)
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
            <form
              className="search-bar"
              onSubmit={(e) => {
                e.preventDefault()
                if (query.trim()) {
                  navigate('/dashboard')
                }
              }}
            >
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search by Case Number / Party Name / Court / State"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => query.trim() && setIsOpen(true)}
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

            {/* Live Search Results Dropdown */}
            {isOpen && (
              <div className="hero-search-dropdown">
                <div className="hero-dropdown-header">
                  <span>Matching Cases ({filteredCases.length})</span>
                  <span className="hero-dropdown-hint">Click a case to inspect analytics</span>
                </div>

                {filteredCases.length > 0 ? (
                  <div className="hero-dropdown-list">
                    {filteredCases.map((c) => (
                      <div
                        key={c.cnr}
                        className="hero-search-result-item"
                        onClick={() => handleSelectCase(c)}
                      >
                        <div className="hero-item-left">
                          <div className="hero-item-top">
                            <span className="hero-item-cnr">{c.cnr}</span>
                            <span className="hero-item-category">{c.category}</span>
                          </div>
                          <div className="hero-item-title">{c.title}</div>
                          <div className="hero-item-court">{c.court}</div>
                        </div>

                        <div className="hero-item-right">
                          <span className={`hero-status-pill ${c.riskLevel.includes('Critical') ? 'critical' : 'high'}`}>
                            {c.status}
                          </span>
                          <ChevronRight size={16} className="hero-item-arrow" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-hero-results">
                    No matching cases found for "<strong>{query}</strong>".<br />
                    <span>Try searching <strong>State</strong>, <strong>Kumar</strong>, <strong>Apex</strong>, <strong>TNCH010045212021</strong>, or <strong>Patel</strong>.</span>
                  </div>
                )}
              </div>
            )}
          </div>

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
