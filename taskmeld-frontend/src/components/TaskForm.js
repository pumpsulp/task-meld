import React, { useState } from 'react';
import { createTask } from '../services/api';

const TaskForm = () => {
  const [task, setTask] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    status: 'pending'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask(task);
      setTask({ name: '', description: '', start_date: '', end_date: '', status: 'pending' });
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" name="name" value={task.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Description</label>
        <input type="text" name="description" value={task.description} onChange={handleChange} />
      </div>
      <div>
        <label>Start Date</label>
        <input type="date" name="start_date" value={task.start_date} onChange={handleChange} />
      </div>
      <div>
        <label>End Date</label>
        <input type="date" name="end_date" value={task.end_date} onChange={handleChange} />
      </div>
      <div>
        <label>Status</label>
        <input type="text" name="status" value={task.status} onChange={handleChange} />
      </div>
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;