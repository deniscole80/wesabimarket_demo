import React, {useState} from 'react';
import {Text} from 'react-native';
import Container from '../components/Container';
import TopBar from '../components/TopBar';
import Main from '../components/Main';
import WalletCard from '../components/WalletCard';
import routes from '../navigation/routes';
import ScrollTab from '../components/ScrollTab';
import FundHistoryList from '../components/FundHistoryList';
import TransactionList from '../components/TransactionList';
import AmountBottomSheet from '../components/AmountBottomSheet';
import useWallet from '../customHooks/useWallet';
import useAuth from '../customHooks/useAuth';
import useProducts from '../customHooks/useProducts';
const _ = require("lodash");

const UserProfile = (props) => {
    const {currentUser} = useAuth(props);
    const {amountModal, switchAmountModal, handlePayment, fundHistory} = useWallet(props);
    const {chosenMarket, cartList, openCart} = useProducts({...props, owner: true});
    console.log("History on page", fundHistory);
    
    const transactionList = [
        // {id: 1, type: 'Debit', description: 'Money Transfer', amount: 45000, via: 'Transfer', cartId: '122392', date: '26-10-2020', time: '10:00 AM'},
        // {id: 2, type: 'Debit', description: 'Money Transfer', amount: 12000, via: 'Transfer', cartId: '388473', date: '26-05-2023', time: '12:50 AM'}
    ]

    return (
        <Container>
            <TopBar 
                headerText="Profile" 
                hasMenuBar={true} 
                hasCart={{itemLength: _.sumBy(cartList, "qtyInCart"), click: openCart}} 
                market={chosenMarket && chosenMarket.name} openNavigation={() => props.navigation.toggleDrawer()} 
            />
            <Main>
                <WalletCard startFunding={switchAmountModal} balance={currentUser && currentUser.user.wallet_balance} firstname={currentUser && currentUser.user.first_name} />
                <ScrollTab fundHistory={fundHistory} data={[{name: "Fund History", presenter: <FundHistoryList fundHistory= {fundHistory} />}, {name: "Transactions", presenter: <TransactionList fundList={transactionList} />}]}/>
                <AmountBottomSheet showModal={amountModal} switchAmountModal={switchAmountModal} handlePayment={handlePayment}/>
            </Main>
        </Container>
    )
}

export default UserProfile