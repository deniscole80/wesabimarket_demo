import React, {useState} from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const DropDown = ({dropItems, dropValue, direction = "AUTO", labelStyle, containerStyle, myStyle, textStyle, onSelect}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(dropValue);
  const [items, setItems] = useState(dropItems);
    return (
        <View style={{width: '100%'}}>
            <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            multiple={false}
            dropDownDirection={direction}
            labelStyle={labelStyle}
            containerStyle={containerStyle}  
            style={myStyle}
            textStyle={textStyle}
            mode="BADGE"
            listMode='SCROLLVIEW'
            theme="LIGHT"
            onSelectItem={(value) => onSelect(value)}
            />
        </View>
    );
}

export default DropDown;