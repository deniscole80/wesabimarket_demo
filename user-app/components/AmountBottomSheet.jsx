import React from 'react';
import Modal from 'react-native-modal';
import {View, Text, TouchableOpacity} from 'react-native';
import appColor from '../utility/colors';
import { Field, Formik } from 'formik';
import AppButton from './AppButton';
import AppInput from './AppInput';
import AppText from './AppText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { amountSchema } from '../utility/validators';

const AmountBottomSheet = (props) => {
  return (
    <Modal
        style={{ padding: 0, margin: 0, width: "100%" }}
        isVisible={props.showModal}
        hasBackdrop={false}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        >
        <View
            style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            }}
        >
            <View
                style={{
                  alignItems: "flex-start",
                  backgroundColor: appColor.background,
                  padding: 20,
                  borderTopWidth: 4,
                  flexDirection: "column",
                  borderTopColor: appColor.primary,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20
                }}
              >
                <TouchableOpacity onPress={props.switchAmountModal} style={{width: "100%", alignItems: "flex-end"}}><MaterialCommunityIcons name="close" size={24} color="black" /></TouchableOpacity>
                <Text style={{fontFamily: "ClarityCity-Bold", fontSize: 20}}>Wallet Funding</Text>

                <View style={{width: '100%', marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                    <Formik
                        initialValues={{
                            amount: ''
                        }}
                        onSubmit={values => props.handlePayment(values)}
                        validationSchema={amountSchema}
                        >
                        {({ handleSubmit }) => (
                            <View style={{justifyContent: 'center', width: '100%'}}>
                                <View style={{marginBottom: 20, }}>
                                    <AppText text='Amount' style={{fontSize: 14}}/>   
                                    <Field
                                        component={AppInput}
                                        name="amount"
                                        placeholder="Enter amount"
                                        type="number"
                                    />  
                                </View>
                                <AppButton label='Fund Wallet' onPress={handleSubmit} style={{alignSelf: 'center', padding: 15, width: '80%'}} labelStyle={{color: appColor.background}}/>
                            </View>
                        )}
                    </Formik>
                </View>
            </View>   
        </View>
    </Modal>
  )
}

export default AmountBottomSheet;