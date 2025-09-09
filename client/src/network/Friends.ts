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
export const addFriends = async (firstName: string, lastName: string) => {
  try {
    const response = await client.post(API_ENDPOINTS.ADD_FRIENDS, {
      firstName,
      lastName,
    });
    return response.data; // new friend object or updated list
  } catch (error: any) {
    console.error('Add Friend Error:', error?.response?.data || error.message);
    throw error; // let caller handle it
  }
};
export const removeFriend = async (firstName: string, lastName: string) => {
  try {
    const response = await client.post(API_ENDPOINTS.REMOVE_FRIEND, {
      firstName,
      lastName,
    });
    return response.data; // new friend object or updated list
  } catch (error: any) {
    console.error('Add Friend Error:', error?.response?.data || error.message);
    throw error; // let caller handle it
  }
};
