import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { stateRiskData, riskColors } from '../data/mockData.js'

// Public India-states TopoJSON. Swap this URL for your own file/API if you
// have a licensed dataset — just make sure the property that holds the
// state name matches what STATE_KEY below reads.
const GEO_URL =
  'https://raw.githubusercontent.com/udit-001/india-maps-data/main/topojson/india.json'

// Property name that stores the state name inside the topojson you use.
const STATE_KEY = 'st_nm'

function normalizeStateName(name) {
  if (!name) return ''
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]/g, '')
}

const riskByState = Object.fromEntries(
  stateRiskData.map((s) => [normalizeStateName(s.state), s])
)

function getRisk(name) {
  if (!name) return null
  return riskByState[normalizeStateName(name)]
}

export default function IndiaRiskMap() {
  return (
    <section className="map-section">
      <div className="map-card">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 950, center: [82.5, 22.0] }}
          width={600}
          height={660}
          style={{ width: '100%', height: 'auto', maxHeight: '550px' }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateName = geo.properties[STATE_KEY]
                const districtName = geo.properties.district
                const entry = getRisk(stateName)
                const fill = entry ? riskColors[entry.risk] : riskColors.unknown
                const label = districtName ? `${districtName}, ${stateName}` : stateName
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke="#ffffff"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none' },
                      hover: { outline: 'none', opacity: 0.82, cursor: 'pointer', stroke: '#1e293b', strokeWidth: 0.8 },
                      pressed: { outline: 'none' },
                    }}
                  >
                    <title>{label ? `${label}${entry ? ` — ${entry.risk.toUpperCase()} risk (${entry.pendencyPct}% pendency)` : ''}` : ''}</title>
                  </Geography>
                )
              })
            }
          </Geographies>
        </ComposableMap>

        <div className="map-legend">
          <span><i style={{ background: riskColors.high }} /> High risk</span>
          <span><i style={{ background: riskColors.medium }} /> Medium risk</span>
          <span><i style={{ background: riskColors.low }} /> Low risk</span>
        </div>
      </div>

      <div className="map-copy">
        <h4>Pan India Coverage</h4>
        <p>
          Analytics and insights from all High Courts and District Courts across
          India, colour-coded by pendency risk so bottlenecks are visible at a glance.
        </p>
        <Link to="/dashboard" className="primary-btn">
          View State Wise Data <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}
