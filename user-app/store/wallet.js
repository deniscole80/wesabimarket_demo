import {createSlice, createAction} from "@reduxjs/toolkit";
import {apiCallBegan} from "./api";
import frontStorage from '../utility/storage';
const _ = require("lodash");

const walletSlice = createSlice({
    name: "wallet",
    initialState: {
        amountModal: false,
        loading: false,
        balance: 0,
        fundHistory: [],
        transaction: []
    },
    reducers: {
        amountModalToggled: (wallet, action) => {
            wallet.amountModal = !wallet.amountModal;
        },

        recordPaymentRequested: (wallet, action) => {
            wallet.loading = true;
        },

        recordPaymentLoaded: (wallet, action) => {
            wallet.balance = action.payload.balance;
            wallet.loading = false; 
            wallet.amountModal = false;
        },

        recordPaymentFailed: (wallet, action) => {
            wallet.loading = false;
        },

        fundHistoryRequested: (wallet, action) => {
            wallet.loading = true;
        },

        fundHistoryLoaded: (wallet, action) => {
            wallet.fundHistory = action.payload.fundHistory;
            wallet.loading = false; 
        },

        fundHistoryFailed: (wallet, action) => {
            wallet.loading = false;
        },
    }
});

// console.log(slice);

export const {
    amountModalToggled,
    recordPaymentFailed,
    recordPaymentLoaded,
    recordPaymentRequested,
    fundHistoryRequested,
    fundHistoryLoaded,
    fundHistoryFailed
} = walletSlice.actions;
export default walletSlice.reducer;

//Actions
export const toggleAmountModal = createAction(amountModalToggled.type);
export const recordPayment = (data) => apiCallBegan({
    url: "/record-payment",
    data: {...data, endpoint: "/user/api/v1/auth"},
    onStart: recordPaymentRequested.type,
    onSuccess: recordPaymentLoaded.type,
    onError: recordPaymentFailed.type
});
export const getFundHistory = (data) => apiCallBegan({
    url: "/fetch-fund-history",
    data: {...data, endpoint: "/user/api/v1/auth"},
    onStart: fundHistoryRequested.type,
    onSuccess: fundHistoryLoaded.type,
    onError: fundHistoryFailed.type
});


//Selector
export const getCurrentWalletSlice = (state) => state.entities.wallet;