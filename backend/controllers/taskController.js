const Task = require("../models/Task");
const Project = require("../models/Project");
const User = require("../models/User");

// CREATE TASK
exports.createTask = async (req, res) => {
    try {
        const { title, description, projectId, assignedTo } = req.body;

        if (!title || !projectId || !assignedTo) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        // 🔹 If assign to ALL members
        // 🔹 If assign to ALL members
        if (assignedTo === "ALL") {

            // ✅ GET ALL MEMBERS FROM USERS COLLECTION
            const members = await User.find({ role: "member" });

            if (members.length === 0) {
                return res.status(400).json({ message: "No members found" });
            }

            // ✅ CREATE TASK FOR EACH MEMBER
            const tasks = await Task.insertMany(
                members.map((member) => ({
                    title,
                    description,
                    project: projectId,
                    assignedTo: member._id
                }))
            );

            // ✅ ADD ALL MEMBERS TO PROJECT
            await Project.findByIdAndUpdate(projectId, {
                $addToSet: {
                    members: { $each: members.map((m) => m._id) }
                }
            });

            return res.status(201).json(tasks);
        }


        // 🔹 Assign to single user
        const task = await Task.create({
            title,
            description,
            project: projectId,
            assignedTo
        });

        // auto add member to project
        await Project.findByIdAndUpdate(projectId, {
            $addToSet: { members: assignedTo }
        });

        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



// GET TASKS BY PROJECT
exports.getTasksByProject = async (req, res) => {
    try {
        let query = { project: req.params.projectId };

        // 👤 If user is MEMBER, show only assigned tasks
        if (req.user.role === "member") {
            query.assignedTo = req.user.id;
        }

        const tasks = await Task.find(query)
            .populate("assignedTo", "name email")
            .populate("completedBy", "name email");


        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateTaskStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // 👤 MEMBER RULES
        if (req.user.role === "member") {
            // Member can update ONLY their task
            if (task.assignedTo.toString() !== req.user.id) {
                return res.status(403).json({ message: "Not allowed" });
            }

            // Allowed transitions only
            if (
                (task.status === "todo" && status !== "in-progress") ||
                (task.status === "in-progress" && status !== "done")
            ) {
                return res.status(403).json({ message: "Invalid status change" });
            }
        }

        // 👑 ADMIN can do anything
        task.status = status;

        // Track completion
        if (status === "done" && req.user.role === "member") {
            task.completedBy = req.user.id;
        }


        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
