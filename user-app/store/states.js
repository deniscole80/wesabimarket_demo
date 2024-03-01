import {createSlice, createAction} from "@reduxjs/toolkit";
import {createSelector} from "reselect";
import { apiCallBegan } from "./api";
import Helper from "../utility/helper";

const stateSlice = createSlice({
    name: "states",
    initialState: {
        rawList: [],
        list: [],
        loading: false,
        selectedState: null,
        showStateModal: false
    },
    reducers: {
        statesRequested: (states, action) => {
            states.loading = true;
        },

        statesLoaded: (states, action) => {
            states.rawList = action.payload.states;
            states.loading = false; 
        },

        statesRequestFailed: (states, action) => {
            states.loading = false;
        },

        usableStatesSet: (states, action) => {
            states.list = action.payload;
        },

        stateSelected: (states, action) => {
            states.selectedState = action.payload.selectedState;
            states.showStateModal = false;
        },

        stateModalToggled: (states, action) => {
            states.showStateModal = action.payload.modalState;
        }
    }
});

// console.log(slice);

export const {statesLoaded, statesRequested, statesRequestFailed, stateSelected, stateModalToggled, usableStatesSet} = stateSlice.actions;

export default stateSlice.reducer;

//Actions
export const loadStates = () => apiCallBegan({
    url: "/get-states",
    data: {},
    onStart: statesRequested.type,
    onSuccess: statesLoaded.type,
    onError: statesRequestFailed.type
})

export const setSelectedState = createAction(stateSelected.type);
export const toggleStateModal = createAction(stateModalToggled.type);
export const setUsableStates = createAction(usableStatesSet.type);

// Selector
export const getCurrentStateSlice = (state) => state.entities.states;
export const getSelectedState = (state) => state.entities.states.selectedState || state.entities.states.list[0];
export const getModalState = (state) => state.entities.states.showStateModal;