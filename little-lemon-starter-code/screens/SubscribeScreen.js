import * as React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Pressable,
} from "react-native";

import { validateEmail } from "../utils";

const logo = require("../assets/little-lemon-logo-grey.png");

const SubscribeScreen = () => {
  const [email, onChangeEmail] = React.useState("");
  isEmailValid = validateEmail(email);
  // Add subscribe screen code here
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image source={logo} style={styles.image} />
      <Text style={styles.text}>
        Subscribe to our newsletter for our latest delicious recipes!
      </Text>
      <TextInput
        style={styles.textInput}
        value={email}
        onChangeText={onChangeEmail}
        placeholder={"example@gmail.com"}
      />
      <Pressable
        style={isEmailValid ? styles.button : styles.buttonInactive}
        onPress={() => {
          Alert.alert("", "Thanks for the subscribing, stay tuned!");
        }}
      >
        <Text style={styles.buttonText}>
          {isEmailValid ? "Subscribe" : "Please provide valid email"}
        </Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 200, // specify dimensions for image, otherwise it covers 10x screens
    width: 200,
    resizeMode: "contain",
  },
  text: {
    fontSize: 24,
    margin: 20,
  },
  textInput: {
    borderWidth: 1,
    margin: 20,
    width: 200,
  },
  button: {
    backgroundColor: "#09471b",
    width: 300,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 80,
  },
  buttonInactive: {
    backgroundColor: "grey",
    width: 300,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 80,
  },
  buttonText: {
    color: "white",
    fontSize: 24,
  },
});

export default SubscribeScreen;
