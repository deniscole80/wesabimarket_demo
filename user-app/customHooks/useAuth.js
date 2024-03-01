import {useState, useEffect} from 'react';
import Toast from 'react-native-root-toast';
import routes from '../navigation/routes';
import AuthApi from '../api/auth';
import StatusCode from '../utility/status_codes';
import frontStorage from '../utility/storage';
import { getSelectedMarket } from '../store/markets';
import { getCart, getAgentFee, getDeliveryFee, getTotalAmount, clearCart } from '../store/cart';
import { userLoggedIn, getCurrentUser, addDeliveryAddress, getLoading, getDeliveryAddress, getChosenAddress, fetchDeliveryAddress, chooseAddress, toggleMatchingModal, getMatchingModal, getOrderMatched, matchAgentToOrder, getMatchedAgent, resetModal} from '../store/auth';
import { resetItems } from '../store/items';
import { useDispatch, useSelector } from 'react-redux';

const useAuth = (props) => {
    const currentUser = useSelector(getCurrentUser);
    const getBusy = useSelector(getLoading);
    const deliveryAddress = useSelector(getDeliveryAddress);
    console.log("Addresses", deliveryAddress);
    const chosenAddress = useSelector(getChosenAddress);
    const matchingModal = useSelector(getMatchingModal);
    const chosenMarket = useSelector(getSelectedMarket);
    const currentCart = useSelector(getCart);
    const agentFee = useSelector(getAgentFee);
    const deliveryFee = useSelector(getDeliveryFee);
    const totalAmount = useSelector(getTotalAmount);
    const matched = useSelector(getOrderMatched);
    const matchedAgent = useSelector(getMatchedAgent);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {successful} = StatusCode;

    useEffect(() => {
       props.owner && currentUser.user && dispatch(fetchDeliveryAddress({user_id: currentUser.user.id}));
    }, [currentUser]);

    const handleRegister = async (user) => {
        console.log("user", user);
        setLoading(true);
        const response = await AuthApi.registerUser(user);
        console.log(response);
        const {message} = response.data;
        if(response.status == successful.created){
            Toast.show("Registration successful", { duration: Toast.durations.LONG });
            setLoading(false);
            showScreen(routes.LOGIN);
        }else{
            Toast.show(message, { duration: Toast.durations.LONG });
        }
    }

    const handleLogin = async (loginData) => {
        // console.log("LoginData", loginData);
        setLoading(true);
        const response = await AuthApi.logIn(loginData);
        console.log(response);
        const {message, user, token} = response.data;
        if(response.status == successful.accepted){
            const currentUser = {user, token};
            console.log("Current user from login", currentUser);
            dispatch(userLoggedIn(currentUser));
            frontStorage.asyncStore("UserData", JSON.stringify(currentUser));
            Toast.show(message, { duration: Toast.durations.LONG });
            setLoading(false);
            showScreen(routes.CHOOSEMARKET);
        }else{
            Toast.show(message, { duration: Toast.durations.LONG });
            setLoading(false);
        }
    }

    const showScreen = (route) => {
        props.navigation.navigate(route);
    }

    const handleAddAddress = async (addressData) => {
        console.log(addressData);
        await dispatch(addDeliveryAddress({...addressData, user_id: currentUser.user.id}));
        Toast.show("Successfully Added", { duration: Toast.durations.LONG });
        props.navigation.goBack();
    }

    const pickAddress = (id) => {
        console.log("Address id", id);
        const address = deliveryAddress.filter((add) => add.id === id);
        console.log("My chosen address", address);
        dispatch(chooseAddress(address));
    }

    const switchMatchingModal = () => {
        dispatch(toggleMatchingModal());
    }

    const confirmOrder = async (total) => {
        console.log(currentUser);
        console.log(total);
        if(currentUser.user.wallet_balance < total){
            Toast.show("Insufficient balance", { duration: Toast.durations.LONG });
        }else{
            const order = {
                user_id: currentUser.user.id,
                agent_id: null,
                market_id: chosenMarket.id,
                cart: currentCart,
                delivery_address: chosenAddress,
                agent_fee: Math.ceil((agentFee/100) * totalAmount),
                delivery_fee: deliveryFee,
                purchase_balance: totalAmount
            }

            let storedUser = await frontStorage.asyncGet("UserData");
            let user = storedUser && JSON.parse(storedUser);
            let newWalletBalance = user.user.wallet_balance - total;
            user.user.wallet_balance = newWalletBalance;
            // console.log("About to store user", user);
            await frontStorage.asyncStore("UserData", JSON.stringify(user));

            switchMatchingModal();
            setTimeout(() => {dispatch(matchAgentToOrder(order))}, 5000);
        }
    }

    const proceedToOrder = () => {
        dispatch(resetModal());
        dispatch(resetItems());
        dispatch(clearCart());
        props.navigation.navigate(routes.ORDERS);
    }

  return {
    handleRegister, 
    handleLogin, 
    loading, 
    getBusy,
    showScreen, 
    currentUser, 
    handleAddAddress,
    deliveryAddress,
    chosenAddress,
    pickAddress,
    matchingModal,
    switchMatchingModal, 
    confirmOrder,
    matched,
    matchedAgent,
    proceedToOrder};
}

export default useAuth