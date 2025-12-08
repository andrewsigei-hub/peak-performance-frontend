import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in when component loads
  useEffect(function () {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Navigation functions
  function goToHome() {
    navigate("/");
  }

  function goToDashboard() {
    navigate("/dashboard");
  }

  function goToLogin() {
    navigate("/login");
  }

  function goToMeals() {
    navigate("/meals");
  }

  function goToProgress() {
    navigate("/progress");
  }

  function goToLifts() {
    navigate("/lifts");
  }

  function goToRuns() {
    navigate("/runs");
  }

  // Handle logout
  function handleLogout() {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  }

  return (
    <nav className="bg-gray-950 border-b border-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo - Clickable to go home */}
        <h1
          className="text-2xl font-bold text-yellow-400 hover:text-yellow-500 transition cursor-pointer"
          onClick={goToHome}
        >
          PeakPerform
        </h1>

        {/* Menu */}
        <div className="flex items-center gap-6">
          <button
            onClick={goToMeals}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Meals
          </button>
          <button
            onClick={goToLifts}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Lifts
          </button>
          <button
            onClick={goToRuns}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Runs
          </button>
          <button
            onClick={goToProgress}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Progress
          </button>
          <button
            onClick={goToDashboard}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Dashboard
          </button>
          // Show Logout if user is logged in, otherwise Sign In
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-300">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-gray-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={goToLogin}
              className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
