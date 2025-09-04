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

export const deleteTask = async (taskId: string) => {
  try {
    const response = await client.delete(
      `${API_ENDPOINTS.DELETE_TASK}/${taskId}`,
    );
    return response.data;
  } catch (error: any) {
    console.error('Delete Task Error:', error);
  }
};

export const updateTask = async (taskId: string, completed: boolean) => {
  try {
    const response = await client.patch(
      `${API_ENDPOINTS.PATCH_TASK}/${taskId}`,
      { completed },
    );
    return response.data;
  } catch (error: any) {
    console.error('Update Task Error:', error);
  }
};
