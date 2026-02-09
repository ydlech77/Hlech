// src/pages/features/ExerciseGuide.js
import React, { useState } from "react";

export default function ExerciseGuide() {
  const [age, setAge] = useState("");
  const [health, setHealth] = useState("");
  const [time, setTime] = useState("");
  const [plan, setPlan] = useState(null);

  function makePlan(ageInput, healthInput, timeInput) {
    const ageNum = Number(ageInput) || 30;
    const timeNum = Number(timeInput) || 30;
    const healthLower = healthInput.toLowerCase();

    // Babies & toddlers
    if (ageNum >= 0 && ageNum <= 5) {
      return `For children 0–5 years old:\n- Parents should guide them\n- Let them crawl, walk, or run safely\n- Play with balls, dance, or move arms and legs\n- Do small fun exercises for ${timeNum} minutes each day\n- Make it fun and safe!`;
    }

    // Special health conditions
    if (healthLower.includes("heart") || healthLower.includes("asthma")) {
      return `Easy exercises for safety:\n- Walk slowly for ${timeNum} minutes\n- Stretch arms and legs gently\n- Take deep breaths\n- Always ask your doctor before starting.`;
    }

    // Older adults
    if (ageNum > 60) {
      return `Gentle daily exercises:\n- Walk slowly for ${timeNum} minutes\n- Stretch arms, legs, and back\n- Lift very light things if comfortable\n- Move carefully and slowly\n- Check with your doctor before new exercises.`;
    }

    // Short time
    if (timeNum <= 20) {
      return `Quick exercises:\n- 5 push-ups (or lean on wall)\n- 10 squats (sit down and stand up slowly)\n- 10 arm raises (up and down)\n- 30 sec plank (lie on belly and lift body)\nRepeat 2–3 times.`;
    }

    // Medium time
    if (timeNum <= 45) {
      return `Medium exercises:\n- Walk or jog slowly for 15 min\n- 10 push-ups\n- 15 squats\n- 30 sec plank\n- Stretch arms, legs, back for 5 min\nDo 3 times per week.`;
    }

    // Long sessions
    return `Full workout:\n- Move your body for 30 min (walk, jog, cycle)\n- Exercise muscles for 20 min (push-ups, squats, sit-ups, lift light objects)\n- Stretch for 10 min (arms, legs, back, shoulders)\n- Move slowly and breathe well`;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setPlan(makePlan(age, health, time));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-3">Simple Exercise Guide</h2>
      <p className="text-gray-600 mb-4">
        Enter your age, health problems, and how many minutes you can exercise.
      </p>

      <form onSubmit={onSubmit} className="space-y-3">
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          className="w-full p-3 border rounded-lg"
          type="number"
        />
        <input
          value={health}
          onChange={(e) => setHealth(e.target.value)}
          placeholder="Health problems (if any)"
          className="w-full p-3 border rounded-lg"
        />
        <input
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Minutes you can exercise"
          className="w-full p-3 border rounded-lg"
          type="number"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg"
          >
            Get Exercise Plan
          </button>
          <button
            type="button"
            onClick={() => {
              setAge("");
              setHealth("");
              setTime("");
              setPlan(null);
            }}
            className="px-4 py-2 bg-gray-300 text-black rounded-lg"
          >
            Clear
          </button>
        </div>
      </form>

      {plan && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow whitespace-pre-line">
          <strong>Exercise Plan:</strong>
          <p className="mt-2">{plan}</p>
        </div>
      )}
    </div>
  );
}
