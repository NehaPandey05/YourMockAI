import { useState } from "react";
import { uploadResume } from "../services/resumeServices";


const useResume = () => {
  const [loading, setLoading] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [error, setError] = useState("");

  const analyzeResume = async (file, userId) => {
    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("resume", file);
      formData.append("userId", userId);

      const data = await uploadResume(formData);

      setResumeData(data.resume);
      return data.resume;
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    resumeData,
    analyzeResume,
  };
};

export default useResume;