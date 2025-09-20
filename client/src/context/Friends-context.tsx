import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './Auth-context';
import { SOCKET } from '@env';

interface Friend {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
}

interface FriendRequest {
  _id: string;
  sender: Friend;
}

interface FriendsContextType {
  friends: Friend[];
  setFriends: React.Dispatch<React.SetStateAction<Friend[]>>;
  requests: FriendRequest[];
  setRequests: React.Dispatch<React.SetStateAction<FriendRequest[]>>;
  friendsUpdated: number;
  notifyFriendsUpdate: () => void;
  socket: Socket | null;
}

const FriendsContext = createContext<FriendsContextType>({
  friends: [],
  setFriends: () => {},
  requests: [],
  setRequests: () => {},
  friendsUpdated: 0,
  notifyFriendsUpdate: () => {},
  socket: null,
});

export const FriendsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [friendsUpdated, setFriendsUpdated] = useState(0);
  const [socket, setSocket] = useState<Socket | null>(null);

  const { user, token } = useAuth();
  const notifyFriendsUpdate = () => setFriendsUpdated(prev => prev + 1);

  useEffect(() => {
    // Only connect if user is logged in
    if (!user || !token) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    // Create socket connection
    const newSocket = io(SOCKET, {
      transports: ['websocket'],
      withCredentials: true,
    });

    setSocket(newSocket);

    // 🔑 Register user when connected
    newSocket.on('connect', () => {
      const userId = user._id || user.id;
      if (userId) {
        newSocket.emit('register', userId);
        console.log('✅ Connected and registered user ID:', userId);
      } else {
        console.log('❌ No user ID found in user object:', user);
      }
    });

    // 🔔 When a new friend is added
    newSocket.on('friends:added', data => {
      console.log('✅ Friend added event:', data);
      const friend = data.friend;
      setFriends(prev => {
        if (prev.find(f => f.id === friend.id)) return prev;
        return [...prev, friend];
      });
    });

    // 📩 When you receive a new friend request
    newSocket.on('friends:request:received', data => {
      console.log('📩 Friend request received:', data);
      const request = data.request;
      setRequests(prev => {
        if (prev.find(r => r._id === request._id)) return prev;
        return [...prev, request];
      });
    });

    // ✅ When a friend request is accepted
    newSocket.on('friends:request:accepted', data => {
      console.log('✅ Friend request accepted:', data);
      setRequests(prev => prev.filter(r => r._id !== data.requestId));
    });

    // ❌ When a friend is removed
    newSocket.on('friends:removed', data => {
      console.log('❌ Friend removed:', data);
      setFriends(prev => prev.filter(f => f.id !== data.friendId));
    });

    // ❌ When a friend request is rejected
    newSocket.on('friends:request:rejected', data => {
      console.log('❌ Request rejected:', data);
      setRequests(prev => prev.filter(r => r._id !== data.requestId));
    });

    // Handle connection errors
    newSocket.on('connect_error', error => {
      console.error('❌ Socket connection error:', error);
    });

    newSocket.on('disconnect', reason => {
      console.log('🔌 Socket disconnected:', reason);
    });

    // Cleanup function
    return () => {
      newSocket.off('connect');
      newSocket.off('friends:added');
      newSocket.off('friends:request:received');
      newSocket.off('friends:request:accepted');
      newSocket.off('friends:removed');
      newSocket.off('friends:request:rejected');
      newSocket.off('connect_error');
      newSocket.off('disconnect');
      newSocket.disconnect();
    };
  }, [user, token]); // Re-run when user or token changes

  return (
    <FriendsContext.Provider
      value={{
        friends,
        setFriends,
        requests,
        setRequests,
        friendsUpdated,
        notifyFriendsUpdate,
        socket,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
};

export const useFriendsContext = () => useContext(FriendsContext);
