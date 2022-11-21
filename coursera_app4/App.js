import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MenuScreen from "./Screens/MenuScreen";
import WelcomeScreen from "./Screens/WelcomeScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Tab.Navigator>
          <Tab.Screen name="tab1" component={Tab1} />
          <Tab.Screen name="tab2" component={Tab2} />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

function Tab1() {
  return (
    <View style={{ flex: 1 }}>
      <Text>Tab1</Text>
    </View>
  );
}

function Tab2() {
  return (
    <View style={{ flex: 1 }}>
      <Text>Tab2</Text>
    </View>
  );
}
