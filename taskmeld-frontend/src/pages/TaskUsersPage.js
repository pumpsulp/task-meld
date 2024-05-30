import React, { useState } from 'react';
import TaskUsers from '../components/TaskUsers';

const TaskUsersPage = () => {
  const [taskId, setTaskId] = useState('');

  const handleChange = (e) => {
    setTaskId(e.target.value);
  };

  return (
    <div>
      <h1>Task Users</h1>
      <div>
        <label>Task ID</label>
        <input type="number" value={taskId} onChange={handleChange} />
      </div>
      {taskId && <TaskUsers taskId={taskId} />}
    </div>
  );
};

export default TaskUsersPage;