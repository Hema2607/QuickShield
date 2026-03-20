export const calculateRiskLevel = (zone: string, hoursSelected: string[]): 'low' | 'medium' | 'high' => {
  // Simple mock logic based on zone and hours
  const riskZones = ['OMR', 'Whitefield', 'JP Nagar']
  const riskHours = ['6 PM - 10 PM', '10 PM - 2 AM']

  const zoneRisk = riskZones.includes(zone) ? 1 : 0
  const hoursRisk = hoursSelected.some((h) => riskHours.includes(h)) ? 1 : 0

  const totalRisk = zoneRisk + hoursRisk

  if (totalRisk === 0) return 'low'
  if (totalRisk === 1) return 'medium'
  return 'high'
}

export const calculatePremium = (riskLevel: 'low' | 'medium' | 'high'): number => {
  const premiums = {
    low: 20,
    medium: 35,
    high: 50,
  }
  return premiums[riskLevel]
}

export const formatDate = (date: Date | string): string => {
  if (typeof date === 'string') {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const formatTime = (date: Date | string): string => {
  if (typeof date === 'string') {
    return new Date(date).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const calculateTrustScore = (): number => {
  // Mock trust score calculation
  const baseScore = 80
  const randomVariation = Math.random() * 10 - 5
  return Math.round(baseScore + randomVariation)
}

export const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`
}

export const generateMockTransactionId = (): string => {
  return `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`
}
