import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

const columnBase =
    "bg-gray-900 border border-gray-800 rounded-xl p-4";

const Tasks = () => {
    const { projectId } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));

    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignedTo, setAssignedTo] = useState("");

    const fetchTasks = async () => {
        const { data } = await API.get(`/tasks/${projectId}`);
        setTasks(data);
    };

    useEffect(() => {
        fetchTasks();
    }, [projectId]);

    useEffect(() => {
        if (user.role === "admin") {
            API.get("/users").then((res) => setUsers(res.data));
        }
    }, []);

    const createTask = async (e) => {
        e.preventDefault();
        if (!title || !assignedTo) return alert("Title & user required");

        await API.post("/tasks", {
            title,
            description,
            projectId,
            assignedTo
        });

        setTitle("");
        setDescription("");
        setAssignedTo("");
        fetchTasks();
    };

    const updateStatus = async (id, status) => {
        await API.put(`/tasks/${id}`, { status });
        fetchTasks();
    };

    const renderTasks = (status) =>
        tasks
            .filter((t) => t.status === status)
            .map((task) => (
                <div
                    key={task._id}
                    className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-4"
                >
                    <h4 className="font-semibold text-gray-100">
                        {task.title}
                    </h4>
                    <p className="text-sm text-gray-400 mb-3">
                        {task.description}
                    </p>

                    {user.role === "admin" && (
                        <div className="text-xs text-gray-500 mb-2">
                            <p>Assigned to: <b>{task.assignedTo?.name}</b></p>
                            {task.completedBy && (
                                <p>Completed by: <b>{task.completedBy.name}</b></p>
                            )}
                        </div>
                    )}

                    {user.role === "member" && status === "todo" && (
                        <button
                            onClick={() => updateStatus(task._id, "in-progress")}
                            className="bg-amber-500 text-black px-3 py-1 rounded text-sm"
                        >
                            Start
                        </button>
                    )}

                    {user.role === "member" && status === "in-progress" && (
                        <button
                            onClick={() => updateStatus(task._id, "done")}
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                        >
                            Complete
                        </button>
                    )}
                </div>
            ));

    return (
        <>
            <Navbar />

            <div className="bg-slate-900 min-h-screen p-6">
                <div className="max-w-7xl mx-auto">

                    <h2 className="text-3xl font-bold text-gray-100 mb-8">
                        Kanban Board
                    </h2>

                    {/* CREATE TASK */}
                    {user.role === "admin" && (
                        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-10 max-w-lg">
                            <h3 className="text-lg font-semibold text-amber-400 mb-4">
                                Create Task
                            </h3>

                            <form onSubmit={createTask} className="space-y-3">
                                <input
                                    className="w-full text-white bg-gray-800 border border-gray-700 rounded px-3 py-2"
                                    placeholder="Task title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />

                                <textarea
                                    className="w-full text-white bg-gray-800 border border-gray-700 rounded px-3 py-2"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />

                                <select
                                    className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white"
                                    value={assignedTo}
                                    onChange={(e) => setAssignedTo(e.target.value)}
                                >
                                    <option value="">Assign to user</option>

                                    {/* ✅ NEW OPTION */}
                                    <option value="ALL">Assign to ALL users</option>

                                    {users.map((u) => (
                                        <option key={u._id} value={u._id}>
                                            {u.name}
                                        </option>
                                    ))}
                                </select>


                                <button className="bg-amber-500 text-black px-5 py-2 rounded">
                                    Create Task
                                </button>
                            </form>
                        </div>
                    )}

                    {/* COLUMNS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className={columnBase}>
                            <h3 className="font-semibold text-gray-300 mb-4">Todo</h3>
                            {renderTasks("todo")}
                        </div>

                        <div className={columnBase}>
                            <h3 className="font-semibold text-gray-300 mb-4">In Progress</h3>
                            {renderTasks("in-progress")}
                        </div>

                        <div className={columnBase}>
                            <h3 className="font-semibold text-gray-300 mb-4">Done</h3>
                            {renderTasks("done")}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Tasks;
