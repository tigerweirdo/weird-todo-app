import React, { useState } from 'react';
import './App.css';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    if (task) {
      setTasks([...tasks, task]);
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List</h1>
        <TaskInput onAddTask={addTask} />
        <TaskList tasks={tasks} onDeleteTask={deleteTask} />
      </header>
    </div>
  );
}

export default App;
