// API base URL
const API_BASE_URL = 'http://localhost/library_management/api';

// Helper function to handle API calls
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers
  };

  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      ...options,
      headers
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  login: (credentials) => apiCall('login.php', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),
  me: () => apiCall('auth/me.php')
};

// Books API
export const booksAPI = {
  getAll: () => apiCall('books.php'),
  getOne: (id) => apiCall(`books.php?id=${id}`),
  create: (book) => apiCall('books.php', {
    method: 'POST',
    body: JSON.stringify(book)
  }),
  update: (id, book) => apiCall(`books.php?id=${id}`, {
    method: 'PUT',
    body: JSON.stringify(book)
  }),
  delete: (id) => apiCall(`books.php?id=${id}`, {
    method: 'DELETE'
  })
};

// Students API
export const studentsAPI = {
  getAll: () => apiCall('students.php'),
  getOne: (id) => apiCall(`students.php?id=${id}`),
  create: (student) => apiCall('students.php', {
    method: 'POST',
    body: JSON.stringify(student)
  }),
  update: (id, student) => apiCall(`students.php?id=${id}`, {
    method: 'PUT',
    body: JSON.stringify(student)
  }),
  delete: (id) => apiCall(`students.php?id=${id}`, {
    method: 'DELETE'
  })
};

// Borrowings API
export const borrowingsAPI = {
  getAll: () => apiCall('borrowings.php'),
  getOne: (id) => apiCall(`borrowings.php?id=${id}`),
  getMyBorrowings: () => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(atob(token.split('.')[1]));
    return apiCall(`borrowings.php?user_id=${userData.id}`);
  },
  borrow: (bookId, dueDate) => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(atob(token.split('.')[1]));
    return apiCall('borrowings.php', {
      method: 'POST',
      body: JSON.stringify({
        bookId,
        userId: userData.id,
        dueDate
      })
    });
  },
  return: (id) => apiCall(`borrowings.php?id=${id}`, {
    method: 'PUT'
  })
}; 