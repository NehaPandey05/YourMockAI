import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Interview from "../pages/Interview";
import Resume from "../pages/Resume";
import Report from "../pages/Report";

import DashboardLayout from "../Layout/DashboardLayout";

const AppRoutes = () => {
  return (
    <Routes>
       <Route path="/" element={<Navigate to="/login" />} />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Dashboard Layout Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>

        <Route index element={<Dashboard />} />
        <Route path="interview" element={<Interview />} />
        <Route path="resume" element={<Resume />} />
        <Route path="report" element={<Report />} />

      </Route>

    </Routes>
  );
};

export default AppRoutes;