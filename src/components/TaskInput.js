import React, { useState } from 'react';

function TaskInput({ onAddTask }) {
    const [input, setInput] = useState('');
    const [priority, setPriority] = useState('orta');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onAddTask({ text: input, priority });
      setInput('');
      setPriority('orta');
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Add a new task" 
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="yüksek">Yüksek</option>
          <option value="orta">Orta</option>
          <option value="düşük">Düşük</option>
        </select>
        <button type="submit">Add</button>
      </form>
    );
  }
  
export default TaskInput;
