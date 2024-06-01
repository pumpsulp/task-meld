import React, { useState } from 'react';
import { registerUser } from '../services/api';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user'
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(formData);
            alert('User registered successfully!');
            console.log(response);
        } catch (error) {
            alert(error.message || 'Error registering user');
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Имя пользователя:</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} required/>
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required/>
            </div>
            <div>
                <label>Логин:</label>
                <input type="login" name="login" value={formData.login} onChange={handleChange} required/>
            </div>
            <div>
                <label>Пароль:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required/>
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;