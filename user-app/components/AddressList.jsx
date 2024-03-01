import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EmptyData from './EmptyData';
import appColor from '../utility/colors';
import Address from './Address';

const AddressList = ({addresses, chosenAddress, pickAddress}) => {
    // console.log("Inner addresses", chosenAddress)  
    const renderItem = ({item}) => (
        <Address
            item={item}
            chosenAddress={chosenAddress}
            pickAddress={pickAddress}
        />
    );

    return (
        <FlatList
            data={addresses}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            ListEmptyComponent={<EmptyData message="No delivery address yet" icon={<MaterialCommunityIcons name="timer-sand-empty" size={24} color={appColor.secondary} style={{marginTop: 200}}/>} />}
            />
    )
}

const styles = StyleSheet.create({
});

export default AddressList