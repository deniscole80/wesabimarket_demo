import React from 'react';
import { View, StyleSheet} from 'react-native';
import appColor from '../utility/colors';
import AppButton from './AppButton';
import AppInput from './AppInput';
import AppText from './AppText';
import {Formik, Field} from "formik";

import useAuth from '../customHooks/useAuth';
import Loader from './Loader';

const AddressForm = (props) => {
    const {handleAddAddress, getBusy} = useAuth(props);
    
  return (
    <Formik
        initialValues={{
            firstname: '',
            lastname: '',
            mobile1: '',
            mobile2: '',
            address: '',
            info: ''
        }}
        onSubmit={values => handleAddAddress(values)}
        // validationSchema={addressSchema}
        >
        {({ handleSubmit }) => (
            <>
                <View style={{marginVertical: 20}}>
                    <AppText text='First Name' style={{fontSize: 14, fontFamily: "ClarityCity-Medium"}}/>   
                    <Field 
                        component={AppInput}
                        name="firstname"
                        placeholder="First Name"
                    />         
                </View>
                <View style={{marginBottom: 20}}>
                    <AppText text='Last Name' style={{fontSize: 14, fontFamily: "ClarityCity-Medium"}}/>   
                    <Field 
                        component={AppInput}
                        name="lastname"
                        placeholder="Last Name"
                    />         
                </View>
                <View style={{marginBottom: 20}}>
                    <AppText text='Phone number' style={{fontSize: 14, fontFamily: "ClarityCity-Medium"}}/>   
                    <Field
                        component={AppInput}
                        name="mobile1"
                        placeholder="08023******"
                        inputMode="tel"
                    />         
                </View>
                <View style={{marginBottom: 20}}>
                    <AppText text='Additional Phone number' style={{fontSize: 14, fontFamily: "ClarityCity-Medium"}}/>   
                    <Field
                        component={AppInput}
                        name="mobile2"
                        placeholder="08023******"
                        inputMode="tel"
                    />
                </View>
                <View style={{marginBottom: 20}}>
                    <AppText text='Address' style={{fontSize: 14, fontFamily: "ClarityCity-Medium"}}/>   
                    <Field 
                        component={AppInput}
                        name="address"
                        placeholder="Address information"
                    />         
                </View>
                <View style={{marginBottom: 20}}>
                    <AppText text='Additional Information' style={{fontSize: 14, fontFamily: "ClarityCity-Medium"}}/>   
                    <Field 
                        component={AppInput}
                        name="info"
                        placeholder="Additional information"
                    />         
                </View>
                
                <AppButton label='Save' style={styles.button} labelStyle={{color: appColor.background}} onPress={handleSubmit}/>
                
                <Loader loading={getBusy}/>
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

export default AddressForm