import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import TabNavContainer from "./Pages/TabNavContainer";
import Order from "./Pages/Order";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="login"
      component={Login}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="registration"
      component={Registration}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="tab"
      component={TabNavContainer}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="order"
      component={Order}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
