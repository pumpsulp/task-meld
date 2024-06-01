import React, { useState } from 'react';
import { updateUserRole } from '../services/api';

const UpdateUserRole = () => {
    const [userId, setUserId] = useState('');
    const [role, setRole] = useState('employee');
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'userId') setUserId(value);
        if (name === 'role') setRole(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateUserRole(userId, { role }, token);
            alert(`Роль пользователя успешно обновлена! Новая роль: ${response.role}`);
            console.log(response);
        } catch (error) {
            alert(error.message || 'Ошибка при обновлении роли');
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>ID пользователя:</label>
                <input type="text" name="userId" value={userId} onChange={handleChange} required />
            </div>
            <div>
                <label>Роль:</label>
                <select name="role" value={role} onChange={handleChange}>
                    <option value="employee">Работник</option>
                    <option value="admin">Админ</option>
                </select>
            </div>
            <button type="submit">Обновить роль</button>
        </form>
    );
};

export default UpdateUserRole;