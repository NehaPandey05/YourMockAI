import { useState } from "react";
import useResume from "../../hooks/useResume";
import useAuth from "../../hooks/useAuth";

const Resume = () => {
  const [file, setFile] = useState(null);
  const { user } = useAuth();

  const { analyzeResume, loading, error, resumeData } = useResume();

  const handleSubmit = async () => {
  if (!file) {
    alert("Please select a resume");
    return;
  }

  if (!user) {
    alert("Please login first");
    return;
  }

  try {
    await analyzeResume(file, user.id);
  } catch (error) {
    console.error(error);
  }
};

  return (
  <div className="flex justify-center items-center h-full px-6 py-10">
    <div className="w-full max-w-3xl bg-[#12172D] rounded-3xl p-10 shadow-2xl border border-[#252B45]">

      <h1 className="text-4xl font-bold text-white text-center mb-3">
        AI Resume Analyzer
      </h1>

      <p className="text-center text-gray-400 mb-8">
        Upload your resume and receive AI-powered feedback and improvement suggestions.
      </p>
<div className="mb-6 flex justify-center">
  <div className="w-full max-w-lg">
    <label
      htmlFor="resume-upload"
      className="flex items-center justify-center w-full h-40 rounded-2xl border-2 border-purple-500 bg-[#1B2140] cursor-pointer hover:bg-[#242B4D] transition"
    >
      <div className="text-center">
        <div className="text-5xl mb-3">📄</div>

        <p className="text-white font-semibold text-lg">
          {file ? file.name : "Click to Select Resume"}
        </p>

        <p className="text-gray-400 text-sm mt-1">
          PDF or DOCX (Max 5MB)
        </p>
      </div>
    </label>

    <input
      id="resume-upload"
      type="file"
      accept=".pdf,.docx"
      className="hidden"
      onChange={(e) => setFile(e.target.files[0])}
    />
  </div>
</div>

      <button
        onClick={handleSubmit}
        disabled={loading || !file}
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-4 rounded-xl font-semibold text-lg disabled:opacity-50"
      >
        {loading ? "Analyzing Resume..." : "Analyze Resume 🚀"}
      </button>

      {resumeData && (
        <div className="mt-10 bg-[#1B2140] p-6 rounded-2xl border border-[#31395F]">
          <h2 className="text-2xl font-bold text-white mb-4">
            Resume Score: {resumeData.score}/100
          </h2>

          <p className="text-gray-300 mb-6">
            {resumeData.analysis}
          </p>

          <div className="mb-6">
            <h3 className="text-green-400 font-semibold mb-2">
              Strengths
            </h3>

            <ul className="list-disc pl-5 text-gray-300">
              {resumeData.strengths?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-yellow-400 font-semibold mb-2">
              Improvements
            </h3>

            <ul className="list-disc pl-5 text-gray-300">
              {resumeData.improvements?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  </div>
);
};

export default Resume;