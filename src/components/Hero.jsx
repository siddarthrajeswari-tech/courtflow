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
