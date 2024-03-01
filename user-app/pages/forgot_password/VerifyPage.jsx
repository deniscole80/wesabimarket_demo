import { Formik, Field } from 'formik'
import React from 'react'
import { View } from 'react-native'
import appColor from '../../utility/colors'
import { verifyCodeSchema } from '../../utility/validators'
import AppText from '../../components/AppText'
import AppButton from '../../components/AppButton'
import AppInput from '../../components/AppInput'


const VerifyPage = (props) => {
  return (
    <Formik
        initialValues={{
            code: ''
        }}
        onSubmit={values => props.userData(values)}
        validationSchema={verifyCodeSchema}
        >
        {({ handleSubmit }) => (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <AppText text='Enter the OTP sent to your email now.' style={{fontSize: 12, marginVertical: 20, fontFamily: "ClarityCity-Bold"}}/>
                <View style={{marginVertical: 10}}>                
                    <View style={{marginBottom: 20}}>
                        <AppText text='OTP Code' style={{fontSize: 14}}/>   
                        <Field
                            component={AppInput}
                            name="code"
                            placeholder="123456"
                            type="number"
                        />  
                    </View>
                </View>

                <AppButton label='Verify OTP' onPress={handleSubmit} style={{alignSelf: 'center', padding: 15}} labelStyle={{color: appColor.background}}/>
                
            </View>
        )}
    </Formik>
  )
}

export default VerifyPage