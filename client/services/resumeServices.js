import axios from "axios";

const API_URL = "http://localhost:5000/api/resumes";

export const uploadResume = async (formData) => {
  const response = await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getResumes = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};

export const deleteResume = async (resumeId) => {
  const response = await axios.delete(`${API_URL}/${resumeId}`);
  return response.data;
};