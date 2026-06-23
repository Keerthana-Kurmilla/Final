# Collaborative Notes Sharing App

A full-stack MERN application developed to streamline the sharing and management of academic resources. The platform enables students to upload, access, download, and organize study materials through a centralized system. With secure authentication and structured categorization, users can efficiently discover notes based on branch, academic year, semester, and subject.

## Live Demo

🔗 https://final-peach-psi.vercel.app/

---

## Overview

The Collaborative Notes Sharing App addresses the challenge of scattered academic resources by providing a unified platform where students can contribute and access study materials. The application emphasizes ease of use, secure access, and efficient resource organization to enhance collaborative learning.

---

## Key Features

- Secure user registration and authentication using JWT.
- Upload, view, download, and manage academic notes.
- Categorization of resources by branch, academic year, semester, and subject.
- Search and filtering functionality for quick resource discovery.
- Responsive user interface optimized for various devices.
- RESTful API integration for seamless communication between frontend and backend.
- Efficient data storage and retrieval using MongoDB.

---

## Technology Stack

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

### Authentication
- JSON Web Tokens (JWT)

### Deployment
- Vercel

---

## System Architecture

```text
Frontend (React.js)
        │
        ▼
Backend API (Node.js + Express.js)
        │
        ▼
Database (MongoDB Atlas)
```

---

## Project Structure

```text
Collaborative-Notes-Sharing-App/
│
├── client/                 # Frontend Application
├── server/                 # Backend Application
├── models/                 # Database Models
├── routes/                 # API Endpoints
├── controllers/            # Business Logic
├── middleware/             # Authentication & Validation
├── public/                 # Static Assets
└── README.md
```

---

## Core Functionalities

### Authentication & Authorization
- User registration and login.
- JWT-based session management.
- Protected routes for authenticated users.

### Resource Management
- Upload academic notes and study materials.
- Browse available resources.
- Download documents directly from the platform.
- Remove or update uploaded content when required.

### Resource Discovery
- Filter notes by branch, year, semester, and subject.
- Quickly locate relevant study materials through structured categorization.

---

## Installation and Setup

### Clone the Repository

```bash
git clone https://github.com/your-username/collaborative-notes-sharing-app.git
cd collaborative-notes-sharing-app
```

### Install Dependencies

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### Configure Environment Variables

Create a `.env` file in the backend directory and add the following:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### Run the Application

```bash
# Start Backend Server
npm start

# Start Frontend Application
npm run dev
```

---

## Future Enhancements

- Role-based access control for administrators and contributors.
- Bookmark and favorite resources.
- Resource rating and feedback system.
- Notification support for newly uploaded materials.
- Cloud-based file storage integration.
- AI-powered recommendations for relevant study resources.

---


## Acknowledgements

This project was developed to promote collaborative learning by providing students with a reliable and organized platform for sharing academic resources.
