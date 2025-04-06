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

  const completedTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const updateTask = (id) =>{
    setTasks(
      tasks.map((task) =>task.id === id ? { ...task, title: task.title } : task))
  }
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="app min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-8 px-4">
      <div className='max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden'>
        <div className='p-6'>
        <Header />
        <Form onAddTask={addTask} />
        <TaskList
          tasks={tasks}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
          onCompletedTask ={completedTask}
        />
        </div>
      </div>
    </div>
  );
}
