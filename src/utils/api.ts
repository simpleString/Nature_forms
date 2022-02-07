import axios from 'axios';
import { BASE_URL } from '../configs';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);

    if (error.response.status === 401 || 403) {
      console.log('User not authorised');
      return error;
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;
