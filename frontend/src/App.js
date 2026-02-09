// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// (other feature pages can remain unchanged)
import AIDoctor from "./pages/features/AIDoctor";
import HealthCheck from "./pages/features/HealthCheck";
import MealPlanner from "./pages/features/MealPlanner";
import ExerciseGuide from "./pages/features/ExerciseGuide";
import CookingTips from "./pages/features/CookingTips";
import Discover from "./pages/features/Discover";
import ProgressTracker from "./pages/features/ProgressTracker";
import Therapist from "./pages/features/Therapist";
import FunChat from "./pages/features/FunChat";
import LocationTracker from "./pages/features/LocationTracker";
import MedicalRecords from "./pages/features/MedicalRecords";
import HlechInsurance from "./pages/features/HlechInsurance";

export default function App() {
  const token = localStorage.getItem("access_token");

  return (
    <Router>
      <Routes>
        {/* public */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* protected layout (all routes inside Layout are protected by Layout's useEffect) */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ai-doctor" element={<AIDoctor />} />
          <Route path="/health-check" element={<HealthCheck />} />
          <Route path="/meal-planner" element={<MealPlanner />} />
          <Route path="/exercise-guide" element={<ExerciseGuide />} />
          <Route path="/cooking-tips" element={<CookingTips />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/progress-tracker" element={<ProgressTracker />} />
          <Route path="/therapist" element={<Therapist />} />
          <Route path="/fun-chat" element={<FunChat />} />
          <Route path="/location-tracker" element={<LocationTracker />} />
          <Route path="/medical-records" element={<MedicalRecords />} />
          <Route path="/hlech-insurance" element={<HlechInsurance />} />
        </Route>

        {/* default */}
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
