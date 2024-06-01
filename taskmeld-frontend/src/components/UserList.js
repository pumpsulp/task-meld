import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/api';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers(token);
                setUsers(response);
            } catch (error) {
                console.error('Ошибка получения списка пользователей:', error);
            }
        };

        fetchUsers();
    }, [token]);

    return (
        <div>
            <h1>Пользователи</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.id} {user.username} ({user.email}) - {user.role}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;