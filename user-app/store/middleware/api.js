import { ApiResponse } from "apisauce";
import apiClient from "../../api/client";
import * as actions from "../api"

const endpoint = "/user/api/v1/market";


const api = ({dispatch}) => (next) => async (action) => {
    if(action.type !== actions.apiCallBegan.type) return next(action);

    const {url, data, onStart, onSuccess, onError } = action.payload;
    // console.log("Dataa>>>>>>>>>>>>>>>>>>", data);
    
    if(onStart) dispatch({type: onStart});
    
    next(action);
    
    try{
        const finalEndpoint = data.endpoint ? data.endpoint : endpoint;
        delete data.endpoint;
        const response = await apiClient.post(finalEndpoint + url, data);
        // console.log("Get data from mWare "+onSuccess, response.data);
        dispatch(actions.apiCallSuccess(response.data));
        if(onSuccess) dispatch({type: onSuccess, payload: response.data});
    }catch(error){
        dispatch(actions.apiCallFailed(error.message));
        if(onError) dispatch({type: onError, payload: error});
    }
}

const calculateTotal = ({dispatch}) => (next) => async (action) => {
    if(action.type !== actions.calculateCartTotal.type) return next(action);

    const {cart, onDone} = action.payload;
    next(action);

    let total = 0;
    cart.map((item, index) => {
        const priceIndex = item.price_index;
        const prices = item.prices;
        const price = prices[priceIndex]["price"];
        const itemTotal = price * item.qtyInCart
        total += itemTotal;
        
        if(index === cart.length - 1){
            dispatch({type: onDone, payload: {total}})
        }
    });
}

export {api, calculateTotal};