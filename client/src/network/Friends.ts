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
// Send a friend request
export const sendFriendRequest = async (email: string) => {
  try {
    const response = await client.post(API_ENDPOINTS.SEND_FRIEND_REQUEST, {
      email,
    });
    return response.data; // request object
  } catch (error: any) {
    console.error(
      'Send Friend Request Error:',
      error?.response?.data || error.message,
    );
    throw error;
  }
};

// Accept a request
export const acceptFriendRequest = async (requestId: string) => {
  try {
    const response = await client.put(
      `${API_ENDPOINTS.ACCEPT_FRIENDS_REQUEST}/${requestId}/accept`,
    );
    return response.data; // updated friend list or success message
  } catch (error: any) {
    console.error(
      'Accept Friend Request Error:',
      error?.response?.data || error.message,
    );
    throw error;
  }
};

// Reject a request
export const rejectFriendRequest = async (requestId: string) => {
  try {
    const response = await client.put(
      `${API_ENDPOINTS.REJECT_FRIENDS_REQUEST}/${requestId}/reject`,
    );
    return response.data; // success message
  } catch (error: any) {
    console.error(
      'Reject Friend Request Error:',
      error?.response?.data || error.message,
    );
    throw error;
  }
};
export const allRequests = async () => {
  try {
    const response = await client.get(API_ENDPOINTS.FRIENDS_REQUESTS);
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

export const getFriendTasks = async (id: string) => {
  try {
    const response = await client.get(API_ENDPOINTS.GET_FRIEND_TASK(id));
    return response.data;
  } catch (error: any) {
    console.error(
      'Getting Friends Tasks Error:',
      error?.response?.data || error.message,
    );
    throw error; // let caller handle it
  }
};
