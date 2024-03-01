import { Formik, Field } from 'formik'
import React from 'react'
import { View } from 'react-native'
import appColor from '../../utility/colors'
import { verifyPasswordSchema } from '../../utility/validators'
import AppButton from '../../components/AppButton'
import AppInput from '../../components/AppInput'
import AppText from '../../components/AppText'

const EndPage = (props) => {
  return (
    <Formik
        initialValues={{
            password: '',
            confirmPassword: '',
        }}
        onSubmit={values => props.userData(values)}
        validationSchema={verifyPasswordSchema}
        >
        {({ handleSubmit }) => (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <AppText text='Enter new password now' style={{fontSize: 12, marginVertical: 20, fontFamily: "ClarityCity-Bold"}}/>
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

                <AppButton label='Change Password' onPress={handleSubmit} style={{alignSelf: 'center', padding: 15}} labelStyle={{color: appColor.background}}/>
                
            </View>
        )}
    </Formik>
  )
}

export default EndPage