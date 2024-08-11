import { Loader } from "lucide-react-native";
import { useEffect } from "react";
import { Animated, Easing } from "react-native";

export const Spinner = () => {
  const rotateAnimation = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={{
        transform: [{ rotate }],
      }}
    >
      <Loader width={24} color="#000" />
    </Animated.View>
  );
};
