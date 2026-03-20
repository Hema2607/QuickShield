import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { LoginScreen } from './screens/LoginScreen'
import { PlanSetupScreen } from './screens/PlanSetupScreen'
import { DashboardScreen } from './screens/DashboardScreen'
import { ProfileScreen } from './screens/ProfileScreen'
import { ClaimProcessingScreen } from './screens/ClaimProcessingScreen'
import { PayoutResultScreen } from './screens/PayoutResultScreen'
import { AdminDashboard } from './screens/AdminDashboard'
import { AlertBanner } from './components/AlertBanner'
import { Navbar } from './components/Navbar'
import { useClaimSimulation, DisruptionType } from './hooks/useClaimSimulation'
import { DISRUPTION_TYPES } from './lib/mockData'

type Screen = 'login' | 'planSetup' | 'dashboard' | 'profile' | 'admin'
type PageType = 'dashboard' | 'profile' | 'admin'

interface UserData {
  phone: string
  name: string
}

interface PlanData {
  zone: string
  hours: string[]
  premium: number
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login')
  const [userData, setUserData] = useState<UserData | null>(null)
  const [planData, setPlanData] = useState<PlanData | null>(null)
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard')
  const claimSimulation = useClaimSimulation()

  // Handle login
  const handleLogin = (data: UserData) => {
    setUserData(data)
    setCurrentScreen('planSetup')
  }

  // Handle plan activation
  const handlePlanActivated = (plan: PlanData) => {
    setPlanData(plan)
    setCurrentScreen('dashboard')
  }

  // Handle simulation
  const handleSimulateDisruption = (type: DisruptionType) => {
    claimSimulation.triggerDisruption(type)
  }

  // Logout
  const handleLogout = () => {
    setUserData(null)
    setPlanData(null)
    setCurrentScreen('login')
    setCurrentPage('dashboard')
    claimSimulation.resetClaim()
  }

  // Back navigation
  const handleBackToLogin = () => {
    setUserData(null)
    setPlanData(null)
    setCurrentScreen('login')
    setCurrentPage('dashboard')
    claimSimulation.resetClaim()
  }

  // Page navigation
  const handleNavigatePage = (page: PageType) => {
    setCurrentPage(page)
    setCurrentScreen(page === 'admin' ? 'admin' : 'dashboard')
  }

  const handleBackToDashboard = () => {
    claimSimulation.resetClaim()
    setCurrentScreen('dashboard')
  }

  const handleBackToAdmin = () => {
    setCurrentScreen('dashboard')
  }

  // Toggle admin mode (double click on trust score)
  const toggleAdminMode = () => {
    setCurrentScreen(currentScreen === 'admin' ? 'dashboard' : 'admin')
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Alert Banner for disruptions */}
      <AlertBanner
        isVisible={claimSimulation.showAlert}
        title="Disruption detected in your area"
        description={
          claimSimulation.disruptionType
            ? `${DISRUPTION_TYPES[claimSimulation.disruptionType].name} detected`
            : undefined
        }
      />

      {/* Navbar - Show when logged in */}
      {userData && planData && (
        <Navbar
          riderName={userData.name}
          currentPage={currentPage}
          onNavigate={handleNavigatePage}
          onLogout={handleLogout}
        />
      )}

      {/* Main Screen Router */}
      <AnimatePresence mode="wait">
        {currentScreen === 'login' && (
          <LoginScreen key="login" onLogin={handleLogin} />
        )}

        {currentScreen === 'planSetup' && userData && (
          <PlanSetupScreen
            key="planSetup"
            riderName={userData.name}
            onPlanActivated={handlePlanActivated}
            onBack={handleBackToLogin}
          />
        )}

        {currentScreen === 'dashboard' && userData && planData && currentPage === 'dashboard' && (
          <div key="dashboard" onClick={(e) => {
            // Double click on trust score area to open admin
            if ((e.target as HTMLElement).closest('[data-admin-toggle]')) {
              toggleAdminMode()
            }
          }}>
            <DashboardScreen
              riderName={userData.name}
              zone={planData.zone}
              premium={planData.premium}
              onSimulateDisruption={handleSimulateDisruption}
            />
            
            {/* Processing overlay */}
            {claimSimulation.isProcessing && claimSimulation.disruptionType && (
              <ClaimProcessingScreen
                key="processing"
                disruptionType={claimSimulation.disruptionType}
                zone={planData.zone}
              />
            )}

            {/* Success overlay */}
            {claimSimulation.showSuccess && claimSimulation.disruptionType && (
              <PayoutResultScreen
                key="payout"
                disruptionType={claimSimulation.disruptionType}
                amount={claimSimulation.claimAmount}
                transactionId={claimSimulation.transactionId}
                zone={planData.zone}
                onClose={handleBackToDashboard}
              />
            )}
          </div>
        )}

        {currentScreen === 'dashboard' && userData && planData && currentPage === 'profile' && (
          <ProfileScreen
            key="profile"
            riderName={userData.name}
            riderPhone={userData.phone}
            zone={planData.zone}
            premium={planData.premium}
          />
        )}

        {currentScreen === 'admin' && (
          <AdminDashboard key="admin" onBack={handleBackToAdmin} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
