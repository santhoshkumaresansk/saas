# SaaS Project Management Backend

This is the backend for a SaaS-style project management application.

## Tech Stack
- Node.js
- Express.js
- MongoDB (Atlas)
- JWT Authentication

## Features
- Role-based authentication (Admin / Member)
- Project management
- Task assignment (single user / all members)
- Kanban workflow
- Secure APIs

## Environment Variables
Create a `.env` file with:

MONGO_URI=your_mongodb_url  
JWT_SECRET=your_secret_key  

## Run Locally
```bash
npm install
npm run dev
```
npm start

---

# 🟢 STEP 4: INITIALIZE GIT (BACKEND ONLY)

👉 Go to backend folder:

```bash
cd ~/Desktop/saas_application/backend
# SaaS Project Management Tool – MERN Stack

A full-stack SaaS-style Project & Task Management application built using the MERN stack.  
Designed for teams to manage projects, assign tasks, track progress using a Kanban board, and monitor completion status with role-based access.

---

## 🚀 Live Demo
Frontend: https://YOUR-FRONTEND-LINK  
Backend: https://YOUR-BACKEND-LINK  

---

## 🛠️ Tech Stack
- Frontend: React.js (Vite), Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB Atlas
- Authentication: JWT
- Authorization: Role-based (Admin / Member)
- Deployment: Netlify (Frontend), Render (Backend)

---

## ✨ Features

### 👤 User (Member)
- Register & Login using JWT authentication
- View assigned projects
- View assigned tasks only
- Update task status:
  - Todo → In Progress → Done
- Task completion tracked automatically

### 👑 Admin
- Create & manage projects
- Assign projects to members
- Create tasks under projects
- Assign tasks to:
  - Specific user
  - All members at once
- View:
  - Task assignee
  - Task completion status
  - Completed by which user
- Full Kanban board view (Todo / In Progress / Done)
- Premium admin dashboard UI

---

## 🔐 Authentication & Authorization
- JWT token stored in browser localStorage
- Protected API routes using middleware
- Role-based access:
  - Admin → Full access
  - Member → Limited to assigned tasks only

---

## 📊 Dashboard Overview
- Total projects count
- Task overview
- Role-based dashboard cards
- Responsive UI for mobile, tablet, and desktop

---

## 📂 Project Structure

saas/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── assets/
│   │   └── main.jsx
│   └── index.html
│
└── README.md

---

## ⚙️ Setup Instructions (Local)

### Backend
```bash
cd backend
npm install
npm start

### Frontend
```bash
cd frontend
npm install
npm run dev
