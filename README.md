# LawNexus Pendency Dashboard (React)

React + Vite recreation of the LawNexus "Legal Pendency Reduction & Court Flow
Management" homepage, with:

- The "Digital India" footer block removed
- An India choropleth map coloured by risk: **red = high**, **orange = medium**,
  **green = low** (see `src/data/mockData.js` → `stateRiskData`)
- Clicking **Dashboard** in the nav (or any "View ..." button) routes to `/dashboard`,
  currently a placeholder page — send the dashboard screenshot and it'll be built out
  to match, in `src/pages/Dashboard.jsx`

## Setup

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Project structure

```
src/
  components/   Header, Hero, StatCards, CoreServices, IndiaRiskMap, QuickAccess, Footer
  pages/        Home.jsx, Dashboard.jsx
  data/         mockData.js  (all numbers/risk levels — wire to your API here)
  index.css     all styling
```

## Notes

- The India map uses `react-simple-maps` with a public state-boundary
  TopoJSON (`GEO_URL` in `src/components/IndiaRiskMap.jsx`). If that URL
  ever stops resolving, swap in your own topojson/geojson file and update
  `STATE_KEY` to match its state-name property.
- Risk thresholds are mock data in `src/data/mockData.js` — replace
  `stateRiskData` with your real pendency numbers per state.
- All routing uses `react-router-dom`; add more real pages under `src/pages/`
  and wire them into `src/App.jsx`.
