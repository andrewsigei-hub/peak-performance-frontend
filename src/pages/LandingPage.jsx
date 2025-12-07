import { useNavigate } from "react-router-dom";
import { Activity, Dumbbell, Apple } from "lucide-react";

function LandingPage() {
  const navigate = useNavigate();

  function goToLogin() {
    navigate("/Login");
  }

  function goToMeals() {
    navigate("/meals");
  }

  function goToLifts() {
    navigate("/lifts");
  }

  function goToRuns() {
    navigate("/runs");
  }

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Hero Text */}
        <div>
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Unlock Your
            <br />
            Peak Performance
          </h1>

          <p className="text-xl text-gray-400 mb-8">
            Track your workouts, meals, and progress all in one place.
          </p>

          <button
            onClick={goToLogin}
            className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold hover:bg-yellow-500 transition shadow-lg mb-12"
          >
            Get Started
          </button>

          {/* Feature Icons */}
          <div className="flex flex-wrap gap-8 mt-6">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={goToRuns}
            >
              <Activity className="text-yellow-400" size={32} />
              <span className="text-gray-300 hover:text-white transition">
                Runs
              </span>
            </div>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={goToLifts}
            >
              <Dumbbell className="text-yellow-400" size={32} />
              <span className="text-gray-300 hover:text-white transition">
                Strength
              </span>
            </div>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={goToMeals}
            >
              <Apple className="text-yellow-400" size={32} />
              <span className="text-gray-300 hover:text-white transition">
                Meals
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Feature Cards Stack */}
        <div className="space-y-4">
          {/* Track Runs Card */}
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-yellow-400 transition">
            <div className="flex items-start gap-4">
              <Activity className="text-yellow-400 flex-shrink-0" size={40} />
              <div>
                <h3 className="text-xl font-bold mb-2">Track Runs</h3>
                <p className="text-gray-400">
                  Log your running distance, duration, and pace. Monitor your
                  progress over time.
                </p>
              </div>
            </div>
          </div>

          {/* Log Workouts Card */}
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-yellow-400 transition">
            <div className="flex items-start gap-4">
              <Dumbbell className="text-yellow-400 flex-shrink-0" size={40} />
              <div>
                <h3 className="text-xl font-bold mb-2">Log Workouts</h3>
                <p className="text-gray-400">
                  Record your strength training sessions with sets, reps, and
                  weights for each exercise.
                </p>
              </div>
            </div>
          </div>

          {/* Track Meals Card */}
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-yellow-400 transition">
            <div className="flex items-start gap-4">
              <Apple className="text-yellow-400 shrink-0" size={40} />
              <div>
                <h3 className="text-xl font-bold mb-2">Track Meals</h3>
                <p className="text-gray-400">
                  Monitor your nutrition by logging calories, protein, carbs,
                  and fats for every meal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 text-center">
          <div className="flex justify-center mb-4">
            <Activity className="text-yellow-400" size={48} />
          </div>
          <h3 className="text-2xl font-semibold mb-2">Run Tracker</h3>
          <p className="text-gray-400">
            Track your runs with distance, pace, and duration.
          </p>
        </div>
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 text-center">
          <div className="flex justify-center mb-4">
            <Dumbbell className="text-yellow-400" size={48} />
          </div>
          <h3 className="text-2xl font-semibold mb-2">Strength Training</h3>
          <p className="text-gray-400">
            Log lifts and track your progress over time.
          </p>
        </div>
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 text-center">
          <div className="flex justify-center mb-4">
            <Apple className="text-yellow-400" size={48} />
          </div>
          <h3 className="text-2xl font-semibold mb-2">Meal Plans</h3>
          <p className="text-gray-400">
            Plan and track meals for optimal nutrition.
          </p>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
