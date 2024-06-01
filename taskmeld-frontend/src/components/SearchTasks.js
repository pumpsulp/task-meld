import React, { useState } from 'react';
import { searchTasks } from '../services/api';

const SearchTasks = () => {
    const [attr, setAttr] = useState('id');
    const [val, setVal] = useState('');
    const [tasks, setTasks] = useState([]);
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        if (e.target.name === 'attr') setAttr(e.target.value);
        if (e.target.name === 'val') setVal(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await searchTasks(attr, val, token);
            setTasks(response);
        } catch (error) {
            alert(error.message || 'Ошибка поиска задач');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Поиск задачи</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Аттрибут:</label>
                    <select name="attr" value={attr} onChange={handleChange}>
                        <option value="id">ID</option>
                        <option value="name">Название</option>
                        <option value="description">Описание</option>
                        <option value="start_date">Дата начала</option>
                        <option value="end_date">Дата окончания</option>
                        <option value="status">Статус</option>
                    </select>
                </div>
                <div>
                    <label>Значение:</label>
                    <input type="text" name="val" value={val} onChange={handleChange} required />
                </div>
                <button type="submit">Поиск</button>
            </form>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchTasks;
