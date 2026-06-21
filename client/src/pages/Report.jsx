import { useEffect, useState } from "react";
import axios from "axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Report = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const userId = localStorage.getItem("userId");

        console.log("USER ID:", userId);

        if (!userId) {
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `http://localhost:5000/api/report/${userId}`
        );

        console.log("REPORT RESPONSE:", res.data);

        setReport(res.data);
      } catch (error) {
        console.log(
          "REPORT ERROR:",
          error.response?.data || error.message
        );
        setReport(null);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex justify-center items-center text-white">
        Loading Report...
      </div>
    );
  }

  if (!report) {
    return (
      <div className="h-full flex justify-center items-center text-white">
        No report available yet.
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">
        Performance Report
      </h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-5 mb-8">
        <div className="bg-gray-800 p-5 rounded-xl">
          <h3>Total Interviews</h3>
          <p className="text-3xl font-bold">
            {report.totalInterviews || 0}
          </p>
        </div>

        <div className="bg-gray-800 p-5 rounded-xl">
          <h3>Average Score</h3>
          <p className="text-3xl font-bold">
            {report.avgScore || 0}%
          </p>
        </div>

        <div className="bg-gray-800 p-5 rounded-xl">
          <h3>Best Score</h3>
          <p className="text-3xl font-bold">
            {report.bestScore || 0}%
          </p>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-gray-900 p-5 rounded-xl">
        <h2 className="text-xl mb-4">
          Monthly Progress
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={report.monthlyData || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="avgScore"
              stroke="#8b5cf6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Report;