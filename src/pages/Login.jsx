import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Runs = () => {
  const [user, setUser] = useState(null);
  const [runs, setRuns] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [pace, setPace] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    const userData = JSON.parse(storedUser);
    setUser(userData);
    fetchRuns(userData.id);
  }, [navigate]);

  const fetchRuns = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8000/workouts?user_id=${userId}`);
      const data = await response.json();
      // Filter for running workouts only
      const runningWorkouts = data.filter(w => w.type.toLowerCase() === 'running' || w.type.toLowerCase() === 'run');
      setRuns(runningWorkouts);
    } catch (error) {
      console.error('Error fetching runs:', error);
    }
  };

  const handleAddRun = async (e) => {
    e.preventDefault();
    
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
          date: date
        })
      });
      
      setDuration('');
      setDistance('');
      setPace('');
      setDate('');
      setShowForm(false);
      fetchRuns(user.id);
    } catch (error) {
      console.error('Error adding run:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">🏃 Running Tracker</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            {showForm ? 'Cancel' : '+ Add Run'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAddRun} className="bg-gray-900 p-6 rounded-xl border border-gray-800 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
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
                  onChange={(e) => setDistance(e.target.value)}
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
                  onChange={(e) => setPace(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                  required
                />
              </div>
            </div>
            <button type="submit" className="w-full mt-4 bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition">
              Save Run
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {runs.length === 0 ? (
            <div className="col-span-full bg-gray-900 p-8 rounded-xl border border-gray-800 text-center text-gray-400">
              No runs logged yet. Click "Add Run" to start tracking!
            </div>
          ) : (
            runs.map(run => (
              <div key={run.id} className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <div className="text-sm text-gray-400 mb-2">{run.date}</div>
                <div className="text-3xl font-bold text-yellow-400 mb-1">{run.distance_km} km</div>
                <div className="text-gray-300">{run.duration_min} minutes</div>
                {run.avg_pace && (
                  <div className="text-sm text-gray-400 mt-2">Pace: {run.avg_pace} min/km</div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Runs;