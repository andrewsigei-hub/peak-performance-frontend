import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation between pages

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Scroll to a section on the page
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Navigate to pages
  const goToDashboard = () => navigate("/dashboard");
  const goToLogin = () => navigate("/login");

  return (
    <nav className="bg-gray-950 border-b border-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="w-8 h-8 bg-yellow-400 rounded transform rotate-45"></div>
          <span className="text-2xl font-bold text-yellow-400">PeakPerform</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection("features")}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Features
          </button>

          <button
            onClick={() => navigate("/meals")}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Meals
          </button>

          <button
            onClick={() => navigate("/lifts")}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Lifts
          </button>

          <button
            onClick={() => navigate("/runs")}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Runs
          </button>

          <button
            onClick={goToDashboard}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Dashboard
          </button>

          <button
            onClick={goToLogin}
            className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
          >
            Sign In
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="focus:outline-none text-gray-300 hover:text-white"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3">
          <button
            onClick={() => {
              scrollToSection("features");
              setIsOpen(false);
            }}
            className="text-gray-300 hover:text-white transition-colors text-left"
          >
            Features
          </button>
          <button
            onClick={() => {
              navigate("/meals");
              setIsOpen(false);
            }}
            className="text-gray-300 hover:text-white transition-colors text-left"
          >
            Meals
          </button>
          <button
            onClick={() => {
              navigate("/lifts");
              setIsOpen(false);
            }}
            className="text-gray-300 hover:text-white transition-colors text-left"
          >
            Lifts
          </button>
          <button
            onClick={() => {
              navigate("/runs");
              setIsOpen(false);
            }}
            className="text-gray-300 hover:text-white transition-colors text-left"
          >
            Runs
          </button>
          <button
            onClick={() => {
              goToDashboard();
              setIsOpen(false);
            }}
            className="text-gray-300 hover:text-white transition-colors text-left"
          >
            Dashboard
          </button>
          <button
            onClick={() => {
              goToLogin();
              setIsOpen(false);
            }}
            className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
          >
            Sign In
          </button>
        </div>
      )}
    </nav>
  );
}
