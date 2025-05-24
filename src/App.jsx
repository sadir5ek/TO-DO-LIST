import React, { useState, useEffect } from 'react';
import TaskForm from './components/Taskform';
import TaskList from './components/TaskList';
import Modal from './components/Modal';
import { FaSun, FaMoon } from 'react-icons/fa';
import detectiveImage from './assets/Detective-check-footprint 1.svg';
import './styles/App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light';
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const addTask = (newTask) => {
    if (!newTask.title.trim()) return;
    setTasks([...tasks, { ...newTask, id: Date.now(), status: 'Focus' }]);
    setIsModalOpen(false);
  };

  const updateTask = (id, updatedTask) => {
    if (!updatedTask.title.trim()) return;
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)));
    setIsModalOpen(false);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: task.status === 'Focus' ? 'Done' : 'Focus' } : task
      )
    );
  };

  const openModal = (task = null) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const filteredTasks = tasks
    .filter((task) => (filter === 'All' ? true : task.status === filter))
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className={`app ${theme}`}>
      <div className="content">
        <h1 className="title">TODO LIST</h1>
        <div className="search-filter">
          <input
            type="text"
            placeholder="Поиск по задачам..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <div className="filter-theme-container">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All">All</option>
              <option value="Focus">Complete</option>
              <option value="Done">Incomplete</option>
            </select>
            <button onClick={toggleTheme} className="theme-toggle">
              <span className="theme-icon-wrapper">
                {theme === 'light' ? <FaMoon /> : <FaSun />}
              </span>
            </button>
          </div>
        </div>
        <TaskList
          tasks={filteredTasks}
          toggleStatus={toggleStatus}
          openModal={openModal}
          deleteTask={deleteTask}
        />
        {filteredTasks.length === 0 && (
          <div className="empty-state">
            <img src={detectiveImage} alt="Empty state" className="empty-image" />
            <p>Empty...</p>
          </div>
        )}
        <button onClick={() => openModal()} className="add-button">+</button>
        {isModalOpen && (
          <Modal
            task={editingTask}
            addTask={addTask}
            updateTask={updateTask}
            closeModal={closeModal}
          />
        )}
      </div>
    </div>
  );
}

export default App;