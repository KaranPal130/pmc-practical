# Quiz Application Monorepo

This repository contains both the frontend and backend components of the Quiz Application. The application allows users to participate in quizzes, track scores, and compete on leaderboards.

## Repository Structure

```
quiz-app/
├── backend/         # Node.js/Express backend
├── frontend/        # Next.js frontend
└── README.md
```

## Backend Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
PORT=3000
MONGODB_URL=mongodb://127.0.0.1:27017/quiz-app
```

### Installation

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start development server
npm run dev
```

The backend server will start on `http://localhost:3000`.

## Frontend Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend application will be available at `http://localhost:3001`.

## Features

- User authentication
- Multiple quiz categories
- Different difficulty levels
- Real-time scoring
- Global leaderboard
- Offline support
- Responsive design`

## API Documentation

The backend provides the following main endpoints:

- `GET /v1/quiz/questions` - Fetch quiz questions
- `POST /v1/quiz/score` - Submit quiz scores
- `GET /v1/quiz/leaderboard` - Get leaderboard data

For detailed API documentation, please refer to the API documentation in the backend directory.