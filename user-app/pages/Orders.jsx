import React from 'react';
import {View} from 'react-native';
import Container from '../components/Container';
import TopBar from '../components/TopBar';
import Main from '../components/Main';
import OrderList from '../components/OrderList';
import useOrder from '../customHooks/useOrder';
import Loader from '../components/Loader';
const _ = require("lodash");

const Orders = (props) => {
    const {cartList, chosenMarket, openCart, loading, orders} = useOrder(props);

    return (
        <Container>
            <TopBar 
                headerText="Orders" 
                hasMenuBar={true} 
                hasCart={{itemLength: _.sumBy(cartList, "qtyInCart"), click: openCart}} 
                market={chosenMarket && chosenMarket.name} 
                openNavigation={() => props.navigation.toggleDrawer()}
            />
            <Main>
                <View style={{alignItems: 'flex-start', paddingVertical: 10}}>
                    {/* <View>
                        <AppText text='Sort by' style={{fontSize: 10, fontFamily: 'ClarityCity-ExtraLight'}} />
                        <DropDown
                            dropValue={'pending'}
                            dropItems={[{label: 'Matched', value: 'matched'}, {label: 'Purchased', value: 'purchased'}, {label: 'Shipped', value: 'shipped'}, {label: 'Delivered', value: 'delivered'}]}
                            direction="TOP"
                            labelStyle={{
                                color: appColor.secondary,
                                fontSize: 10,
                                fontFamily: "ClarityCity-Medium",
                            }}
                            containerStyle={{
                                fontFamily: "ClarityCity-Medium",
                                padding: 0,       
                            }}  
                            myStyle={{                        
                                fontFamily: "ClarityCity-Medium",
                                width: 102,
                                borderWidth: 1,
                                borderColor: appColor.primary,
                            }}
                            textStyle={{
                            color: appColor.secondary,
                            fontSize: 10,
                            fontFamily: "ClarityCity-Medium",
                            }}
                        />
                    </View> */}
                </View>
                <OrderList list={orders} navigation={props.navigation}/>
                <Loader loading={loading} />
            </Main>
        </Container>
    )
}

export default Orders