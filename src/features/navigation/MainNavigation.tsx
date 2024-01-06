import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import PublicTabs from './components/PublicTabs';
import BarcodeScreen from '../../app/screens/BarcodeScreen';
import AddMealScreen from '../addMeal/AddMealScreen';

export type PublicStackParamList = {
  Login: undefined;
  Barcode: undefined;
  Register: undefined;
  AGB: undefined;
  Datenschutzbestimmungen: undefined;
  Offers: undefined;
  Achievements: undefined;
  Public: undefined;
  AddMeal: undefined;
};
const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

const Stack = createStackNavigator<PublicStackParamList>();

const MainNavigation = () => {
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
        <Stack.Screen name="AddMeal" component={AddMealScreen} />
        <Stack.Screen name="Public" component={PublicTabs} />
        <Stack.Screen name="Barcode" component={BarcodeScreen} />
      </Stack.Navigator>
    </KeyboardAvoidingView>
  );
};

export default MainNavigation;
