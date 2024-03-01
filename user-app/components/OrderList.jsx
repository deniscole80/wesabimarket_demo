import React from 'react';
import {FlatList} from 'react-native';
import Order from './Order';
import EmptyData from './EmptyData';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import appColor from '../utility/colors';

const OrderList = (props) => {
    const {list} = props;
    console.log("Inner list>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", list)
    const renderItem = ({ item }) => (
        <Order
            item={item}
            navigation={props.navigation}
        />
    );

    return (
        <FlatList
            data={list}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            ListEmptyComponent={<EmptyData message="No order yet" icon={<MaterialCommunityIcons name="cart-off" size={24} color={appColor.secondary} style={{marginTop: 200}}/>} />}
            />
    )
}

export default OrderList