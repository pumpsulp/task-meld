import React, { useState } from 'react';
import { searchTasks } from '../services/api';

const SearchTasks = () => {
    const [attr, setAttr] = useState('id');
    const [val, setVal] = useState('');
    const [tasks, setTasks] = useState([]);
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        if (e.target.name === 'attr') setAttr(e.target.value);
        if (e.target.name === 'val') setVal(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await searchTasks(attr, val, token);
            setTasks(response);
        } catch (error) {
            alert(error.message || 'Error searching tasks');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Search Tasks</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Attribute:</label>
                    <select name="attr" value={attr} onChange={handleChange}>
                        <option value="id">ID</option>
                        <option value="name">Name</option>
                        <option value="description">Description</option>
                        <option value="start_date">Start Date</option>
                        <option value="end_date">End Date</option>
                        <option value="status">Status</option>
                    </select>
                </div>
                <div>
                    <label>Value:</label>
                    <input type="text" name="val" value={val} onChange={handleChange} required />
                </div>
                <button type="submit">Search</button>
            </form>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchTasks;
