import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3065', // 백엔드 서버 주소
  withCredentials: true, // 세션쿠키 인증
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
