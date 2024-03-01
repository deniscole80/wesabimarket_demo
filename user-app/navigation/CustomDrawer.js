import React from "react";
import { View, Text } from "react-native";
import {
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import appColor from "../utility/colors";

const CustomDrawer = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>

      <View
        style={{
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ color: appColor.accent }}>Version 1.0.0</Text>
      </View>
    </View>
  );
};

export default CustomDrawer;
