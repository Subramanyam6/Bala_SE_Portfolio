import axios from 'axios';

// Create axios instance with base URL and default headers
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      // Redirect to login page if needed
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: async (username: string, password: string) => {
    const response = await api.post('/auth/login', { username, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
  },
};

// Project services
export const projectService = {
  getAllProjects: async (page = 0, size = 10, onlyPublished = false) => {
    const response = await api.get('/projects', {
      params: { page, size, onlyPublished },
    });
    return response.data;
  },
  getProjectBySlug: async (slug: string) => {
    const response = await api.get(`/projects/${slug}`);
    return response.data;
  },
  getFeaturedProjects: async () => {
    const response = await api.get('/projects/featured');
    return response.data;
  },
  searchProjects: async (keyword: string, page = 0, size = 10) => {
    const response = await api.get('/projects/search', {
      params: { keyword, page, size },
    });
    return response.data;
  },
  createProject: async (projectData: any) => {
    const response = await api.post('/projects', projectData);
    return response.data;
  },
  updateProject: async (id: number, projectData: any) => {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  },
  deleteProject: async (id: number) => {
    await api.delete(`/projects/${id}`);
  },
};

export default api; 