import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import Navbar from '../components/Navbar';

function Meals() {
  const [user, setUser] = useState(null);
  const [meals, setMeals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  // Form fields
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
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
    fetchMeals(userData.id);
  }, [navigate]);

  // Fetch all meals from backend
  async function fetchMeals(userId) {
    try {
      const response = await fetch(`http://localhost:8000/meals?user_id=${userId}`);
      const mealsData = await response.json();
      setMeals(mealsData);
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  }

  // Add new meal to backend
  async function handleAddMeal(event) {
    event.preventDefault();
    
    try {
      await fetch('http://localhost:8000/meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          name: mealName,
          calories: parseInt(calories),
          protein: parseFloat(protein),
          carbs: parseFloat(carbs),
          fat: parseFloat(fat),
          date: date
        })
      });
      
      // Reset form
      setMealName('');
      setCalories('');
      setProtein('');
      setCarbs('');
      setFat('');
      setDate('');
      setShowForm(false);
      
      // Refresh data
      fetchMeals(user.id);
    } catch (error) {
      console.error('Error adding meal:', error);
    }
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Nutrition Tracker</h1>
          <button
            onClick={function() { setShowForm(!showForm); }}
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            {showForm ? 'Cancel' : '+ Add Meal'}
          </button>
        </div>

        {/* Add Meal Form */}
        {showForm && (
          <form onSubmit={handleAddMeal} className="bg-gray-900 p-6 rounded-xl border border-gray-800 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-2">Meal Name</label>
                <input
                  type="text"
                  value={mealName}
                  onChange={function(event) { setMealName(event.target.value); }}
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                  placeholder="e.g., Chicken & Rice"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Calories</label>
                <input
                  type="number"
                  value={calories}
                  onChange={function(event) { setCalories(event.target.value); }}
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Protein (g)</label>
                <input
                  type="number"
                  step="0.1"
                  value={protein}
                  onChange={function(event) { setProtein(event.target.value); }}
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Carbs (g)</label>
                <input
                  type="number"
                  step="0.1"
                  value={carbs}
                  onChange={function(event) { setCarbs(event.target.value); }}
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Fat (g)</label>
                <input
                  type="number"
                  step="0.1"
                  value={fat}
                  onChange={function(event) { setFat(event.target.value); }}
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                  required
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
              Save Meal
            </button>
          </form>
        )}

        {/* Meals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {meals.length === 0 ? (
            <div className="col-span-full bg-gray-900 p-8 rounded-xl border border-gray-800 text-center text-gray-400">
              No meals logged yet. Click "Add Meal" to start tracking!
            </div>
          ) : (
            meals.map(function(meal) {
              return (
                <div 
                  key={meal.id} 
                  className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-yellow-400 transition"
                >
                  {/* Date */}
                  <div className="text-sm text-gray-400 mb-3">{meal.date}</div>

                  {/* Meal Name */}
                  <div className="text-xl font-bold mb-1">{meal.name}</div>

                  {/* Calories */}
                  <div className="text-3xl font-bold text-yellow-400 mb-3">
                    {meal.calories} cal
                  </div>

                  {/* Macros */}
                  <div className="bg-gray-950 p-3 rounded-lg">
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <div className="text-gray-400">Protein</div>
                        <div className="font-semibold">{meal.protein}g</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Carbs</div>
                        <div className="font-semibold">{meal.carbs}g</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Fat</div>
                        <div className="font-semibold">{meal.fat}g</div>
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
  );
}

export default Meals;