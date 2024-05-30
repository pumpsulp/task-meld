import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

export const fetchTasks = () => api.get('app/tasks/');
export const createTask = (task) => api.post('app/tasks/', task);
export const fetchUsers = () => api.get('app/users/');
export const createUser = (user) => api.post('app/users/', user);

export const fetchUsersByTask = (taskId) => api.get(`app/users/tasks/${taskId}`);

export const createAssignment = (assignment) => api.post('app/assignments/', assignment);
export const fetchAssignments = (skip = 0, limit = 100) => api.get(`app/assignments?skip=${skip}&limit=${limit}`);

export const fetchUserTasks = (userId) => api.get(`app/tasks/${userId}`);
export const searchTasksByAttribute = (attr, val) => api.get(`app/tasks/search_by/`, { params: { attr, val } });
export const fetchTaskUsers = (taskId) => api.get(`app/users/tasks/${taskId}`);

export default api;