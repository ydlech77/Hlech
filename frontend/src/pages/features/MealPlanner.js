// src/pages/features/MealPlanner.js
import React, { useState } from "react";

export default function MealPlanner() {
  const [budget, setBudget] = useState("");
  const [preference, setPreference] = useState("");
  const [plan, setPlan] = useState(null);

  function generateWeeklyPlan(budgetVal, pref) {
    const b = Number(budgetVal);
    if (!b || b <= 0) return null;

    const likes = pref || "local foods";

    let meals;

    // LOW BUDGET
    if (b < 3000) {
      meals = {
        morning: [
          "Pap & akara",
          "Bread & tea",
          "Garri soakings",
          "Pap & milk",
          "Bread & egg",
          "Oats (small portion)",
          "Pap & groundnut",
        ],
        afternoon: [
          "Rice & beans",
          "Garri & soup",
          "Yam porridge",
          "Beans & plantain",
          "Rice & stew",
          "Indomie & egg",
          "Beans porridge",
        ],
        night: [
          "Garri & soup",
          "Rice leftovers",
          "Yam & sauce",
          "Pap",
          "Beans",
          "Garri",
          "Light soup & swallow",
        ],
      };
    }

    // MID BUDGET
    else if (b < 8000) {
      meals = {
        morning: [
          "Oats & fruits",
          "Bread & egg",
          "Pap & akara",
          "Cornflakes & milk",
          "Toast & tea",
          "Omelette & bread",
          "Oats",
        ],
        afternoon: [
          "Rice & chicken stew",
          "Beans & fish",
          "Spaghetti & veggies",
          "Yam & egg sauce",
          "Rice & beans",
          "Plantain & egg",
          "Fried rice",
        ],
        night: [
          "Vegetable soup & swallow",
          "Rice & stew",
          "Plantain & fish",
          "Beans",
          "Noodles & egg",
          "Light soup",
          "Salad & egg",
        ],
      };
    }

    // HIGH BUDGET
    else {
      meals = {
        morning: [
          "Oatmeal & fruits",
          "Smoothie & toast",
          "Egg & avocado",
          "Greek yogurt & fruits",
          "Pancakes",
          "Oats & honey",
          "Boiled eggs & fruits",
        ],
        afternoon: [
          "Grilled chicken & brown rice",
          "Fish & quinoa",
          "Chicken stir-fry",
          "Salad & grilled fish",
          "Rice & chicken",
          "Pasta & veggies",
          "Beans & fish",
        ],
        night: [
          "Vegetable soup & wheat",
          "Grilled fish & veggies",
          "Salad & egg",
          "Light soup",
          "Steamed veggies",
          "Chicken soup",
          "Fish stew & plantain",
        ],
      };
    }

    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    return {
      budget: b,
      preference: likes,
      timetable: days.map((day, i) => ({
        day,
        morning: meals.morning[i],
        afternoon: meals.afternoon[i],
        night: meals.night[i],
      })),
    };
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setPlan(generateWeeklyPlan(budget, preference));
  };

  const clearPlan = () => {
    setBudget("");
    setPreference("");
    setPlan(null);
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-xl font-bold mb-3">AI Weekly Meal Planner</h2>
      <p className="text-gray-600 mb-4">
        Tell Lech Cook your budget and food you like 🍽️
      </p>

      <form onSubmit={onSubmit} className="space-y-3">
        <input
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Weekly budget (e.g. 6000)"
          className="w-full p-3 border rounded-lg"
          type="number"
        />
        <input
          value={preference}
          onChange={(e) => setPreference(e.target.value)}
          placeholder="Foods you like (rice, fish, beans...)"
          className="w-full p-3 border rounded-lg"
        />

        <div className="flex gap-3">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg">
            Generate Timetable
          </button>
          <button
            type="button"
            onClick={clearPlan}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Clear
          </button>
        </div>
      </form>

      {plan && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow">
          <h3 className="font-bold mb-4">Weekly Meal Timetable</h3>
          <p className="text-sm text-gray-600 mb-4">
            Budget: ₦{plan.budget} | Preference: {plan.preference}
          </p>

          <div className="space-y-4">
            {plan.timetable.map((d, i) => (
              <div key={i} className="border rounded-lg p-3 bg-gray-50">
                <h4 className="font-semibold mb-2">{d.day}</h4>
                <p><strong>🌅 Morning:</strong> {d.morning}</p>
                <p><strong>🌞 Afternoon:</strong> {d.afternoon}</p>
                <p><strong>🌙 Night:</strong> {d.night}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
