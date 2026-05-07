// src/pages/features/ProgressTracker.js
import React, { useState, useEffect, useCallback } from "react";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function ProgressTracker() {
  const [goal, setGoal] = useState(null);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [alarmPlaying, setAlarmPlaying] = useState(false);

  // Load saved goal
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("goalAlarm"));
    if (saved) setGoal(saved);

    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // Save goal
  useEffect(() => {
    if (goal) {
      localStorage.setItem("goalAlarm", JSON.stringify(goal));
    }
  }, [goal]);

  // 🔔 Alarm function (FIXED WITH useCallback)
  const triggerAlarm = useCallback(() => {
    if (!goal) return;

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("⏰ Goal Reminder", {
        body: `Time to do: ${goal.title}`,
      });
    }

    const audio = new Audio(
      "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
    );
    audio.play();
    setAlarmPlaying(true);
  }, [goal]);

  // ⏰ Time checker (NO ESLINT WARNING)
  useEffect(() => {
    if (!goal || goal.completed) return;

    const interval = setInterval(() => {
      const now = new Date();
      const today = DAYS[now.getDay()];
      const currentTime = now.toTimeString().slice(0, 5);

      if (
        goal.days.includes(today) &&
        currentTime === goal.time &&
        !goal.doneToday
      ) {
        triggerAlarm();
      }
    }, 1000); // check every minute

    return () => clearInterval(interval);
  }, [goal, triggerAlarm]);

  // Reset daily status at midnight
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        setGoal((g) => (g ? { ...g, doneToday: false } : g));
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const createGoal = () => {
    if (!title || !time || selectedDays.length === 0) return;

    setGoal({
      title,
      time,
      days: selectedDays,
      progress: 0,
      total: selectedDays.length,
      doneToday: false,
      completed: false,
      lastDoneDate: null,
    });

    setTitle("");
    setTime("");
    setSelectedDays([]);
  };

  const markDone = () => {
    const today = new Date().toDateString();

    if (goal.lastDoneDate === today) return;

    const newProgress = goal.progress + 1;
    const completed = newProgress >= goal.total;

    setGoal({
      ...goal,
      progress: newProgress,
      doneToday: true,
      completed,
      lastDoneDate: today,
    });

    setAlarmPlaying(false);
  };

  const resetGoal = () => {
    localStorage.removeItem("goalAlarm");
    setGoal(null);
  };

  // ================= UI =================

  if (!goal) {
    return (
      <div className="max-w-xl">
        <h2 className="text-xl font-bold mb-4">🎯 Set Goal With Alarm</h2>

        <input
          className="w-full p-3 border rounded mb-2"
          placeholder="Goal title (e.g Study, Exercise)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="time"
          className="w-full p-3 border rounded mb-3"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <p className="font-medium mb-2">Select days:</p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {DAYS.map((d) => (
            <label key={d} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedDays.includes(d)}
                onChange={() =>
                  setSelectedDays((prev) =>
                    prev.includes(d)
                      ? prev.filter((x) => x !== d)
                      : [...prev, d]
                  )
                }
              />
              {d}
            </label>
          ))}
        </div>

        <button
          onClick={createGoal}
          className="w-full bg-purple-600 text-white py-3 rounded"
        >
          Start Goal
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-bold mb-2">🎯 {goal.title}</h2>

      <p className="text-sm text-gray-600 mb-1">Time: {goal.time}</p>
      <p className="text-sm text-gray-600 mb-3">
        Days: {goal.days.join(", ")}
      </p>

      <div className="w-full bg-gray-200 rounded mb-2">
        <div
          className="bg-green-500 h-3 rounded"
          style={{
            width: `${(goal.progress / goal.total) * 100}%`,
          }}
        />
      </div>

      <p className="text-sm mb-3">
        {goal.progress} / {goal.total} completed
      </p>

      {alarmPlaying && !goal.doneToday && (
        <button
          onClick={markDone}
          className="w-full bg-green-600 text-white py-3 rounded mb-2"
        >
          ✅ Done
        </button>
      )}

      {goal.completed && (
        <div className="p-4 bg-yellow-50 rounded mb-3">
          🎉 <b>Congratulations!</b> You completed your goal successfully!
        </div>
      )}

      <button
        onClick={resetGoal}
        className="w-full bg-red-500 text-white py-2 rounded"
      >
        Reset Goal
      </button>
    </div>
  );
}
