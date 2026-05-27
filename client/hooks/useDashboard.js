import { useState, useEffect } from "react"
import { getDashboardData } from "../services/dashboardServices.js"
import useAuth from "./useAuth"

const useDashboard = () => {
  const { user } = useAuth()
  const [sessions, setSessions] = useState([])
  const [resumeCount, setResumeCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

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
        if (isMounted && err.name !== "CanceledError" && err.code !== "ERR_CANCELED") {
          setError(err.message || "Failed to load dashboard")
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadDashboard()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [user])

  const scoredSessions = sessions.filter(s => typeof s.score === "number")
  const stats = {
    interviews: sessions.length,
    score: scoredSessions.length
      ? Math.round(scoredSessions.reduce((a, s) => a + s.score, 0) / scoredSessions.length)
      : 0,
    resumes: resumeCount,
  }

  return { sessions, setSessions, stats, loading, error }
}

export default useDashboard