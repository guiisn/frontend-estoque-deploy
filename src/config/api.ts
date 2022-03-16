import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://backend-estoque-deploy.herokuapp.com',
});
