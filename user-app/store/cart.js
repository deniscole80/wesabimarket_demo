import {createSlice, createAction} from "@reduxjs/toolkit";
import {apiCallBegan} from "./api";
import {calculateCartTotal} from "./api"
const _ = require("lodash");

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        list: [],
        totalAmount: 0,
        cartUpdateCount: 0,
        deliveryFee: 1200,
        agentFee: 5
    },
    reducers: {
        itemAdded: (items, action) => {
            items.list.push({...action.payload, qtyInCart: 1});
        },

        itemIncreased: (items, action) => {
            const indexOfItem = items.list.findIndex((item) => item.id === action.payload.id);
            let item = items.list.find((item) => item.id === action.payload.id);
            item.qtyInCart = item.qtyInCart ? item.qtyInCart + 1 : 1;
            items.list[indexOfItem] = item;
            items.cartUpdateCount++;
        },

        itemDecreased: (items, action) => {
            const indexOfItem = items.list.findIndex((item) => item.id === action.payload.id);
            let item = items.list.find((item) => item.id === action.payload.id);
            if(item.qtyInCart > 1){
                item.qtyInCart -= 1;
                items.list[indexOfItem] = item; 
            }else{
                items.list.splice(indexOfItem, 1); 
            }
            items.cartUpdateCount++;
        },

        itemRemoved: (items, action) => {
            const indexOfItem = items.list.findIndex((item) => item.id === action.payload.id);
            items.list.splice(indexOfItem, 1);   
            items.cartUpdateCount++;
            if(items.list.length === 0) items.totalAmount = 0;
        },

        totalCalculated: (items, action) => {
            items.totalAmount = action.payload.total; 
        },

        cartCleared: (items, action) => {
            items.list = [];
            items.totalAmount = 0;
        },

        itemUnitChanged: (items, action) => {
            const indexOfItem = items.list.findIndex((item) => item.id === action.payload.id);
            let item = items.list[indexOfItem];
            let prices = item.prices;
            if(prices.length !== 1){
                item.price_index = action.payload.price.value;
                items.list[indexOfItem] = item;
            }
        },
    }
});

// console.log(slice);

export const {
    itemAdded,
    itemIncreased,
    itemDecreased,
    totalCalculated,
    cartCleared,
    itemRemoved,
    itemUnitChanged
} = cartSlice.actions;
export default cartSlice.reducer;

//Actions
export const addItem = createAction(itemAdded.type);
export const increaseItem = createAction(itemIncreased.type);
export const decreaseItem = createAction(itemDecreased.type);
export const removeItem = createAction(itemRemoved.type);
export const changeCartUnit = createAction(itemUnitChanged.type);
export const calculateTotal = (cart) => calculateCartTotal({
    cart,
    onDone: totalCalculated.type,
});
export const clearCart = createAction(cartCleared.type);

//Selector
export const getCurrentCartSlice = (state) => state.entities.cart;
export const getCart = (state) => state.entities.cart.list;
export const getAgentFee = (state) => state.entities.cart.agentFee;
export const getDeliveryFee = (state) => state.entities.cart.deliveryFee;
export const getTotalAmount = (state) => state.entities.cart.totalAmount; 