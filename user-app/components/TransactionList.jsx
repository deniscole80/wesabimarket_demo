import React from 'react';
import {View, Text, FlatList} from 'react-native';
import Transaction from './Transaction';
import EmptyData from './EmptyData';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import appColor from '../utility/colors';

const TransactionList = ({fundList}) => {
    
    const renderItem = ({ item }) => (
        <Transaction item={item} />
    );

  return (
    <FlatList 
        data={fundList} 
        keyExtractor={transaction => transaction.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
            <View style={{alignItems: "center"}}>
              <EmptyData message="No transaction yet" style={{marginVertical: 160}} icon={<MaterialCommunityIcons name="timer-sand-empty" size={40} color={appColor.accent}/>} />       
            </View>
        }  
    />
  )
}

export default TransactionList