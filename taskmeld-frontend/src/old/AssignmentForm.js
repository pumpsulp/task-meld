import React, { useState } from 'react';
import { createAssignment } from '../services/api';

const AssignmentForm = () => {
  const [assignment, setAssignment] = useState({
    user_id: '',
    task_id: '',
    description: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssignment({ ...assignment, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAssignment(assignment);
      setAssignment({ user_id: '', task_id: '', description: '' });
      setError('');
    } catch (err) {
      setError('Error creating assignment. Make sure the task and user exist.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>User ID</label>
        <input type="number" name="user_id" value={assignment.user_id} onChange={handleChange} required />
      </div>
      <div>
        <label>Task ID</label>
        <input type="number" name="task_id" value={assignment.task_id} onChange={handleChange} required />
      </div>
      <div>
        <label>Description</label>
        <input type="text" name="description" value={assignment.description} onChange={handleChange} required />
      </div>
      <button type="submit">Create Assignment</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default AssignmentForm;