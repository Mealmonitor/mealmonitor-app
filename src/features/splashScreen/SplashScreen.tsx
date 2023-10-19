import React from "react";

import { View, Animated, ImageBackground, Text } from "react-native";

const SIZE_DURATION = 300;

const image = require("../../../assets/splash.png");

const SplashScreen = () => {
  const [fadeAnim] = React.useState(new Animated.Value(0));
  const [sizeAnim] = React.useState(new Animated.Value(1));
  const [isSizeAnimating, setIsSizeAnimating] = React.useState(false);

  React.useEffect(() => {
    if (!isSizeAnimating) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => {
          setIsSizeAnimating(true);
          Animated.parallel([
            Animated.timing(sizeAnim, {
              toValue: 5,
              duration: SIZE_DURATION,
              useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: SIZE_DURATION,
              useNativeDriver: true,
            }),
          ]).start();
        });
      });
    }
  }, [fadeAnim, isSizeAnimating, sizeAnim]);

  return (
    <View className="relative flex-1">
      <ImageBackground
        className="z-20 flex-1 justify-center"
        resizeMode="cover"
        source={image}
      >
        <View className="items-center justify-center w-full">
          <Animated.View
            style={{ opacity: fadeAnim, transform: [{ scale: sizeAnim }] }}
          >
            <Text>asdadasd</Text>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;
