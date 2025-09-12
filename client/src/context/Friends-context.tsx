import React, { createContext, useContext, useEffect, useState } from 'react';
import socket from '../network/Socket';

interface Friend {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
}

interface FriendsContextType {
  friends: Friend[];
  setFriends: React.Dispatch<React.SetStateAction<Friend[]>>;
  requests: Friend[];
  setRequests: React.Dispatch<React.SetStateAction<Friend[]>>;
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
  const [requests, setRequests] = useState<Friend[]>([]);
  const [friendsUpdated, setFriendsUpdated] = useState(0);

  const notifyFriendsUpdate = () => setFriendsUpdated(prev => prev + 1);

  useEffect(() => {
    socket.on('friends:added', data => {
      console.log('✅ Friend added event:', data);
      setFriendsUpdated(prev => prev + 1);
    });

    return () => {
      socket.off('friends:added');
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
