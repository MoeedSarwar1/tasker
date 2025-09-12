import React, { createContext, useContext, useState } from 'react';

interface FriendsContextType {
  friendsUpdated: number;
  notifyFriendsUpdate: () => void;
}

const FriendsContext = createContext<FriendsContextType>({
  friendsUpdated: 0,
  notifyFriendsUpdate: () => {},
});

export const FriendsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [friendsUpdated, setFriendsUpdated] = useState(0);

  const notifyFriendsUpdate = () => setFriendsUpdated(prev => prev + 1);

  return (
    <FriendsContext.Provider value={{ friendsUpdated, notifyFriendsUpdate }}>
      {children}
    </FriendsContext.Provider>
  );
};

export const useFriendsContext = () => useContext(FriendsContext);
