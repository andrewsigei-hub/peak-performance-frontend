# PeakPerform - Fitness Tracking Application

A full-stack fitness tracking application that allows users to log workouts, track nutrition, and monitor their progress over time.

## Features

- **User Authentication** - Simple email-based login and signup
- **Running Tracker** - Log runs with distance, duration, and pace
- **Strength Training** - Track workouts with multiple exercises, sets, reps, and weights
- **Nutrition Tracking** - Monitor meals with calories and macronutrients (protein, carbs, fat)
- **Dashboard** - View recent activity and summary statistics
- **Star Favorites** - Mark your best workouts for easy reference

## Tech Stack

### Frontend

- **React** - UI framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vite** - Build tool

### Backend

- **FastAPI** - Python web framework
- **SQLAlchemy** - ORM for database operations
- **SQLite** - Database
- **Uvicorn** - ASGI server

## Project Structure

```
peak-perform/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Runs.jsx
│   │   │   ├── Lifts.jsx
│   │   │   └── Meals.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── venv/
│   ├── models.py
│   ├── app.py
│   └── requirements.txt
│
└── README.md
```

## Installation & Setup

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create and activate a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Mac/Linux
# OR
venv\Scripts\activate  # On Windows
```

3. Install Python dependencies:

```bash
pip install fastapi uvicorn sqlalchemy pydantic
```

4. Run the FastAPI server:

```bash
python app.py
```

The backend will be running at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Install additional packages:

```bash
npm install react-router-dom lucide-react
npm install -D tailwindcss postcss autoprefixer
```

4. Run the development server:

```bash
npm run dev
```

The frontend will be running at `http://localhost:5173`

## Usage

1. **Sign Up/Login**

   - Navigate to the login page
   - Create a new account with your name and email
   - Or sign in if you already have an account

2. **Track Runs**

   - Go to the Runs page
   - Click "Add Run"
   - Enter duration, distance, pace, and date
   - Star your favorite runs

3. **Log Workouts**

   - Go to the Lifts page
   - Click "Add Workout"
   - Add multiple exercises with sets, reps, and weight
   - Star your best workouts

4. **Track Meals**

   - Go to the Meals page
   - Click "Add Meal"
   - Enter meal details and macronutrients
   - View your nutrition history

5. **View Dashboard**
   - See your recent workouts and meals
   - Track total workouts, distance, and meals logged

## API Endpoints

### Users

- `POST /users` - Create a new user
- `GET /users` - Get all users
- `GET /users/{user_id}` - Get specific user

### Workouts

- `POST /workouts` - Create a workout
- `GET /workouts?user_id={id}` - Get user's workouts
- `PATCH /workouts/{workout_id}` - Update workout (e.g., toggle star)
- `DELETE /workouts/{workout_id}` - Delete workout

### Exercises

- `POST /exercises` - Create an exercise
- `GET /exercises?workout_id={id}` - Get workout's exercises
- `DELETE /exercises/{exercise_id}` - Delete exercise

### Meals

- `POST /meals` - Create a meal
- `GET /meals?user_id={id}` - Get user's meals
- `DELETE /meals/{meal_id}` - Delete meal

## Database Schema

### Users Table

- id (Primary Key)
- name
- email (Unique)
- google_id (Optional)
- created_at

### Workouts Table

- id (Primary Key)
- user_id (Foreign Key)
- type (Running, Strength, etc.)
- duration_min
- distance_km (Optional)
- avg_pace (Optional)
- date
- is_starred

### Exercises Table

- id (Primary Key)
- workout_id (Foreign Key)
- name
- sets
- reps
- weight

### Meals Table

- id (Primary Key)
- user_id (Foreign Key)
- name
- calories
- protein
- carbs
- fat
- date

## Future Enhancements

- Google OAuth integration
- Progress/Analytics page with charts
- Goal setting and tracking
- Weekly/monthly summary reports
- Export data functionality
- Mobile responsive improvements

## License

This project is open source and available for educational purposes.

## Author

Built as part of a software development bootcamp project.
