import { Link } from 'react-router-dom'
import {
  LayoutGrid, Landmark, ClipboardList, Clock3, Building, Building2, HelpCircle,
} from 'lucide-react'

const links = [
  { label: 'LawNexus Mission Mode Project', icon: LayoutGrid },
  { label: 'National Judicial Data Grid (NJDG)', icon: ClipboardList },
  { label: 'Virtual Justice Clock', icon: Clock3 },
  { label: 'Supreme Court of India', icon: Landmark },
  { label: 'High Courts', icon: Building },
  { label: 'District Courts', icon: Building2 },
  { label: 'Help / FAQ', icon: HelpCircle },
]

export default function QuickAccess() {
  return (
    <div className="quick-access">
      <span className="quick-access-label">Quick Access</span>
      <div className="quick-access-links">
        {links.map(({ label, icon: Icon }) => (
          <Link to="/dashboard" key={label}>
            <Icon size={14} /> {label}
          </Link>
        ))}
      </div>
    </div>
  )
}
