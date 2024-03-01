import React from 'react';
import TopBar from '../components/TopBar';
import Container from '../components/Container';
import Main from '../components/Main';
import ItemList from '../components/ItemList';
import useProducts from '../customHooks/useProducts';
import Loader from '../components/Loader';
const _ = require("lodash");

const MarketPlace = (props) => {
  const {
    itemList, 
    chosenMarket, 
    cartList, 
    openCart, 
    loading, 
    addItemToCart,
    increaseItemInCart,
    decreaseItemInCart,
    changeItemUnit
  } = useProducts({...props, owner: true});

return (        
    <Container>
      <TopBar 
        headerText="Market Place" 
        hasMenuBar={true} 
        hasCart={{itemLength: _.sumBy(cartList, "qtyInCart"), click: openCart}} 
        market={chosenMarket && chosenMarket.name} 
        openNavigation={() => props.navigation.toggleDrawer()}
      />
      <Main>  
        {!loading ? <ItemList itemList={itemList} addItem={addItemToCart} changeItemUnit={changeItemUnit} increaseItem={increaseItemInCart} decreaseItem={decreaseItemInCart}/> : <Loader loading={loading}/>}
      </Main>                               
    </Container>
  );
}

export default MarketPlace;