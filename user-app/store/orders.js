import {createSlice, createAction} from "@reduxjs/toolkit";
import {apiCallBegan} from "./api";
const _ = require("lodash");

const orderSlice = createSlice({
    name: "order",
    initialState: {
        list: [],
        loading: false
    },
    reducers: {
        orderRequested: (order, action) => {
            order.loading = true;
        },

        orderLoaded: (order, action) => {
            order.loading = false;
            order.list = action.payload.orders;
        },

        orderRequestFailed: (order, action) => {
            order.loading = false;
        },
    }
});

// console.log(slice);

export const {
    orderRequested,
    orderLoaded,
    orderRequestFailed
} = orderSlice.actions;
export default orderSlice.reducer;

//Actions
export const fetchOrders = (data) => apiCallBegan({
    url: "/fetch-orders",
    data: {...data, endpoint: "/user/api/v1/auth"},
    onStart: orderRequested.type,
    onSuccess: orderLoaded.type,
    onError: orderRequestFailed.type
});

//Selector
export const getCurrentOrderSlice = (state) => state.entities.order;