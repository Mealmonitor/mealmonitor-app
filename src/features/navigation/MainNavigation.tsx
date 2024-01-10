import React, {useEffect} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import PublicTabs from './components/PublicTabs';
import BarcodeScreen from '../../app/screens/BarcodeScreen';
import AddGoal from '../goal/AddGoal';
import AddMetabolism from '../goal/AddMetabolism';
import NewProfilePage from '../goal/NewProfilePage';

import AddMealScreen from '../addMeal/AddMealScreen';
import LoginComponent from '../../app/components/LoginComponent';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {app} from '../../app/config/config';
import LoginRegisterScreen from '../../app/screens/LoginRegisterScreen';
import WelcomeScreen from '../../app/screens/WelcomeScreen';

export type PublicStackParamList = {
  Login: undefined;
  LoginRegister: undefined;
  Barcode: undefined;
  Register: undefined;
  Public: undefined;
  AddGoal: undefined;
  AddMetabolism: undefined;
  NewProfilePage: undefined;
  AddMeal: undefined;
  WelcomeScreen: undefined;
};
const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

const Stack = createStackNavigator<PublicStackParamList>();

const MainNavigation = () => {
  const auth = getAuth(app);
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const onAuthStateChangedHandler = user => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, onAuthStateChangedHandler);

    return unsubscribe;
  }, []);
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      behavior={behavior}
      className="flex-1">
      <Stack.Navigator
        initialRouteName="Public"
        screenOptions={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTitleStyle: {
            color: 'white',
            fontSize: 20,
          },
        }}>
        {user ? (
          <>
            <Stack.Screen name="AddMeal" component={AddMealScreen} />
            <Stack.Screen name="Public" component={PublicTabs} />
            <Stack.Screen name="Barcode" component={BarcodeScreen} />
            <Stack.Screen name="AddGoal" component={AddGoal} />
            <Stack.Screen name="AddMetabolism" component={AddMetabolism} />
            <Stack.Screen name="NewProfilePage" component={NewProfilePage} />
          </>
        ) : (
          <>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen
              name="LoginRegister"
              component={LoginRegisterScreen}
            />
            <Stack.Screen name="Login" component={LoginComponent} />
          </>
        )}
      </Stack.Navigator>
    </KeyboardAvoidingView>
  );
};

export default MainNavigation;
