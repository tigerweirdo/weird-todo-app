import React, { useState, useEffect, useRef } from 'react';
import './TaskList.css';

function TaskList({ tasks, onDeleteTask, onEditTask, onToggleComplete }) {
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedTask, setEditedTask] = useState({ text: '', color: '#008000' });
  const editingRef = useRef(null); // Reference for the editing form

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editingRef.current && !editingRef.current.contains(event.target) && editingIndex !== -1) {
        onEditTask(editingIndex, editedTask);
        setEditingIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editingIndex, editedTask, onEditTask]);

  const handleEdit = (index, task) => {
    setEditingIndex(index);
    setEditedTask({ text: task.text, color: task.color });
  };

  const handleTaskTextChange = (event) => {
    setEditedTask({ ...editedTask, text: event.target.value });
  };

  const handleColorChange = (color) => {
    setEditedTask({ ...editedTask, color: color });
  };

  const priorityColors = {
    '#3EFAA9': 1, // Red - High Priority
    '#FAB43E': 2, // Yellow - Medium Priority
    '#64FA3E': 3, // Green - Low Priority
  };

  const sortedTasks = tasks.slice().sort((a, b) => {
    return priorityColors[a.color] - priorityColors[b.color] || a.text.localeCompare(b.text);
  });
  

  return (
    <ul className="task-list">
      {sortedTasks.map((task, index) => (
        <li key={index} className={`task-item ${editingIndex === index ? 'editing' : ''}`} style={{ borderColor: task.color }}>
          <div className="status-indicator" onClick={() => onToggleComplete(index)}>
            {task.completed ? '✔' : '○'}
          </div>
          {editingIndex === index ? (
            <div ref={editingRef} className="task-editing-form" onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                className="task-edit-input"
                value={editedTask.text}
                onChange={handleTaskTextChange}
              />
              <div className="color-selector">
                {Object.keys(priorityColors).map(key => (
                  <div
                    key={key}
                    className={`color-choice ${editedTask.color === key ? 'selected' : ''}`}
                    onClick={() => handleColorChange(key)}
                    style={{ backgroundColor: key }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="task-content" onClick={() => handleEdit(index, task)}>
              <span className="task-text" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
              </span>
              <div className="task-color-indicator" style={{ backgroundColor: task.color }}></div>
            </div>
          )}
          <button className="delete-btn" onClick={(e) => { e.stopPropagation(); onDeleteTask(index); }}>x</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
