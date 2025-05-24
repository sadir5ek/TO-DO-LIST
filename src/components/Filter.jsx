import React from 'react';
import '../styles/Filter.css';

function Filter({ setFilter, currentFilter }) {
  const filters = ['All', 'Focus', 'Done'];

  return (
    <div className="filter-container">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setFilter(filter)}
          className={`filter-button ${currentFilter === filter ? 'active' : ''}`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default Filter;