const Project = require("../models/Project");

// CREATE PROJECT (Admin only)
exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Project name required" });
    }

    const project = await Project.create({
      name,
      description,
      createdBy: req.user.id,
      members: [req.user.id]
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET PROJECTS FOR LOGGED-IN USER
exports.getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user.id
    }).populate("createdBy", "name email");

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
