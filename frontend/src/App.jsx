import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  async function loadTasks() {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleCreateOrUpdate(taskData) {
    try {
      if (editingTask) {
        await updateTask(editingTask._id, taskData);
        setEditingTask(null);
      } else {
        await createTask(taskData);
      }
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTask(id);
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  function handleToggleStatus(task) {
    const next =
      task.status === "pending"
        ? "in-progress"
        : task.status === "in-progress"
        ? "done"
        : "pending";
    updateTask(task._id, { status: next }).then(loadTasks).catch((e) => setError(e.message));
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
        <p className="subtitle">MERN Stack CRUD Demo</p>
      </header>

      <main className="app-main">
        <TaskForm
          onSubmit={handleCreateOrUpdate}
          editingTask={editingTask}
          onCancelEdit={() => setEditingTask(null)}
        />

        {error && <div className="error-banner">{error}</div>}

        {loading ? (
          <p className="loading">Loading tasks...</p>
        ) : (
          <TaskList
            tasks={tasks}
            onEdit={setEditingTask}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        )}
      </main>
    </div>
  );
}
