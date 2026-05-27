import { useNavigate } from "react-router-dom"
import { useMemo } from "react"

const useAuth = () => {
  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  const user = useMemo(() => {
    if (!token) return null
    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      const isExpired = payload.exp * 1000 < Date.now()
      if (isExpired) {
        localStorage.removeItem("token")
        return null
      }
      return {
        id: payload.id,
        name: payload.name,
        email: payload.email,
      }
    } catch {
      return null
    }
  }, [token])

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return { user, logout }
}

export default useAuth