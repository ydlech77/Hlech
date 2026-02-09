// src/pages/features/CookingTips.js
import React, { useState } from "react";

export default function AICookingGuide() {
  const [meal, setMeal] = useState("");
  const [budget, setBudget] = useState("");
  const [output, setOutput] = useState(null);

  const generateCookingGuide = () => {
    let protein = "";
    let oilNote = "";

    const money = Number(budget);

    if (money <= 1500) {
      protein = "Egg or beans";
      oilNote = "Use very little oil to save cost and stay healthy.";
    } else if (money <= 3000) {
      protein = "Fish";
      oilNote = "Use moderate oil and add vegetables if possible.";
    } else {
      protein = "Meat or chicken";
      oilNote = "Use healthy oil and include plenty of vegetables.";
    }

    const data = {
      ingredients: [
        `Main ingredient for ${meal}`,
        "Onions",
        "Pepper and spices",
        "Cooking oil",
        protein,
        "Vegetables (optional)"
      ],
      steps: [
        `Prepare all ingredients needed for ${meal}.`,
        "Wash and cut ingredients properly.",
        "Heat oil in a pot (small quantity).",
        "Add onions and spices and stir.",
        `Add ${protein.toLowerCase()} and cook briefly.`,
        `Add the main ingredient and allow ${meal} to cook.`,
        "Taste and adjust seasoning.",
        "Serve the food while hot."
      ],
      healthTip: `Budget tip: ${oilNote}`
    };

    setOutput(data);
  };

  const clearAll = () => {
    setMeal("");
    setBudget("");
    setOutput(null);
  };

  return (
    <div className="max-w-xl">
      <h2 className="text-2xl font-bold mb-1">Cook with Lech 🍳</h2>
      <p className="text-gray-600 mb-4">
        Enter a meal and your budget to get a healthy cooking guide.
      </p>

      <input
        type="text"
        placeholder="Meal name (e.g. Jollof Rice)"
        className="w-full border p-2 rounded mb-2"
        value={meal}
        onChange={(e) => setMeal(e.target.value)}
      />

      <input
        type="number"
        placeholder="Your budget (₦)"
        className="w-full border p-2 rounded mb-3"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />

      <div className="flex gap-2">
        <button
          onClick={generateCookingGuide}
          disabled={!meal || !budget}
          className="bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Generate Guide
        </button>

        <button
          onClick={clearAll}
          className="border px-4 py-2 rounded"
        >
          Clear
        </button>
      </div>

      {output && (
        <div className="bg-white p-4 mt-4 rounded shadow">
          <h3 className="font-bold mb-2">Ingredients</h3>
          <ul className="list-disc pl-5 mb-3">
            {output.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3 className="font-bold mb-2">Cooking Steps</h3>
          <ol className="list-decimal pl-5 mb-3">
            {output.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>

          <p className="text-green-600 font-medium">
            💚 {output.healthTip}
          </p>
        </div>
      )}
    </div>
  );
}
