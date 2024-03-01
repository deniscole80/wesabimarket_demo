import React from 'react';
import {View} from 'react-native';

const Main = ({children, style}) => {
  return (
  <View style={{...style, flex: 1}}>{children}</View>
  )
}

export default Main