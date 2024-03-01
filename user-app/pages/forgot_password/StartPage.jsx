import { Formik, Field } from 'formik'
import React from 'react'
import { View } from 'react-native'
import appColor from '../../utility/colors'
import { verifyEmailSchema } from '../../utility/validators'
import AppText from '../../components/AppText'
import AppInput from '../../components/AppInput'
import AppButton from '../../components/AppButton'

const StartPage = (props) => {
  return (
    <Formik
        initialValues={{
            email: ''
        }}
        onSubmit={values => {props.userData(values)}}
        validationSchema={verifyEmailSchema}
        >
        {({ handleSubmit }) => (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <AppText text='An OTP would be sent to the valid email you provided below.' style={{fontSize: 12, marginVertical: 20, fontFamily: "ClarityCity-Bold"}}/>
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
                </View>

                <AppButton label='Send OTP' onPress={handleSubmit} style={{alignSelf: 'center', padding: 15}} labelStyle={{color: appColor.background}}/>
                
            </View>
        )}
    </Formik>
  )
}

export default StartPage