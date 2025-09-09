export const API_ENDPOINTS = {
  LOGIN: '/users/login',
  REGISTER: '/users/register',
  GET_USER: '/users',
  GET_USER_BY_ID: (id: string) => `/users/${id}`,
  POST_TASK: 'users/tasks',
  GET_TASKS: 'users/tasks',
  DELETE_TASK: 'users/tasks',
  PATCH_TASK: 'users/tasks',
  ADD_FRIENDS: '/friends/add',
  GET_FRIENDS: '/friends/',
  GET_ME: '/users/me',
};
