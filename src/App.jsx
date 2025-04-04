import { useState } from 'react';
import './style.css';
import Header from './container/Header.jsx';
import Form from './container/Form.jsx'
import TaskList from './container/TaskLists.jsx';

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