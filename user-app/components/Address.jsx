import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import appColor from '../utility/colors'
import { MaterialIcons } from '@expo/vector-icons';

const Address = ({item, chosenAddress, pickAddress}) => {
    const {id, firstname, lastname, address, info, mobile1, mobile2} = item;
    // console.log("Inner inner address", firstname);
  return (
    <TouchableOpacity onPress={() => {pickAddress(id)}}>
        <View style={{borderWidth: 0.5, borderColor: appColor.primary, borderRadius: 10, padding: 10, marginTop: 10}}>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
                <Text style={{fontFamily: "ClarityCity-Bold"}}>{firstname} {lastname}</Text>
                {chosenAddress.id == id && <MaterialIcons name="check-box" size={24} color={appColor.secondary} />}
            </View>
            <Text style={{fontFamily: "ClarityCity-Regular", color: appColor.grey}}>{address}</Text>
            <Text style={{fontFamily: "ClarityCity-Light", color: appColor.secondary}}>{mobile1}{mobile2 && ","} {mobile2}</Text>
            {info && <Text style={{fontFamily: "ClarityCity-Regular", color: appColor.grey}}>{info}</Text>}
        </View>
    </TouchableOpacity>
  )
}

export default Address;