import * as React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

const logo = require("../assets/little-lemon-logo.png");

const WelcomeScreen = ({ navigation }) => {
  // Add welcome screen code here.
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <Text style={styles.text}>
        Little Lemon, your local Mediterranean Bistro
      </Text>
      <View style={styles.button}>
        <Pressable
          onPress={() => {
            navigation.navigate("SubscribeScreen");
          }}
        >
          <Text style={styles.buttonText}>Newsletter</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", // horizontal alignment
    justifyContent: "center",
  },
  image: {
    height: 300, // specify dimensions for image, otherwise it covers 10x screens
    width: 300,
    resizeMode: "contain",
  },
  text: {
    fontSize: 24,
  },
  button: {
    backgroundColor: "#09471b",
    width: 300,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 80,
    //marginTop: "auto",
  },
  buttonText: {
    color: "white",
    fontSize: 24,
  },
});

export default WelcomeScreen;
