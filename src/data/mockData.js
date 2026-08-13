// Top-level KPI stat cards (values are mock data — wire these to your API)
export const statCards = [
  { label: 'Total Cases', value: '4,01,23,567', delta: '6.21%', trend: 'up', sentiment: 'negative', icon: 'folder' },
  { label: 'Pending Cases', value: '3,18,45,884', delta: '7.38%', trend: 'down', sentiment: 'positive', icon: 'hourglass' },
  { label: 'Disposed Cases', value: '82,77,683', delta: '8.52%', trend: 'up', sentiment: 'positive', icon: 'check' },
  { label: 'New Cases (This Month)', value: '13,45,256', delta: '2.31%', trend: 'up', sentiment: 'negative', icon: 'filePlus' },
  { label: 'Average Disposal Time', value: '243', suffix: 'Days', icon: 'clock' },
  { label: 'Cases Beyond Expected Time', value: '1,12,987', delta: '23.47%', trend: 'down', sentiment: 'positive', icon: 'alert' },
]

// Core service tiles
export const coreServices = [
  { title: 'Case Status', description: 'Check real-time status of cases across all courts in India.', cta: 'Check Now', icon: 'barChart', to: '/dashboard' },
  { title: 'Court Flow Analytics', description: 'Visualize case flow through different stages and identify bottlenecks.', cta: 'View Analytics', icon: 'workflow', to: '/dashboard' },
  { title: 'Pendency Analysis', description: 'Analyze pendency trends, case age and delay reasons.', cta: 'View Analysis', icon: 'pieChart', to: '/dashboard' },
  { title: 'Judge / Court Workload', description: 'Monitor workload distribution across judges and courts.', cta: 'View Workload', icon: 'users', to: '/dashboard' },
  { title: 'Delayed / Priority Cases', description: 'Identify delayed cases and cases crossing statutory timelines.', cta: 'View Cases', icon: 'alertTriangle', to: '/dashboard' },
  { title: 'AI Insights & Alerts', description: 'AI based insights to detect bottlenecks and get smart recommendations.', cta: 'View Alerts', icon: 'brain', to: '/dashboard' },
  { title: 'Cause List', description: 'View daily cause lists of courts across India.', cta: 'View Cause List', icon: 'calendar', to: '/dashboard' },
  { title: 'Orders & Judgments', description: 'Access latest orders and judgments.', cta: 'View Orders', icon: 'gavel', to: '/dashboard' },
  { title: 'Reports', description: 'Generate and download comprehensive reports for better decision making.', cta: 'View Reports', icon: 'trendingUp', to: '/dashboard' },
  { title: 'eFiling Status', description: 'Track eFiling and submission status of your cases.', cta: 'Track Now', icon: 'upload', to: '/dashboard' },
]

// Risk level per state, used to colour the India choropleth map.
// risk: 'high' -> red, 'medium' -> orange, 'low' -> green
// Backed by pendency % as an example metric — replace with live data.
export const stateRiskData = [
  { state: 'Uttar Pradesh', pendencyPct: 78, risk: 'high' },
  { state: 'Bihar', pendencyPct: 74, risk: 'high' },
  { state: 'West Bengal', pendencyPct: 71, risk: 'high' },
  { state: 'Maharashtra', pendencyPct: 68, risk: 'high' },
  { state: 'Odisha', pendencyPct: 65, risk: 'medium' },
  { state: 'Rajasthan', pendencyPct: 60, risk: 'medium' },
  { state: 'Madhya Pradesh', pendencyPct: 58, risk: 'medium' },
  { state: 'Karnataka', pendencyPct: 55, risk: 'medium' },
  { state: 'Jharkhand', pendencyPct: 52, risk: 'medium' },
  { state: 'Punjab', pendencyPct: 48, risk: 'medium' },
  { state: 'Haryana', pendencyPct: 45, risk: 'medium' },
  { state: 'Telangana', pendencyPct: 40, risk: 'low' },
  { state: 'Andhra Pradesh', pendencyPct: 38, risk: 'low' },
  { state: 'Tamil Nadu', pendencyPct: 35, risk: 'low' },
  { state: 'Kerala', pendencyPct: 30, risk: 'low' },
  { state: 'Gujarat', pendencyPct: 33, risk: 'low' },
  { state: 'Delhi', pendencyPct: 42, risk: 'medium' },
  { state: 'Assam', pendencyPct: 50, risk: 'medium' },
  { state: 'Chhattisgarh', pendencyPct: 47, risk: 'medium' },
  { state: 'Uttarakhand', pendencyPct: 36, risk: 'low' },
  { state: 'Himachal Pradesh', pendencyPct: 28, risk: 'low' },
  { state: 'Jammu and Kashmir', pendencyPct: 56, risk: 'medium' },
  { state: 'Goa', pendencyPct: 22, risk: 'low' },
  { state: 'Tripura', pendencyPct: 34, risk: 'low' },
  { state: 'Meghalaya', pendencyPct: 31, risk: 'low' },
  { state: 'Manipur', pendencyPct: 37, risk: 'low' },
  { state: 'Nagaland', pendencyPct: 29, risk: 'low' },
  { state: 'Mizoram', pendencyPct: 20, risk: 'low' },
  { state: 'Sikkim', pendencyPct: 18, risk: 'low' },
  { state: 'Arunachal Pradesh', pendencyPct: 33, risk: 'low' },
]

export const riskColors = {
  high: '#DC2626',
  medium: '#F97316',
  low: '#16A34A',
  unknown: '#E2E8F0',
}
