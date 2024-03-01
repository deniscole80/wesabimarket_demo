import React from "react";
import { Text, StyleSheet } from "react-native";
import appColor from "../utility/colors";

const AppText = ({ text, style }) => {
  return (
      <Text style={{ ...styles.textStyle, ...style }}>{text}</Text>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    color: appColor.primary,
    fontSize: 20,
  },
});

export default AppText;
