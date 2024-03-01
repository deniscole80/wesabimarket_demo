import React from 'react';
import { View, StyleSheet } from 'react-native';
import appColor from '../utility/colors';
import AppButton from './AppButton';
import AppInput from './AppInput';
import AppText from './AppText';
import DropDown from './DropDown';
import {Formik, Field} from "formik";

import useAuth from '../customHooks/useAuth';
import { registrationSchema } from '../utility/validators';
import routes from '../navigation/routes';
import Loader from './Loader';

const RegistrationForm = (props) => {
    const {handleRegister, showScreen, loading} = useAuth(props);
    
  return (
    <Formik
        initialValues={{
            first_name: '',
            last_name: '',
            email: '',
            mobile: '',
            gender: '',
            password: '',
            confirmPassword: '',
        }}
        onSubmit={values => handleRegister(values)}
        validationSchema={registrationSchema}
        >
        {({ handleSubmit, setFieldValue }) => (
            <>
                <View style={{marginVertical: 20}}>
                    <AppText text='First Name' style={{fontSize: 14, fontFamily: "ClarityCity-Medium"}}/>   
                    <Field 
                        component={AppInput}
                        name="first_name"
                        placeholder="First Name"
                    />         
                </View>
                <View style={{marginBottom: 20}}>
                    <AppText text='Last Name' style={{fontSize: 14, fontFamily: "ClarityCity-Medium"}}/>   
                    <Field 
                        component={AppInput}
                        name="last_name"
                        placeholder="Last Name"
                    />         
                </View>
                <View style={{marginBottom: 20}}>
                    <AppText text='Email Address' style={{fontSize: 14, fontFamily: "ClarityCity-Medium"}}/>   
                    <Field
                        component={AppInput}
                        name="email"
                        placeholder="name@company.com"
                        type="email"
                    />         
                </View>
                <View style={{marginBottom: 20}}>
                    <AppText text='Mobile' style={{fontSize: 14, fontFamily: "ClarityCity-Medium"}}/>   
                    <Field
                        component={AppInput}
                        name="mobile"
                        placeholder="08023******"
                    />
                </View>
                <View style={{marginBottom: 20}}>
                    <AppText text='Gender' style={{fontSize: 14, fontFamily: "ClarityCity-Medium"}}/>
                    <DropDown
                    dropValue=''
                    labelStyle={{
                        color: appColor.primary,                        
                        fontFamily: "ClarityCity-Medium"
                    }}
                    containerStyle={{
                        fontFamily: "ClarityCity-Medium"
                    }}
                    myStyle={{
                        borderColor: appColor.primary,
                        borderRightWidth: 0,
                        borderTopWidth: 0,
                        borderBottomWidth: 0,        
                        backgroundColor: appColor.accent,                        
                        borderLeftWidth: 3,
                        borderLeftColor: appColor.primary,                        
                        fontFamily: "ClarityCity-Medium"
                    }}
                    textStyle={{
                    color: appColor.primary,
                    fontFamily: "ClarityCity-Medium"
                    }}
                    dropItems={[
                        {label: 'Male', value: 'male'},
                        {label: 'Female', value: 'female'}
                    ]}
                    direction="TOP"
                    onSelect={(value) => setFieldValue("gender", value)}
                    />
                </View>
                <View style={{marginBottom: 20}}>
                    <AppText text='Password' style={{fontSize: 14, fontFamily: "ClarityCity-Medium"}}/>   
                    <Field
                        component={AppInput}
                        name="password"
                        placeholder="Password"
                        secureTextEntry
                    />         
                </View>
                <View style={{marginBottom: 20}}>
                    <AppText text='Confirm Password' style={{fontSize: 14, fontFamily: "ClarityCity-Medium"}}/>   
                    <Field
                        component={AppInput}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        secureTextEntry
                    />    
                </View>
                <AppButton label='Create Account' style={styles.button} labelStyle={{color: appColor.background}} onPress={handleSubmit}/>
                <AppButton label='Already have an account' onPress={() => showScreen(routes.LOGIN)} style={{...styles.button, backgroundColor: appColor.secondary, marginTop: 20 }} labelStyle={{color: appColor.background}}/>

                <Loader loading={loading}/>
            </>
        )}
    </Formik>
  )
}

const styles = StyleSheet.create({
    button: {
         alignSelf: 'center', padding: 15
    },
    container: {
        flex: 1, 
        backgroundColor: appColor.background,
        paddingHorizontal: 10, 
        paddingBottom: 50,
        paddingTop: 50,  
     
    },
    image: {
        width: 60, 
        height: 45   
    },
    
});

export default RegistrationForm