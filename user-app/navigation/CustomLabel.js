import React from "react";
import { View, Text, Badge } from "react-native";

export default CustomLabel = ({ notifications, label, focused }) => {
  // console.log("Focused value", focused);
  return label ? (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontFamily: "ClarityCity-Regular",
          color: !focused ? "#f5f5f5" : "#3A4D8F",
        }}
      >
        {label}
      </Text>
      {notifications > 0 && (
        <View
          style={{
            backgroundColor: "#EA6987",
            paddingHorizontal: 8,
            paddingVertical: 4,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100,
          }}
        >
          <Text
            style={{
              fontFamily: "ClarityCity-Bold",
              color: "#f5f5f5",
              fontSize: 10,
            }}
          >
            {notifications}
          </Text>
        </View>
      )}
    </View>
  ) : (
    <View
      style={{
        backgroundColor: "#EA6987",
        paddingHorizontal: 4,
        paddingVertical: 4,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
      }}
    ></View>
  );
};
