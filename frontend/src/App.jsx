import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { getTasks, createTask, updateTask, deleteTask } from "./api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function TaskManager() {
  const { user, logout } = useAuth();
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

  useEffect(() => { loadTasks(); }, []);

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
    const next = task.status === "pending" ? "in-progress" : task.status === "in-progress" ? "done" : "pending";
    updateTask(task._id, { status: next }).then(loadTasks).catch((e) => setError(e.message));
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-top">
          <div>
            <h1>Task Manager</h1>
            <p className="subtitle">
              Logged in as <strong>{user.username}</strong>{" "}
              <span className={`role-badge role-${user.role}`}>{user.role}</span>
            </p>
          </div>
          <button className="btn-secondary" onClick={logout}>Log Out</button>
        </div>
      </header>

      <main className="app-main">
        <TaskForm onSubmit={handleCreateOrUpdate} editingTask={editingTask} onCancelEdit={() => setEditingTask(null)} />
        {error && <div className="error-banner">{error}</div>}
        {loading ? (
          <p className="loading">Loading tasks...</p>
        ) : (
          <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={handleDelete} onToggleStatus={handleToggleStatus} />
        )}
      </main>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { token, user, loading } = useAuth();
  if (loading) return <div className="app"><p className="loading">Loading...</p></div>;
  if (!token || !user) return <Navigate to="/login" replace />;
  return children;
}

function PublicOnlyRoute({ children }) {
  const { token, user, loading } = useAuth();
  if (loading) return <div className="app"><p className="loading">Loading...</p></div>;
  if (token && user) return <Navigate to="/" replace />;
  return <div className="app auth-page">{children}</div>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
      <Route path="/register" element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />
      <Route path="/forgot-password" element={<PublicOnlyRoute><ForgotPassword /></PublicOnlyRoute>} />
      <Route path="/reset-password/:token" element={<div className="app auth-page"><ResetPassword /></div>} />
      <Route path="/" element={<ProtectedRoute><TaskManager /></ProtectedRoute>} />
    </Routes>
  );
}