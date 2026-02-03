const express = require("express");
const {
  createTask,
  getTasksByProject,
  updateTaskStatus
} = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/:projectId", authMiddleware, getTasksByProject);
router.put(
  "/:id",
  authMiddleware,
  updateTaskStatus
);


module.exports = router;
