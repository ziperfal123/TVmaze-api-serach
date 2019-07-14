import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  footerStyle: {
    height: Dimensions.get("window").height * 0.075,
    backgroundColor: "#E6E8EE"
  },
  textStyle: {
    fontSize: 20,
    top: 10,
    left: 20
  }
});

const Footer = () => {
  return (
    <View style={styles.footerStyle}>
      <Text style={styles.textStyle}>Made by: Yaniv Ziperfal</Text>
    </View>
  );
};

export default Footer;
