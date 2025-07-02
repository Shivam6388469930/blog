"use client";
import { useEffect, useState } from "react";
// import { useRouter } from 'next/router';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    // Only check localStorage on client
    if (typeof window !== "undefined") {
      if (!localStorage.getItem('adminToken')) {
        window.location.href = "/admin/adminlogin";
        return;
      }
      setCheckedAuth(true);
    }
  }, []);

  useEffect(() => {
    const timer = message && setTimeout(() => setMessage("") , 4000);
    return () => clearTimeout(timer);
  }, [message]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.querySelector("input[type='email']")?.focus();
    }
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/adminauth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setMessage(data.message);

      if (res.ok) {
        const { user, token } = data;
        // Clear any existing user session
        // localStorage.removeItem("userName");
        // localStorage.removeItem("userEmail");
        // localStorage.removeItem("Image");
        // localStorage.removeItem("token");
        // localStorage.removeItem("userRole");
        // Also clear any old admin session keys (for consistency)
        // localStorage.removeItem("adminUserName");
        // localStorage.removeItem("adminUserEmail");
        // localStorage.removeItem("adminImage");
        // localStorage.removeItem("adminToken");
        // localStorage.removeItem("adminRole");

        // Set admin session with separate keys
        localStorage.setItem("adminUserName", user.userName);
        localStorage.setItem("adminUserEmail", user.email);
        localStorage.setItem("adminImage", user.image);
        localStorage.setItem("adminToken", token);
        localStorage.setItem("adminRole", user.role || "admin");

        setEmail("");
        setPassword("");
        window.location.href = "/admin/home";
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!checkedAuth) return null;
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="w-full max-w-md bg-white border border-gray-300 shadow-2xl rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className={`p-3 text-white rounded ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-red-500">{message}</p>
        )}
      </div>
    </div>
  );
}
