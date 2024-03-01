import React from 'react';
import { ScrollView } from 'react-native';
import TopBar from '../components/TopBar';
import Main from '../components/Main';
import Container from '../components/Container';

import RegistrationForm from '../components/RegistrationForm';

function Register(props) {

    return (
        <ScrollView>
            <Container>
                <TopBar headerText="Get Started"/>
                <Main>
                    <RegistrationForm {...props}  />
                </Main>
            </Container>
        </ScrollView>
    );
}

export default Register;