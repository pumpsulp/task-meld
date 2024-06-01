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
            alert(error.message || 'Ошибка поиска пользователя по задаче!');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Поиск пользователя по задаче</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID задачи:</label>
                    <input type="text" value={taskId} onChange={handleChange} required />
                </div>
                <button type="submit">Найти пользователей</button>
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
