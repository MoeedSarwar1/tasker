import { io } from 'socket.io-client';
import { SOCKET } from '@env';

// point this to your backend server where socket.io is running
const socket = io(SOCKET, {
  transports: ['websocket'], // force websocket for RN
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
});

export default socket;
