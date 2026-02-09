import React, { useState } from "react";
import therapyData from "../../data/therapyData";

/* 🔊 VOICE FUNCTION — NO LIBRARY */
function speakText(text, mode = "normal", isMuted = false) {
  if (isMuted) return; // Do nothing if muted
  if (!("speechSynthesis" in window)) return;

  const utterance = new SpeechSynthesisUtterance(
    text.replace(/🎵|🎶|😴|🌙/g, "")
  );

  utterance.rate = mode === "sleep" ? 0.7 : 1;
  utterance.pitch = mode === "sleep" ? 0.9 : 1;
  utterance.volume = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

export default function Therapist() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 💜 I’m Hlech Therapist. I’m here for you." },
  ]);
  const [text, setText] = useState("");
  const [mode, setMode] = useState("motivation"); // motivation | story | song | sleep
  const [age, setAge] = useState("adult");
  const [isMuted, setIsMuted] = useState(false);

  const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

  function getReply() {
    if (mode === "motivation") return random(therapyData.motivation[age]);
    if (mode === "story") return random(therapyData.stories[age]);
    if (mode === "song") return random(therapyData.songs.calm);
    if (mode === "sleep") {
      return (
        "Close your eyes 😴\n" +
        "Breathe in slowly for four seconds...\n" +
        "Hold...\n" +
        "Breathe out gently...\n" +
        "You are safe. Let sleep come 🌙"
      );
    }
  }

  function send() {
    if (!text) return;

    setMessages((m) => [...m, { from: "user", text }]);

    setTimeout(() => {
      const reply = getReply();
      setMessages((m) => [...m, { from: "bot", text: reply }]);
      speakText(reply, mode, isMuted);
    }, 600);

    setText("");
  }

  function clearChat() {
    window.speechSynthesis.cancel();
    setMessages([
      { from: "bot", text: "Chat cleared 💜 I’m still here for you." },
    ]);
  }

  function toggleMute() {
    setIsMuted((prev) => !prev);
    if (!isMuted) window.speechSynthesis.cancel(); // stop any ongoing speech
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold mb-3">Hlech Therapist 🧠💜</h2>

      {/* MODE BUTTONS */}
      <div className="flex gap-2 mb-3 flex-wrap">
        {["motivation", "story", "song", "sleep"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1 rounded ${
              mode === m ? "bg-purple-600 text-white" : "bg-gray-200"
            }`}
          >
            {m.toUpperCase()}
          </button>
        ))}
      </div>

      {/* AGE SELECT */}
      <select
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="mb-3 p-2 border rounded"
      >
        <option value="child">Child</option>
        <option value="teen">Teen</option>
        <option value="adult">Adult</option>
      </select>

      {/* CHAT BOX */}
      <div className="bg-white p-4 rounded shadow h-80 overflow-y-auto space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded max-w-[80%] ${
              m.from === "bot" ? "bg-gray-100" : "bg-purple-100 ml-auto"
            }`}
          >
            <div className="text-sm whitespace-pre-line">{m.text}</div>
          </div>
        ))}
      </div>

      {/* INPUT + BUTTONS */}
      <div className="mt-3 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-3 border rounded"
          placeholder="Talk to me..."
        />

        {/* CLEAR BUTTON */}
        <button
          onClick={clearChat}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
        >
          Clear
        </button>

        {/* MUTE BUTTON - CENTER */}
        <button
          onClick={toggleMute}
          className={`px-4 py-2 rounded ${
            isMuted ? "bg-red-500 text-white" : "bg-green-500 text-white"
          }`}
        >
          {isMuted ? "Muted 🔇" : "Voice 🔊"}
        </button>

        {/* SEND BUTTON */}
        <button
          onClick={send}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
