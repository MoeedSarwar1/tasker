import React, { createContext, useContext, useEffect, useState } from 'react';
import socket from '../network/Socket';

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
}

const FriendsContext = createContext<FriendsContextType>({
  friends: [],
  setFriends: () => {},
  requests: [],
  setRequests: () => {},
  friendsUpdated: 0,
  notifyFriendsUpdate: () => {},
});

export const FriendsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [friendsUpdated, setFriendsUpdated] = useState(0);

  const notifyFriendsUpdate = () => setFriendsUpdated(prev => prev + 1);

  useEffect(() => {
    // 🔔 When a new friend is added
    socket.on('friends:added', data => {
      console.log('✅ Friend added event:', data);
      const friend = data.friend;
      setFriends(prev => {
        if (prev.find(f => f.id === friend.id)) return prev;
        return [...prev, friend];
      });
    });

    // 📩 When you receive a new friend request
    socket.on('friends:request:received', data => {
      console.log('📩 Friend request received:', data);
      const request = data.request;
      setRequests(prev => {
        if (prev.find(r => r._id === request._id)) return prev;
        return [...prev, request];
      });
    });

    // ❌ When a friend is removed
    socket.on('friends:removed', data => {
      console.log('❌ Friend removed:', data);
      setFriends(prev => prev.filter(f => f.id !== data.friendId));
    });

    return () => {
      socket.off('friends:added');
      socket.off('friends:request:received');
      socket.off('friends:removed');
    };
  }, []);

  return (
    <FriendsContext.Provider
      value={{
        friends,
        setFriends,
        requests,
        setRequests,
        friendsUpdated,
        notifyFriendsUpdate,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
};

export const useFriendsContext = () => useContext(FriendsContext);
