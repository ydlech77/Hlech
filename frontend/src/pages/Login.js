// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://hlech.onrender.com";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  async function safeJson(res) {
    try {
      return await res.json();
    } catch {
      return { raw: await res.text() };
    }
  }

  // ---- IMPORTANT PART ----
  // First try { email, password }  (your custom SimpleJWT serializer)
  // If that fails, try { username, password } (default SimpleJWT behavior)
  async function requestTokens({ emailOrUsername, password, useUsernameKey = false }) {
    const body = useUsernameKey
      ? { username: emailOrUsername, password }
      : { email: emailOrUsername, password };

    console.log("Sending to /api/token/ body =", body);

    const res = await fetch(`${API_BASE}/api/token/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const payload = await safeJson(res);
    return { ok: res.ok, status: res.status, payload };
  }
  // ------------------------

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError("");

    try {
      console.log("Login: trying { email, password }...");
      const attempt1 = await requestTokens({
        emailOrUsername: email,
        password,
        useUsernameKey: false, // send { email, password }
      });
      console.log("Attempt1:", attempt1);

      let tokens = null;

      if (attempt1.ok && attempt1.payload?.access) {
        tokens = attempt1.payload;
      } else {
        console.log("Login: fallback to { username, password }...");
        const attempt2 = await requestTokens({
          emailOrUsername: email,
          password,
          useUsernameKey: true, // send { username, password }
        });
        console.log("Attempt2:", attempt2);

        if (attempt2.ok && attempt2.payload?.access) {
          tokens = attempt2.payload;
        } else {
          const serverErr =
            attempt1.payload?.detail ||
            attempt1.payload?.non_field_errors ||
            attempt1.payload?.email ||
            attempt2.payload?.detail ||
            attempt2.payload?.non_field_errors ||
            attempt2.payload?.username ||
            attempt2.payload ||
            "Unknown error";
          setFormError(
            typeof serverErr === "string" ? serverErr : JSON.stringify(serverErr)
          );
          setLoading(false);
          return;
        }
      }

      // Save tokens
      localStorage.setItem("access_token", tokens.access);
      if (tokens.refresh) localStorage.setItem("refresh_token", tokens.refresh);

      // Fetch user/dashboard
      const userRes = await fetch(`${API_BASE}/api/dashboard/`, {
        headers: { Authorization: `Bearer ${tokens.access}` },
      });
      if (!userRes.ok) {
        const u = await safeJson(userRes);
        setFormError(
          "Login succeeded but fetching profile failed: " + JSON.stringify(u)
        );
        setLoading(false);
        return;
      }
      const userData = await userRes.json();
      localStorage.setItem("user", JSON.stringify(userData));

      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setFormError("Could not reach the server. Is Django running on 127.0.0.1:8000?");
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setFormError("");
    try {
      const res = await fetch(`${API_BASE}/api/accounts/forgot-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });
      if (!res.ok) {
        const err = await safeJson(res);
        setFormError("Reset failed: " + JSON.stringify(err));
        return;
      }
      alert("Password reset email sent!");
      setShowReset(false);
    } catch (err) {
      console.error(err);
      setFormError("Could not reach the server. Is Django running?");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        {!showReset ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Welcome back</h2>

            {formError && (
              <div className="mb-3 rounded-md bg-red-50 border border-red-200 text-red-700 p-3 text-sm">
                {formError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
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

              <button
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
              >
                {loading ? "Signing in..." : "Log in"}
              </button>
            </form>

            <div className="mt-4 flex justify-between items-center">
              <button
                type="button"
                className="text-purple-600 font-semibold"
                onClick={() => setShowReset(true)}
              >
                Forgot Password?
              </button>

              <button
                type="button"
                className="text-gray-600 font-semibold"
                onClick={() => navigate("/signup")}
              >
                Create Account
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Reset Password</h2>

            {formError && (
              <div className="mb-3 rounded-md bg-red-50 border border-red-200 text-red-700 p-3 text-sm">
                {formError}
              </div>
            )}

            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <input
                  required
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
                  placeholder="you@example.com"
                />
              </div>

              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold">
                Send Reset Link
              </button>
            </form>

            <div className="mt-4">
              <button
                type="button"
                className="text-purple-600 font-semibold"
                onClick={() => setShowReset(false)}
              >
                Back to Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
