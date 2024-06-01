import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(formData);
            alert('Успешная авторизация!');
            localStorage.setItem('token', response.access_token);
            window.location.reload(); // Перезагрузка страницы
        } catch (error) {
            alert(error.message || 'Ошибка авторизации!');
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input type="email" name="username" value={formData.username} onChange={handleChange} required />
            </div>
            <div>
                <label>Пароль:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <button type="submit">Вход</button>
        </form>
    );
};

export default LoginForm;