import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AppText from './AppText';
import appColor from '../utility/colors';

function MarketList({image: uri, name, onPress}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.marketContainer} >
            <Image style={styles.image} source={{uri}}/>
            <View style={styles.subContainer}>
            <AppText text={name} style={{fontSize: 14, fontFamily: 'ClarityCity-Medium', textAlign: 'center'}}/>            
            </View>   
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    marketContainer: {
        borderColor: appColor.secondary,
        borderWidth: 1,
        borderRadius: 10,
        overflow: 'hidden',
        width: '45%',
        alignItems: 'center',
        marginLeft: 10,
        marginBottom: 15
    },
    subContainer: {
        borderColor: appColor.secondary,
        borderTopWidth: 1,
        width: '100%',
        alignItems: 'center',
        padding: 10,        
    },
    image: {
        height: 100,
        width: 200,
         resizeMode: 'contain',
    }
});
export default MarketList;