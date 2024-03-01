import React from 'react';
import PickerItem from './PickerItem';
import { Modal, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';

function AppPicker({ show, onCancel, items, chooseItem }) {
    return (
        <Modal visible={show} animationType='slide'>
            <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', padding: 20}} onPress={onCancel}>
                <Text style={{color: '#cc0000', fontWeight: '600'}}>Cancel</Text>
            </TouchableOpacity>
            <FlatList 
                data={items}
                keyExtractor={item => item.value}
                renderItem={({item}) => <PickerItem label={item.label} onPress={() => chooseItem(item)}/>}
            />
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'rgba(0,0,0)'
    }
})

export default AppPicker;