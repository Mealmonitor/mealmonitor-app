import React from 'react';
import {createContext, useContext} from 'react';

interface UserContextType {}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UsersProviderProps {
  children: React.ReactNode;
  initialBundles?: [];
}

export const UsersProvider: React.FC<UsersProviderProps> = ({
  children,
  initialBundles,
}) => {
  const [user, setUser] = React.useState<User>();

  const contextValue: UserContextType = {};

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUsers = (): UserContextType => {
  const context = useContext(BundlesContext);
  if (!context) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
};
