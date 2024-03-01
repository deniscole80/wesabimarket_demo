import React from 'react';
import { ScrollView } from 'react-native';
import Container from '../components/Container';
import Main from '../components/Main';
import LoginForm from '../components/LoginForm';

function Login(props) {
    return (
        <ScrollView contentContainerStyle={{flex: 1}}>
            <Container>
                <Main>
                    <LoginForm {...props} />
                </Main>
            </Container>
        </ScrollView>
    );
}

export default Login;