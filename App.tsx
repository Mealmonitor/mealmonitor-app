import React from 'react';
import {withExpoSnack} from 'nativewind';

import {StyleSheet} from 'react-native';

import RequireSplashScreen from './src/features/splashScreen/RequireSplashScreen';
import MainNavigation from './src/features/navigation/MainNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {navigationTheme} from './src/theme/navigation-theme';
import {Provider} from 'react-redux';
import {store} from './src/app/store/store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <RequireSplashScreen>
        <NavigationContainer theme={navigationTheme}>
          <MainNavigation />
        </NavigationContainer>
      </RequireSplashScreen>
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default withExpoSnack(App);
