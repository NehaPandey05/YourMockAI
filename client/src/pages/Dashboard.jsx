import HeroSection from "../components/dashboard/HeroSection"
import StatsCards from "../components/dashboard/StatsCards"
import ActivityCard from "../components/dashboard/ActivityCard"
import useAuth from "../../hooks/useAuth"

const Dashboard = () => {
  const { user } = useAuth()

  const data = {
    stats: { interviews: 12, score: 78, resumes: 2 },
    activity: []
  }

  return (
    <div className="space-y-6">
      <HeroSection name={user?.name} />
      <StatsCards stats={data.stats} />
      <ActivityCard activity={data.activity} />
    </div>
  )
}

export default Dashboard