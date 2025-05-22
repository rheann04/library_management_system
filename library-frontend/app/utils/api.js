const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const getAuthToken = () => {
  // Token will be handled by cookies now, which are automatically sent with requests
  return document.cookie.split('; ').find(row => row.startsWith('studentToken='))?.split('=')[1];
};

export const setAuthToken = (token) => {
  // Set cookie with HttpOnly flag
  document.cookie = `studentToken=${token}; path=/; secure; samesite=strict`;
};

export const removeAuthToken = () => {
  // Remove the cookie by setting an expired date
  document.cookie = 'studentToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

export const apiRequest = async (endpoint, options = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    credentials: 'include', // This is important for sending cookies with requests
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        data: data,
        message: data.message || 'An error occurred',
      };
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Common API functions
export const loginStudent = async (credentials) => {
  return apiRequest('/students/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

export const logoutStudent = async () => {
  return apiRequest('/students/logout', {
    method: 'POST',
  });
};

export const getStudentProfile = async () => {
  return apiRequest('/students/profile', {
    method: 'GET',
  });
}; 