import React, { useState } from 'react';
import { createTask } from '../services/api';

const CreateTask = () => {
    const [taskData, setTaskData] = useState({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        status: 'pending'
    });
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        setTaskData({
            ...taskData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createTask(taskData, token);
            alert('Task created successfully!');
            console.log(response);
        } catch (error) {
            alert(error.message || 'Error creating task');
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={taskData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Description:</label>
                <input type="text" name="description" value={taskData.description} onChange={handleChange} required />
            </div>
            <div>
                <label>Start Date:</label>
                <input type="date" name="start_date" value={taskData.start_date} onChange={handleChange} required />
            </div>
            <div>
                <label>End Date:</label>
                <input type="date" name="end_date" value={taskData.end_date} onChange={handleChange} required />
            </div>
            <div>
                <label>Status:</label>
                <select name="status" value={taskData.status} onChange={handleChange}>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <button type="submit">Create Task</button>
        </form>
    );
};

export default CreateTask;