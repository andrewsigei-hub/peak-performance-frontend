import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  // State to store form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(true); // Toggle between signup/login

  const navigate = useNavigate();

  // Function to handle form submission
  async function handleSubmit(event) {
    event.preventDefault(); // Prevent page refresh
    setError(""); // Clear any previous errors

    try {
      if (isSignup) {
        // SIGNUP: Create new user
        const response = await fetch("http://localhost:8000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name, email: email }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.detail || "Email already exists or invalid data");
          return;
        }

        const userData = await response.json();
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/dashboard");
      } else {
        // LOGIN: Find existing user by email
        const response = await fetch("http://localhost:8000/users");

        if (!response.ok) {
          setError("Could not connect to server");
          return;
        }

        const allUsers = await response.json();

        // Find user with matching email
        const foundUser = allUsers.find(function (user) {
          return user.email === email;
        });

        if (foundUser) {
          // User found - log them in
          localStorage.setItem("user", JSON.stringify(foundUser));
          navigate("/dashboard");
        } else {
          // User not found
          setError("No account found with this email. Please sign up first.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Could not connect to server. Make sure backend is running.");
    }
  }

  // Function to toggle between signup and login
  function toggleMode() {
    setIsSignup(!isSignup);
    setError(""); // Clear errors when switching
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-bold text-yellow-400 hover:text-yellow-500 transition cursor-pointer mb-4"
            onClick={function () {
              navigate("/");
            }}
          >
            PeakPerform
          </h1>
          <h2 className="text-2xl font-bold">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-gray-400 mt-2">
            {isSignup
              ? "Sign up to start tracking your fitness"
              : "Sign in to continue your journey"}
          </p>
        </div>
        // Form Container
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <form onSubmit={handleSubmit}>
            // Name Input for Signup
            {isSignup && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={function (event) {
                    setName(event.target.value);
                  }}
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 transition"
                  placeholder="John Doe"
                  required
                />
              </div>
            )}
            // Email Input
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={function (event) {
                  setEmail(event.target.value);
                }}
                className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 transition"
                placeholder="you@example.com"
                required
              />
            </div>
            {/* Error Message */}
            {error && (
              <div className="mb-4 bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
            >
              {isSignup ? "Create Account" : "Sign In"}
            </button>
          </form>
          // Toggle Between Signup/Login
          <div className="mt-6 text-center">
            <button
              onClick={toggleMode}
              className="text-gray-400 hover:text-yellow-400 transition"
            >
              {isSignup
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </button>
          </div>
          // Back to Home Link
          <div className="mt-4 text-center">
            <button
              onClick={function () {
                navigate("/");
              }}
              className="text-gray-400 hover:text-yellow-400 transition text-sm"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
