import React from 'react';
import {View, Text} from 'react-native';
import appColor from '../utility/colors';
import Helper from '../utility/helper';

const HistoryFormat = ({item}) => {
    const {id, type, description, amount, via, ref, createdAt} = item;
    return (
        <View style={{paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: appColor.primary}}>
            <Text style={{fontSize: 18, color: appColor.primary, fontFamily: "ClarityCity-Bold"}}>{type}</Text>
            <Text style={{color: appColor.grey, fontFamily: "ClarityCity-Light"}}>{description} | <Text style={{textDecorationLine: 'line-through'}}>N</Text> {amount} | {via}</Text>
            {<Text style={{fontFamily: 'ClarityCity-Bold', color: appColor.grey}}>#{ref}</Text>}
            <Text style={{fontFamily: "ClarityCity-Medium", color: appColor.grey}}>Created: <Text style={{color: appColor.secondary}}>{Helper.convertDBDate(createdAt)}</Text></Text>
        </View>
    )
}

export default HistoryFormat