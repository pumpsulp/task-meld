import React, { useState } from 'react';
import UserTasks from '../components/UserTasks';

const UserTasksPage = () => {
  const [userId, setUserId] = useState('');

  const handleChange = (e) => {
    setUserId(e.target.value);
  };

  return (
    <div>
      <h1>User Tasks</h1>
      <div>
        <label>User ID</label>
        <input type="number" value={userId} onChange={handleChange} />
      </div>
      {userId && <UserTasks userId={userId} />}
    </div>
  );
};

export default UserTasksPage;