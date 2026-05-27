import axios from "axios"

const handleRequest = async (requestFn, errorMessage) => {
  try {
    return await requestFn()
  } catch (err) {
    const message = err.response?.data?.message || err.message || errorMessage
    throw new Error(message)
  }
}

export const getDashboardData = async (userId, signal) =>
  handleRequest(
    () => axios.get(`/api/dashboard/${userId}`, { signal }).then(r => r.data),
    "Failed to load dashboard"
  )

export const addSession = async (userId, { role, topic, score }) =>
  handleRequest(
    () => axios.post(`/api/sessions`, { userId, role, topic, score }).then(r => r.data),
    "Failed to add session"
  )

export const deleteSession = async (sessionId) =>
  handleRequest(
    () => axios.delete(`/api/sessions/${sessionId}`).then(r => r.data),
    "Failed to delete session"
  )

export const addResume = async (userId, { title, url, fileType }) =>
  handleRequest(
    () => axios.post(`/api/resumes`, { userId, title, url, fileType }).then(r => r.data),
    "Failed to add resume"
  )

export const deleteResume = async (resumeId) =>
  handleRequest(
    () => axios.delete(`/api/resumes/${resumeId}`).then(r => r.data),
    "Failed to delete resume"
  )