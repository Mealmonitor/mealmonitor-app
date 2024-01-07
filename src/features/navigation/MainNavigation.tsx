import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import PublicTabs from './components/PublicTabs';
import BarcodeScreen from '../../app/screens/BarcodeScreen';
import AddGoal from '../goal/AddGoal';
import MyProfileScreen from '../../app/screens/MyProfileScreen';
import AddMetabolism from '../goal/AddMetabolism';
import NewProfilePage from '../goal/NewProfilePage';

export type PublicStackParamList = {
  Login: undefined;
  Barcode: undefined;
  Register: undefined;
  //   ConfirmEmail: {values: SignupProps | LoginValues};
  AGB: undefined;
  Datenschutzbestimmungen: undefined;
  Offers: undefined;
  //   'Angebote & Highlights': {offers: Offer[]};
  //   Angebot: {details: Offer};
  Achievements: undefined;
  Public: undefined;
  AddGoal: undefined;
  AddMetabolism: undefined;
  NewProfilePage: undefined;
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
        {/* <Stack.Screen name="Register" component={SignUpScreen} /> */}

        <Stack.Screen name="Public" component={PublicTabs} />
        <Stack.Screen name="Barcode" component={BarcodeScreen} />
        <Stack.Screen name="AddGoal" component={AddGoal} />
        <Stack.Screen name="AddMetabolism" component={AddMetabolism} />
        <Stack.Screen name="NewProfilePage" component={NewProfilePage} />

        {/* <Stack.Screen name="ConfirmEmail" component={EmailVerificationScreen} />

        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen
          name="AGB"
          component={AgbScreen}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: twFullConfig.theme,
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerBackImage: BackButton,
          }}
        />

        <Stack.Screen
          name="Datenschutzbestimmungen"
          component={PrivacyScreen}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: twFullConfig.theme,
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerBackImage: BackButton,
          }}
        /> */}
      </Stack.Navigator>
    </KeyboardAvoidingView>
  );
};

export default MainNavigation;
