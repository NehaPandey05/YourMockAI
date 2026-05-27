import { useState } from "react"
import { deleteSession } from "../../../services/dashboardServices.js"

const scoreStyle = (score) => {
  if (score >= 80) return { background: "rgba(29,158,117,0.15)", color: "#5DCAA5" }
  if (score >= 60) return { background: "rgba(239,159,39,0.15)", color: "#EF9F27" }
  return { background: "rgba(216,90,48,0.15)", color: "#F0997B" }
}

const ActivityCard = ({ sessions, setSessions }) => {
  const [error, setError] = useState("")

  const handleDelete = async (sessionId) => {
    setError("")
    try {
      await deleteSession(sessionId)
     setSessions(prev => prev.filter(s => s._id !== sessionId))
    } catch {
      setError("Failed to delete session. Try again.")
    }
  }

  return (
    <div
      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(127,119,221,0.2)" }}
      className="rounded-xl p-5"
    >
      <h2
        style={{ color: "rgba(255,255,255,0.8)" }}
        className="text-sm font-medium mb-4"
      >
        Recent Sessions
      </h2>

      {error && (
        <p style={{ color: "#F0997B" }} className="text-xs mb-3">{error}</p>
      )}

      <div className="flex flex-col gap-3">
        {sessions.length === 0 ? (
          <p style={{ color: "rgba(255,255,255,0.3)" }} className="text-xs text-center py-4">
            No sessions yet. Complete an interview to see your history here.
          </p>
        ) : (
          sessions.slice(0, 6).map((session) => (
            <div
              key={session._id}
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              className="flex items-center justify-between py-2 last:border-0 group"
            >
              <div>
                <p style={{ color: "rgba(255,255,255,0.85)" }} className="text-sm">
                  {session.type}
                  {session.role && session.role !== session.type && (
                    <span style={{ color: "rgba(255,255,255,0.4)" }}> · {session.role}</span>
                  )}
                </p>
                <p style={{ color: "rgba(255,255,255,0.35)" }} className="text-xs mt-0.5">
                  {new Date(session.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  style={scoreStyle(session.score)}
                  className="text-xs px-3 py-1 rounded-full font-medium"
                >
                  {session.score}%
                </span>
                <button
                  onClick={() => handleDelete(session._id)}
                  style={{ color: "rgba(255,255,255,0.2)" }}
                  className="text-xs opacity-0 group-hover:opacity-100 hover:!text-red-400 transition-all"
                  aria-label="Delete session"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ActivityCard