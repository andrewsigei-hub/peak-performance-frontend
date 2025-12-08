import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  // Store user data and their workouts/meals
  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [meals, setMeals] = useState([]);
  const navigate = useNavigate();

  // Get user data from backend
  function fetchUserData(userId) {
    // Fetch workouts
    fetch(`http://localhost:8000/workouts?user_id=${userId}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setWorkouts(data);
        console.log("Got workouts:", data);
      });

    // Fetch meals
    fetch(`http://localhost:8000/meals?user_id=${userId}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setMeals(data);
      });
  }

  // Calculate total distance from workouts
  function calculateTotalDistance() {
    let total = 0;
    for (let i = 0; i < workouts.length; i++) {
      if (workouts[i].distance_km) {
        total = total + workouts[i].distance_km;
      }
    }
    return total.toFixed(1);
  }

  // Run when page loads - check if user is logged in
  useEffect(
    function () {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        // No user found, send to login
        navigate("/login");
        return;
      }

      // Parse the user data and fetch their stuff
      const userData = JSON.parse(storedUser);
      setUser(userData);
      fetchUserData(userData.id);
    },
    [navigate]
  );

  // Logout function
  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/");
  }

  // Show nothing while loading
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        /* Welcome message */
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Hey {user.name}!</h1>
          <p className="text-gray-400 text-lg">
            You've logged {workouts.length} workouts so far and logged{" "}
            {meals.length} meals.
          </p>
        </div>
        /* Stats cards */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="text-sm text-gray-400 mb-2">Total Workouts</div>
            <div className="text-4xl font-bold text-yellow-400">
              {workouts.length}
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="text-sm text-gray-400 mb-2">Distance Run</div>
            <div className="text-4xl font-bold text-yellow-400">
              {calculateTotalDistance()} km
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="text-sm text-gray-400 mb-2">Meals Logged</div>
            <div className="text-4xl font-bold text-yellow-400">
              {meals.length}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Recent Workouts</h2>
              <button
                onClick={function () {
                  navigate("/runs");
                }}
                className="text-yellow-400 hover:text-yellow-500 transition"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3">
              {workouts.length === 0 ? (
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 text-center text-gray-400">
                  No workouts yet. Start tracking!
                </div>
              ) : (
                // Show last 5 workouts
                workouts.slice(0, 5).map(function (workout) {
                  return (
                    <div
                      key={workout.id}
                      className="bg-gray-900 p-4 rounded-xl border border-gray-800"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold capitalize">
                            {workout.type}
                          </div>
                          <div className="text-sm text-gray-400">
                            {workout.date}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-yellow-400 font-semibold">
                            {workout.duration_min} min
                          </div>
                          {workout.distance_km && (
                            <div className="text-sm text-gray-400">
                              {workout.distance_km} km
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Recent Meals</h2>
              <button
                onClick={function () {
                  navigate("/meals");
                }}
                className="text-yellow-400 hover:text-yellow-500 transition"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3">
              {meals.length === 0 ? (
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 text-center text-gray-400">
                  No meals yet. Start tracking!
                </div>
              ) : (
                // Show last 5 meals
                meals.slice(0, 5).map(function (meal) {
                  return (
                    <div
                      key={meal.id}
                      className="bg-gray-900 p-4 rounded-xl border border-gray-800"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold">{meal.name}</div>
                          <div className="text-sm text-gray-400">
                            {meal.date}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-yellow-400 font-semibold">
                            {meal.calories} cal
                          </div>
                          <div className="text-xs text-gray-400">
                            P: {meal.protein}g · C: {meal.carbs}g · F:{" "}
                            {meal.fat}g
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;