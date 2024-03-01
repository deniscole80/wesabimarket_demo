import React, { useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import routes from "../navigation/routes";
import frontStorage from "../utility/storage";

const SplashScreen = ({ navigation }) => {
  
  useEffect(() => {
    setTimeout(() => {
      nextScreen();
    }, 3000);
  }, []);

  const nextScreen = async () => {
    await getData();
    (await getData())
      ? navigation.navigate(routes.MAINPAGE)
      : navigation.navigate(routes.ONBOARDING);
  };

  const getData = async () => {
    const getData = await frontStorage.asyncGet("userData");
    let userData = getData && JSON.parse(getData);
    // console.log(userData);
    if (userData && userData.onboarded) {
      return true;
    }
    return false;
  };

  return (
    <View style={styles.container}>
      <Image style={{height: 100, width: 100}} source={require("../assets/icon.png")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});

export default SplashScreen;
