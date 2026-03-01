import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [showMission, setShowMission] = useState(false);
  const [showVision, setShowVision] = useState(false);
  const [language, setLanguage] = useState("en");
  const [profilePic, setProfilePic] = useState(localStorage.getItem("profilePic"));
  const [deferredPrompt, setDeferredPrompt] = useState(null); // ✅ PWA install prompt

  const navigate = useNavigate();

  // ================= PWA INSTALL PROMPT =================
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e); // store the event for later
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  const handleInstallPWA = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt(); // show install prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log("PWA Install Outcome:", outcome);
    setDeferredPrompt(null);
  };

  // ================= DASHBOARD DATA FETCH =================
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("https://hlech.onrender.com/api/dashboard/", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => {
    if (!res.ok) throw new Error("Failed");
    return res.json();
  })
  .then((data) => setUser(data))
  .catch(() => setUser({ fullName: "User" }));
  }, [navigate]);

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  // ================= IMAGE UPLOAD =================
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem("profilePic", reader.result);
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const mobileFeatures = [
    ["🩺 Health Check", "Detect symptoms early", "/health-check"],
    ["🍲 Meal Planner", "Healthy meal plans", "/meal-planner"],
    ["🏋️ Exercise Guide", "Exercises for you", "/exercise-guide"],
    ["🧑‍⚕️ AI Doctor", "Medical guidance", "/ai-doctor"],
    ["😂 Hchat", "Jokes, raps & fun", "/fun-chat"],
    ["👩‍🍳 Cooking Tips", "Affordable meals", "/Cooking-Tips"],
    ["📑 Hlech Insurance", "Health coverage", "/hlech-insurance"],
    ["📈 Progress Tracker", "Track health goals", "/progress-tracker"],
    ["🧠 Discover Hlech", "Mind & emotions care", "/Discover"],
    ["🩺 Therapist", "Talk to professionals", "/therapist"],
    ["📍 Location Tracker", "Track movements", "/location-tracker"],
    ["📋 Medical Records", "Health history", "/medical-records"],
  ];

  const desktopFeatures = mobileFeatures.slice(0, 7);

  return (
    <div className="p-6 space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div className="flex items-center gap-4">
          {/* MOBILE UPLOADABLE PROFILE PIC */}
          <div className="md:hidden w-[50%] flex justify-center">
            <label className="cursor-pointer">
              <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-200 shadow-lg flex items-center justify-center">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-500 text-center px-1">
                    Add Photo
                  </span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* EXISTING AVATAR */}
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-bold">
            {user?.username?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
            <h1 className="text-2xl font-bold">Hi {user?.username || "User"}!</h1>
            <p className="text-sm text-gray-600 max-w-xl mt-1">
              I’m Hlech — your pocket health coach, tracking your health, goals, and daily wellbeing.
            </p>
          </div>
        </div>

        {/* LANGUAGE SELECT */}
        <div>
          <label className="text-sm mr-2">Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
      </div>

      {/* MISSION / VISION */}
      <div className="flex gap-3">
        <button
          onClick={() => setShowMission(!showMission)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Mission
        </button>
        <button
          onClick={() => setShowVision(!showVision)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Vision
        </button>
      </div>

      {showMission && (
        <div className="bg-green-50 p-4 rounded-lg">
          <h2 className="font-bold mb-2">Our Mission</h2>
          <p className="text-sm">
            To make health accessible, affordable, and personalized for everyone.
          </p>
        </div>
      )}

      {showVision && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="font-bold mb-2">Our Vision</h2>
          <p className="text-sm">
            To become the world’s most trusted digital health companion.
          </p>
        </div>
      )}

      {/* MOBILE VIEW */}
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-5 md:hidden">
        {mobileFeatures.map(([title, desc, link]) => (
          <a key={title} href={link} className="p-6 bg-white rounded-xl shadow">
            <h3 className="font-bold">{title}</h3>
            <p className="text-sm text-gray-500 mt-2">{desc}</p>
          </a>
        ))}

        <button
          onClick={handleLogout}
          className="p-6 bg-red-500 text-white rounded-xl shadow font-bold"
        >
          🚪 Logout
        </button>

        {/* PWA INSTALL BUTTON */}
        {deferredPrompt && (
          <button
            onClick={handleInstallPWA}
            className="p-6 bg-yellow-500 text-white rounded-xl shadow font-bold"
          >
            📲 Install Hlech
          </button>
        )}
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {desktopFeatures.map(([title, desc, link]) => (
          <a
            key={title}
            href={link}
            className="p-7 bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="font-bold">{title}</h3>
            <p className="text-sm text-gray-500 mt-2">{desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
