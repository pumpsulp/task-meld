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
            alert(`User role updated successfully! New role: ${response.role}`);
            console.log(response);
        } catch (error) {
            alert(error.message || 'Error updating user role');
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>User ID:</label>
                <input type="text" name="userId" value={userId} onChange={handleChange} required />
            </div>
            <div>
                <label>Role:</label>
                <select name="role" value={role} onChange={handleChange}>
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <button type="submit">Update Role</button>
        </form>
    );
};

export default UpdateUserRole;