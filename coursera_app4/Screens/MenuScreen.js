import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default function MenuScreen() {
  return (
    <View>
      <Tab1 />
      <Tab2 />
    </View>
  );
}
