import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import TaskList from './components/TaskList';
import UpdateUserRole from './components/UpdateUserRole';
import CreateAssignment from './components/CreateAssignment';
import AssignmentList from './components/AssignmentList';
import UserList from './components/UserList';
import CreateTask from './components/CreateTask';
import UsersByTask from './components/UsersByTask';
import UserTasks from './components/UserTasks';
import SearchTasks from './components/SearchTasks';
import { fetchUserInfo } from './services/api';
import ErrorPage from './components/ErrorPage';

const App = () => {
    const [role, setRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserInfo(token).then(user => {
                setRole(user.role);
            }).catch(error => {
                console.error('Error fetching user info:', error);
                localStorage.removeItem('token');
            });
        }
    }, []);

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/register">Регистрация</Link></li>
                        <li><Link to="/login">Авторизация</Link></li>
                        <li><Link to="/tasks">Задачи</Link></li>
                        {role === 'admin' && <>
                            <li><Link to="/update-role">Обновить роль пользователя</Link></li>
                            <li><Link to="/create-assignment">Поручить задачу</Link></li>
                            <li><Link to="/assignments">Все поручения</Link></li>
                            <li><Link to="/users">Все пользователи</Link></li>
                            <li><Link to="/create-task">Создать задачу</Link></li>
                            <li><Link to="/users-by-task">Поиск пользователей задачи</Link></li>
                            <li><Link to="/user-tasks">Поиск задач пользователя</Link></li>
                            <li><Link to="/search-tasks">Поиск задач по атрибуту</Link></li>
                        </>}
                    </ul>
                </nav>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/tasks" element={<TaskList role={role} />} />
                    {role === 'admin' && <>
                        <Route path="/update-role" element={<UpdateUserRole />} />
                        <Route path="/create-assignment" element={<CreateAssignment />} />
                        <Route path="/assignments" element={<AssignmentList />} />
                        <Route path="/users" element={<UserList />} />
                        <Route path="/create-task" element={<CreateTask />} />
                        <Route path="/users-by-task" element={<UsersByTask />} />
                        <Route path="/user-tasks" element={<UserTasks />} />
                        <Route path="/search-tasks" element={<SearchTasks />} />
                    </>}
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
