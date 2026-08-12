import React, { useState } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'

const GEO_URL =
  'https://raw.githubusercontent.com/udit-001/india-maps-data/main/topojson/india.json'

const STATE_KEY = 'st_nm'

// State pending case counts mapping
const statePendingCounts = {
  'uttar pradesh': 58400,
  'bihar': 42100,
  'maharashtra': 36500,
  'west bengal': 28900,
  'rajasthan': 18400,
  'madhya pradesh': 16200,
  'karnataka': 14800,
  'gujarat': 9400,
  'tamil nadu': 8100,
  'kerala': 4200,
  'telangana': 3800,
  'andhra pradesh': 4900,
  'punjab': 7100,
  'haryana': 8900,
  'delhi': 12500,
  'odisha': 11200,
  'assam': 6400,
  'jharkhand': 7800,
  'chhattisgarh': 5900,
  'uttarakhand': 3100,
  'himachal pradesh': 1800,
  'jammu and kashmir': 4600,
  'ladakh': 850,
  'goa': 920,
}

function getBlueShade(val) {
  if (!val) return '#dbeafe'
  if (val > 50000) return '#1e3a8a' // Above 50,000
  if (val > 20000) return '#2563eb' // 20,001 - 50,000
  if (val > 5000) return '#60a5fa'  // 5,001 - 20,000
  if (val > 1000) return '#93c5fd'  // 1,001 - 5,000
  return '#dbeafe'                  // Below 1,000
}

function normalizeStateName(name) {
  if (!name) return ''
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9 ]/g, '')
    .trim()
}

export default function StatePendencyMap() {
  const [selectedState, setSelectedState] = useState('All States')

  return (
    <div className="dash-widget-card" style={{ height: '100%' }}>
      <div className="widget-header">
        <div className="widget-title-group">
          <h3>Pendency By State</h3>
        </div>
        <select
          className="widget-filter-select"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="All States">All States</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="Bihar">Bihar</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
        </select>
      </div>

      <div className="map-widget-container" style={{ flex: 1, width: '100%', minHeight: '220px' }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 950, center: [82.5, 22.0] }}
          width={600}
          height={660}
          style={{ width: '100%', height: 'auto', maxHeight: '250px' }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateName = geo.properties[STATE_KEY]
                const districtName = geo.properties.district
                const normName = normalizeStateName(stateName)
                const count = statePendingCounts[normName] || 1500
                const fill = getBlueShade(count)
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
                      hover: { outline: 'none', opacity: 0.85, cursor: 'pointer', stroke: '#1d4ed8', strokeWidth: 0.9 },
                      pressed: { outline: 'none' },
                    }}
                  >
                    <title>{`${label}: ${count.toLocaleString()} pending cases`}</title>
                  </Geography>
                )
              })
            }
          </Geographies>
        </ComposableMap>

        {/* Legend Overlay matching screenshot */}
        <div className="map-scale-legend">
          <div className="legend-scale-title">Pending Cases</div>
          <div className="legend-scale-row">
            <span className="scale-box" style={{ background: '#1e3a8a' }} />
            <span>Above 50,000</span>
          </div>
          <div className="legend-scale-row">
            <span className="scale-box" style={{ background: '#2563eb' }} />
            <span>20,001 - 50,000</span>
          </div>
          <div className="legend-scale-row">
            <span className="scale-box" style={{ background: '#60a5fa' }} />
            <span>5,001 - 20,000</span>
          </div>
          <div className="legend-scale-row">
            <span className="scale-box" style={{ background: '#93c5fd' }} />
            <span>1,001 - 5,000</span>
          </div>
          <div className="legend-scale-row">
            <span className="scale-box" style={{ background: '#dbeafe' }} />
            <span>Below 1,000</span>
          </div>
        </div>
      </div>
    </div>
  )
}
