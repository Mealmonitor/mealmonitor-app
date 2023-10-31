import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';

import {tabBarStyle} from './TabBarStyles';
import {useSelector} from 'react-redux';
import {twFullConfig} from '../../../../utils/tailwindConfig';
import DashboardScreen from '../../../../app/screens/DashboardScreen';
import AddMealModal from '../../../addMeal/addMealModal';
import SplashScreenLogo from '../../../../../assets/svg/SplashScreenLogo';
// import { RootState } from "../../../store/store";
// import { twFullConfig } from "../../../../utils/tailwind/tailwindConfig";
// import QRCodeModal from "../../../../features/qrCode/QRCodeModal";

const TabBar = ({state, descriptors, navigation}: MaterialTopTabBarProps) => {
  console.log(state.routes);
  return (
    <View style={tabBarStyle.tabBar}>
      {state.routes.map((route, index: number) => {
        const {options} = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        if (index === 1) {
          return (
            <React.Fragment key="key">
              <TouchableOpacity
                hitSlop={{top: 5, bottom: 20, left: 20, right: 20}}
                key={index}
                activeOpacity={1}
                accessibilityRole="button"
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={tabBarStyle.iconBorderInactive}>
                <View className="-top-4">
                  {options.tabBarIcon &&
                    options.tabBarIcon({
                      color: twFullConfig.theme.colors.brombeer,
                      focused: isFocused,
                    })}
                </View>
              </TouchableOpacity>
            </React.Fragment>
          );
        } else {
          return (
            <View key={index} className="w-8">
              <TouchableOpacity
                hitSlop={{top: 5, bottom: 20, left: 20, right: 20}}
                activeOpacity={1}
                accessibilityRole="button"
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={
                  isFocused
                    ? tabBarStyle.iconBorderActive
                    : tabBarStyle.iconBorderInactive
                }>
                {options.tabBarIcon &&
                  options.tabBarIcon({
                    color: isFocused
                      ? twFullConfig.theme.colors.brombeer
                      : twFullConfig.theme.colors.schwartz,
                    focused: isFocused,
                  })}
              </TouchableOpacity>
            </View>
          );
        }
      })}
    </View>
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
export default TabBar;