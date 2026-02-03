# SaaS Project Manager – MERN Stack 🚀

A full-stack **SaaS Project Management application** built using the **MERN stack**.  
This application helps teams manage **projects, tasks, and assignments** with **role-based access (Admin & Member)**.

Admins can create projects and assign tasks, while members can track and complete assigned work using a Kanban board.

---

## 🌐 Live Demo

🔹 **Frontend (Netlify)**
```bash  
https://saasapplication.netlify.app
```
🔹 **Backend API (Render)**  
```bash
https://saas-5h5r.onrender.com
```
---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication

### Deployment
- Frontend: **Netlify**
- Backend: **Render**
- Database: **MongoDB Atlas**

---

## ✨ Features

### 🔐 Authentication
- Register & Login using JWT
- Role-based access (Admin / Member)
- Protected routes

---

### 👑 Admin Features
- Create projects
- Assign tasks to:
  - Individual members
  - All members
- View all projects & tasks
- Track task status
- Kanban board control

---

### 👤 Member Features
- View assigned projects
- View only assigned tasks
- Update task status:
  - Todo → In Progress → Done
- Completion tracked automatically

---

### 📋 Task Management
- Kanban Board (Todo / In Progress / Done)
- Real-time task updates
- Task assignment tracking

---

## 🔐 Authentication Flow

- JWT token stored in `localStorage`
- Token sent via `Authorization: Bearer <token>`
- Middleware protects API routes
- Role-based validation on backend

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
```
### Frontend
```bash
cd frontend
npm install
npm run dev
```

### 👨‍💻 Author
```bash
Santhosh Kumaresan
GitHub: https://github.com/santhoshkumaresansk