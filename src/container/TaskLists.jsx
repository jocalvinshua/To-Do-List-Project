export default function TaskList({ tasks, onToggleCheck, onDeleteTask }) {
  // Sort tasks by priority (High > Medium > Low)
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <ul className="task-list">
      {sortedTasks.map((task) => (
        <li
          key={task.id}
          className={`task-item ${task.completed ? 'completed' : ''} ${
            task.dueDate && new Date(task.dueDate) < new Date() && !task.completed
              ? 'overdue'
              : ''
          }`}
        >
          <input
            type="checkbox"
            className="task-checkbox"
            checked={task.completed}
            onChange={() => onToggleCheck(task.id)}
          />
          <div className="task-details">
            <span className={`task-text ${task.completed ? 'completed-text' : ''}`}>
              {task.text}
            </span>
            <span className="task-priority">({task.priority} Priority)</span>
            {task.dueDate && <span className="task-due-date">Due: {task.dueDate}</span>}
          </div>
          <button
            className="task-delete-button"
            onClick={() => onDeleteTask(task.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}