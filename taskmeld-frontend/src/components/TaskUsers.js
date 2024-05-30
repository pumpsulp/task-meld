import React, { useState, useEffect } from 'react';
import { fetchTaskUsers } from '../services/api';

const TaskUsers = ({ taskId }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchTaskUsers(taskId).then(response => {
      setUsers(response.data);
    });
  }, [taskId]);

  return (
    <div>
      <h2>Users for Task {taskId}</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            ID: {user.id}, Email: {user.email}, Login: {user.login}, Name: {user.first_name} {user.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskUsers;