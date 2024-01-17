import React, { useState } from 'react';

function TaskList({ tasks, onDeleteTask, onEditTask, onToggleComplete }) {
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedTask, setEditedTask] = useState({ text: '', priority: 'orta' });

  const handleEdit = (index, task) => {
    setEditingIndex(index);
    setEditedTask({ text: task.text, priority: task.priority });
  };

  const handleSave = (index) => {
    onEditTask(index, editedTask);
    setEditingIndex(-1);
  };

  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          <input 
            type="checkbox" 
            checked={task.completed || false} 
            onChange={() => onToggleComplete(index)} 
          />
          {editingIndex === index ? (
            <>
              <input
                type="text"
                value={editedTask.text}
                onChange={(e) => setEditedTask({...editedTask, text: e.target.value})}
              />
              <select
                value={editedTask.priority}
                onChange={(e) => setEditedTask({...editedTask, priority: e.target.value})}
              >
                <option value="yüksek">Yüksek</option>
                <option value="orta">Orta</option>
                <option value="düşük">Düşük</option>
              </select>
              <button onClick={() => handleSave(index)}>Save</button>
            </>
          ) : (
            <>
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text} - Öncelik: {task.priority}
              </span>
              <button onClick={() => handleEdit(index, task)}>Edit</button>
            </>
          )}
          <button onClick={() => onDeleteTask(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
