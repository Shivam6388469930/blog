// "use client";
// import { useEffect, useState } from "react";
// // import { useRouter } from 'next/router';

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const timer = message && setTimeout(() => setMessage(""), 4000);
//     return () => clearTimeout(timer);
//   }, [message]);

//   useEffect(() => {
//     document.querySelector("input[type='email']")?.focus();
//   }, []);

//   async function handleLogin(e) {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
//       setMessage(data.message);

//       if (res.ok) {
//         const { user, token } = data;
//         // // Clear any existing admin session
//         // localStorage.removeItem("adminUserName");
//         // localStorage.removeItem("adminUserEmail");
//         // localStorage.removeItem("adminImage");
//         // localStorage.removeItem("adminToken");
//         // localStorage.removeItem("adminRole");
//         // Also clear any old user session keys (for consistency)
//         localStorage.removeItem("userName");
//         localStorage.removeItem("userEmail");
//         localStorage.removeItem("Image");
//         localStorage.removeItem("token");
//         localStorage.removeItem("userRole");

//         // Set user session
//         localStorage.setItem("userName", user.userName);
//         localStorage.setItem("userEmail", user.email);
//         localStorage.setItem("Image", user.image);
//         localStorage.setItem("token", token);
//         localStorage.setItem("userRole", user.role || "user");

//         setEmail("");
//         setPassword("");
//         window.location.href = "/";
//       }
//     } catch (error) {
//       setMessage("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="flex justify-center items-center h-[80vh]">
//       <div className="w-full max-w-md bg-white border border-gray-300 shadow-2xl rounded-xl p-6">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         <form onSubmit={handleLogin} className="flex flex-col gap-4">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className={`p-3 text-white rounded ${
//               loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
//             }`}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//         {message && (
//           <p className="mt-4 text-center text-sm text-red-500">{message}</p>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const timer = message && setTimeout(() => setMessage(""), 4000);
    return () => clearTimeout(timer);
  }, [message]);

  useEffect(() => {
    document.querySelector("input[type='email']")?.focus();
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setMessage(data.message);

      if (res.ok) {
        const { user, token } = data;

        // Clear any previous session
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("Image");
        localStorage.removeItem("token");

        // Store user session
        localStorage.setItem("userName", user.userName);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("Image", user.image);
        localStorage.setItem("token", token);

        setEmail("");
        setPassword("");

        router.push("/"); // redirect to homepage
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="w-full max-w-md bg-white border border-gray-300 shadow-2xl rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">User Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4" noValidate>
          <label className="text-sm font-medium">
            Email:
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              className="w-full mt-1 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </label>

          <label className="text-sm font-medium">
            Password:
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-1 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-500"
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className={`p-3 text-white rounded ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
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
