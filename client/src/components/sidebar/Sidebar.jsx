import { BsMicFill } from "react-icons/bs"
import { MdDashboard, MdLeaderboard } from "react-icons/md"
import { FaHistory, FaFileAlt, FaChartBar, FaCog } from "react-icons/fa"
import { FiLogOut } from "react-icons/fi"
import { NavLink, useNavigate } from "react-router-dom"
import useAuth from "../../../hooks/useAuth"


const Sidebar = () => {
  const { user, logout } = useAuth()

  return (
    <div className="flex flex-col h-full bg-[#0a0a16] border-r border-[#7F77DD]/15">
      
      {/* 1. LOGO */}
<div className="px-5 py-6 text-white font-semibold text-lg tracking-tight">
  Your<span className="text-[#7F77DD]">Mock</span> AI
</div>
      
    {/* 2. INTERVIEW BUTTON */}
<div className="px-3 mb-4">
  <NavLink
    to="/dashboard/interview"
    className="flex items-center gap-3 bg-[#7F77DD] hover:bg-[#6d65cc] transition rounded-xl px-4 py-3"
  >
    <BsMicFill className="text-white text-lg" />
    <div>
      <p className="text-white text-sm font-medium">Start Interview</p>
      <p className="text-white/60 text-xs">AI-powered practice</p>
    </div>
  </NavLink>
</div>
      
     {/* 3. NAV LINKS */}
<nav className="flex-1 px-3 flex flex-col gap-1">
  
  <NavLink to="/dashboard" end className={({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
      isActive ? "bg-[#7F77DD]/20 text-[#AFA9EC]" : "text-white/40 hover:text-white/70"
    }`
  }>
    <MdDashboard className="text-base" /> Dashboard
  </NavLink>

  <div className="my-2 border-t border-[#7F77DD]/10" />

  <NavLink to="/dashboard/resume" className={({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
      isActive ? "bg-[#7F77DD]/20 text-[#AFA9EC]" : "text-white/40 hover:text-white/70"
    }`
  }>
    <FaFileAlt className="text-base" /> Resume
  </NavLink>

  <NavLink to="/dashboard/history" className={({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
      isActive ? "bg-[#7F77DD]/20 text-[#AFA9EC]" : "text-white/40 hover:text-white/70"
    }`
  }>
    <FaHistory className="text-base" /> Practice History
  </NavLink>

  <NavLink to="/dashboard/report" className={({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
      isActive ? "bg-[#7F77DD]/20 text-[#AFA9EC]" : "text-white/40 hover:text-white/70"
    }`
  }>
    <FaChartBar className="text-base" /> Reports
  </NavLink>

  <div className="my-2 border-t border-[#7F77DD]/10" />

  <NavLink to="/dashboard/leaderboard" className={({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
      isActive ? "bg-[#7F77DD]/20 text-[#AFA9EC]" : "text-white/40 hover:text-white/70"
    }`
  }>
    <MdLeaderboard className="text-base" /> Leaderboard
  </NavLink>

  <div className="my-2 border-t border-[#7F77DD]/10" />

  <NavLink to="/dashboard/settings" className={({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
      isActive ? "bg-[#7F77DD]/20 text-[#AFA9EC]" : "text-white/40 hover:text-white/70"
    }`
  }>
    <FaCog className="text-base" /> Settings
  </NavLink>

</nav>
      
     {/* 4. PROFILE CARD */}
<div className="mx-3 mb-3 flex items-center gap-3 bg-[#7F77DD]/10 border border-[#7F77DD]/20 rounded-xl px-3 py-3">
  
  {/* Avatar */}
  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#534AB7] to-[#7F77DD] flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
    {user?.name?.charAt(0).toUpperCase()}
  </div>

  {/* Name & Email */}
  <div className="flex-1 min-w-0">
    <p className="text-white/85 text-sm font-medium truncate">{user?.name}</p>
    <p className="text-white/30 text-xs truncate">{user?.email}</p>
  </div>

  {/* Logout */}
  <button onClick={logout} className="text-white/25 hover:text-white/60 transition">
    <FiLogOut className="text-base" />
  </button>

</div>

    </div>
  )
}

export default Sidebar