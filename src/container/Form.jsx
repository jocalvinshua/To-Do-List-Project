import { useState } from "react";

export default function Form({ onAddTask }) {
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