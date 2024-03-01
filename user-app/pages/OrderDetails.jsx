import React from 'react';
import {View, Text} from 'react-native';
import Container from '../components/Container'
import TopBar from '../components/TopBar';
import Main from '../components/Main';
import appColor from '../utility/colors';
import AppButton from '../components/AppButton';
import useOrder from '../customHooks/useOrder';
import CartOrderList from '../components/CartOrderList';
const _ = require("lodash");

const OrderDetails = (props) => {
    const id = props.route.params.id;
    const {orders, cartList, chosenMarket, openCart} = useOrder(props);
    const order = orders.find((order) => order.id == id);

  return (
    <>
        <Container>
            <TopBar 
                headerText="Order Details" 
                hasBackButton={true} 
                hasCart={{itemLength: _.sumBy(cartList, "qtyInCart"), click: openCart}} 
                market={chosenMarket && chosenMarket.name} 
                openNavigation={() => props.navigation.toggleDrawer()}
            />
            <Main>
                <View style={{marginVertical: 10, backgroundColor: appColor.mutedWhite, padding: 15, borderRadius: 10}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <View>
                            <Text style={{fontFamily: 'ClarityCity-Light', fontSize: 12, color: appColor.grey}}>Total</Text>
                            <Text style={{fontSize: 18, fontFamily: 'ClarityCity-ExtraBold', color: appColor.grey}}><Text style={{textDecorationLine: 'line-through'}}>N</Text> {order.purchase_balance}</Text>
                        </View>
                        <View>
                            <Text style={{fontFamily: 'ClarityCity-Light', fontSize: 12, color: appColor.grey}}>Order Status</Text>
                            <Text style={{fontSize: 18, fontFamily: 'ClarityCity-ExtraBold', color: appColor.secondary}}>{order.status}</Text>
                        </View>
                    </View>
                </View>
                
                <CartOrderList itemList={order.cart} />
            </Main>
        </Container>
        <View style={{padding: 10, alignItems: 'center', justifyContent: 'center', borderTopColor: appColor.mutedWhite, borderTopWidth: 5,}}>
            <View style={{backgroundColor: appColor.grey, padding: 2, width: 50, borderRadius: 5, marginBottom: 10}}></View>
            <AppButton label="Track my Order" labelStyle={{color: appColor.mutedWhite}}/>
        </View>
    </>
  )
}

export default OrderDetails