export default function TaskList({ tasks, onEdit, onDelete, onToggleStatus }) {
  if (tasks.length === 0) {
    return <p className="empty-state">No tasks yet. Add one above.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task._id} className={`task-item status-${task.status}`}>
          <div className="task-info">
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
            <button className="status-pill" onClick={() => onToggleStatus(task)}>
              {task.status}
            </button>
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
