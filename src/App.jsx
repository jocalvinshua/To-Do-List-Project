import { useState } from 'react';
import './App.css';

export default function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const toggleTaskCompleted = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="app">
      <Header />
      <Form onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onToggleCheck={toggleTaskCompleted}
        onDeleteTask={deleteTask}
      />
    </div>
  );
}

function Header() {
  return <h1 className="header">To Do List App 📝</h1>;
}

function Form({ onAddTask }) {
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');

  const generateId = () => Date.now() + Math.random().toString(36).substring(2, 9);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;

    const task = {
      id: generateId(),
      text: newTask,
      priority,
      dueDate,
      completed: false,
    };

    onAddTask(task);
    setNewTask('');
    setPriority('Medium');
    setDueDate('');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-input"
        placeholder="Enter New Task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <select
        className="form-select"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input
        type="date"
        className="form-date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button className="form-button" type="submit">Add Task</button>
    </form>
  );
}

function TaskList({ tasks, onToggleCheck, onDeleteTask }) {
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
