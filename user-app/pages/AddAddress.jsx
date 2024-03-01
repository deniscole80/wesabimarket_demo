import React from 'react';
import { ScrollView } from 'react-native';
import TopBar from '../components/TopBar';
import Main from '../components/Main';
import Container from '../components/Container';
import useProducts from '../customHooks/useProducts'
import AddressForm from '../components/AddressForm';

function ChangeAddress(props) {
    const {chosenMarket} = useProducts({...props, owner: false});
    return (
        <ScrollView style={{backgroundColor: "#fff"}}>
            <Container>
            <TopBar hasBackButton={true} headerText={"Add Address"} market={chosenMarket && chosenMarket.name} goBack={() => props.navigation.goBack()} />
                <Main>
                    <AddressForm {...props}  />
                </Main>
            </Container>
        </ScrollView>
    );
}

export default ChangeAddress;