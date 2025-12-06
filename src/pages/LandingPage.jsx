import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  // Smooth scroll helper
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  // Navigation helpers
  const goToLogin = () => navigate("/login");
  const goToMeals = () => navigate("/meals");
  const goToLifts = () => navigate("/lifts");
  const goToRuns = () => navigate("/runs");

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Unlock Your
            <br />
            Peak Performance
          </h1>

          <p className="text-xl text-gray-400 mb-8">
            Track your workouts, meals, and progress all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              onClick={goToLogin}
              className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold flex items-center gap-3 hover:bg-yellow-500 transition shadow-lg"
            >
              Get Started
            </button>

            <button
              onClick={() => scrollToSection("features")}
              className="border border-gray-600 px-8 py-4 rounded-xl text-gray-300 hover:text-white transition"
            >
              Learn More
            </button>
          </div>

          {/* Feature Highlights */}
          <div id="features" className="flex flex-wrap gap-8 mt-6">
            <div className="flex items-center gap-2">
              <span className="text-3xl">⏱️</span>
              <span className="text-gray-300 cursor-pointer" onClick={goToRuns}>Runs</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🏋️</span>
              <span className="text-gray-300 cursor-pointer" onClick={goToLifts}>Strength</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🍎</span>
              <span className="text-gray-300 cursor-pointer" onClick={goToMeals}>Meals</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 flex items-center justify-center">
          <p className="text-gray-400">[Hero Image or Illustration]</p>
        </div>
      </div>

      {/* Optional Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 text-center">
          <h3 className="text-2xl font-semibold mb-2">Run Tracker</h3>
          <p className="text-gray-400">Track your runs with distance, pace, and duration.</p>
        </div>
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 text-center">
          <h3 className="text-2xl font-semibold mb-2">Strength Training</h3>
          <p className="text-gray-400">Log lifts and track your progress over time.</p>
        </div>
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 text-center">
          <h3 className="text-2xl font-semibold mb-2">Meal Plans</h3>
          <p className="text-gray-400">Plan and track meals for optimal nutrition.</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
