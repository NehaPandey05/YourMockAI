import { FaBars, FaBell, FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { getInitials } from "../../utils/getInitials";

const Topbar = ({ toggleSidebar, user }) => {
  const location = useLocation();

  // Dynamic page title
  const getTitle = () => {
    if (location.pathname.includes("interview")) return "Interview";
    if (location.pathname.includes("resume")) return "Resume";
    if (location.pathname.includes("report")) return "Report";
    return "Dashboard";
  };

  const userName = user?.name || "User";

  return (
    <div className="bg-white/80 backdrop-blur-md px-6 py-4 shadow-sm flex items-center justify-between">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">

        {/* Sidebar Toggle */}
        <button
          onClick={toggleSidebar}
          className="text-xl text-gray-700 hover:text-black transition"
        >
          <FaBars />
        </button>

        {/* Title Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {getTitle()}
          </h2>

          {/* Clean subtitle (no duplicate welcome) */}
          <p className="text-sm text-gray-500">
            Have a productive session today 🚀
          </p>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-lg w-64">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>

        {/* Notification */}
        <div className="relative cursor-pointer">
          <FaBell className="text-gray-600 text-lg hover:text-black transition" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            3
          </span>
        </div>

        {/* USER PROFILE (INITIAL AVATAR) */}
        <div className="flex items-center gap-3 cursor-pointer">

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
            {getInitials(userName)}
          </div>

          {/* Name */}
          <span className="text-sm text-gray-700">
            {userName}
          </span>

        </div>

      </div>
    </div>
  );
};

export default Topbar;