import React, { useEffect, useState } from 'react';
import { getAssignments } from '../services/api';

const AssignmentList = () => {
    const [assignments, setAssignments] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await getAssignments(token);
                setAssignments(response);
            } catch (error) {
                console.error('Ошибка получения поручений:', error);
            }
        };

        fetchAssignments();
    }, [token]);

    return (
        <div>
            <h1>Поручения</h1>
            <ul>
                {assignments.map(assignment => (
                    <li key={assignment.id}>
                        ID задачи: {assignment.task_id}, ID пользователя: {assignment.user_id}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AssignmentList;
