import React from 'react';

function TaskList({ tasks, onDeleteTask }) {
  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          {task}
          <button onClick={() => onDeleteTask(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
