import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.lindohub.com/api/v1/app', // 백엔드 서버 주소
  withCredentials: true, // 세션쿠키 인증
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
