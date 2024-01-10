import React, {useState} from 'react';
import {
  View,
  Animated,
  ImageBackground,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import SplashScreenLogo from '../../../assets/svg/SplashScreenLogo';

const image = require('../../../assets/splash.png');

const WelcomeScreen = () => {
  return (
    <>
      <View style={style.fullScreen}>
        <ImageBackground
          style={style.background}
          resizeMode="cover"
          source={image}>
          <View style={style.container2}>
            <Text style={style.welcomeText}>
              Your goal, your diet, our tracking
            </Text>
            <Text style={style.subText}>Balance your macros effortlessly!</Text>
          </View>
          <View style={style.buttonContainer}>
            <TouchableOpacity
              style={style.button}
              onPress={() => console.log('Login Pressed')}>
              <Text style={style.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.button}
              onPress={() => console.log('Register Pressed')}>
              <Text style={style.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 150,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  welcomeText: {
    color: '#B8D5CD',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 10, // Space above the subtext
  },
  subText: {
    color: '#B8D5CD',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 30, // Space above the buttons
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 16, // Instead of gap, we use padding
    paddingBottom: 80,
  },
  button: {
    width: 132,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#2E856E',
    marginHorizontal: 4, // This creates space between buttons
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
});

export default WelcomeScreen;
