import React from 'react';
import Modal from 'react-native-modal';
import {View, Text, TouchableOpacity, Image, Linking, Platform} from 'react-native';
import appColor from '../utility/colors';
import AppButton from './AppButton';
import { MaterialCommunityIcons, MaterialIcons, Entypo } from '@expo/vector-icons';
import { Fold } from 'react-native-animated-spinkit'

const MatchingBottomSheet = (props) => {
  console.log("Matched Agent", props.matchedAgent);
  
  const callAgent = (mobile) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${mobile}`;
    }
    else {
      phoneNumber = `telprompt:${mobile}`;
    }
    Linking.openURL(phoneNumber);
  }
  return (
    <Modal
        style={{ padding: 0, margin: 0, width: "100%" }}
        isVisible={props.showModal}
        hasBackdrop={false}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        >
        <View
            style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            }}
        >
          {props.matched ? 
              <View style={{
                alignItems: "flex-start",
                backgroundColor: appColor.background,
                padding: 20,
                borderTopWidth: 4,
                flex: 1,
                flexDirection: "column",
                borderTopColor: appColor.primary,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20
              }}>
                <TouchableOpacity onPress={props.toggleModal} style={{width: "100%", alignItems: "flex-end"}}><MaterialCommunityIcons name="close" size={24} color="black" /></TouchableOpacity>
                <Text style={{fontFamily: "ClarityCity-Bold", fontSize: 20}}>Matched</Text>
                <Text style={{fontFamily: "ClarityCity-Regular", fontSize: 13, color: appColor.grey}}>Your order has now been matched with an agent. 🤩</Text>

                <View style={{flex: 1, width: "100%", justifyContent: "center", alignItems: "center"}}>
                  <View style={{borderWidth: 1, borderColor: appColor.primary, borderRadius: 20}}>
                    <Image style={{height: 200, width: 200, resizeMode: 'contain', borderRadius: 20 }} source={{uri: props.matchedAgent.img}}/>
                  </View>
                  <Text style={{fontFamily: "ClarityCity-Bold", marginTop: 20, fontSize: 20}}>{props.matchedAgent.last_name} {props.matchedAgent.first_name}</Text>
                  <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <MaterialIcons name="delivery-dining" size={32} color={appColor.secondary} />
                    <Text style={{fontFamily: "ClarityCity-Regular", marginLeft: 10, fontSize: 18}}>100+ Successful Errands</Text>
                  </View>
                  <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <Entypo name="phone" size={24} color={appColor.secondary} />
                    <Text style={{fontFamily: "ClarityCity-Regular", marginLeft: 10, fontSize: 18}}>{props.matchedAgent.mobile}</Text>
                  </View>
                  <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 20}}>
                    <AppButton label='Call Agent' style={{marginHorizontal: 5, padding: 15, width: "40%", backgroundColor: appColor.secondary}} labelStyle={{color: appColor.background}} onPress={() => {callAgent(props.matchedAgent.mobile)}}/>
                    <AppButton label='Proceed' style={{marginHorizontal: 5, padding: 15, width: "40%"}} labelStyle={{color: appColor.background}} onPress={props.proceedToOrder}/>
                  </View>
                </View>
              </View> : <View
              style={{
                alignItems: "flex-start",
                backgroundColor: appColor.background,
                padding: 20,
                borderTopWidth: 4,
                flex: 1,
                flexDirection: "column",
                borderTopColor: appColor.primary,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20
              }}
            >
              <TouchableOpacity onPress={props.toggleModal} style={{width: "100%", alignItems: "flex-end"}}><MaterialCommunityIcons name="close" size={24} color="black" /></TouchableOpacity>
              <Text style={{fontFamily: "ClarityCity-Bold", fontSize: 20}}>Connecting to an agent</Text>
              <View style={{flex: 1, width: "100%", justifyContent: "center", alignItems: "center"}}>
                  <Fold size={48} color={appColor.primary} />
                  <Text style={{fontFamily: "ClarityCity-Bold", fontSize: 12, marginTop: 20}}>Please wait</Text>
              </View>
          </View>}   
        </View>
    </Modal>
  )
}

export default MatchingBottomSheet;