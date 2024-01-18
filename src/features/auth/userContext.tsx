import React, {useState} from 'react';
import {Goal, Meal} from '../../app/api/domain';
import {getUserFirstName} from '../../app/api/publicApi';

export interface AppState {
  isEmailVerified: boolean;
  email: string | null;
  weight: number;
  goal: 'gainWeight' | 'loseWeight' | 'increaseMuscleMass' | null;
  metabolism: 'Slow' | 'Moderate' | 'Fast' | null;
  meals: Meal[];
  totalGoal: Goal;
  name: string;
  updateState: (newState: Partial<AppState>) => void;
}

// Default application state
const defaultState: AppState = {
  isEmailVerified: false,
  email: null,
  weight: 0,
  goal: null,
  metabolism: null,
  meals: [],
  totalGoal: null,
  name: null,
  updateState: (newState: Partial<AppState>) => {},
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
