import React, {} from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import appColor from '../utility/colors';
import AppText from '../components/AppText';
import MarketList from '../components/MarketList';
import TopBar from '../components/TopBar';
import Container from '../components/Container';
import Main from '../components/Main';
import EmptyData from '../components/EmptyData';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useChooseMarket from '../customHooks/useChooseMarket';
import AppPicker from '../components/AppPicker';
import Loader from '../components/Loader';

const ChooseMarket = (props) => {
  const {
    statesList, 
    handleGetLgas, 
    lgaList, 
    setShowStateModal, 
    setShowLgaModal, 
    showStateModal, 
    showLgaModal, 
    selectedState, 
    selectedLga, 
    handleSelectLga, 
    marketList,
    loading,
  gotoMarket} = useChooseMarket(props);

  const renderItem = ({ item }) => (
    <MarketList
      image={item.image_url}
      name={item.name}
      onPress={() => gotoMarket(item)}
    />
  );

  return (        
          <Container>
            <TopBar headerText="Choose Market" />
            <Text style={{fontFamily: 'ClarityCity-Light', fontSize: 12}}>We suggest you choose the market closest to you.</Text>
            <Main>
              <View style={{justifyContent: 'space-around', flexDirection: 'row', width: '100%'}}>
                <View style={{width: '50%', padding: 10}}>
                  <AppText text='State' style={{fontSize: 14, fontFamily: "ClarityCity-Medium"}}/>
                  <TouchableOpacity onPress={() => setShowStateModal(!showStateModal)} style={{
                        borderRightWidth: 0,
                        borderTopWidth: 0,
                        borderBottomWidth: 0,        
                        backgroundColor: appColor.accent,                        
                        borderLeftWidth: 3,
                        borderLeftColor: appColor.primary,
                        padding: 15,
                        borderRadius: 10,
                        flexDirection: 'row'
                    }}
                  >
                    <Text style={{color: appColor.primary,                        
                        fontFamily: "ClarityCity-Medium"}}>{selectedState && selectedState.label}</Text>
                  </TouchableOpacity>
                  <AppPicker
                    show={showStateModal}
                    onCancel={() => setShowStateModal(!showStateModal)}
                    items={statesList}
                    chooseItem={(selectedState) => handleGetLgas(selectedState)}
                  />
                </View>
                <View style={{width: '50%', padding: 10}}>
                  <AppText text='LGA' style={{fontSize: 14, fontFamily: "ClarityCity-Medium"}}/>
                  <TouchableOpacity onPress={() => setShowLgaModal(!showLgaModal)} style={{
                        borderRightWidth: 0,
                        borderTopWidth: 0,
                        borderBottomWidth: 0,        
                        backgroundColor: appColor.accent,                        
                        borderLeftWidth: 3,
                        borderLeftColor: appColor.primary,
                        padding: 15,
                        borderRadius: 10,
                        flexDirection: 'row'
                    }}
                  >
                    <Text style={{color: appColor.primary,                        
                        fontFamily: "ClarityCity-Medium",}}>{selectedLga && selectedLga.label}</Text>
                  </TouchableOpacity>
                  <AppPicker
                    show={showLgaModal}
                    onCancel={() => setShowLgaModal(!showLgaModal)}
                    items={lgaList}
                    chooseItem={(selectedLga) => handleSelectLga(selectedLga)}
                  />
                </View>
              </View>
              <View style={{flex: 1, justifyContent: "center", alignItems: "center", marginTop: 20}}>
                <FlatList
                  data={marketList}
                  keyExtractor={(marketId) => marketId.id.toString()}
                  numColumns={2}
                  renderItem={renderItem}
                  ListEmptyComponent={
                    <EmptyData style={{marginTop: 300}} message="No market available" icon={<MaterialCommunityIcons name="timer-sand-empty" size={40} color={appColor.accent} />} />
                  }
                  />  
                </View>
                <Loader loading={loading}/>
              </Main>                               
          </Container>
      );
  }

  const styles = StyleSheet.create({
      container: {
          flex: 1, 
          backgroundColor: appColor.background,
          paddingHorizontal: 20, 
          paddingVertical: 50    
      },    
      topView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30
      }
  });

export default ChooseMarket;