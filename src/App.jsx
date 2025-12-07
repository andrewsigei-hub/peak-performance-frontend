import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Runs from "./pages/Runs";
import Lifts from "./pages/Lifts";
import Meals from "./pages/Meals";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/runs" element={<Runs />} />
        <Route path="/lifts" element={<Lifts />} />
        <Route path="/meals" element={<Meals />} />
      </Routes>
    </Router>
  );
}

export default App;
