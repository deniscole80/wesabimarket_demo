import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth";
import stateReducer from "./states";
import lgaReducer from "./lgas";
import marketReducer from "./markets";
import itemReducer from "./items";
import cartReducer from "./cart";
import walletReducer from "./wallet";
import orderReducer from "./orders";

export default combineReducers({
    auth: authReducer,
    states: stateReducer,
    lgas: lgaReducer,
    markets: marketReducer,
    items: itemReducer,
    cart: cartReducer,
    wallet: walletReducer,
    order: orderReducer,
});