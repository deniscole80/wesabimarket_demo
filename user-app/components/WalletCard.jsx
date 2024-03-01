import React from 'react'
import appColor from '../utility/colors';
import {View, Text} from 'react-native';
import AppButton from './AppButton';

const WalletCard = ({startFunding, balance, firstname}) => {
  return (
    <>
        <View style={{marginVertical: 10, width: '100%', padding: 10, backgroundColor: appColor.primary, borderRadius: 10}}>
            <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: 20,}}>
                <View>
                    <Text style={{color: appColor.mutedWhite, fontFamily: 'ClarityCity-Bold', fontSize: 18}}>Welcome,</Text>
                    <Text style={{color: appColor.secondary, fontFamily: 'ClarityCity-ExtraBold', fontSize: 22}}>{firstname}</Text>
                </View>
                <View>
                    <Text style={{color: appColor.grey, fontFamily: 'ClarityCity-Bold', fontSize: 12}}>Balance</Text>
                    <Text style={{color: appColor.mutedWhite, fontFamily: 'ClarityCity-Bold', fontSize: 20}}><Text style={{textDecorationLine: 'line-through'}}>N</Text> {balance}</Text>
                </View>
            </View>
            <View style={{marginTop: 10, justifyContent: 'flex-end', alignItems: 'center'}}>
                <AppButton onPress={startFunding} label="Fund Wallet" style={{alignSelf: 'center', padding: 15, backgroundColor: appColor.secondary}} labelStyle={{color: appColor.primary}} />
            </View>
        </View>
    </>
  )
}

export default WalletCard