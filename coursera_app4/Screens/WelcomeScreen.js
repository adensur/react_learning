import { Text, View, Pressable } from "react-native";

export default function WelcomeScreen({ navigation }) {
  return (
    <View>
      <Text>Welcome!</Text>
      <Pressable
        onPress={() => {
          navigation.navigate("Menu");
        }}
      >
        <Text>Go to menu</Text>
      </Pressable>
    </View>
  );
}
