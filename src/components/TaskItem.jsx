import React from 'react';
import { FaEdit, FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import '../styles/TaskItem.css';

function TaskItem({ task, isExpanded, onToggleExpand, toggleStatus, openModal, deleteTask }) {
  return (
    <li className={`task-item ${task.status.toLowerCase()}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.status === 'Done'}
          onChange={() => toggleStatus(task.id)}
          className="task-checkbox"
        />

        <div className="task-details" onClick={onToggleExpand}>
          <h3 className={`task-title ${task.status === 'Done' ? 'done' : ''}`}>
            {task.title}
          </h3>
          <span className={`task-arrow ${isExpanded ? 'rotated' : ''}`}>
            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </div>
      </div>

      <div className={`task-extra-wrapper ${isExpanded ? 'expanded' : ''}`}>
        <div className="task-extra-info">
          {task.description && <p className="task-description">{task.description}</p>}
          {task.dueDate && <p className="task-due-date">{task.dueDate}</p>}
          <div className="task-actions">
            <button onClick={() => openModal(task)} className="edit-button">
              <FaEdit />
            </button>
            <button onClick={() => deleteTask(task.id)} className="delete-button">
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default TaskItem;
