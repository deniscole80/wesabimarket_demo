import {createSlice, createAction} from "@reduxjs/toolkit";
import {apiCallBegan} from "./api";

const itemSlice = createSlice({
    name: "items",
    initialState: {
        list: [],
        loading: false,
    },
    reducers: {
        itemsRequested: (items, action) => {
            items.loading = true;
        },

        itemsLoaded: (items, action) => {
            items.list = action.payload.items;
            items.loading = false; 
        },

        itemsRequestFailed: (items, action) => {
            items.loading = false;
        },

        itemListIncreased: (items, action) => {
            const indexOfItem = items.list.findIndex((item) => item.id === action.payload.id);
            let item = items.list[indexOfItem];
            item.qtyInCart = item.qtyInCart ? item.qtyInCart + 1 : 1;
            items.list[indexOfItem] = item;
        },

        itemListDecreased: (items, action) => {
            const indexOfItem = items.list.findIndex((item) => item.id === action.payload.id);
            let item = items.list[indexOfItem];
            if(item.qtyInCart > 1){
                item.qtyInCart -= 1;
                items.list[indexOfItem] = item; 
            }else{
                delete items.list[indexOfItem].qtyInCart; 
            }
        },

        itemListRemoved: (items, action) => {
            const indexOfItem = items.list.findIndex((item) => item.id === action.payload.id);
            delete items.list[indexOfItem].qtyInCart;         
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

        itemReset: (items, action) => {
            items.list.map((item) => {
                item.priceIndex = 0;
                delete item.qtyInCart;
            });
        }
    }
});

// console.log(slice);

export const {
    itemsRequested,
    itemsLoaded, 
    itemsRequestFailed,
    itemListDecreased,
    itemListIncreased,
    itemListRemoved,
    itemUnitChanged,
    itemReset
} = itemSlice.actions;
export default itemSlice.reducer;

//Actions
export const loadItems = () => apiCallBegan({
    url: "/fetch-items",
    data: {},
    onStart: itemsRequested.type,
    onSuccess: itemsLoaded.type,
    onError: itemsRequestFailed.type
});
export const increaseItemList = createAction(itemListIncreased.type);
export const decreaseItemList = createAction(itemListDecreased.type);
export const removeItemList = createAction(itemListRemoved.type);
export const changeUnit = createAction(itemUnitChanged.type);
export const resetItems = createAction(itemReset.type);

//Selector
export const getCurrentItemSlice = (state) => state.entities.items;