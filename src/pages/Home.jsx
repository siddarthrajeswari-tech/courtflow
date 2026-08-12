import Hero from '../components/Hero.jsx'
import StatCards from '../components/StatCards.jsx'
import CoreServices from '../components/CoreServices.jsx'
import IndiaRiskMap from '../components/IndiaRiskMap.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <div className="page-container">
        <StatCards />
        <CoreServices />
        <IndiaRiskMap />
      </div>
    </>
  )
}
