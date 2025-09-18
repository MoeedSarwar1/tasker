import client from './Client';
import { API_ENDPOINTS } from './Endpoints';

export const fetchUsers = async () => {
  try {
    const response = await client.get(API_ENDPOINTS.GET_USER);
    return response.data; // should be an array of users
  } catch (error: any) {
    console.error('Fetch Users Error:', error);
    return [];
  }
};

export const fetchMe = async () => {
  try {
    const response = await client.get(API_ENDPOINTS.GET_ME);
    return response.data; // should be an array of users
  } catch (error: any) {
    console.error('Fetch Users Error:', error);
    return [];
  }
};
export const deleteMe = async () => {
  try {
    const response = await client.delete(API_ENDPOINTS.DELETE_ME);
    return response.data; // should be an array of users
  } catch (error: any) {
    console.error('Fetch Users Error:', error);
    return [];
  }
};
