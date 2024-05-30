import React, { useState, useEffect } from 'react';
import { fetchUserTasks } from '../services/api';

const UserTasks = ({ userId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchUserTasks(userId).then(response => {
      setTasks(response.data);
    });
  }, [userId]);

  return (
    <div>
      <h2>Tasks for User {userId}</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            ID: {task.id}, Name: {task.name}, Description: {task.description}, Start Date: {task.start_date}, End Date: {task.end_date}, Status: {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserTasks;