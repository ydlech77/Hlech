// src/pages/features/MedicalRecords.js
import React, { useState, useEffect } from "react";

export default function MedicalRecords() {
  const [note, setNote] = useState("");
  const [records, setRecords] = useState([]);

  useEffect(() => {
    setRecords(JSON.parse(localStorage.getItem("records") || "[]"));
  }, []);

  function add() {
    if (!note) return;
    const r = [...records, { note, date: new Date().toISOString() }];
    localStorage.setItem("records", JSON.stringify(r));
    setRecords(r);
    setNote("");
  }

  function deleteRecord(index) {
    // Show confirmation popup
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record? This action cannot be undone."
    );
    if (!confirmDelete) return;

    const updated = records.filter((_, i) => i !== index);
    localStorage.setItem("records", JSON.stringify(updated));
    setRecords(updated);
  }

  return (
    <div className="max-w-3xl">
      <h2 className="text-xl font-bold mb-3">Medical Records</h2>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full p-3 border rounded"
        placeholder="Add a record e.g., 'Visited clinic - flu test'"
      ></textarea>

      <div className="mt-2 flex gap-2">
        <button
          onClick={add}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          Add record
        </button>
      </div>

      <div className="mt-4 space-y-2">
        {records.length === 0 && (
          <div className="text-gray-500">No records yet.</div>
        )}
        {records.slice().reverse().map((r, i) => {
          const realIndex = records.length - 1 - i;
          return (
            <div
              key={realIndex}
              className="p-3 bg-white rounded shadow flex justify-between items-start"
            >
              <div>
                <div className="text-sm text-gray-500">
                  {new Date(r.date).toLocaleString()}
                </div>
                <div>{r.note}</div>
              </div>
              <button
                onClick={() => deleteRecord(realIndex)}
                className="px-2 py-1 bg-red-600 text-white rounded text-sm"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
