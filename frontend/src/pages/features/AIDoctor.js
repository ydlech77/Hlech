// src/pages/features/AIDoctor.js
import React, { useState } from "react";

export default function AIDoctor() {
  const aiWelcome = {
    from: "bot",
    text: "Hello! I am Lech AI 🩺. Describe your symptoms and I’ll guide you.",
  };

  const doctorWelcome = {
    from: "bot",
    text: "You are now chatting with a real medical doctor. Please describe your issue and book a consultation.",
  };

  const [mode, setMode] = useState("ai"); // ai | doctor
  const [text, setText] = useState("");

  const [aiMessages, setAiMessages] = useState([aiWelcome]);
  const [doctorMessages, setDoctorMessages] = useState([doctorWelcome]);

  const [booking, setBooking] = useState({
    date: "",
    time: "",
    issue: "",
  });

  const messages = mode === "ai" ? aiMessages : doctorMessages;
  const setMessages = mode === "ai" ? setAiMessages : setDoctorMessages;

  function send() {
    if (!text) return;

    setMessages((m) => [...m, { from: "user", text }]);

    if (mode === "ai") {
      setTimeout(() => {
        setAiMessages((m) => [
          ...m,
          {
            from: "bot",
            text:
              "Lech AI 🧠: Based on your symptoms, ensure adequate rest, hydration, and monitor closely. If symptoms persist or worsen, consult a doctor.",
          },
        ]);
      }, 700);
    }

    setText("");
  }

  function bookConsultation(e) {
    e.preventDefault();
    if (!booking.date || !booking.time || !booking.issue) return;

    setDoctorMessages((m) => [
      ...m,
      {
        from: "bot",
        text: `✅ Consultation booked successfully!
📅 Date: ${booking.date}
⏰ Time: ${booking.time}
🩺 A real doctor will contact you.`,
      },
    ]);

    setBooking({ date: "", time: "", issue: "" });
  }

  function clearChat() {
    if (mode === "ai") {
      setAiMessages([aiWelcome]);
    } else {
      setDoctorMessages([doctorWelcome]);
    }
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold mb-3">Hlech Medical Assistant</h2>

      {/* MODE SELECT */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setMode("ai")}
          className={`px-4 py-2 rounded ${
            mode === "ai" ? "bg-purple-600 text-white" : "bg-gray-200"
          }`}
        >
          Lech AI
        </button>
        <button
          onClick={() => setMode("doctor")}
          className={`px-4 py-2 rounded ${
            mode === "doctor" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          Real Doctor
        </button>

        <button
          onClick={clearChat}
          className="ml-auto px-3 py-2 bg-red-500 text-white rounded"
        >
          Clear Chat
        </button>
      </div>

      {/* CHAT AREA */}
      <div className="bg-white p-3 rounded shadow h-72 overflow-y-auto space-y-2 flex flex-col">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded max-w-[80%] ${
              m.from === "bot"
                ? "bg-gray-100 self-start"
                : "bg-purple-50 self-end"
            }`}
          >
            <div className="text-sm">{m.text}</div>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="mt-3 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-3 border rounded"
          placeholder="Type your message..."
        />
        <button
          onClick={send}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          Send
        </button>
      </div>

      {/* REAL CONSULTATION FORM */}
      {mode === "doctor" && (
        <form
          onSubmit={bookConsultation}
          className="mt-4 bg-gray-50 p-4 rounded shadow space-y-3"
        >
          <h3 className="font-semibold text-lg">Book Real Consultation</h3>

          <textarea
            placeholder="Describe your medical issue"
            value={booking.issue}
            onChange={(e) =>
              setBooking({ ...booking, issue: e.target.value })
            }
            className="border p-2 rounded w-full"
            required
          />

          <input
            type="date"
            value={booking.date}
            onChange={(e) =>
              setBooking({ ...booking, date: e.target.value })
            }
            className="border p-2 rounded w-full"
            required
          />

          <input
            type="time"
            value={booking.time}
            onChange={(e) =>
              setBooking({ ...booking, time: e.target.value })
            }
            className="border p-2 rounded w-full"
            required
          />

          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded"
          >
            Book Consultation
          </button>
        </form>
      )}
    </div>
  );
}
