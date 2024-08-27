import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

type Props = {
  text: string;
};

export const Avatar = ({ text }: Props) => {
  return (
    <View style={styles.avatar}>
      <Text style={styles.text}>{text.charAt(0).toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 42,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d4d4d8",
  },
  text: {
    color: "#030712",
    textTransform: "uppercase",
    fontSize: 22,
    fontWeight: "600",
    fontFamily: Platform.select({
      ios: "Menlo",
      android: "monospace",
      default: "monospace",
    }),
  },
});
