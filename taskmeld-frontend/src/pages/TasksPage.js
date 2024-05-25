import React from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const TasksPage = () => (
  <div>
    <h1>Tasks</h1>
    <TaskForm />
    <TaskList />
  </div>
);

export default TasksPage;