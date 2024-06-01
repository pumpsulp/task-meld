import React, { useState } from 'react';
import { getUserTasks } from '../services/api';

const UserTasks = () => {
    const [userId, setUserId] = useState('');
    const [tasks, setTasks] = useState([]);
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        setUserId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await getUserTasks(userId, token);
            setTasks(response);
        } catch (error) {
            alert(error.message || 'Error fetching user tasks');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Поиск задач пользователя</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID пользователя:</label>
                    <input type="text" value={userId} onChange={handleChange} required />
                </div>
                <button type="submit">Получить задачи</button>
            </form>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserTasks;
