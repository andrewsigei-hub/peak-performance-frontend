import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import Navbar from '../components/Navbar';

function Runs() {
  const [user, setUser] = useState(null);
  const [runs, setRuns] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  // Form inputs
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [pace, setPace] = useState('');
  const [date, setDate] = useState('');

  // Get all runs from backend
  function fetchRuns(userId) {
    fetch(`http://localhost:8000/workouts?user_id=${userId}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // Filter to only show running workouts
        const runningWorkouts = data.filter(function(workout) {
          const workoutType = workout.type.toLowerCase();
          return workoutType === 'running' || workoutType === 'run';
        });
        setRuns(runningWorkouts);
        console.log('Found runs:', runningWorkouts);
      });
  }

  // Add a new run
  function handleAddRun(event) {
    event.preventDefault();
    
    const newRun = {
      user_id: user.id,
      type: 'Running',
      duration_min: parseInt(duration),
      distance_km: parseFloat(distance),
      avg_pace: pace ? parseFloat(pace) : null,
      date: date,
      is_starred: false
    };

    fetch('http://localhost:8000/workouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRun)
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log('Run added:', data);
        // Clear form
        setDuration('');
        setDistance('');
        setPace('');
        setDate('');
        setShowForm(false);
        // Refresh the list
        fetchRuns(user.id);
      });
  }

  // Toggle star on/off
  function toggleStar(runId, currentStarred) {
    fetch(`http://localhost:8000/workouts/${runId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        is_starred: !currentStarred
      })
    })
      .then(function() {
        // Update the list to show new star status
        fetchRuns(user.id);
      });
  }

  // Check if user is logged in when page loads
  useEffect(function() {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    const userData = JSON.parse(storedUser);
    setUser(userData);
    fetchRuns(userData.id);
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Page header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Running Tracker</h1>
          <button
            onClick={function() { setShowForm(!showForm); }}
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            {showForm ? 'Cancel' : '+ Add Run'}
          </button>
        </div>

        {/* Form to add new run */}
        {showForm && (
          <form onSubmit={handleAddRun} className="bg-gray-900 p-6 rounded-xl border border-gray-800 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  value={duration}
                  onChange={function(event) { setDuration(event.target.value); }}
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Distance (km)</label>
                <input
                  type="number"
                  step="0.1"
                  value={distance}
                  onChange={function(event) { setDistance(event.target.value); }}
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Avg Pace (min/km) - Optional</label>
                <input
                  type="number"
                  step="0.1"
                  value={pace}
                  onChange={function(event) { setPace(event.target.value); }}
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={function(event) { setDate(event.target.value); }}
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                  required
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full mt-4 bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
            >
              Save Run
            </button>
          </form>
        )}

        {/* Display all runs in cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {runs.length === 0 ? (
            <div className="col-span-full bg-gray-900 p-8 rounded-xl border border-gray-800 text-center text-gray-400">
              No runs logged yet. Click "Add Run" to start tracking!
            </div>
          ) : (
            runs.map(function(run) {
              return (
                <div 
                  key={run.id} 
                  className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-yellow-400 transition"
                >
                  {/* Top row with date and star */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-sm text-gray-400">{run.date}</div>
                    <button
                      onClick={function() { toggleStar(run.id, run.is_starred); }}
                      className="hover:scale-110 transition"
                    >
                      <Star 
                        size={20} 
                        className={run.is_starred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}
                      />
                    </button>
                  </div>

                  {/* Main distance display */}
                  <div className="text-3xl font-bold text-yellow-400 mb-1">
                    {run.distance_km} km
                  </div>

                  {/* Duration */}
                  <div className="text-gray-300 mb-2">
                    {run.duration_min} minutes
                  </div>

                  {/* Pace if available */}
                  {run.avg_pace && (
                    <div className="text-sm text-gray-400">
                      Pace: {run.avg_pace} min/km
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}

export default Runs;