/*import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.lindohub.com/api/v1/app', // 백엔드 서버 주소
  withCredentials: true, // 세션쿠키 인증
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
*/
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.lindohub.com/api/v1/app',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default axiosInstance;
