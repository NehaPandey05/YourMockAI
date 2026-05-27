import { useNavigate } from "react-router-dom"

const ROUTES = {
  interview: "/dashboard/interview",
  report: "/dashboard/report",
}

const StatCard = ({ value, label, accent = false }) => (
  <div className="bg-[#7F77DD]/15 border border-[#7F77DD]/25 rounded-xl px-5 py-4 text-center">
    <p className={`text-2xl font-medium ${accent ? "text-[#AFA9EC]" : "text-white"}`}>
      {value}
    </p>
    <p className="text-white/35 text-xs mt-1">{label}</p>
  </div>
)

const HeroSection = ({ name, stats }) => {
  const navigate = useNavigate()
  const displayName = name?.trim() || "User"

  return (
    <div className="bg-[#7F77DD]/20 border border-[#7F77DD]/30 rounded-2xl p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

      <div>
        <h1 className="text-2xl font-bold text-white">
          Ready for your next interview, {displayName}?
        </h1>
        <p className="text-white/45 mt-1 text-sm">
          Practice with AI, get instant feedback, and track your improvement.
        </p>
        <div className="mt-5 flex gap-3">
          <button
            onClick={() => navigate(ROUTES.interview)}
            className="bg-[#7F77DD] hover:bg-[#6d65cc] transition text-white text-sm font-medium px-5 py-2.5 rounded-xl"
          >
            ▶ Start Interview
          </button>
          <button
            onClick={() => navigate(ROUTES.report)}
            className="bg-white/6 border border-white/12 hover:bg-white/10 transition text-white/60 text-sm px-5 py-2.5 rounded-xl"
          >
            View Reports
          </button>
        </div>
      </div>

      <div className="flex gap-3 sm:flex-shrink-0">
        <StatCard value={stats?.interviews ?? 0} label="Sessions done" />
        <StatCard value={`${stats?.score ?? 0}%`} label="Avg score" accent />
      </div>

    </div>
  )
}

export default HeroSection