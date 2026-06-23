Collaborative Notes Sharing App

A full-stack MERN application designed to simplify the sharing and management of academic study materials. The platform enables users to upload, access, organize, and download notes through a secure and user-friendly interface. The application supports categorization based on branch, academic year, semester, and subject, making educational resources easily accessible for students.

🚀 Live Demo

Website: https://final-peach-psi.vercel.app/

✨ Features
Secure user authentication and authorization using JWT.
Upload and manage study materials in PDF format.
Download notes with a single click.
Categorize resources by branch, year, semester, and subject.
Advanced search and filtering capabilities.
Responsive interface for desktop and mobile devices.
RESTful API architecture for efficient communication between frontend and backend.
🛠️ Tech Stack
Frontend
React.js
HTML5
CSS3
JavaScript
Backend
Node.js
Express.js
Database
MongoDB
Authentication
JSON Web Token (JWT)
Deployment
Vercel (Frontend)
MongoDB Atlas
📂 Project Structure
Collaborative-Notes-Sharing-App/
│
├── client/          # React Frontend
├── server/          # Node.js & Express Backend
├── models/          # Database Schemas
├── routes/          # API Routes
├── controllers/     # Business Logic
├── middleware/      # Authentication Middleware
└── README.md
🔑 Core Functionalities
User Management
Account registration and login.
Secure access using JWT authentication.
Protected routes for authorized users.
Notes Management
Upload study materials.
Browse available resources.
Download notes instantly.
Remove outdated or unnecessary files.
Smart Categorization
Branch-wise organization.
Academic year filtering.
Semester-based grouping.
Subject-specific resource discovery.
⚙️ Installation
Clone the Repository
git clone https://github.com/your-username/collaborative-notes-sharing-app.git
cd collaborative-notes-sharing-app
Install Dependencies
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
Configure Environment Variables

Create a .env file inside the server directory:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
Run the Application
# Backend
npm start

# Frontend
npm run dev

🎯 Future Enhancements
Role-based access control.
Notes rating and feedback system.
Bookmark and favorites feature.
Notification system for newly uploaded resources.
Cloud storage integration.
AI-powered note recommendations.
