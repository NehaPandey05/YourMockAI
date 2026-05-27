import HeroSection from "../components/dashboard/HeroSection"
import StatsCards from "../components/dashboard/StatsCards"
import ActivityCard from "../components/dashboard/ActivityCard"
import useAuth from "../../hooks/useAuth"
import useDashboard from "../../hooks/useDashboard"

const Dashboard = () => {
  const { user } = useAuth()
  const { sessions, setSessions, stats, loading, error } = useDashboard()

  if (loading) return (
    <div className="flex items-center justify-center h-48 text-white/40 text-sm">
      Loading...
    </div>
  )

  if (error) return (
    <div className="flex items-center justify-center h-48 text-red-400 text-sm">
      {error}
    </div>
  )

  return (
    <div className="space-y-6">
      <HeroSection name={user?.name} stats={stats} />
      <StatsCards stats={stats} />
      <ActivityCard sessions={sessions} setSessions={setSessions} />
    </div>
  )
}

export default Dashboard