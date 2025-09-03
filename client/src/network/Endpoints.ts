export const API_ENDPOINTS = {
  LOGIN: '/users/login',
  REGISTER: '/users/register',
  GET_USER: '/users',
  GET_USER_BY_ID: (id: string) => `/users/${id}`,
};
