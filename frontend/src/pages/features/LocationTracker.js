// src/pages/features/HospitalFinder.js
import React, { useState } from "react";

export default function HospitalFinder() {
  const [hospitals, setHospitals] = useState([]);
  const [err, setErr] = useState(null);
  const [sickness, setSickness] = useState("");

  // Sample hospital list (demo)
  const sampleHospitals = [
    { name: "City Health Center", address: "123 Main Street", lat: "6.4976", lon: "2.6036" },
    { name: "St. Mary Hospital", address: "45 Central Avenue", lat: "6.5200", lon: "2.6100" },
    { name: "Green Valley Clinic", address: "78 Park Road", lat: "6.5100", lon: "2.6200" },
    { name: "Sunrise Medical Center", address: "22 River Lane", lat: "6.5300", lon: "2.6250" },
    { name: "Hope Hospital", address: "99 Freedom Street", lat: "6.5400", lon: "2.6300" },
    { name: "Riverbank Hospital", address: "11 Bridge Street", lat: "6.5450", lon: "2.6350" },
    { name: "Golden Gate Clinic", address: "50 Sunset Road", lat: "6.5500", lon: "2.6400" },
    { name: "Blue Horizon Medical", address: "7 Ocean Avenue", lat: "6.5550", lon: "2.6450" },
    { name: "Harmony Health Center", address: "88 Green Lane", lat: "6.5600", lon: "2.6500" },
    { name: "Bright Future Hospital", address: "10 Sunrise Street", lat: "6.5650", lon: "2.6550" },
    { name: "CarePlus Clinic", address: "33 Elm Street", lat: "6.5700", lon: "2.6600" },
    { name: "Hopewell Medical Center", address: "44 Maple Avenue", lat: "6.5750", lon: "2.6650" },
  ];

  // Function to simulate "finding nearby hospitals" randomly based on sickness
  function findHospitals() {
    setErr(null);
    if (!sickness) {
      setErr("Please type your sickness to find suitable hospitals!");
      return;
    }

    // Shuffle array randomly
    const shuffled = sampleHospitals.sort(() => 0.5 - Math.random());

    // Pick 3 to 5 hospitals, use sickness as seed to change selection slightly
    const hash = sickness.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const startIndex = hash % (shuffled.length - 5); // ensure enough hospitals
    setHospitals(shuffled.slice(startIndex, startIndex + Math.floor(Math.random() * 3 + 3)));
  }

  // Clear input and hospital list
  function clearResults() {
    setSickness("");
    setHospitals([]);
    setErr(null);
  }

  return (
    <div className="max-w-lg p-4 bg-purple-50 rounded shadow">
      <h2 className="text-2xl font-bold mb-3 text-purple-700">🏥 Find Hospitals for Your Sickness</h2>
      <p className="text-gray-700 mb-4">
        Type your sickness and click the button to see hospitals suitable for you.
      </p>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={sickness}
          onChange={(e) => setSickness(e.target.value)}
          placeholder="Type sickness, e.g., fever, toothache"
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={findHospitals}
          className="px-4 py-2 bg-purple-600 text-white rounded font-semibold hover:bg-purple-700"
        >
          🔍 Find Hospitals
        </button>
        <button
          onClick={clearResults}
          className="px-4 py-2 bg-gray-400 text-white rounded font-semibold hover:bg-gray-500"
        >
          ❌ Clear
        </button>
      </div>

      {err && <div className="mt-4 text-red-600 font-medium">{err}</div>}

      {hospitals.length > 0 && (
        <div className="mt-4 space-y-3">
          {hospitals.map((h, i) => (
            <div key={i} className="p-3 bg-white rounded shadow">
              <h3 className="font-bold">{h.name}</h3>
              <p>{h.address}</p>
              <a
                className="mt-2 inline-block px-3 py-1 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700"
                href={`https://www.google.com/maps?q=${h.lat},${h.lon}`}
                target="_blank"
                rel="noreferrer"
              >
                🗺️ Open in Google Maps
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
