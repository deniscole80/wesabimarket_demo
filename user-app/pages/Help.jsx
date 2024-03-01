import React from 'react'
import Container from '../components/Container';
import TopBar from '../components/TopBar';
import Main from '../components/Main';
import useProducts from '../customHooks/useProducts';
const _ = require("lodash");

const Help = (props) => {
    const { 
        chosenMarket, 
        cartList, 
        openCart
      } = useProducts({...props, owner: true});

    return (
        <Container>
            <TopBar 
                headerText="Help" 
                hasMenuBar={true} 
                hasCart={{itemLength: _.sumBy(cartList, "qtyInCart"), click: openCart}} 
                market={chosenMarket && chosenMarket.name} 
                openNavigation={() => props.navigation.toggleDrawer()}
            />
            <Main></Main>
        </Container>
    )
}

export default Help