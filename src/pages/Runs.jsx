import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import Navbar from '../components/Navbar';

function Runs() {
  const [user, setUser] = useState(null);
  const [runs, setRuns] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  // Form fields
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [pace, setPace] = useState('');
  const [date, setDate] = useState('');

  // Check if user is logged in
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

  // Fetch all running workouts from backend
  async function fetchRuns(userId) {
    try {
      const response = await fetch(`http://localhost:8000/workouts?user_id=${userId}`);
      const workoutsData = await response.json();
      
      // Filter for running workouts only
      const runningWorkouts = workoutsData.filter(function(workout) {
        return workout.type.toLowerCase() === 'running' || workout.type.toLowerCase() === 'run';
      });
      
      setRuns(runningWorkouts);
    } catch (error) {
      console.error('Error fetching runs:', error);
    }
  }

  // Add new run to backend
  async function handleAddRun(event) {
    event.preventDefault();
    
    try {
      await fetch('http://localhost:8000/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          type: 'Running',
          duration_min: parseInt(duration),
          distance_km: parseFloat(distance),
          avg_pace: pace ? parseFloat(pace) : null,
          date: date,
          is_starred: false
        })
      });
      
      // Reset form
      setDuration('');
      setDistance('');
      setPace('');
      setDate('');
      setShowForm(false);
      
      // Refresh data
      fetchRuns(user.id);
    } catch (error) {
      console.error('Error adding run:', error);
    }
  }

  // Toggle star on a run
  async function toggleStar(runId, currentStarred) {
    try {
      await fetch(`http://localhost:8000/workouts/${runId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          is_starred: !currentStarred
        })
      });
      
      // Refresh data to show updated star
      fetchRuns(user.id);
    } catch (error) {
      console.error('Error toggling star:', error);
    }
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Running Tracker</h1>
          <button
            onClick={function() { setShowForm(!showForm); }}
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            {showForm ? 'Cancel' : '+ Add Run'}
          </button>
        </div>

        {/* Add Run Form */}
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

        {/* Runs Grid */}
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
                  {/* Star and Date */}
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

                  {/* Distance */}
                  <div className="text-3xl font-bold text-yellow-400 mb-1">
                    {run.distance_km} km
                  </div>

                  {/* Duration */}
                  <div className="text-gray-300 mb-2">
                    {run.duration_min} minutes
                  </div>

                  {/* Pace */}
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