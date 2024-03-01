import {createSlice, createAction} from "@reduxjs/toolkit";
import {apiCallBegan} from "./api";

const marketSlice = createSlice({
    name: "markets",
    initialState: {
        list: [],
        lgaMarkets: [],
        selectedMarket: null,
        loading: false,
    },
    reducers: {
        marketsRequested: (markets, action) => {
            markets.loading = true;
        },

        marketsLoaded: (markets, action) => {
            markets.list = action.payload.markets;
            markets.loading = false; 
        },

        marketsRequestFailed: (markets, action) => {
            markets.loading = false;
        },

        lgaMarketsLoaded: (markets, action) => {
            markets.lgaMarkets = action.payload
        },

        marketSelected: (markets, action) => {
            markets.selectedMarket = action.payload;
        },
    }
});

// console.log(slice);

export const {
    marketsRequested, 
    marketsLoaded, 
    marketsRequestFailed, 
    marketSelected, 
    lgaMarketsLoaded, 
} = marketSlice.actions;
export default marketSlice.reducer;

//Actions
export const loadMarkets = (state_id) => apiCallBegan({
    url: "/get-markets",
    data: {state_id},
    onStart: marketsRequested.type,
    onSuccess: marketsLoaded.type,
    onError: marketsRequestFailed.type
})

export const saveLgaMarkets = createAction(lgaMarketsLoaded.type);
export const selectMarket = createAction(marketSelected.type);

//Selector
export const getCurrentMarketSlice = (state) => state.entities.markets;
export const getMarketList = (state) => state.entities.markets.list;
export const getLgaMarkets = (state) => state.entities.markets.lgaMarkets;
export const getSelectedMarket = (state) => state.entities.markets.selectedMarket;