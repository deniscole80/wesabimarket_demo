import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import appColor from '../utility/colors';

const AppButton = ({style, labelStyle, label, icon=null, onPress}) => {
    return (
        <TouchableOpacity style={{...styles.buttonContainer, ...style}} onPress={onPress}> 
            {icon}<Text style={{...labelStyle, fontFamily: "ClarityCity-Bold", marginLeft: 5}}>{label}</Text>           
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 10,
        width: '80%',
        padding: 10,
        alignItems: 'center',
        backgroundColor: appColor.primary,
        flexDirection: "row",
        justifyContent: "center"
      } 
});

export default AppButton;