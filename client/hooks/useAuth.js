import { useNavigate } from "react-router-dom"

const useAuth = () => {
  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  if (!token) return { user: null, logout: () => navigate("/login") }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]))

    const isExpired = payload.exp * 1000 < Date.now()
    if (isExpired) {
      localStorage.removeItem("token")
      return { user: null, logout: () => navigate("/login") }
    }

    const logout = () => {
      localStorage.removeItem("token")
      navigate("/login")
    }

    return {
      user: {
        id: payload.id,
        name: payload.name,
        email: payload.email,
      },
      logout,
    }
  } catch {
    return { user: null, logout: () => navigate("/login") }
  }
}

export default useAuth