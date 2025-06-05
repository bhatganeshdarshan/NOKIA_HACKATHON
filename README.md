# Telecom Network Logs Analysis & RCA Prediction System

A MERN stack application for analyzing telecom network logs, performing Root Cause Analysis (RCA), and predicting network issues using machine learning.

## Features

- Real-time log analysis and monitoring
- Root Cause Analysis (RCA) prediction
- Historical log pattern analysis
- Interactive dashboard with key metrics
- Reinforcement learning capability (simulated)
- User authentication and role-based access

## Tech Stack

- Frontend: React.js, Tailwind CSS, Redux Toolkit
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT
- API Documentation: Swagger

## Project Structure

```
telecom-rca/
├── client/                 # React frontend
├── server/                 # Node.js backend
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file with following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/telecom-rca
JWT_SECRET=your_jwt_secret
```

4. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## API Endpoints

- POST /api/auth/login - User login
- POST /api/auth/register - User registration
- GET /api/logs - Get network logs
- POST /api/logs/analyze - Analyze logs
- GET /api/rca/predict - Get RCA predictions
- POST /api/rca/feedback - Submit feedback for RL

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 