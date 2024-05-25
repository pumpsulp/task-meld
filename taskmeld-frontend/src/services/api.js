import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Убедитесь, что это соответствует адресу вашего backend
});

export const fetchTasks = () => api.get('app/tasks/');
export const createTask = (task) => api.post('app/tasks/', task);
export const fetchUsers = () => api.get('app/users/');
export const createUser = (user) => api.post('app/users/', user);

export const fetchUsersByTask = (taskId) => api.get(`app/users/tasks/${taskId}`);

export const createAssignment = (assignment) => api.post('app/assignments/', assignment);
export const fetchAssignments = (skip = 0, limit = 100) => api.get(`app/assignments?skip=${skip}&limit=${limit}`);

export default api;