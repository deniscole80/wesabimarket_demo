import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import appColor from '../utility/colors';

function AppInput(props) {
    const { field: {name, onBlur, onChange, value}, form: {errors, touched, setFieldTouched}, ...inputProps } = props;
  const hasError = errors[name] && touched[name];

    return (
        <View>
        <View style={styles.appInputContainer} >
            <TextInput 
            value={value}
            onChangeText={(text) => onChange(name)(text)}
            onBlur={() => {
            setFieldTouched(name)
            onBlur(name)
            }}
            {...inputProps} 
            style={[styles.input, hasError && styles.errorInput]}
            />
        </View>
        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    appInputContainer: {
        borderLeftWidth: 3,
        borderColor: appColor.primary,
        borderRadius: 10,    
        padding: 10,
        backgroundColor: appColor.accent,
    },

    input: {
        fontFamily: "ClarityCity-Bold", 
        color: appColor.grey
    },

    errorText: {
        fontSize: 10,
        color: 'red',
    },
    
    errorInput: {
        borderColor: 'red',
    }
});

export default AppInput;