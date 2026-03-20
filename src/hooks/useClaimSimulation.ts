import { useState } from 'react'
import { DISRUPTION_TYPES } from '../lib/mockData'

export type DisruptionType = keyof typeof DISRUPTION_TYPES

interface ClaimSimulationState {
  isProcessing: boolean
  showAlert: boolean
  showSuccess: boolean
  claimAmount: number
  disruptionType: DisruptionType | null
  transactionId: string
  processingStartTime: number
}

export const useClaimSimulation = () => {
  const [state, setState] = useState<ClaimSimulationState>({
    isProcessing: false,
    showAlert: false,
    showSuccess: false,
    claimAmount: 0,
    disruptionType: null,
    transactionId: '',
    processingStartTime: 0,
  })

  const triggerDisruption = (type: DisruptionType) => {
    // Show alert
    setState((prev) => ({
      ...prev,
      showAlert: true,
      disruptionType: type,
      isProcessing: false,
    }))

    // Simulate processing after 1 second
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        isProcessing: true,
        processingStartTime: Date.now(),
      }))
    }, 1000)

    // Show success and payout after 2 seconds of processing
    setTimeout(() => {
      const amount = DISRUPTION_TYPES[type].payout
      const txnId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`
      setState((prev) => ({
        ...prev,
        isProcessing: false,
        showSuccess: true,
        claimAmount: amount,
        transactionId: txnId,
        showAlert: false,
      }))
    }, 3000)
  }

  const resetClaim = () => {
    setState({
      isProcessing: false,
      showAlert: false,
      showSuccess: false,
      claimAmount: 0,
      disruptionType: null,
      transactionId: '',
      processingStartTime: 0,
    })
  }

  return {
    ...state,
    triggerDisruption,
    resetClaim,
  }
}
