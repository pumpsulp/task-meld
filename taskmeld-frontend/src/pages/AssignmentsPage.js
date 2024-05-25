import React from 'react';
import AssignmentForm from '../components/AssignmentForm';
import AssignmentList from '../components/AssignmentList';

const AssignmentsPage = () => (
  <div>
    <h1>Assignments</h1>
    <AssignmentForm />
    <AssignmentList />
  </div>
);

export default AssignmentsPage;
