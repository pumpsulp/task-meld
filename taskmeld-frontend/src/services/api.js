import axios from 'axios';

// Создание инстанса axios с базовыми настройками
const api = axios.create({
  baseURL: 'http://localhost:8000', // Убедитесь, что здесь указан правильный базовый URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Функция для регистрации пользователя
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/app/register/', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Error registering user');
  }
};

// Функция для входа пользователя
export const loginUser = async (loginData) => {
  try {
    const response = await api.post('/app/token', new URLSearchParams(loginData), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Error logging in');
  }
};

export const getOwnTasks = async (token) => {
  try {
    const response = await api.get('/app/tasks/own/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Error fetching own tasks');
  }
};

// Функция для получения всех задач (только для администраторов)
export const getAllTasks = async (token) => {
  try {
    const response = await api.get('/app/tasks/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Error fetching all tasks');
  }
};

// Функция для получения информации о текущем пользователе
export const fetchUserInfo = async (token) => {
  try {
    const response = await api.get('/app/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Error fetching user info');
  }
};

// Функция для обновления роли пользователя
export const updateUserRole = async (userId, roleData, token) => {
  try {
    const response = await api.put(`/app/users/${userId}/role`, roleData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Error updating user role');
  }
};

// Функция для создания назначения задачи
export const createAssignment = async (assignmentData, token) => {
  try {
    const response = await api.post('/app/assignments/', assignmentData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Error creating assignment');
  }
};

// Функция для получения назначений задач
export const getAssignments = async (token, skip = 0, limit = 100) => {
  try {
    const response = await api.get('/app/assignments/', {
      params: { skip, limit },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Error fetching assignments');
  }
};

// Функции для работы с пользователями
export const getUsers = async (token, skip = 0, limit = 100) => {
  try {
    const response = await api.get('/app/users/', {
      params: { skip, limit },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Error fetching users');
  }
};

export const getUsersByTask = async (taskId, token) => {
  try {
    const response = await api.get(`/app/users/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Error fetching users by task');
  }
};

// Функции для работы с задачами
export const createTask = async (taskData, token) => {
  try {
    const response = await api.post('/app/tasks/', taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Error creating task');
  }
};

export const getTasks = async (token, skip = 0, limit = 100) => {
  try {
    const response = await api.get('/app/tasks/', {
      params: { skip, limit },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Error fetching tasks');
  }
};

export const getUserTasks = async (userId, token) => {
  try {
    const response = await api.get(`/app/tasks/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Error fetching user tasks');
  }
};

export const searchTasks = async (attr, val, token) => {
  try {
    const response = await api.get('/app/tasks/search_by/', {
      params: { attr, val },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Error searching tasks');
  }
};