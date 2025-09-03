import client from './Client';
import { API_ENDPOINTS } from './Endpoints';

export const postTask = async (taskData: {
  title: string;
  description: string;
}) => {
  const response = await client.post(API_ENDPOINTS.POST_TASK, taskData);
  const data = response.data;
  return data;
};

export const fetchTasks = async () => {
  try {
    const response = await client.get(API_ENDPOINTS.GET_TASKS);
    return response.data; // array of tasks
  } catch (error: any) {
    console.error('Fetch Tasks Error:', error);
    return []; // return empty array on error
  }
};
