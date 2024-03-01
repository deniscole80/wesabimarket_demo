import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import CartItem from './CartItem';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EmptyData from './EmptyData';
import appColor from '../utility/colors';

const CartList = ({itemList, changeItemUnit, increaseItem, decreaseItem, removeCartItem}) => {    
    const renderItem = ({item}) => (
        <CartItem
            item={item}
            onIncreaseItem={() => increaseItem(item)}
            onDecreaseItem={() => decreaseItem(item)}
            onChangeItemUnit={changeItemUnit}
            removeCartItem={() => removeCartItem(item)}
        />
    );

    return (
        <FlatList
            data={itemList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            ListEmptyComponent={<EmptyData message="Cart is empty" icon={<MaterialCommunityIcons name="cart-off" size={24} color={appColor.secondary} style={{marginTop: 200}}/>} />}
            />
    )
}

const styles = StyleSheet.create({
});

export default CartList