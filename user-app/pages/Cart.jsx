import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import appColor from '../utility/colors';
import AppButton from '../components/AppButton';
import CartList from '../components/CartList';
import TopBar from '../components/TopBar';
import Container from '../components/Container';
import Main from '../components/Main';
import useCart from '../customHooks/useCart';
import useProducts from '../customHooks/useProducts';
const _ = require("lodash");

const Cart = (props) => {
    const {cartList, totalAmount, clearAllCart, goBack, removeCartItem, checkout} = useCart({...props, owner: true});
    const {chosenMarket, 
        increaseItemInCart,
        decreaseItemInCart,
        changeItemUnit,} = useProducts({...props, owner: false});
    // const [cartList, setCartList] = useState<CartItem[]>([
    //     {id:1, category:{id: 1, name: 'Fruit'}, image: 'https://media.istockphoto.com/id/173242750/photo/banana-bunch.jpg?s=612x612&w=0&k=20&c=MAc8AXVz5KxwWeEmh75WwH6j_HouRczBFAhulLAtRUU=', name: 'Banana', available: 'yes', prices: [{unit: 'Small Bunch', price: 1000}, {unit: 'Big Bunch', price: 5500}], qtyInCart: 2, chosenUnit: 0 },
    //     {id:2, category:{id: 2, name: 'Food Stuff'}, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEAVAtCRSFQVpQQvogmWMs3M8vERQ4R1YGKQ&usqp=CAU', name: 'Beans', available: 'yes', prices: [{unit: 'Congo', price: 830}, {unit: 'Bag', price: 50000}], qtyInCart: 2, chosenUnit: 0  },
    //     {id:3, category:{id: 3, name: 'Food Stuff'}, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEAVAtCRSFQVpQQvogmWMs3M8vERQ4R1YGKQ&usqp=CAU', name: 'Beans', available: 'yes', prices: [{unit: 'Congo', price: 830}, {unit: 'Bag', price: 50000}], qtyInCart: 2, chosenUnit: 0  },
    // ])
    return (
        <Container>
            <TopBar hasBackButton={true} headerText={"Cart"} hasCart={{itemLength: _.sumBy(cartList, "qtyInCart"), click: () => {}}} market={chosenMarket && chosenMarket.name} goBack={goBack} />
            <Main style={{paddingBottom: 30}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20}}>
                    <View>
                        <Text style={{fontFamily: 'ClarityCity-Light', fontSize: 12, color: appColor.grey}}>Total</Text>
                        <Text style={{fontSize: 18, fontFamily: 'ClarityCity-ExtraBold', color: appColor.grey}}><Text style={{textDecorationLine: 'line-through'}}>N</Text> {totalAmount}</Text>
                    </View>
                    <AppButton label='Clear All' onPress={clearAllCart} style={{width: 100, alignSelf: 'center'}} labelStyle={{color: appColor.background, fontSize: 10}}/>
                </View>
                <CartList itemList={cartList} changeItemUnit={changeItemUnit} increaseItem={increaseItemInCart} decreaseItem={decreaseItemInCart} removeCartItem={removeCartItem} />
            </Main>
            <View style={{width: "100%"}}>
                <AppButton icon={<MaterialCommunityIcons name="cart-check" size={24} color={ appColor.mutedWhite } />} label='Check Out' style={{alignSelf: 'center', padding: 15, width: "100%"}} labelStyle={{color: appColor.background}} onPress={checkout}/>
            </View>    
        </Container>
    );
}

const styles = StyleSheet.create({
    
});

export default Cart;