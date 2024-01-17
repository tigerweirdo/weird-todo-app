import React, { useState, useEffect } from 'react';
import './App.css';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('tümü');
  
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const addTask = (task) => {
    if (task.text) {
      const newTasks = [...tasks, task];
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
    }
  };
  const onToggleComplete = (index) => {
    const newTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  
 

  const filteredAndSortedTasks = tasks
  .filter(task => {
    if (filter === 'yüksek') return task.priority === 'yüksek';
    if (filter === 'tamamlanmamış') return !task.completed;
    if (filter === 'tamamlanmış') return task.completed;
    return true;
  })
  .sort((a, b) => {
    const priorities = { 'yüksek': 1, 'orta': 2, 'düşük': 3 };
    return priorities[a.priority] - priorities[b.priority];
  });
  
  

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const onEditTask = (index, newTask) => {
    const updatedTasks = tasks.map((task, i) => (i === index ? newTask : task));
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List</h1>
        <TaskInput onAddTask={addTask} />
        <select value={filter} onChange={handleFilterChange}>
          <option value="tümü">Tümü</option>
          <option value="yüksek">Yüksek Öncelik</option>
          <option value="tamamlanmamış">Tamamlanmamış</option>
          <option value="tamamlanmış">Tamamlanmış</option>

        </select>
        <TaskList 
        tasks={filteredAndSortedTasks} 
        onDeleteTask={deleteTask} 
        onEditTask={onEditTask} 
        onToggleComplete={onToggleComplete} 
      />
      </header>
    </div>
  );
}

export default App;
