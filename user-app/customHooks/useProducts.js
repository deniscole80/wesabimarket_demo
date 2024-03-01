import {useEffect} from 'react'
import routes from '../navigation/routes';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedMarket } from '../store/markets';
import { getCurrentItemSlice, loadItems, increaseItemList, decreaseItemList, changeUnit } from '../store/items';
import { addItem, decreaseItem, increaseItem, getCurrentCartSlice, changeCartUnit } from '../store/cart';

const useProducts = (props) => {

  const itemSlice = useSelector(getCurrentItemSlice);
  // console.log("the whole item slice", itemSlice);
  const chosenMarket = useSelector(getSelectedMarket);
  // console.log("Chosen market", chosenMarket);
  const cartSlice = useSelector(getCurrentCartSlice);
  // console.log("Cart Slice", cartSlice);

  const dispatch = useDispatch();
  
  useEffect(() => {
    props.owner && fetchItems();
  }, []);

  const fetchItems = async () => {
    await dispatch(loadItems());
  }

  const addItemToCart = (item) => {
    // console.log("Chosen Item", item);
    dispatch(addItem(item));
    dispatch(increaseItemList(item));
  }

  const increaseItemInCart = (item) => {
    dispatch(increaseItem(item));
    dispatch(increaseItemList(item));
  }

  const decreaseItemInCart = (item) => {
    dispatch(decreaseItem(item));
    dispatch(decreaseItemList(item));
  }

  const changeItemUnit = (id, price) => {
    console.log("Price Info", {id, price})
    dispatch(changeUnit({id, price}));
    dispatch(changeCartUnit({id, price}));
  }

  const openCart = () => {
    props.navigation.navigate(routes.CART)
  }
  
  return (
    {
      itemList: itemSlice.list, 
      openCart, 
      chosenMarket, 
      loading: itemSlice.loading, 
      cartList: cartSlice.list, 
      addItemToCart,
      increaseItemInCart,
      decreaseItemInCart,
      changeItemUnit
    }
  )
}

export default useProducts