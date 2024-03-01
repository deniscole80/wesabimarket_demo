import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import AuthNavigator from "./navigation/AuthNavigator";
import { useFonts } from "expo-font";
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

export default function App() {
  const store = configureStore();

  const [fontsLoaded] = useFonts({
    "ClarityCity-Black": require("./assets/fonts/ClarityCity-Black.ttf"),
    "ClarityCity-BlackItalic": require("./assets/fonts/ClarityCity-BlackItalic.ttf"),
    "ClarityCity-Bold": require("./assets/fonts/ClarityCity-Bold.ttf"),
    "ClarityCity-BoldItalic": require("./assets/fonts/ClarityCity-BoldItalic.ttf"),
    "ClarityCity-ExtraBold": require("./assets/fonts/ClarityCity-ExtraBold.ttf"),
    "ClarityCity-ExtraBoldItalic": require("./assets/fonts/ClarityCity-ExtraBoldItalic.ttf"),
    "ClarityCity-ExtraLight": require("./assets/fonts/ClarityCity-ExtraLight.ttf"),
    "ClarityCity-ExtraLightItalic": require("./assets/fonts/ClarityCity-ExtraLightItalic.ttf"),
    "ClarityCity-Light": require("./assets/fonts/ClarityCity-Light.ttf"),
    "ClarityCity-LightItalic": require("./assets/fonts/ClarityCity-LightItalic.ttf"),
    "ClarityCity-Medium": require("./assets/fonts/ClarityCity-Medium.ttf"),
    "ClarityCity-MediumItalic": require("./assets/fonts/ClarityCity-MediumItalic.ttf"),
    "ClarityCity-Regular": require("./assets/fonts/ClarityCity-Regular.ttf"),
    "ClarityCity-RegularItalic": require("./assets/fonts/ClarityCity-RegularItalic.ttf"),
    "ClarityCity-SemiBold": require("./assets/fonts/ClarityCity-SemiBold.ttf"),
    "ClarityCity-SemiBoldItalic": require("./assets/fonts/ClarityCity-SemiBoldItalic.ttf"),
    "ClarityCity-Thin": require("./assets/fonts/ClarityCity-Thin.ttf"),
    "ClarityCity-ThinItalic": require("./assets/fonts/ClarityCity-ThinItalic.ttf"),
  });

  if(!fontsLoaded){
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </Provider>
  );
}
