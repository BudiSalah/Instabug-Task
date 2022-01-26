import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://fe-task.getsandbox.com',
});
