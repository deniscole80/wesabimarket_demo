import React from 'react'
import { View } from 'react-native'
import Container from '../components/Container'
import Main from '../components/Main'
import TopBar from '../components/TopBar'
import useProducts from '../customHooks/useProducts'
import useAuth from '../customHooks/useAuth'
import AddressList from '../components/AddressList'
import AppButton from '../components/AppButton'
import appColor from '../utility/colors'
import routes from '../navigation/routes'

const ChooseAddress = (props) => {
    const {chosenMarket} = useProducts({...props, owner: false});
    const {deliveryAddress, chosenAddress, pickAddress} = useAuth({...props, owner: true});
  return (
    <Container>
        <TopBar hasBackButton={true} headerText={"Choose Address"} market={chosenMarket && chosenMarket.name} goBack={() => props.navigation.goBack()} />
        <Main>
            <AddressList addresses={deliveryAddress} chosenAddress={chosenAddress} pickAddress={pickAddress} />
            <View style={{flex: 1, justifyContent: "flex-end"}}>
                <AppButton label='Add New' style={{alignSelf: 'center', padding: 15, width: "100%", backgroundColor: appColor.primary}} labelStyle={{color: appColor.background}} onPress={() => {props.navigation.navigate(routes.ADDADDRESS)}}/>
            </View>
        </Main>
    </Container>
  )
}

export default ChooseAddress