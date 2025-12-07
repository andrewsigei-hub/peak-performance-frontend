import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";

function Lifts() {
  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  // Form inputs
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [exercises, setExercises] = useState([
    { name: "", sets: "", reps: "", weight: "" },
  ]);

  // Get all strength workouts with their exercises
  function fetchLifts(userId) {
    fetch(`http://localhost:8000/workouts?user_id=${userId}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Filter for strength workouts
        const strengthWorkouts = data.filter(function (workout) {
          const workoutType = workout.type.toLowerCase();
          return (
            workoutType === "strength" ||
            workoutType === "lifting" ||
            workoutType === "weights"
          );
        });

        // Get exercises for each workout
        const promises = strengthWorkouts.map(function (workout) {
          return fetch(
            `http://localhost:8000/exercises?workout_id=${workout.id}`
          )
            .then(function (response) {
              return response.json();
            })
            .then(function (exercisesData) {
              workout.exercises = exercisesData;
              return workout;
            });
        });

        // Wait for all exercises to load
        Promise.all(promises).then(function (workoutsWithExercises) {
          setWorkouts(workoutsWithExercises);
          console.log("Loaded workouts with exercises:", workoutsWithExercises);
        });
      });
  }

  // Add another exercise input to the form
  function addExerciseField() {
    const newExercise = { name: "", sets: "", reps: "", weight: "" };
    setExercises([...exercises, newExercise]);
  }

  // Update a specific exercise field
  function updateExercise(index, field, value) {
    const updatedExercises = [...exercises];
    updatedExercises[index][field] = value;
    setExercises(updatedExercises);
  }

  // Save workout with all exercises
  function handleAddWorkout(event) {
    event.preventDefault();

    const newWorkout = {
      user_id: user.id,
      type: "Strength",
      duration_min: parseInt(duration),
      date: date,
      is_starred: false,
    };

    // First create the workout
    fetch("http://localhost:8000/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newWorkout),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (workout) {
        console.log("Workout created:", workout);

        // Then add each exercise to this workout
        const exercisePromises = [];
        for (let i = 0; i < exercises.length; i++) {
          const exercise = exercises[i];
          if (
            exercise.name &&
            exercise.sets &&
            exercise.reps &&
            exercise.weight
          ) {
            const exerciseData = {
              workout_id: workout.id,
              name: exercise.name,
              sets: parseInt(exercise.sets),
              reps: parseInt(exercise.reps),
              weight: parseFloat(exercise.weight),
            };

            const promise = fetch("http://localhost:8000/exercises", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(exerciseData),
            });
            exercisePromises.push(promise);
          }
        }

        // Wait for all exercises to be added
        return Promise.all(exercisePromises);
      })
      .then(function () {
        // Clear form and refresh
        setDuration("");
        setDate("");
        setExercises([{ name: "", sets: "", reps: "", weight: "" }]);
        setShowForm(false);
        fetchLifts(user.id);
      });
  }

  // Toggle star
  function toggleStar(workoutId, currentStarred) {
    fetch(`http://localhost:8000/workouts/${workoutId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        is_starred: !currentStarred,
      }),
    }).then(function () {
      fetchLifts(user.id);
    });
  }

  // Delete a workout
  function deleteWorkout(workoutId) {
    // Ask user to confirm
    if (window.confirm("Are you sure you want to delete this workout?")) {
      fetch(`http://localhost:8000/workouts/${workoutId}`, {
        method: "DELETE",
      }).then(function () {
        console.log("Workout deleted");
        // Refresh list
        fetchLifts(user.id);
      });
    }
  }

  // Check login on page load
  useEffect(
    function () {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        navigate("/login");
        return;
      }
      const userData = JSON.parse(storedUser);
      setUser(userData);
      fetchLifts(userData.id);
    },
    [navigate]
  );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Strength Training</h1>
          <button
            onClick={function () {
              setShowForm(!showForm);
            }}
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            {showForm ? "Cancel" : "+ Add Workout"}
          </button>
        </div>

        {/* Form to add workout */}
        {showForm && (
          <form
            onSubmit={handleAddWorkout}
            className="bg-gray-900 p-6 rounded-xl border border-gray-800 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={function (event) {
                    setDuration(event.target.value);
                  }}
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={function (event) {
                    setDate(event.target.value);
                  }}
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                  required
                />
              </div>
            </div>

            {/* Exercise inputs */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">
                Exercises
              </label>
              {exercises.map(function (exercise, index) {
                return (
                  <div key={index} className="grid grid-cols-4 gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Exercise"
                      value={exercise.name}
                      onChange={function (event) {
                        updateExercise(index, "name", event.target.value);
                      }}
                      className="px-4 py-2 bg-gray-950 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                    />
                    <input
                      type="number"
                      placeholder="Sets"
                      value={exercise.sets}
                      onChange={function (event) {
                        updateExercise(index, "sets", event.target.value);
                      }}
                      className="px-4 py-2 bg-gray-950 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                    />
                    <input
                      type="number"
                      placeholder="Reps"
                      value={exercise.reps}
                      onChange={function (event) {
                        updateExercise(index, "reps", event.target.value);
                      }}
                      className="px-4 py-2 bg-gray-950 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                    />
                    <input
                      type="number"
                      step="0.5"
                      placeholder="Weight (kg)"
                      value={exercise.weight}
                      onChange={function (event) {
                        updateExercise(index, "weight", event.target.value);
                      }}
                      className="px-4 py-2 bg-gray-950 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                    />
                  </div>
                );
              })}
              <button
                type="button"
                onClick={addExerciseField}
                className="text-yellow-400 text-sm hover:text-yellow-500"
              >
                + Add another exercise
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
            >
              Save Workout
            </button>
          </form>
        )}

        {/* Display workouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workouts.length === 0 ? (
            <div className="col-span-full bg-gray-900 p-8 rounded-xl border border-gray-800 text-center text-gray-400">
              No workouts logged yet. Click "Add Workout" to start tracking!
            </div>
          ) : (
            workouts.map(function (workout) {
              return (
                <div
                  key={workout.id}
                  className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-yellow-400 transition"
                >
                  {/* Top row */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-sm text-gray-400">{workout.date}</div>
                    <div className="flex gap-2">
                      <button
                        onClick={function () {
                          toggleStar(workout.id, workout.is_starred);
                        }}
                        className="hover:scale-110 transition"
                      >
                        <Star
                          size={20}
                          className={
                            workout.is_starred
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-400"
                          }
                        />
                      </button>
                      <button
                        onClick={function () {
                          deleteWorkout(workout.id);
                        }}
                        className="hover:scale-110 transition text-red-400 hover:text-red-500"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="text-3xl font-bold text-yellow-400 mb-3">
                    {workout.duration_min} min
                  </div>

                  {/* List of exercises */}
                  {workout.exercises && workout.exercises.length > 0 && (
                    <div className="space-y-2">
                      {workout.exercises.map(function (exercise) {
                        return (
                          <div
                            key={exercise.id}
                            className="bg-gray-950 p-3 rounded-lg"
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-sm">
                                {exercise.name}
                              </span>
                              <span className="text-gray-400 text-xs">
                                {exercise.sets} × {exercise.reps} @{" "}
                                {exercise.weight}kg
                              </span>
                            </div>
                          </div>
                        );
                      })}
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

export default Lifts;
