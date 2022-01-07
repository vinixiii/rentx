import axios from 'axios';

export const api: any = axios.create({
  baseURL: 'http://192.168.1.160:3333',
});
