import React, { useState } from 'react';
import { searchTasksByAttribute } from '../services/api';

const TaskSearch = () => {
  const [attribute, setAttribute] = useState('name');
  const [value, setValue] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      console.log(`Searching tasks by ${attribute} with value ${value}`);
      const response = await searchTasksByAttribute(attribute, value);
      console.log('Response:', response.data);
      setTasks(response.data);
    } catch (err) {
      console.error('Error searching tasks:', err);
    }
  };

  return (
    <div>
      <h2>Search Tasks</h2>
      <form onSubmit={handleSearch}>
        <div>
          <label>Attribute</label>
          <select value={attribute} onChange={(e) => setAttribute(e.target.value)}>
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="description">Description</option>
            <option value="end_date">End Date</option>
          </select>
        </div>
        <div>
          <label>Value</label>
          <input type="text" value={value} onChange={(e) => setValue(e.target.value)} required />
        </div>
        <button type="submit">Search</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            ID: {task.id}, Name: {task.name}, Description: {task.description}, End Date: {task.end_date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskSearch;