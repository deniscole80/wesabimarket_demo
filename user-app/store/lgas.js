    import {createSlice, createAction} from "@reduxjs/toolkit";

    const lgaSlice = createSlice({
        name: "lgas",
        initialState: {
            rawList: [],
            list: [],
            selectedLga: null,
            showLgaModal: false
        },
        reducers: {
            lgasLoaded: (lgas, action) => {
                lgas.rawList = action.payload.rawLgas;
                lgas.list = action.payload.lgas;
            },

            lgaSelected: (lgas, action) => {
                lgas.selectedLga = action.payload.selectedLga;
                lgas.showLgaModal = false;
            },

            lgaModalToggled: (lgas, action) => {
                lgas.showLgaModal = action.payload.modalState;
            }
        }
    });

    // console.log(slice);

    export const {lgasLoaded, lgaSelected, lgaModalToggled} = lgaSlice.actions;

    export default lgaSlice.reducer;

    //Actions
    export const loadLgas = createAction(lgasLoaded.type); 
    export const setSelectedLga = createAction(lgaSelected.type);
    export const toggleLgaModal = createAction(lgaModalToggled.type);

    //Selector
    export const getCurrentLgaSlice = (state) => state.entities.lgas;
    export const getLgas = (state) => state.entities.lgas.list;
    export const getSelectedLga = (state) => state.entities.lgas.selectedLga || state.entities.lgas.list[0];
    export const getModalLga = (state) => state.entities.lgas.showLgaModal;