import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // match your backend mount point
});

// Optional: adds Authorization from localStorage if exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
