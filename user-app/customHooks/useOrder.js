import {useEffect} from 'react'
import routes from '../navigation/routes';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentCartSlice } from '../store/cart';
import { getCurrentOrderSlice, fetchOrders } from '../store/orders';
import { getCurrentUser } from '../store/auth';
import { getSelectedMarket } from '../store/markets';

const useOrder = (props) => {
  const cartSlice = useSelector(getCurrentCartSlice);
  const chosenMarket = useSelector(getSelectedMarket);
  const orderSlice = useSelector(getCurrentOrderSlice);
  const currentUser = useSelector(getCurrentUser);
  console.log("Cart Slice Use Cart", cartSlice);
  console.log("Order Slice", orderSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    if(currentUser){dispatch(fetchOrders({user_id: currentUser.user.id}))};
  }, [currentUser]);

  const openCart = () => {
    props.navigation.navigate(routes.CART)
  }

  
  return (
    {
      cartList: cartSlice.list,
      chosenMarket,
      openCart,
      orders: orderSlice.list,
      loading: orderSlice.loading
    }
  )
}

export default useOrder