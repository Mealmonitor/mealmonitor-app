import React, {useState} from 'react';

export interface AppState {
  isEmailVerified: boolean;
  updateState: (newState: Partial<AppState>) => void;
}

// Default application state
const defaultState: AppState = {
  isEmailVerified: false,
  updateState: (newState: Partial<AppState>) => {
    // Placeholder implementation or a console warning
    console.warn('updateState function is not implemented yet.');
  },
};

// Creating the Application state context for the provider
export const UserContext = React.createContext<AppState>(defaultState);

interface Props {
  children: React.ReactNode;
}

// The main context provider
export const UserContextProvider: React.FunctionComponent<Props> = ({
  children,
}) => {
  // Using react hooks, set the default state with proper type annotation
  const [state, setState] = useState<AppState>(defaultState);

  // Declare the update state method that will handle the state values
  const updateState = (newState: Partial<AppState>) => {
    setState(prevState => ({...prevState, ...newState}));
  };

  // Context wrapper that will provide the state values to all its children nodes
  return (
    <UserContext.Provider value={{...state, updateState}}>
      {children}
    </UserContext.Provider>
  );
};
