import axios from 'axios';

export const api: any = axios.create({
  baseURL: 'http://192.168.0.5:3333',
});
