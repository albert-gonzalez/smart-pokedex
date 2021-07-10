import React, { useRef } from "react";
import { Animated, Easing, Image, StyleSheet, View } from "react-native";
import { commonStyles } from "../../styles/common";
import { colors } from "../../styles/variables";

export const Loading = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  const timing = Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    })
  );

  timing.start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={commonStyles.centeredView}>
      <Animated.Image
        style={[styles.icon, { transform: [{ rotate: spin }] }]}
        source={require("../../../assets/loading.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: colors.background,
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 64,
    height: 64,
  },
});
