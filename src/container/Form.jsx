import { useState } from "react";
import { PlusCircle, Flag, Calendar } from 'lucide-react';
import "../style.css"


export default function Form({ onAddTask }) {
    const [newTask, setNewTask] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);

    //Generate task ID
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
      setDueDate(new Date().toISOString().split('T')[0]);
    };


  
    return (
      <form className="form space-y-4 mb-6" onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
            placeholder="Enter New Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button 
            className="bg-purple-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-purple-700 transition-all duration-200 flex items-center gap-2"
            type="submit"
          >
            <PlusCircle size={20} />
          </button>
        </div>

        <div className="flex gap-4 flex-wrap items-center">
          <div className="flex items-center gap-2">
            <Flag size={20} className="text-gray-500" />
            <select
              className="px-3 py-1 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-gray-500" />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="px-3 py-1 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </form>
      );
      }
