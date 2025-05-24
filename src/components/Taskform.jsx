import React, { useState } from 'react';
import '../styles/TaskForm.css';

function TaskForm({ task, addTask, updateTask, closeModal }) {
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [dueDate, setDueDate] = useState(task ? task.dueDate : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { title, description, dueDate };
    if (task) {
      updateTask(task.id, { ...newTask, status: task.status });
    } else {
      addTask(newTask);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-input"
      />
      <textarea
        placeholder="Task description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="form-textarea"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="form-input"
      />
      <div className="form-actions">
        <button type="button" onClick={closeModal} className="form-button cancel">
          Cancel
        </button>
        <button type="submit" className="form-button apply">
          Apply
        </button>
      </div>
    </form>
  );
}

export default TaskForm;