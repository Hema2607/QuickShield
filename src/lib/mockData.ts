export const ZONES = [
  'OMR (Outer Ring Road)',
  'T Nagar',
  'Velachery',
  'Indiranagar',
  'Whitefield',
  'Koramangala',
  'Hebbal',
  'JP Nagar',
]

export const WORKING_HOURS = [
  '6 AM - 10 AM',
  '10 AM - 2 PM',
  '2 PM - 6 PM',
  '6 PM - 10 PM',
  '10 PM - 2 AM',
]

export const RISK_LEVELS = {
  low: { label: 'Low', color: 'success', premium: 20 },
  medium: { label: 'Medium', color: 'warning', premium: 35 },
  high: { label: 'High', color: 'danger', premium: 50 },
}

export const DISRUPTION_TYPES = {
  rain: {
    name: 'Heavy Rain',
    icon: '🌧️',
    payout: 150,
    description: 'Disruption due to heavy rainfall detected',
  },
  aqi: {
    name: 'High AQI',
    icon: '💨',
    payout: 100,
    description: 'Air quality index exceeded safe levels',
  },
  demand: {
    name: 'Demand Drop',
    icon: '📉',
    payout: 200,
    description: 'Sudden drop in delivery demand detected',
  },
}

export const SAMPLE_CLAIMS = [
  {
    id: 'CLM001',
    date: '2024-03-15',
    type: 'rain',
    status: 'approved',
    amount: 150,
    zone: 'OMR',
  },
  {
    id: 'CLM002',
    date: '2024-03-10',
    type: 'aqi',
    status: 'approved',
    amount: 100,
    zone: 'Whitefield',
  },
  {
    id: 'CLM003',
    date: '2024-03-05',
    type: 'demand',
    status: 'approved',
    amount: 200,
    zone: 'T Nagar',
  },
]

export const ADMIN_STATS = {
  totalClaimsToday: 24,
  totalPayoutToday: 3840,
  highRiskZones: ['OMR', 'Whitefield', 'JP Nagar'],
  averagePayout: 160,
  fraudAlerts: 2,
  activeRiders: 1250,
  pendingClaims: 5,
}

export const TRUST_SCORE_FACTORS = {
  claimsApproved: 0.3,
  noFraudHistory: 0.3,
  consistentEarnings: 0.2,
  completedTrips: 0.2,
}
