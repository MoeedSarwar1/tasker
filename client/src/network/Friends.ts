import client from './Client';
import { API_ENDPOINTS } from './Endpoints';

export const fetchFriends = async () => {
  try {
    const response = await client.get(API_ENDPOINTS.GET_FRIENDS);
    return response.data; // array of tasks
  } catch (error: any) {
    console.error('Fetch Tasks Error:', error);
    return []; // return empty array on error
  }
};
