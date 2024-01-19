import React, {useState} from 'react';
import {Goal, Meal} from '../../app/api/domain';

export interface AppState {
  isEmailVerified: boolean;
  email: string | null;
  weight: number;
  meals: Meal[];
  totalGoal: Goal | null;
  name: string | null;
  date: Date;
  updateState: (newState: Partial<AppState>) => void;
}

// Default application state
const defaultState: AppState = {
  isEmailVerified: false,
  email: null,
  weight: 0,
  meals: [],
  totalGoal: null,
  name: null,
  updateState: (newState: Partial<AppState>) => {},
  date: new Date(),
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
