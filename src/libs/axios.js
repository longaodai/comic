import axios from 'axios';

export const request = axios.create({
  baseURL: 'https://otruyenapi.com/v1/api',
  headers: {},
});
