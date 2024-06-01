import React, { useEffect, useState } from 'react';
import { getOwnTasks, getAllTasks } from '../services/api';

const TaskList = ({ role }) => {
    const [tasks, setTasks] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                let response;
                if (role === 'admin') {
                    response = await getAllTasks(token);
                } else {
                    response = await getOwnTasks(token);
                }
                setTasks(response);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, [role, token]);

    return (
        <div>
            <h1>Tasks</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;

