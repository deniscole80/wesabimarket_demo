import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "./CustomDrawer";
import {
  MaterialCommunityIcons,
  Entypo,
  AntDesign,
  Feather
} from "@expo/vector-icons";
import appColor from "../utility/colors";
import MarketPlace from "../pages/MarketPlace";
import UserProfile from "../pages/UserProfile";
import Orders from "../pages/Orders";
import Help from "../pages/Help";
import routes from "./routes";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      useLegacyImplementation={true}
      drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName={routes.MARKETPLACE}
      screenOptions={{
        drawerStyle: {
          backgroundColor: appColor.primary,
          width: 240,
          paddingTop: 25,
        },
        drawerLabelStyle: {
          fontSize: 15,
          fontFamily: "ClarityCity-Regular",
        },
      }}
    >
      <Drawer.Screen
        name={routes.MARKETPLACE}
        component={MarketPlace}
        options={{
          title: "Market",
          headerShown: false,
          drawerIcon: ({ focused, color, size }) => (
            <Entypo name="shop" size={size} color={color} />
          ),
          drawerActiveTintColor: appColor.primary,
          drawerInactiveTintColor: "#F5F5F5",
          drawerActiveBackgroundColor: appColor.secondary,
        }}
      />

      <Drawer.Screen
        name={routes.PROFILE}
        component={UserProfile}
        options={{
          title: "Profile",
          headerShown: false,
          drawerIcon: ({ focused, color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
          drawerActiveTintColor: appColor.primary,
          drawerInactiveTintColor: "#F5F5F5",
          drawerActiveBackgroundColor: appColor.secondary,
        }}
      />

      <Drawer.Screen
        name={routes.ORDERS}
        component={Orders}
        options={{
          title: "Orders",
          headerShown: false,
          drawerIcon: ({ focused, color, size }) => (
            <Feather name="shopping-cart" size={size} color={color} />
          ),
          drawerActiveTintColor: appColor.primary,
          drawerInactiveTintColor: "#F5F5F5",
          drawerActiveBackgroundColor: appColor.secondary,
        }}
      />

      <Drawer.Screen
        name={routes.HELP}
        component={Help}
        options={{
          title: "Help",
          headerShown: false,
          drawerIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name="help-circle-outline" size={size} color={color} />
          ),
          drawerActiveTintColor: appColor.primary,
          drawerInactiveTintColor: "#F5F5F5",
          drawerActiveBackgroundColor: appColor.secondary,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;