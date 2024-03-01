import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

function PickerItem({ label, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={{padding: 20}}>{label}</Text>
        </TouchableOpacity>
    );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     }
// })

export default PickerItem;