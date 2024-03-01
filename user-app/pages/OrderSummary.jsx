import React from 'react'
import Container from '../components/Container'
import Main from '../components/Main'
import { View, Text, TouchableOpacity } from 'react-native'
import appColor from '../utility/colors'
import useProducts from '../customHooks/useProducts'
import TopBar from '../components/TopBar'
import { Ionicons } from '@expo/vector-icons';
import AppButton from '../components/AppButton'
import routes from '../navigation/routes'
import useCart from '../customHooks/useCart'
import useAuth from '../customHooks/useAuth'
import MatchingBottomSheet from '../components/MatchingBottomSheet'

const OrderSummary = (props) => {
    const {chosenMarket} = useProducts({...props, owner: false});
    const {totalAmount, deliveryFee, agentFee, cartList} = useCart({...props, owner: false});
    const {chosenAddress, matchingModal, matched, confirmOrder, switchMatchingModal, matchedAgent, proceedToOrder} = useAuth({...props, owner: true});
    const overallTotal = totalAmount + deliveryFee + (Math.ceil((agentFee/100) * totalAmount));
    return (
    <Container>
        <TopBar hasBackButton={true} headerText={"Order Summary"} market={chosenMarket && chosenMarket.name} goBack={() => props.navigation.goBack()} />
        <Main>
            <View style={{marginTop: 20, borderRadius: 10, borderWidth: 1, borderColor: appColor.primary}}>
                <View style={{backgroundColor: appColor.primary, padding: 10, borderRadius: 8}}>
                    <Text style={{ color: appColor.mutedWhite, fontFamily: "ClarityCity-Bold"}}>Order Summary</Text>
                </View>
                <View style={{flexDirection: "row", paddingHorizontal: 10, paddingVertical: 5, justifyContent: "space-between"}}>
                    <Text style={{fontFamily: "ClarityCity-Regular"}}>Item's Total({cartList.length})</Text>
                    <Text style={{fontFamily: "ClarityCity-Bold"}}><Text style={{textDecorationLine: 'line-through'}}>N</Text> {totalAmount}</Text>
                </View>
                <View style={{flexDirection: "row", paddingHorizontal: 10, paddingVertical: 5, justifyContent: "space-between"}}>
                    <Text style={{fontFamily: "ClarityCity-Regular"}}>Delivery Fees</Text>
                    <Text style={{fontFamily: "ClarityCity-Bold"}}><Text style={{textDecorationLine: 'line-through'}}>N</Text> {deliveryFee}</Text>
                </View>
                <View style={{flexDirection: "row", paddingHorizontal: 10, paddingVertical: 5, justifyContent: "space-between"}}>
                    <Text style={{fontFamily: "ClarityCity-Regular"}}>Agent Fees</Text>
                    <Text style={{fontFamily: "ClarityCity-Bold"}}><Text style={{textDecorationLine: 'line-through'}}>N</Text> {Math.ceil((agentFee/100) * totalAmount)}</Text>
                </View>
                <View style={{borderTopWidth: 0.5, borderTopColor: appColor.grey}}></View>
                <View style={{flexDirection: "row", padding: 10, justifyContent: "space-between"}}>
                    <Text style={{fontFamily: "ClarityCity-Bold"}}>Total</Text>
                    <Text style={{fontFamily: "ClarityCity-ExtraBold", fontSize: 16}}><Text style={{textDecorationLine: 'line-through'}}>N</Text> {totalAmount + deliveryFee + (Math.ceil((agentFee/100) * totalAmount))}</Text>
                </View>
            </View>

            <View style={{marginTop: 20, borderRadius: 10, borderWidth: 1, borderColor: appColor.primary}}>
                <View style={{flexDirection: "row", justifyContent: "space-between", backgroundColor: appColor.primary, padding: 10, borderRadius: 8}}>
                    <Text style={{ color: appColor.mutedWhite, fontFamily: "ClarityCity-Bold"}}>Payment Method</Text>
                    <TouchableOpacity>
                        <Text style={{color: appColor.secondary}}>CHANGE</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: "row", alignItems: "center", paddingHorizontal: 10}}>
                    <Ionicons name="md-wallet" size={24} color={appColor.secondary} />
                    <Text style={{fontFamily: "ClarityCity-ExtraBold"}}>Pay with your Sabi Wallet</Text>
                </View>
                <Text style={{fontFamily: "ClarityCity-Light", paddingHorizontal: 10}}>You will be charged from your in app wallet. Make sure your wallet balance is up to the total amount.</Text>
            </View>

            {chosenAddress ? <View style={{marginTop: 20, borderRadius: 10, borderWidth: 1, borderColor: appColor.primary}}>
                <View style={{flexDirection: "row", justifyContent: "space-between", backgroundColor: appColor.primary, padding: 10, borderRadius: 8}}>
                    <Text style={{ color: appColor.mutedWhite, fontFamily: "ClarityCity-Bold"}}>Delivery Address</Text>
                    <TouchableOpacity onPress={() => {props.navigation.navigate(routes.CHOOSEADDRESS)}}>
                        <Text style={{color: appColor.secondary}}>CHANGE</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{padding: 5, fontFamily: "ClarityCity-Bold"}}>{chosenAddress.firstname} {chosenAddress.lastname}</Text>
                <Text style={{padding: 5, fontFamily: "ClarityCity-Regular", color: appColor.grey}}>{chosenAddress.address}</Text>
                <Text style={{padding: 5, fontFamily: "ClarityCity-Light", color: appColor.secondary}}>{chosenAddress.mobile1}{chosenAddress.mobile2 && ","} {chosenAddress.mobile2}</Text>
                {chosenAddress.info && <Text style={{padding: 5, fontFamily: "ClarityCity-Regular", color: appColor.grey}}>{chosenAddress.info}</Text>}
            </View> : <View style={{marginTop: 20, borderRadius: 10, borderWidth: 1, borderColor: appColor.primary}}>
                <View style={{flexDirection: "row", justifyContent: "space-between", backgroundColor: appColor.primary, padding: 10, borderRadius: 8}}>
                    <Text style={{ color: appColor.mutedWhite, fontFamily: "ClarityCity-Bold"}}>Delivery Address</Text>
                    <TouchableOpacity onPress={() => {props.navigation.navigate(routes.CHOOSEADDRESS)}}>
                        <Text style={{color: appColor.secondary}}>CHANGE</Text>
                    </TouchableOpacity>
                </View>
            </View>}

            <View style={{flex: 1, justifyContent: "flex-end"}}>
                <AppButton label='Continue Shopping' style={{alignSelf: 'center', padding: 15, width: "100%", backgroundColor: appColor.secondary}} labelStyle={{color: appColor.background}} onPress={() => {props.navigation.navigate(routes.MARKETPLACE)}}/>
                <AppButton label='Confirm Order' style={{marginTop: 10, alignSelf: 'center', padding: 15, width: "100%"}} labelStyle={{color: appColor.background}} onPress={() => confirmOrder(overallTotal)}/>
                <MatchingBottomSheet {...props} showModal={matchingModal} toggleModal={switchMatchingModal} matched={matched} matchedAgent={matchedAgent} proceedToOrder={proceedToOrder} />
            </View>
        </Main>
    </Container>
  )
}

export default OrderSummary