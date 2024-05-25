import React, { useEffect, useState } from 'react';
import { fetchAssignments } from '../services/api';

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments().then((response) => {
      setAssignments(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Assignments</h2>
      <ul>
        {assignments.map((assignment) => (
          <li key={assignment.id}>
            ID: {assignment.id}, User ID: {assignment.user_id}, Task ID: {assignment.task_id}, Description: {assignment.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentList;
