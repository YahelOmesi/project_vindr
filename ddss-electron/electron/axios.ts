import axios from 'axios';
import axiosRetry from 'axios-retry';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

axiosRetry(axiosInstance, {
  retries: 5,
  retryDelay: (retryCount) => {
    return Math.pow(2, retryCount) * 1000;
  },
  retryCondition: (error) => axiosRetry.isNetworkError(error) || axiosRetry.isRetryableError(error),
});

export default axiosInstance;
