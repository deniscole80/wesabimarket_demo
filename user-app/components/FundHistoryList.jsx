import React from 'react';
import {View, FlatList} from 'react-native';
import FundHistory from './FundHistory';
import EmptyData from './EmptyData';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import appColor from '../utility/colors';

const FundHistoryList = ({fundHistory}) => {
  console.log("Fund history from FundHistoryList", fundHistory);
    
    const renderItem = ({ item }) => (
        <FundHistory item={item} />
    );

  return (
    <FlatList 
        data={fundHistory} 
        keyExtractor={fund => fund.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
            <View style={{alignItems: "center"}}>
              <EmptyData message="Not funded your wallet yet" style={{marginVertical: 160}} icon={<MaterialCommunityIcons name="timer-sand-empty" size={40} color={appColor.accent}/>} />       
            </View>
        }  
    />
  )
}

export default FundHistoryList