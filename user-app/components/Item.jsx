import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AppText from './AppText';
import appColor from '../utility/colors';
import DropDown from './DropDown';

const Item = ({id, category, image: uri, available, name, prices, qtyInCart=0, onAddItem, onIncreaseItem, onDecreaseItem, priceIndex=0, onChangeItemUnit}) => {
    const units = prices.map((p, index) =>  ({label: p.unit, value: index}));
    // console.log("Price tags", prices[priceIndex]['unit'])
    return (
        
        <View style={styles.itemContainer}>            
            <Image style={styles.image} source={{uri}}/>
            <AppText text={name} style={{fontSize: 16, textAlign: 'center', fontFamily: 'ClarityCity-SemiBold'}}/> 
            <View style={{flexDirection: 'row'}}>
                <AppText text='N' style={{textDecorationLine: 'line-through', fontSize: 16, fontFamily: 'ClarityCity-ExtraBold'}}/>
                <AppText text={prices[priceIndex]['price'].toString()} style={{fontSize: 16, fontFamily: 'ClarityCity-ExtraBold'}}/>
            </View>
            <View style={{width: '100%' }}>
                <AppText text='Unit' style={{fontSize: 12, fontFamily: 'ClarityCity-Regular'}} />
                <DropDown
                    dropValue={prices[priceIndex]['unit']}
                    dropItems={units}
                    direction="TOP"
                    labelStyle={{
                        color: appColor.secondary,
                        fontSize: 10,
                        fontFamily: "ClarityCity-Medium",
                    }}
                    containerStyle={{
                        fontFamily: "ClarityCity-Medium",
                    }}
                    myStyle={{
                        borderRightWidth: 0,
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                        borderRadius: 0,
                        paddingVertical: 0,
                        borderLeftWidth: 0,
                        borderLeftColor: appColor.primary,
                        fontFamily: "ClarityCity-Medium",
                    }}
                    textStyle={{
                        color: appColor.secondary,
                        fontSize: 10,
                        fontFamily: "ClarityCity-Medium",
                        paddingHorizontal: 3,
                    }} 
                    onSelect={(value) => {onChangeItemUnit(id, value)}}               
                />
            </View>  
            {qtyInCart > 0 ? <View style={{...styles.subContainer, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={onDecreaseItem} style={{width: '30%', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontFamily: 'ClarityCity-Bold', fontSize: 20, color: appColor.primary}}>-</Text>
                    </TouchableOpacity>
                    <View style={{width: '40%', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontFamily: 'ClarityCity-Bold', fontSize: 15, color: appColor.primary}}>{qtyInCart}</Text>
                    </View>
                    <TouchableOpacity onPress={onIncreaseItem} style={{width: '30%', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontFamily: 'ClarityCity-Bold', fontSize: 20, color: appColor.primary}}>+</Text>
                    </TouchableOpacity>
                </View> :
                <TouchableOpacity style={styles.subContainer} onPress={onAddItem}>
                    <AppText text='Add' style={{fontSize: 16, fontWeight: '700' }}/>            
                </TouchableOpacity>}
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 200,
         resizeMode: 'contain',
    },
    itemContainer: {
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
        borderWidth: 1,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        width: '100%',
        alignItems: 'center',
        paddingVertical: 5,        
    },
});
export default Item;