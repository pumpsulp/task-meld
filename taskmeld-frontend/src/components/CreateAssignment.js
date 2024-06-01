import React, { useState } from 'react';
import { createAssignment } from '../services/api';

const CreateAssignment = () => {
    const [assignmentData, setAssignmentData] = useState({
        task_id: '',
        user_id: ''
    });
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        setAssignmentData({
            ...assignmentData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createAssignment(assignmentData, token);
            alert('Assignment created successfully!');
            console.log(response);
        } catch (error) {
            alert(error.message || 'Error creating assignment');
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Task ID:</label>
                <input type="text" name="task_id" value={assignmentData.task_id} onChange={handleChange} required />
            </div>
            <div>
                <label>User ID:</label>
                <input type="text" name="user_id" value={assignmentData.user_id} onChange={handleChange} required />
            </div>
            <button type="submit">Create Assignment</button>
        </form>
    );
};

export default CreateAssignment;