import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../services/api';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            ID: {user.id}, Email: {user.email}, Name: {user.first_name} {user.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;