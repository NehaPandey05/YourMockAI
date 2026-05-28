import { useState, useEffect, useCallback } from "react"
import { getDashboardData } from "../services/dashboardServices.js"
import useAuth from "./useAuth"

const useDashboard = () => {
  const { user } = useAuth()
  const [sessions, setSessions] = useState([])
  const [resumeCount, setResumeCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)   // ← ADD THIS

  // Call this after any action that should update the dashboard
  const refresh = useCallback(() => setRefreshKey(k => k + 1), [])

  useEffect(() => {
    if (!user) { setLoading(false); return }

    let isMounted = true
    const controller = new AbortController()

    const loadDashboard = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getDashboardData(user.id, controller.signal)
        if (isMounted) {
          setSessions(data.sessions || [])
          setResumeCount(data.resumes?.length ?? 0)
        }
      } catch (err) {
        if (isMounted && err.name !== "CanceledError" && err.code !== "ERR_CANCELED")
          setError(err.message || "Failed to load dashboard")
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadDashboard()
    return () => { isMounted = false; controller.abort() }
  }, [user, refreshKey])  // ← ADD refreshKey here

  const scoredSessions = sessions.filter(s => typeof s.score === "number")
  const stats = {
    interviews: sessions.length,
    score: scoredSessions.length
      ? Math.round(scoredSessions.reduce((a, s) => a + s.score, 0) / scoredSessions.length)
      : 0,
    resumes: resumeCount,
  }

  return { sessions, setSessions, stats, loading, error, refresh }  // ← expose refresh
}

export default useDashboard