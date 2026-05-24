import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };


  return (
    <div className="flex h-screen bg-[#0d0d1a] overflow-hidden">

      {/* Sidebar */}
      <div
        className={`fixed h-full bg-white shadow-lg transition-all duration-300 ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        <Sidebar isOpen={isOpen} />
      </div>

      {/* Main */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-20"
        }`}
      >

       

        {/* Page Content */}
        <div className="p-6 overflow-y-auto h-[calc(100vh-64px)]">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;