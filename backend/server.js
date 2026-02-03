const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");


const app = express();

/* ===== CORS CONFIG (EXPRESS 5 SAFE) ===== */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://saasapplication.netlify.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);


/* ===== MIDDLEWARE ===== */
app.use(express.json());
app.get("/", (req, res) => {
  res.send("SaaS Backend API is running 🚀");
});

/* ===== ROUTES ====a= */
app.use("/api/auth", authRoutes);

app.get("/api", (req, res) => {
  res.send("API is running 🚀");
});
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
/* ===== DB & SERVER ===== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    const PORT = process.env.PORT || 10000;

    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error(err));
