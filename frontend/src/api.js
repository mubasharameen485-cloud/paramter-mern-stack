import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Ye function har request se pehle chalega aur Token attach karega
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const loginUser = (data) => API.post('/auth/login', data);
export const signupUser = (data) => API.post('/auth/signup', data);

// Protected Routes
export const fetchProfile = () => API.get('/auth/profile');
export const fetchManagerStats = () => API.get('/auth/manager-data');
export const fetchAdminDashboard = () => API.get('/auth/admin-dashboard');

export default API;