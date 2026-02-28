import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // 1. View Tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks/`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // 2. Add a Task
  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      const response = await axios.post(`${API_URL}/tasks/`, {
        title: newTask,
        completed: false
      });
      setTasks([response.data, ...tasks]);
      setNewTask('');
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // 3. Mark as Completed
  const toggleComplete = async (task) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${task.id}/`, {
        ...task,
        completed: !task.completed
      });
      setTasks(tasks.map(t => (t.id === task.id ? response.data : t)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // 4. Delete a Task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}/`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Task Manager</h1>

      <form onSubmit={addTask} className="form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="input-field"
        />
        <button type="submit" className="button">
          Add
        </button>
      </form>

      <div className="task-list">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`task-item ${task.completed ? 'completed' : ''}`}
          >
            <span>{task.title}</span>
            <div className="task-actions">
              <button onClick={() => toggleComplete(task)} className="btn-complete">
                {task.completed ? 'Undo' : 'Done'}
              </button>
              <button onClick={() => deleteTask(task.id)} className="btn-delete">
                Delete
              </button>
            </div>
          </div>
        ))}
        {tasks.length === 0 && (
          <p className="text-center mt-4">
            No tasks yet. Add one above!
          </p>
        )}
      </div>
    </div>
  );
}

export default App;