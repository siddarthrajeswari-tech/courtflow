import { useState } from 'react'
import { Search, Building2, Landmark, ListChecks, Layers, Globe2 } from 'lucide-react'

export default function Hero() {
  const [query, setQuery] = useState('')

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

          <form
            className="search-bar"
            onSubmit={(e) => e.preventDefault()}
          >
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by Case Number / Party Name / Court / State"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit"><Search size={16} /> Search</button>
          </form>

          <div className="filter-chips">
            <button className="chip chip-active"><Globe2 size={14} /> All India</button>
            <button className="chip"><Landmark size={14} /> High Courts</button>
            <button className="chip"><Building2 size={14} /> District Courts</button>
            <button className="chip"><ListChecks size={14} /> Case Status</button>
            <button className="chip"><Layers size={14} /> Case Type</button>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="hero-art-glow" />
          <svg viewBox="0 0 200 160" className="courthouse-svg">
            <rect x="0" y="140" width="200" height="20" fill="#0b3d91" opacity="0.15" />
            <rect x="20" y="70" width="160" height="70" fill="#f5efe4" />
            <rect x="30" y="40" width="140" height="35" fill="#f5efe4" />
            <circle cx="100" cy="30" r="22" fill="#f5efe4" />
            <rect x="90" y="8" width="20" height="20" fill="#f5efe4" />
            {[0,1,2,3,4,5].map(i => (
              <rect key={i} x={35 + i*24} y="75" width="10" height="60" fill="#d8cdb4" />
            ))}
            <rect x="95" y="118" width="10" height="15" fill="#0b3d91" />
          </svg>
        </div>
      </div>
    </section>
  )
}
