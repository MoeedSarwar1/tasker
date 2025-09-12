import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { useFriendsContext } from '../context/Friends-context';

import { API_URL } from '@env';

export default function SocketManager() {
  const { setFriends, setRequests } = useFriendsContext();

  useEffect(() => {
    const socket = io(API_URL, {
      transports: ['websocket'],
      withCredentials: true, // if your API uses auth cookies
    });

    // 🔹 When a new friend request is received
    socket.on('friends:request:received', request => {
      setRequests(prev => [...prev, request]);
    });

    // 🔹 When your request is accepted
    socket.on('friends:request:accepted', friend => {
      setRequests(prev => prev.filter(r => r._id !== friend._id));
      setFriends(prev => [...prev, friend]);
    });

    // 🔹 When your request is rejected
    socket.on('friends:request:rejected', requestId => {
      setRequests(prev => prev.filter(r => r._id !== requestId));
    });

    // 🔹 When you’re removed by a friend
    socket.on('friends:removed', friendId => {
      setFriends(prev => prev.filter(f => f._id !== friendId));
    });

    // 🔹 When you add a new friend (e.g., after sending request)
    socket.on('friends:added', friend => {
      setFriends(prev => [...prev, friend]);
    });

    return () => {
      socket.disconnect();
    };
  }, [setFriends, setRequests]);

  return null;
}
