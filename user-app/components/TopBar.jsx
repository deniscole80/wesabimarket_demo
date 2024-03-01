import React from 'react'
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import AppText from './AppText';
import {Feather, Entypo, FontAwesome} from '@expo/vector-icons';
import appColor from '../utility/colors';

const TopBar = ({hasBackButton, headerText, hasMenuBar, hasCart, market, openNavigation, goBack}) => {
    return (
    <>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            {hasMenuBar && <TouchableOpacity onPress={openNavigation}>
            <FontAwesome name="navicon" size={24} color={appColor.primary} />
            </TouchableOpacity>}
            {hasBackButton && <TouchableOpacity onPress={goBack}><Feather name='arrow-left' size={30} color={appColor.primary}/></TouchableOpacity>} 
            {headerText && <AppText text={headerText} style={{fontFamily: "ClarityCity-Bold"}}/>} 
            {hasCart && <TouchableOpacity onPress={hasCart.click} style={{flexDirection: 'row'}}>
                <Feather name='shopping-cart' size={20} color={appColor.secondary}/>
                <View style={styles.itemView}>
                    <AppText text={hasCart.itemLength.toString()} style={{fontSize: 12, textAlign: "center", fontFamily: "ClarityCity-Light"}}/>
                </View>
            </TouchableOpacity>}
        </View>
        {market && <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Entypo name="shop" size={15} color={appColor.primary} />
            <Text style={{fontFamily: 'ClarityCity-Light', fontSize: 10, paddingVertical: 5, marginLeft: 5}}>You are shopping in <Text style={{color: appColor.secondary}}>{market}</Text></Text>
        </View>}
    </>
  )
}

const styles = StyleSheet.create({
    image: {
        width: 60, 
        height: 45   
    },
    itemView: {
        borderWidth: 1,
        borderRadius: 200,
        padding: 3,
        height: 22,
        width: 22,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: appColor.secondary,
    },
});

export default TopBar