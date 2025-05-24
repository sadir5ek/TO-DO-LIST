import React from 'react';
import TaskForm from './Taskform';
import '../styles/Modal.css';

function Modal({ task, addTask, updateTask, closeModal }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>New Task</h2>
        <TaskForm
          task={task}
          addTask={addTask}
          updateTask={updateTask}
          closeModal={closeModal}
        />
      </div>
    </div>
  );
}

export default Modal;