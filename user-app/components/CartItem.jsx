import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import appColor from '../utility/colors';
import AppText from './AppText';
import { Octicons, AntDesign } from '@expo/vector-icons';
import DropDown from './DropDown';

function CartItem({item, onIncreaseItem, onDecreaseItem, onChangeItemUnit, removeCartItem}) {
    const {id, image: uri, name, prices, price_index, qtyInCart} = item;
    const units = prices.map((p, index) => ({label: p.unit, value: index}));
    return (
        <View style={styles.itemContainer}>
            <View style={{flexDirection: 'row'}}>
                <Image style={styles.image} source={{uri}}/>
                <View style={{marginHorizontal: 10, flex: 1}}>
                    <AppText text={name} style={{fontSize: 15, fontFamily: 'ClarityCity-SemiBold'}}/>
                    <Text style={{marginTop: 10, fontFamily: 'ClarityCity-ExtraBold', fontSize: 15, color: appColor.secondary}}><Text style={{textDecorationLine: 'line-through'}}>N</Text> {prices[price_index]['price']}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <View>
                            <Text style={{fontFamily: 'ClarityCity-ExtraLight'}}>Unit</Text>
                            <View style={{backgroundColor: appColor.primary, padding: 3, borderRadius: 5}}><Text style={{fontSize: 10, color: appColor.mutedWhite, fontFamily: 'ClarityCity-ExtraLight'}}>{prices[price_index]['unit']}</Text></View>
                        </View>
                        <View>
                            <AppText text='Change Unit' style={{fontSize: 10, fontFamily: 'ClarityCity-ExtraLight'}} />
                            <DropDown
                                dropValue={prices[price_index]['unit']}
                                dropItems={units}
                                direction="TOP"
                                labelStyle={{
                                    color: appColor.secondary,
                                    fontSize: 10,
                                    fontFamily: "ClarityCity-Medium",
                                }}
                                containerStyle={{
                                    fontFamily: "ClarityCity-Medium",
                                    padding: 0,
                                }}
                                myStyle={{
                                    fontFamily: "ClarityCity-Medium",
                                    width: 100,
                                    borderLeftWidth: 0,
                                    borderRightWidth: 0,
                                    borderBottomWidth: 0,
                                    borderTopWidth: 0
                                }}
                                textStyle={{
                                    color: appColor.secondary,
                                    fontSize: 10,
                                    fontFamily: "ClarityCity-Medium",
                                }} 
                                onSelect={(value) => {onChangeItemUnit(id, value)}}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.subContainer} >
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={removeCartItem}>
                    <Octicons name='trash' size={18} color={appColor.red}/>
                    <AppText text='Remove' style={{fontFamily: 'ClarityCity-Regular', fontSize: 14, color: appColor.red, marginLeft: 5 }}/>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity onPress={onDecreaseItem}>
                        <AntDesign name='minussquareo' size={26} color={appColor.secondary}/>
                    </TouchableOpacity>
                    <AppText text={qtyInCart.toString()} style={{fontFamily: 'ClarityCity-Bold', fontSize: 15, marginHorizontal: 20}}/>
                    <TouchableOpacity onPress={onIncreaseItem}>
                        <AntDesign name='plussquareo' size={26} color={appColor.secondary}/>
                    </TouchableOpacity>
                </View>            
            </View> 
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        borderWidth: 1,
        borderColor: appColor.primary,
        borderRadius: 10,
        marginBottom: 25,
        paddingVertical: 10
    },
    image: {
        width: 100,
        height: 80,
        marginLeft: 5,
        marginBottom: 5        
    },
    subContainer: {
        borderColor: appColor.primary,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingTop: 5
    },
});
export default CartItem;