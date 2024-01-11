import React from 'react';
import {withExpoSnack} from 'nativewind';

import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';

import RequireSplashScreen from './src/features/splashScreen/RequireSplashScreen';
import MainNavigation from './src/features/navigation/MainNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {navigationTheme} from './src/theme/navigation-theme';
import {Provider} from 'react-redux';
import {store} from './src/app/store/store';
import {UserContextProvider} from './src/features/auth/userContext';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <RequireSplashScreen>
        <UserContextProvider>
          <NavigationContainer theme={navigationTheme}>
            <MainNavigation />
          </NavigationContainer>
        </UserContextProvider>
      </RequireSplashScreen>
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default withExpoSnack(App);
