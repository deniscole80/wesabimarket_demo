import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import appColor from '../utility/colors';
import AppButton from './AppButton';
import routes from '../navigation/routes';
import Helper from '../utility/helper';

const Order = (props) => {
    const {item} = props;
    const {id, order_id, cart, status, createdAt } = item;
    const cartItems = cart.map((item) => item.name);
    return (
    <View style={styles.box}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View>
                <Text style={{fontFamily: 'ClarityCity-Light', fontSize: 12, color: appColor.grey}}>Order</Text>
                <Text style={{fontFamily: 'ClarityCity-Bold', fontSize: 15, color: appColor.grey}}>{order_id}</Text>
            </View>
            <View>
                <Text style={{fontFamily: 'ClarityCity-Light', fontSize: 12, color: appColor.grey}}>Status</Text>
                <Text style={{fontFamily: 'ClarityCity-Bold', fontSize: 15, color: appColor.grey}}>{status}</Text>
            </View>
        </View>
        <View style = {{marginVertical: 10}}><Text numberOfLines={2} style={{fontFamily: 'ClarityCity-Light', color: appColor.grey}}>Items: <Text style={{fontFamily: "ClarityCity-Bold"}}>[{cartItems.toString()}]</Text></Text></View>
        <View>
            <Text style={{fontFamily: 'ClarityCity-Light', fontSize: 12, color: appColor.grey}}>Created</Text>
            <Text style={{fontFamily: 'ClarityCity-Bold', fontSize: 15, color: appColor.grey}}>{Helper.convertDBDate2(createdAt)}</Text>
        </View>
        <View style={{paddingVertical: 5, alignItems: 'flex-end'}}>
            <AppButton label="Open" labelStyle={{color: appColor.mutedWhite}} style={{width: 100, borderRadius: 5}} onPress={() => {props.navigation.navigate(routes.ORDERDETAILS, {id})}}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    box: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: appColor.mutedWhite,
        borderRadius: 10
    }
});

export default Order