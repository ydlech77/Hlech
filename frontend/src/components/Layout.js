import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  FaStethoscope,
  FaHeartbeat,
  FaUtensils,
  FaMapMarkerAlt,
  FaDumbbell,
  FaRobot,
  FaUserMd,
  FaSmileBeam,
  FaChartLine,
  FaBookMedical,
  FaSignOutAlt,
  FaHome,
  FaPiggyBank,
} from "react-icons/fa";

export default function Layout() {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("user"));
    if (!saved) {
      navigate("/login");
    } else {
      setUser(saved);
      if (saved.profilePic) setProfilePic(saved.profilePic);
    }
  }, [navigate]);

  const features = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Health Check", path: "/health-check", icon: <FaHeartbeat /> },
    { name: "AI Doctor", path: "/ai-doctor", icon: <FaUserMd /> },
    { name: "Meal Planner", path: "/meal-planner", icon: <FaUtensils /> },
    { name: "Exercise Guide", path: "/exercise-guide", icon: <FaDumbbell /> },
    { name: "Cooking Tips", path: "/cooking-tips", icon: <FaRobot /> },
    { name: "Discover Hlech", path: "/discover", icon: <FaRobot /> },
    { name: "Progress Tracker", path: "/progress-tracker", icon: <FaChartLine /> },
    { name: "Therapist", path: "/therapist", icon: <FaStethoscope /> },
    { name: "Fun Chat", path: "/fun-chat", icon: <FaSmileBeam /> },
    { name: "Location Tracker", path: "/location-tracker", icon: <FaMapMarkerAlt /> },
    { name: "Medical Records", path: "/medical-records", icon: <FaBookMedical /> },
    { name: "Hlech Insurance", path: "/hlech-insurance", icon: <FaPiggyBank /> },
  ];

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    // 🚫 Layout does NOT scroll
    <div className="flex h-screen overflow-hidden bg-gray-50">

      {/* Sidebar – fixed height */}
      <aside className="hidden md:flex w-72 bg-white shadow-lg flex-col h-screen">

        {/* Profile */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-4">
            {profilePic ? (
              <img
                src={profilePic}
                alt="avatar"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-purple-200 flex items-center justify-center text-purple-800 font-bold text-xl">
                {user?.username?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
            <div className="font-semibold text-gray-800">
              {user?.username || "User"}
            </div>
          </div>
        </div>

        {/* Menu – scrolls only if menu is long */}
        <nav className="p-4 flex-1 overflow-y-auto">
          {features.map((f, i) => (
            <button
              key={i}
              onClick={() => navigate(f.path)}
              className="flex items-center gap-3 p-3 rounded-lg mb-2 hover:bg-purple-50 hover:text-purple-700 transition w-full text-left"
            >
              <span className="text-lg">{f.icon}</span>
              <span className="text-sm font-medium">{f.name}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 justify-center p-3 bg-red-500 hover:bg-red-600 text-white rounded-lg"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* ✅ ONLY this part scrolls */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-20">
        <Outlet />
      </main>
    </div>
  );
}
