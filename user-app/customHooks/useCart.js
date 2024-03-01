import { ApiResponse } from 'apisauce';
import React, {useEffect} from 'react'
import routes from '../navigation/routes';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentCartSlice, calculateTotal, clearCart, removeItem } from '../store/cart';
import { resetItems, removeItemList } from '../store/items';

const useCart = (props) => {

  const cartSlice = useSelector(getCurrentCartSlice);
  console.log("Cart Slice Use Cart", cartSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    props.owner && dispatch(calculateTotal(cartSlice.list));
  }, [cartSlice.cartUpdateCount]);

  const clearAllCart = () => {
    dispatch(clearCart());
    dispatch(resetItems());
  }

  const removeCartItem = (item) => {
    dispatch(removeItem(item));
    dispatch(removeItemList(item))
  }

  const goBack = () => {
    props.navigation.goBack();
  }

  const checkout = () => {
    props.navigation.navigate(routes.ORDERSUMMARY);
  }
  
  return (
    {
      cartList: cartSlice.list,
      totalAmount: cartSlice.totalAmount,
      clearAllCart,
      goBack,
      removeCartItem,
      checkout,
      deliveryFee: cartSlice.deliveryFee,
      agentFee: cartSlice.agentFee
    }
  )
}

export default useCart