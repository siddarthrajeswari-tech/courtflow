import { Link } from 'react-router-dom'
import {
  BarChart3, Workflow, PieChart, Users, AlertTriangle, BrainCircuit,
  Calendar, Gavel, TrendingUp, UploadCloud, ArrowRight,
} from 'lucide-react'
import { coreServices } from '../data/mockData.js'

const iconMap = {
  barChart: BarChart3,
  workflow: Workflow,
  pieChart: PieChart,
  users: Users,
  alertTriangle: AlertTriangle,
  brain: BrainCircuit,
  calendar: Calendar,
  gavel: Gavel,
  trendingUp: TrendingUp,
  upload: UploadCloud,
}

export default function CoreServices() {
  return (
    <section className="core-services">
      <div className="section-heading">
        <span className="rule" />
        <h3>Our Core Services</h3>
        <span className="rule" />
      </div>

      <div className="services-grid">
        {coreServices.map((service) => {
          const Icon = iconMap[service.icon]
          return (
            <div className="service-card" key={service.title}>
              <div className="service-icon"><Icon size={20} /></div>
              <h4>{service.title}</h4>
              <p>{service.description}</p>
              <Link to={service.to} className="service-link">
                {service.cta} <ArrowRight size={14} />
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}
