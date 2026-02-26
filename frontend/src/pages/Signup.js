// src/pages/Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function safeJson(res) {
    try {
      return await res.clone().json(); // ✅ clone fixes "body already read"
    } catch {
      try {
        return await res.clone().text();
      } catch {
        return { raw: "Cannot read response" };
      }
    }
  }

  async function requestTokens({ emailOrUsername, password }) {
    const res = await fetch("https://hlech.onrender.com/api/accounts/signup/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailOrUsername, password }),
    });
    const payload = await safeJson(res);
    return { ok: res.ok, status: res.status, payload };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }
    if (!username) {
      alert("Please enter a username");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/accounts/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const body = await safeJson(res);

      if (!res.ok) {
        console.error("Signup failed:", res.status, body);
        alert("Signup failed: " + JSON.stringify(body));
        setLoading(false);
        return;
      }

      // Auto-login
      const attempt = await requestTokens({ emailOrUsername: email, password });
      if (!attempt.ok || !attempt.payload?.access) {
        alert("Signup succeeded but auto-login failed. Log in manually.");
        setLoading(false);
        navigate("/login");
        return;
      }

      // Save tokens
      localStorage.setItem("access_token", attempt.payload.access);
      if (attempt.payload.refresh) localStorage.setItem("refresh_token", attempt.payload.refresh);

      // Save user
      localStorage.setItem("user", JSON.stringify({
        id: body.user.id,
        email: email,
        username: username
      }));

      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Create account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Username</label>
            <input
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
              placeholder="Prince"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Confirm Password</label>
            <input
              required
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            disabled={loading}
            className={`w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <a className="text-purple-600 font-semibold" href="/login">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
