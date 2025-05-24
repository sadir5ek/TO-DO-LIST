import React, { useState } from 'react';
import TaskItem from './TaskItem'; 
import '../styles/TaskList.css';

function TaskList({ tasks, toggleStatus, openModal, deleteTask }) {
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const handleToggleExpand = (id) => {
    setExpandedTaskId(prevId => (prevId === id ? null : id));
  };

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          isExpanded={expandedTaskId === task.id}
          onToggleExpand={() => handleToggleExpand(task.id)}
          toggleStatus={toggleStatus}
          openModal={openModal}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;
