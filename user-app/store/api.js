import {createAction} from "@reduxjs/toolkit";

export const apiCallBegan = createAction("api/Called");
export const apiCallSuccess = createAction("api/CallSuccess");
export const apiCallFailed = createAction("api/CallFailed");
export const calculateCartTotal = createAction("cart/calculateCartTotal");