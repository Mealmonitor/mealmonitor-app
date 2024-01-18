import React, {useContext, useEffect} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import PublicTabs from './components/PublicTabs';
import BarcodeScreen from '../../app/screens/BarcodeScreen';
import AddGoal from '../goal/AddGoal';
import AddMetabolism from '../goal/AddMetabolism';

import AddMealScreen from '../addMeal/AddMealScreen';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {app} from '../../app/config/config';
import LoginScreen from '../../app/screens/LoginScreen';
import RegisterScreen from '../../app/screens/RegisterScreen';
import WelcomeScreen from '../../app/screens/WelcomeScreen';
import CheckEmailScreen from '../../app/screens/CheckEmailScreen';
import {UserContext} from '../auth/userContext';
import ForgotPasswordScreen from '../../app/screens/ForgotPasswordScreen';

export type PublicStackParamList = {
  Login: undefined;
  LoginRegister: undefined;
  Barcode: undefined;
  Register: undefined;
  Public: undefined;
  AddGoal: undefined;
  AddMetabolism: undefined;
  AddMeal: undefined;
  WelcomeScreen: undefined;
  CheckEmailScreen: undefined;
  ForgotPasswordScreen: undefined;
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

  const {isEmailVerified, updateState} = useContext(UserContext);

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
        {user && isEmailVerified ? (
          <>
            <Stack.Screen name="AddMeal" component={AddMealScreen} />
            <Stack.Screen name="Public" component={PublicTabs} />
            <Stack.Screen name="Barcode" component={BarcodeScreen} />
            <Stack.Screen name="AddGoal" component={AddGoal} />
            <Stack.Screen name="AddMetabolism" component={AddMetabolism} />
          </>
        ) : (
          <>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen
              name="CheckEmailScreen"
              component={CheckEmailScreen}
            />
            <Stack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </KeyboardAvoidingView>
  );
};

export default MainNavigation;
