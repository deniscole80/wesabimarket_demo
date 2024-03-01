import React from 'react';
import {View, StyleSheet} from 'react-native';
import appColor from '../utility/colors';
import { StatusBar } from 'expo-status-bar';

const Container = ({children}) => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" animated={true} backgroundColor={appColor.primary} />
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: appColor.background,
        paddingHorizontal: 10, 
        paddingBottom: 10,
        paddingTop: 50,
        // borderWidth: 2,
        // borderColor: "#cc0000"
    }
});

export default Container