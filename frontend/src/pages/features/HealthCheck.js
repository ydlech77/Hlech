import React, { useState } from "react";
import { healthConditions } from "./healthData"; // your dataset

export default function HealthCheck() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const detectCondition = (text) => {
    const lower = text.toLowerCase();
    return healthConditions.find(condition =>
      condition.keywords.some(k => lower.includes(k))
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userInput = input;
    setInput("");

    const condition = detectCondition(userInput);

    if (!condition) {
      setMessages(prev => [
        ...prev,
        { role: "user", text: userInput },
        {
          role: "ai",
          text:
            "I couldn’t clearly identify the condition. Please ask a parent, teacher, or doctor for help."
        }
      ]);
      return;
    }

    // Emergency diseases: give advice first then warning
    if (condition.emergency) {
      const advice =
        `Possible condition: ${condition.name}\n\n` +
        `Possible causes:\n- ${condition.causes.join("\n- ")}\n\n` +
        `Natural treatment:\n- ${condition.natural.join("\n- ")}\n\n` +
        `Medicine (ask a parent or doctor):\n- ${condition.drugs.join("\n- ")}\n\n` +
        `🚨 Warning: This may be serious. Please go to the nearest hospital or speak with a qualified adult immediately.`;

      setMessages(prev => [
        ...prev,
        { role: "user", text: userInput },
        { role: "ai", text: advice }
      ]);
      return;
    }

    // Normal conditions
    const response =
      `Possible condition: ${condition.name}\n\n` +
      `Possible causes:\n- ${condition.causes.join("\n- ")}\n\n` +
      `Natural treatment:\n- ${condition.natural.join("\n- ")}\n\n` +
      `Medicine (ask a parent or doctor):\n- ${condition.drugs.join("\n- ")}`;

    setMessages(prev => [
      ...prev,
      { role: "user", text: userInput },
      { role: "ai", text: response }
    ]);
  };

  const clearChat = () => setMessages([]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Health Check</h2>

      <div className="space-y-3 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg ${
              msg.role === "ai" ? "bg-gray-100" : "bg-purple-100 text-right"
            }`}
          >
            <pre className="whitespace-pre-wrap">{msg.text}</pre>
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="flex gap-2 mb-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-3 border rounded-lg"
          placeholder="Describe how you feel..."
          rows={2}
          required
        />
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg">
          Send
        </button>
      </form>

      <button
        onClick={clearChat}
        className="px-4 py-2 bg-red-600 text-white rounded-lg"
      >
        Clear Chat
      </button>

      <p className="mt-3 text-sm text-gray-500">
        This is not a medical diagnosis. Always ask a parent, teacher, or doctor for help.
      </p>
    </div>
  );
}
