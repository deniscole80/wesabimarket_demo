import React from 'react';
import {View} from 'react-native';
import AppText from './AppText';
import appColor from '../utility/colors';

const EmptyData = ({message, icon, style}) => {
  return (
    <View
        style={{
            alignItems: "center",
            justifyContent: "center",
            ...style
        }}
        >
        {icon}
        <AppText
        text={message}
            style={{                      
              fontSize: 20,
              color: appColor.grey,
              textAlign: 'center',
              fontFamily: "ClarityCity-SemiBold",
            }}
        />   
    </View>
  )
}

export default EmptyData