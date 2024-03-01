import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import appColor from '../utility/colors'
import EmptyData from './EmptyData';
import Item from './Item';

const ItemList = (props) => {
  const {itemList, addItem, decreaseItem, increaseItem, changeItemUnit} = props;

  // console.log("The item list", itemList[0]);

  const renderItem = ({ item }) => (
    <Item
      id={item.id}
      category={item.category}
      image={item.image}
      available={item.available}
      prices={item.prices}
      priceIndex={item.price_index}
      name={item.name}
      qtyInCart={item.qtyInCart}
      onAddItem={() => addItem(item)}
      onIncreaseItem={() => increaseItem(item)}
      onDecreaseItem={() => decreaseItem(item)}
      onChangeItemUnit={changeItemUnit}
    />
  );

  const getHeader = () => {
    return  (
      <View style={{padding: 20}}></View>
    )
  } 
  
  // const getFooter =()=> {
  //   return  <AppButton label='Use category' style={{alignSelf: 'center'}} labelStyle={{color: appColor.background}}/>
  // }

  return (
    <FlatList
          data={itemList}
          keyExtractor={(marketId) => marketId.id.toString()}
          numColumns={2}
          renderItem= {renderItem}            
          ListHeaderComponent={getHeader}
          // ListFooterComponent={getFooter}
          ListEmptyComponent={                
            <View
              style={{
                alignItems: "center",
              }}
            >
              <EmptyData message="Market is empty for now" style={{marginVertical: 200}} icon={<MaterialCommunityIcons name="timer-sand-empty" size={40} color={appColor.accent}/>} />       
            </View>
          }
        />
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1, 
      backgroundColor: appColor.background,
      paddingHorizontal: 10, 
      paddingVertical: 50,            
  },
  topView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 20,
    }
});

export default ItemList