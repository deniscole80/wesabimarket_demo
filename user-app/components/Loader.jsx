import React from 'react'
import { View } from 'react-native'
import Modal from "react-native-modal";
import { Circle } from "react-native-animated-spinkit";
import appColor from '../utility/colors'

const Loader = ({loading}) => {
  return (
    <Modal
        style={{ padding: 0, margin: 0, width: "100%" }}
        isVisible={loading}
        hasBackdrop={false}
        animationIn="fadeIn"
        animationOut="fadeOut"
        >
        <View
            style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.2)",
            }}>
            <View style={{justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.7)", width: 100, height: 100, borderRadius: 10}}>
            <Circle
                size={24}
                color={ appColor.mutedWhite }
            />
            </View>
        </View>
    </Modal>
  )
}

export default Loader;