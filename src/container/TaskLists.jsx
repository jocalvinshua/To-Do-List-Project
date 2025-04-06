import { Flag, Calendar, Trash2, CheckCircle, Circle } from 'lucide-react';
import "../style.css"


export default function TaskList({ tasks, onCompletedTask, onDeleteTask }) {
  // Sort tasks by priority (High > Medium > Low)
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  // styling by priority (High = red, Medium = red, Low = green)
  const taskStyle = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500 text-white';
      case 'Medium':
        return 'bg-yellow-500 text-white';
      case 'Low':
        return 'bg-green-500 text-white';
      default: return 'text-gray-500';
    }}
  
  const isOverdue = (date) =>{
    return new Date(date) < new Date(new Date().toISOString().split('T')[0]);
  }
  return (
    <div className="task-list space-y-3">
      {sortedTasks.map((task) => (
        <div
        key={task.id}
        className={`task-item group flex items-start gap-4 p-4 rounded-lg shadow-md ${task.priority === 'High' && !task.completed ? 'bg-red-50' : 'bg-gray-50'}`}
      >
          <button
            onClick={() => onCompletedTask(task.id)}
            className="text-gray-400 hover:text-purple-600 transition-colors duration-200"
          >
            {task.completed ? (
              <CheckCircle className="text-green-500" size={24} />
            ) : (
              <Circle size={24} />
            )}
          </button>
          <div className="task-details flex-1">
            <span className={`block ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
              {task.text}
            </span>
            <div className="flex gap-3 mt-1 text-sm">
              <span className={`flex items-center gap-1 ${taskStyle(task.priority)}`}>
                <Flag size={14} />
                {task.priority}
              </span>
              <span className={`flex items-center gap-1 ${isOverdue(task.dueDate) && !task.completed ? 'text-red-500' : 'text-gray-500'}`}>
                <Calendar size={14} />
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </div>
          </div>
          <button
  onClick={() => onDeleteTask(task.id)}
  className="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all duration-200"
>
  <Trash2 size={20} />
</button>

        </div>
      ))}
      {/* Check if there are no task add yet */}
      {sortedTasks.length === 0 && (
      <div className="text-center text-gray-400 italic py-8">
        No tasks added yet 📭
    </div>
  )}

    </div>
  );
}
