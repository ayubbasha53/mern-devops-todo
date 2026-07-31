function shortId(id) {
  return id ? id.slice(-6).toUpperCase() : "";
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function TaskList({ tasks, onEdit, onDelete, onToggleStatus }) {
  if (tasks.length === 0) {
    return <p className="empty-state">— no tickets issued yet —</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task._id} className={`task-item status-${task.status}`}>
          <div className="task-info">
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
            <div className="task-meta">
              <button className="status-pill" onClick={() => onToggleStatus(task)}>
                {task.status}
              </button>
              <span className="task-id">#{shortId(task._id)}</span>
              <span className="task-date">{formatDate(task.createdAt)}</span>
            </div>
          </div>
          <div className="task-actions">
            <button onClick={() => onEdit(task)}>Edit</button>
            <button className="btn-danger" onClick={() => onDelete(task._id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}