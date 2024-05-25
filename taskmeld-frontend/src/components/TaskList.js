import React, { useEffect, useState } from 'react';
import { fetchTasks } from '../services/api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks().then((response) => {
      setTasks(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
              ID: {task.id}, Name: {task.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;