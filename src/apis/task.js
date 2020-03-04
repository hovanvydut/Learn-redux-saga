import qs from 'query-string';
import axiosService from '../commons/axiosService';
import { API_ENDPOINT } from '../constants/index';

// http://localhost:3000/tasks
const url = '/tasks';

export const getList = (params = {}) => {
  let queryParams = '';
  if (Object.keys(params).length > 0) {
    queryParams = `?${qs.stringify(params)}`;
  }
  return axiosService.get(API_ENDPOINT + url + queryParams);
};

// POST http://localhost:3000/tasks
export const addTask = data => {
  return axiosService.post(API_ENDPOINT + url, data);
};

// PUT http://locahost:3000/tasks/:id
export const updateTask = (data, taskId) => {
  console.log(`${API_ENDPOINT + url}/${taskId}`);
  return axiosService.put(`${API_ENDPOINT + url}/${taskId}`, data);
};
