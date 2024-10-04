# Photo Web App

This project is a full-stack web application for managing and sharing photos. It consists of a Vue.js frontend and an Express.js backend with SQLite database.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js (v14 or later)
- npm (usually comes with Node.js)
- Git

## Project Structure

The project is divided into two main parts:
- `photo-web-app-frontend`: Vue.js frontend
- `photo-web-app-backend`: Express.js backend

## Backend Setup

1. Clone the repository:
   ```
   git clone https://github.com/kbhh/photo_app.git
   cd photo_app
   ```

2. Navigate to the backend directory:
   ```
   cd photo-web-app-backend
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root of the backend directory with the following content:
   ```
   PORT=3000
   JWT_SECRET=your_secret_key_here
   ```
   Replace `your_secret_key_here` with a secure random string.

5. Create the `uploads` directory:
   ```
   mkdir uploads
   ```

6. Start the backend server:
   ```
   npm run dev
   ```

The backend should now be running on `http://localhost:3000`.

## Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```
   cd photo-web-app-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root of the frontend directory with the following content:
   ```
   VITE_API_URL=http://localhost:3000/api
   ```

4. Start the frontend development server:
   ```
   npm run dev
   ```

The frontend should now be running on `http://127.0.0.1:5173`.

## Running the Application

1. Ensure both the backend and frontend servers are running.
2. Open your browser and navigate to `http://127.0.0.1:5173`.
3. You should see the login page of the Photo Web App.

## Features

- User authentication (register, login, logout)
- Create, view, edit, and delete photo entries
- Admin panel for user management
- Role-based access control

## API Endpoints

- POST `/api/auth/register`: Register a new user
- POST `/api/auth/login`: Log in a user
- GET `/api/auth/me`: Get current user info
- GET `/api/entries`: Get all entries for the current user
- POST `/api/entries`: Create a new entry
- PUT `/api/entries/:id`: Update an existing entry
- DELETE `/api/entries/:id`: Delete an entry
- GET `/api/admin/users`: Get all users (admin only)
- PUT `/api/admin/users/:id/permissions`: Update user permissions (admin only)

## Development

- Backend: The Express.js server uses `nodemon` for hot-reloading during development.
- Frontend: The Vue.js app uses Vite for fast development and hot module replacement.


