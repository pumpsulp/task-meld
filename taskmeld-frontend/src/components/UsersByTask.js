import React, { useState } from 'react';
import { getUsersByTask } from '../services/api';

const UsersByTask = () => {
    const [taskId, setTaskId] = useState('');
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        setTaskId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await getUsersByTask(taskId, token);
            setUsers(response);
        } catch (error) {
            alert(error.message || 'Error fetching users by task');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Users by Task</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Task ID:</label>
                    <input type="text" value={taskId} onChange={handleChange} required />
                </div>
                <button type="submit">Get Users</button>
            </form>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username} ({user.email}) - {user.role}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersByTask;
