import {useEffect} from 'react';
import routes from '../navigation/routes';
import StatusCode from '../utility/status_codes';
import Helper from '../utility/helper';

import { loadStates, getCurrentStateSlice, setSelectedState, getSelectedState, toggleStateModal, getModalState, setUsableStates } from '../store/states';
import { getSelectedLga, getCurrentLgaSlice, getLgas, setSelectedLga, toggleLgaModal, loadLgas, getModalLga } from '../store/lgas';
import {getCurrentMarketSlice, loadMarkets, getMarketList, saveLgaMarkets, getLgaMarkets, selectMarket} from "../store/markets";
import { useDispatch, useSelector } from 'react-redux';

const useChooseMarket = ({navigation}) => {
    const currentStateSlice = useSelector(getCurrentStateSlice);
    const selectedState = useSelector(getSelectedState);
    const stateModalState = useSelector(getModalState);

    const currentLgas = useSelector(getLgas);
    const currentLgaSlice = useSelector(getCurrentLgaSlice);
    const selectedLga = useSelector(getSelectedLga);
    const lgaModalState = useSelector(getModalLga)
    // console.log("CurrentLgaModal", currentLgas);

    const currentMarketSlice = useSelector(getCurrentMarketSlice);
    const marketList = useSelector(getMarketList);
    const lgaMarkets = useSelector(getLgaMarkets);
    // console.log("CurrentMarketSlice", currentMarketSlice);
    
    const dispatch = useDispatch();

    const {successful} = StatusCode;
    
    useEffect(() => {
        handleGetStates(); 
    }, []);

    useEffect(() => {
        if(currentStateSlice.rawList.length > 0){
            handleStoreUsableStates();
        }
    }, [currentStateSlice.rawList.length])

    useEffect(() => {
        if(selectedState){
            // console.log("Raw states loaded?>>>>>>>>>>>>>>", statesList);
            handleGetLgas(selectedState);
        }
    }, [selectedState]);

    useEffect(() => {
        if(selectedLga){handleGetMarkets(selectedState)} 
    }, [selectedLga]);

    useEffect(() => {
        if(marketList.length > 0){
            handleGetLgaMarkets(selectedLga);
        }
    }, [marketList.length, selectedLga]);

    // useEffect(() => {
    //     if(markets.length > 0){
    //         handleSortMarkets(selectedState, selectedLga);
    //     }
    // }, [markets]);


    const handleGetStates = async () => {
        await dispatch(loadStates());
        // console.log("After loading state", currentStateSlice);
    }

    const handleStoreUsableStates = async () => {
        const states = await Helper.extractStates(currentStateSlice.rawList);
        // console.log("From store usable states", states);
        dispatch(setUsableStates(states));
    }

    const handleGetMarkets = async (state) => {
         // console.log("Selected state>>>>>>>>>>>>>>>", selectedState);
        await dispatch(loadMarkets(state.value));  
    }

    const handleGetLgaMarkets = async (lga) => {
        const lgaMarkets = marketList.filter((market) => market.lga_id === lga.value);
        dispatch(saveLgaMarkets(lgaMarkets));
    }

    const handleGetLgas = async (selectedState) => {
        // console.log("Selected State", selectedState);
        const rawStates = currentStateSlice.rawList;
        const rawSelectedState = rawStates.find((state) => state.id == selectedState.value);
        // console.log("From Hook", rawSelectedState);
        const rawLgas = rawSelectedState.lgas;
        // console.log("From Hook", rawLgas);
        const lgas = await Helper.extractLgas(rawLgas);
        // console.log("From Hook", lgas);
        await dispatch(loadLgas({lgas, rawLgas}));        
        // console.log("After loading", currentLgaSlice);
        await dispatch(setSelectedState({ selectedState }));
        await dispatch(setSelectedLga({ selectedLga: null }));
        
        // handleGetMarkets(selectedState);
    }

    const handleSelectLga = async (selectedLga) => {
        // console.log("From select lga", selectedLga);
        await dispatch(setSelectedLga({ selectedLga }));
        await dispatch(toggleLgaModal({ modalState: false }));
        // handleSortMarkets(selectedState, selectedLga);
    }

    const setShowStateModal = (modalState) => dispatch(toggleStateModal({modalState})); 

    const setShowLgaModal = (modalState) => dispatch(toggleLgaModal({modalState})); 

    const gotoMarket = (market) => {
        // console.log("Chosen market", market);
        dispatch(selectMarket(market));
        navigation.navigate(routes.MAINPAGE)
    }

  return {
    statesList: currentStateSlice.list, 
    handleGetLgas, 
    lgaList: currentLgas, 
    showStateModal: stateModalState, 
    showLgaModal: lgaModalState, 
    setShowStateModal, 
    setShowLgaModal, 
    selectedState, 
    selectedLga, 
    handleSelectLga, 
    marketList: lgaMarkets, 
    loading: currentStateSlice.loading || currentMarketSlice.loading,
    gotoMarket,
};
}

export default useChooseMarket