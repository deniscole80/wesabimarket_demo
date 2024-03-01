import {useEffect} from 'react'
import routes from '../navigation/routes';
import frontStorage from '../utility/storage';
import Toast from 'react-native-root-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentWalletSlice, toggleAmountModal, recordPayment, getFundHistory } from '../store/wallet';
import { getCurrentUser, updateWalletBalance } from '../store/auth';

const useWallet = (props) => {

  const walletSlice = useSelector(getCurrentWalletSlice);
  const currentUser = useSelector(getCurrentUser);
  // console.log("Current User", currentUser);
  // console.log("Wallet Slice Use Wallet", walletSlice);

  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(getFundHistory({user_id: currentUser.user.id}));
  }, [currentUser.user.wallet_balance]);

  const updateStoredBalance = async (amount) => {
    let storedUser = await frontStorage.asyncGet("UserData");
    let user = storedUser && JSON.parse(storedUser);
    user.user.wallet_balance += amount;
    // console.log("About to store user", user);
    await frontStorage.asyncStore("UserData", JSON.stringify(user));

    dispatch(updateWalletBalance({amount}));
  }

  const switchAmountModal = () => {
    dispatch(toggleAmountModal());
  }

  const handlePayment = ({amount}) => {
    // console.log("From useWallet", amount);
    props.navigation.navigate(routes.PAYMENTPAGE, {amount, email: currentUser.user.email, id: currentUser.user.id});
  }

  const recordPaymentRef = async (ref, id, amount) => {
    console.log("Recording payment", {id, ref, amount});
    await dispatch(recordPayment({ref, id, amount}));
    Toast.show("Payment Successful", { duration: Toast.durations.LONG });
    props.navigation.navigate(routes.PROFILE);
    updateStoredBalance(parseInt(amount));
  }

  const cancelPayment = () => {
    Toast.show("Transaction canceled", { duration: Toast.durations.LONG });
    props.navigation.navigate(routes.PROFILE);
    dispatch(toggleAmountModal());
  }
  
  return (
    {
      amountModal: walletSlice.amountModal,
      switchAmountModal,
      handlePayment,
      recordPaymentRef,
      cancelPayment,
      balance: currentUser && currentUser.user.wallet_balance,
      fundHistory: walletSlice.fundHistory
    }
  )
}

export default useWallet;