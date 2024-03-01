import {createSlice, createAction} from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: "auth",
    initialState: {
        currentUser: null,
        deliveryAddress: [],
        chosenAddress: {},
        busy: false,
        matchingModal: false,
        orderMatched: false,
        matchedAgent: null
    },
    reducers: {
        userLoggedIn: (state, action) => {
            state.currentUser = action.payload
        },

        walletUpdated: (state, action) => {
            state.currentUser.user.wallet_balance += action.payload.amount;
        },

        addAddressRequested: (state, action) => {
            state.busy = true;
        },

        addAddressLoaded: (state, action) => {
            state.busy = false;
            if(Array.isArray(action.payload.deliveryAddress)){
                state.deliveryAddress = action.payload.deliveryAddress;
                state.chosenAddress = action.payload.deliveryAddress[0];
            }else{
                state.deliveryAddress.push(action.payload.deliveryAddress);
                state.chosenAddress = action.payload.deliveryAddress;
            }
        },

        addAddressRequestFailed: (state, action) => {
            state.busy = false;
        },

        addressRequested: (state, action) => {
            state.busy = true;
        },

        addressLoaded: (state, action) => {
            state.busy = false;
            state.deliveryAddress = action.payload.deliveryAddress;
            state.chosenAddress = action.payload.deliveryAddress[0];
        },

        addressRequestFailed: (state, action) => {
            state.busy = false;
        },

        addressChosen: (state, action) => {
            state.chosenAddress = action.payload[0];
        },

        matchingModalGotten: (state, action) => {
            state.matchingModal = !state.matchingModal;
        },
        
        matchOrderRequested: (state, action) => {
            state.busy = true;
        },

        matchOrderLoaded: (state, action) => {
            state.busy = false;
            state.matchedAgent = action.payload.agent;
            state.currentUser.user.wallet_balance = action.payload.wallet_balance;
            state.orderMatched = true;
            // console.log("Action that reached matchOrder Agent>>>>>>>>>>>>>>>>>>>>>>>>>", action.payload.agent);
            // console.log("Action that reached matchOrder Wallet>>>>>>>>>>>>>>>>>>>>>>>>>", action.payload.wallet_balance);
        },

        matchOrderRequestFailed: (state, action) => {
            state.busy = false;
        },

        modalReset: (state, action) => {
            state.matchingModal = false;
            state.matchedAgent = null,
            state.orderMatched = false;
        }
    }
});

// console.log(slice);

export const {
    userLoggedIn, 
    walletUpdated, 
    addAddressRequested, 
    addAddressLoaded, 
    addAddressRequestFailed,
    addressRequested, 
    addressLoaded, 
    addressRequestFailed,
    addressChosen,
    matchingModalGotten,
    matchOrderRequested,
    matchOrderLoaded,
    matchOrderRequestFailed,
    modalReset
} = slice.actions;
export default slice.reducer;

//Actions
export const updateWalletBalance = createAction(walletUpdated.type);
export const addDeliveryAddress = (data) => apiCallBegan({
    url: "/add-delivery-address",
    data: {...data, endpoint: "/user/api/v1/auth"},
    onStart: addAddressRequested.type,
    onSuccess: addAddressLoaded.type,
    onError: addAddressRequestFailed.type
});
export const fetchDeliveryAddress = (data) => apiCallBegan({
    url: "/fetch-delivery-address",
    data: {...data, endpoint: "/user/api/v1/auth"},
    onStart: addressRequested.type,
    onSuccess: addressLoaded.type,
    onError: addressRequestFailed.type
});
export const matchAgentToOrder = (data) => apiCallBegan({
    url: "/match-order",
    data: {...data, endpoint: "/user/api/v1/auth"},
    onStart: matchOrderRequested.type,
    onSuccess: matchOrderLoaded.type,
    onError: matchOrderRequestFailed.type
});
export const chooseAddress = createAction(addressChosen.type);
export const toggleMatchingModal = createAction(matchingModalGotten.type);
export const resetModal = createAction(modalReset.type);

//Selector
export const getLoading = (state) => state.entities.auth.busy;
export const getCurrentUser = (state) => state.entities.auth.currentUser;
export const getDeliveryAddress = (state) => state.entities.auth.deliveryAddress;
export const getChosenAddress = (state) => state.entities.auth.chosenAddress;
export const getMatchingModal = (state) => state.entities.auth.matchingModal;
export const getOrderMatched = (state) => state.entities.auth.orderMatched;
export const getMatchedAgent = (state) => state.entities.auth.matchedAgent;