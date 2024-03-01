import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "./routes";
import RegisterScreen from "../pages/Register";
import SplashScreen from "../pages/Splash";
import LoginScreen from "../pages/Login";
import Onboarding from "../pages/Onboarding";
import ChooseMarket from "../pages/ChooseMarket";
import MainPage from "../pages/MainPage";
import OrderDetails from "../pages/OrderDetails";
import ForgotPassword from "../pages/forgot_password/ForgotPassword";
import PaymentPage from "../pages/PaymentPage";
import OrderSummary from "../pages/OrderSummary";
import AddAddress from "../pages/AddAddress";
import ChooseAddress from "../pages/ChooseAddress";
import Cart from "../pages/Cart";

const Stack = createStackNavigator();
const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={routes.SPLASH}
      component={SplashScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.ONBOARDING}
      component={Onboarding}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.LOGIN}
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.REGISTER}
      component={RegisterScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.CHOOSEMARKET}
      component={ChooseMarket}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.MAINPAGE}
      component={MainPage}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.CART}
      component={Cart}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.ORDERDETAILS}
      component={OrderDetails}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.FORGOTPASSWORD}
      component={ForgotPassword}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.PAYMENTPAGE}
      component={PaymentPage}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.ORDERSUMMARY}
      component={OrderSummary}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.ADDADDRESS}
      component={AddAddress}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.CHOOSEADDRESS}
      component={ChooseAddress}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
export default AuthNavigator;
