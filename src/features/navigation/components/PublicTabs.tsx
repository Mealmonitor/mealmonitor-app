/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  View,
  Animated,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TabBar from './TabBar/TabBar';
import DashboardScreen from '../../../app/screens/DashboardScreen';
import MyProfileScreen from '../../../app/screens/MyProfileScreen';
import SplashScreenLogo from '../../../../assets/svg/SplashScreenLogo';
import AddMealScreen from '../../../app/screens/AddMealScreen';
import ArrowBack from '../../../../assets/svg/ArrowBack';
import DashboardIcon from '../../../../assets/svg/DashboardIcon';
import AddMealIcon from '../../../../assets/svg/AddMealIcon';
import MyProfileIcon from '../../../../assets/svg/MyProfileIcon';

type MainNavigationParamList = {
  Dashboard: undefined;
  AddMeal: undefined;
  MyProfile: undefined;
};

const Tab = createMaterialTopTabNavigator<MainNavigationParamList>();

const PublicTabs = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      initialRouteName="Dashboard"
      tabBar={TabBar}
      screenOptions={{
        swipeEnabled: true,
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: () => <DashboardIcon color="#2E856E" size={31} />,
        }}
      />

      <Tab.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{
          tabBarIcon: ({color}: {color: string}) => (
            <MyProfileIcon color="#2E856E" size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
  heartsAnimation: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: -1,
  },
  icon: {
    top: -10,
  },
  container: {
    flexGrow: 1,
    overflow: 'hidden',
  },
  modal: {
    flex: 1,
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 40,
    elevation: 5,
  },

  closeIcon: {position: 'absolute', right: 5},
});

export default PublicTabs;
