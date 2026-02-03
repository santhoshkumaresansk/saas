const express = require("express");
const {
  createProject,
  getMyProjects
} = require("../controllers/projectController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Admin creates project
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createProject
);

// Logged-in user gets their projects
router.get("/", authMiddleware, getMyProjects);

module.exports = router;
