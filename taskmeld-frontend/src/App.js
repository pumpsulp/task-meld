import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TasksPage from './pages/TasksPage';
import UsersPage from './pages/UsersPage';
import AssignmentsPage from './pages/AssignmentsPage';
import UserTasksPage from './pages/UserTasksPage';
import TaskSearchPage from './pages/TaskSearchPage';
import TaskUsersPage from './pages/TaskUsersPage';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/tasks">Tasks</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/assignments">Assignments</Link></li>
          <li><Link to="/user-tasks">User Tasks</Link></li>
          <li><Link to="/task-search">Task Search</Link></li>
          <li><Link to="/task-users">Task Users</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/assignments" element={<AssignmentsPage />} />
        <Route path="/user-tasks" element={<UserTasksPage />} />
        <Route path="/task-search" element={<TaskSearchPage />} />
        <Route path="/task-users" element={<TaskUsersPage />} />
      </Routes>
    </Router>
  );
}

export default App;