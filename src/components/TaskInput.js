import React, { useState } from 'react';
import './TaskInput.css';

function TaskInput({ onAddTask }) {
  const [input, setInput] = useState('');
  const [color, setColor] = useState('#008000'); // Başlangıç rengi yeşil olarak hex değeriyle

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddTask({ text: input, color });
    setInput('');
    setColor('#008000'); // Görev eklendikten sonra yeşile dön
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input 
        type="text" 
        className="task-input"
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Add a new task" 
      />
      <div className="color-options">
      <div 
          className={`color-choice ${color === '#008000' ? 'selected' : ''}`}
          onClick={() => setColor('#008000')}
          style={{ backgroundColor: '#008000' }} // Yeşil
        ></div>
        <div 
          className={`color-choice ${color === '#ffff00' ? 'selected' : ''}`}
          onClick={() => setColor('#ffff00')}
          style={{ backgroundColor: '#ffff00' }} // Sarı
        ></div>
       <div 
          className={`color-choice ${color === '#ff0000' ? 'selected' : ''}`}
          onClick={() => setColor('#ff0000')}
          style={{ backgroundColor: '#ff0000' }} // Kırmızı
        ></div>
      </div>
      <button type="submit" className="add-task-button">Add</button>
    </form>
  );
}

export default TaskInput;
