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
                console.error('Error fetching assignments:', error);
            }
        };

        fetchAssignments();
    }, [token]);

    return (
        <div>
            <h1>Assignments</h1>
            <ul>
                {assignments.map(assignment => (
                    <li key={assignment.id}>
                        Task ID: {assignment.task_id}, User ID: {assignment.user_id}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AssignmentList;
