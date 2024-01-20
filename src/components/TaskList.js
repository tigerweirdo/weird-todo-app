import React, { useState, useEffect, useRef } from 'react';
import './TaskList.css';

function TaskList({ tasks, onDeleteTask, onEditTask, onToggleComplete }) {
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedTasks, setEditedTasks] = useState(tasks.map(task => ({ text: task.text, color: task.color })));
  const editingRef = useRef(null); // Reference for the editing form

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editingRef.current && !editingRef.current.contains(event.target) && editingIndex !== -1) {
        const updatedTask = { ...tasks[editingIndex], ...editedTasks[editingIndex] };
        setEditedTasks(tasks.map(task => ({ ...task })));

        onEditTask(editingIndex, updatedTask);
        setEditingIndex(-1);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editingIndex, editedTasks, onEditTask, tasks]); // 'tasks' bağımlılık listesine eklendi
  
  const handleDoubleClick = (index, event) => {
    event.stopPropagation(); // Bu, düzenleme formunun açılmasını önler
    const updatedTask = { ...tasks[index], completed: !tasks[index].completed };
    onToggleComplete(index, updatedTask);
  };

  const handleEdit = (index, task) => {
    setEditingIndex(index);
    // Mevcut düzenlenmiş görevleri güncelleyin, yalnızca mevcut index için yeni değerleri ayarlayın
    setEditedTasks(editedTasks.map((et, i) => i === index ? { text: task.text, color: task.color } : et));
  };

  const handleTaskTextChange = (event) => {
    // Yalnızca düzenlenmekte olan görevin metnini güncelleyin
    const updatedEditedTasks = editedTasks.map((et, i) => i === editingIndex ? { ...et, text: event.target.value } : et);
    setEditedTasks(updatedEditedTasks);
  };

  const handleColorChange = (index, color) => {
    // Yalnızca düzenlenmekte olan görevin rengini güncelleyin
    const updatedEditedTasks = editedTasks.map((et, i) => i === index ? { ...et, color: color } : et);
    setEditedTasks(updatedEditedTasks);
    // OnEditTask'i çağırarak bu değişikliği ana duruma da yansıtın
    onEditTask(index, { ...tasks[index], color: color });
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
        <li key={index}
            className={`task-item ${editingIndex === index ? 'editing' : ''} ${task.completed ? 'completed' : ''}`}
            style={{ backgroundColor: task.color }}
            onDoubleClick={(e) => handleDoubleClick(index, e)}
        >
          {editingIndex === index ? (
            <div ref={editingRef} className="task-editing-form" onClick={(e) => e.stopPropagation()}>
            <input
  type="text"
  className="task-edit-input"
  value={editingIndex !== -1 ? editedTasks[editingIndex].text : ''}
  onChange={handleTaskTextChange}
/>
            <div className="color-selector">
          {Object.keys(priorityColors).map(key => (
            <div
              key={key}
              className={`color-choice ${editedTasks[index].color === key ? 'selected' : ''}`}
              onClick={() => handleColorChange(index, key)}
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
          <button className="delete-btn" onClick={(e) => { e.stopPropagation(); onDeleteTask(index); }}>×</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
