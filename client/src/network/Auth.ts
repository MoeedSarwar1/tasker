import AsyncStorage from '@react-native-async-storage/async-storage';
import client from './Client';
import { API_ENDPOINTS } from './Endpoints';
import socket from './Socket';

export const login = async (email: string, password: string) => {
  const response = await client.post(API_ENDPOINTS.LOGIN, { email, password });
  const data = response.data;

  socket.emit('register', data._id);
  if (data.accessToken) {
    await AsyncStorage.setItem('accessToken', data.accessToken);
  }

  return data;
};

export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) => {
  const response = await client.post(API_ENDPOINTS.REGISTER, {
    firstName,
    lastName,
    email,
    password,
  });
  const data = response.data;

  return data;
};

export const verify = async (email: string, code: string) => {
  try {
    const response = await client.post(API_ENDPOINTS.VERIFY, {
      email: email.toLowerCase().trim(),
      code: code.trim(),
    });

    return response.data;
  } catch (error) {
    console.error('Verification API error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw error;
  }
};
