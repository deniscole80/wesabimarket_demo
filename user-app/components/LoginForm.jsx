import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import appColor from '../utility/colors';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import AppText from '../components/AppText';
import useAuth from '../customHooks/useAuth';
import routes from '../navigation/routes';
import { Field, Formik } from 'formik';
import { loginSchema } from '../utility/validators';
import Loader from './Loader';

const LoginForm = (props) => {
    const {handleLogin, showScreen, loading} = useAuth(props);

  return (
    <Formik
        initialValues={{
            email: '',
            password: '',
        }}
        onSubmit={values => handleLogin(values)}
        validationSchema={loginSchema}
        >
        {({ handleSubmit }) => (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Image style={styles.image} source={require('../assets/logo2.jpg')}/>
                <AppText text='Welcome,' style={{fontSize: 25, marginVertical: 20, fontFamily: "ClarityCity-ExtraBold"}}/>
                <View style={{marginVertical: 10}}>                
                    <View style={{marginBottom: 20}}>
                        <AppText text='Email' style={{fontSize: 14}}/>   
                        <Field
                            component={AppInput}
                            name="email"
                            placeholder="name@company.com"
                            type="email"
                        />  
                    </View>
                    <View style={{marginBottom: 20}}>
                        <AppText text='Password' style={{fontSize: 14}}/>   
                        <Field
                            component={AppInput}
                            name="password"
                            placeholder="Password"
                            secureTextEntry
                        />         
                    </View>
                    <TouchableOpacity onPress={() => showScreen(routes.FORGOTPASSWORD)} style={{alignItems: "flex-end", marginBottom: 5}}><AppText text="Forgot Password?" style={{fontSize: 15, fontFamily: "ClarityCity-Regular"}} /></TouchableOpacity>
                </View>
                <AppButton label='Log in' onPress={handleSubmit} style={styles.button} labelStyle={{color: appColor.background}}/>
                <AppButton label="I don't have an account" onPress={() => showScreen(routes.REGISTER)} style={{...styles.button, backgroundColor: appColor.secondary, marginTop: 20 }} labelStyle={{color: appColor.background}}/>

                <Loader loading={loading}/>
            </View>
        )}
    </Formik>
  )
}

const styles = StyleSheet.create({
    button: {
        alignSelf: 'center', padding: 15
    },
    image: {
        width: 100, 
        height: 100,
        alignSelf: 'center'
    },
    
});

export default LoginForm