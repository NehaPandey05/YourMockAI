import { useNavigate } from "react-router-dom"

const HeroSection = ({ name }) => {
  const navigate = useNavigate()

  return (
    <div className="bg-[#7F77DD]/20 border border-[#7F77DD]/30 rounded-2xl p-8 flex items-center justify-between">
      
      <div>
        <h1 className="text-2xl font-bold text-white">
          Ready for your next interview, {name || "User"}?
        </h1>
        <p className="text-white/45 mt-1 text-sm">
          Practice with AI, get instant feedback, and track your improvement.
        </p>
        <div className="mt-5 flex gap-3">
          <button
            onClick={() => navigate("/dashboard/interview")}
            className="bg-[#7F77DD] hover:bg-[#6d65cc] transition text-white text-sm font-medium px-5 py-2.5 rounded-xl"
          >
            ▶ Start Interview
          </button>
          <button
            onClick={() => navigate("/dashboard/report")}
            className="bg-white/6 border border-white/12 hover:bg-white/10 transition text-white/60 text-sm px-5 py-2.5 rounded-xl"
          >
            View Reports
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="bg-[#7F77DD]/15 border border-[#7F77DD]/25 rounded-xl px-5 py-4 text-center">
          <p className="text-white text-2xl font-medium">12</p>
          <p className="text-white/35 text-xs mt-1">Sessions done</p>
        </div>
        <div className="bg-[#7F77DD]/15 border border-[#7F77DD]/25 rounded-xl px-5 py-4 text-center">
          <p className="text-[#AFA9EC] text-2xl font-medium">78%</p>
          <p className="text-white/35 text-xs mt-1">Avg score</p>
        </div>
      </div>

    </div>
  )
}

export default HeroSection