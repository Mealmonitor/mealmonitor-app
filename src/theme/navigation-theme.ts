import {DefaultTheme} from '@react-navigation/native';
import {appColors} from './colors';

export const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: appColors.brand[900],
  },
};

export const tabBarNavigationTheme = {
  iconSize: 31,
};
