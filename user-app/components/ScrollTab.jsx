import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import appColor from '../utility/colors';

const ScrollTab = ({data, fundHistory}) => {
    const [titles, setTitles] = useState([]);
    const [presenters, setPresenters] = useState([]);
    const [currentPresenter, setCurrentPresenter] = useState(0);
    
    const fetchTitles = async () => {
        const incomingTitles = data.map((d) => d.name);
        console.log(incomingTitles);
        setTitles(incomingTitles);
    }

    const fetchPresenters = async () => {
        const incomingPresenters = data.map((d) => d.presenter);
        console.log(incomingPresenters);
        setPresenters(incomingPresenters);
    }

    useEffect(() => {
        fetchTitles();
        fetchPresenters();
    }, [fundHistory]);

  return (
    <View style={{paddingVertical: 10, flex: 1}}>
        <View style={{paddingBottom: 20}}>
            <FlatList 
                horizontal
                data={titles}
                renderItem={({item, index}) => <TabHeader title={item} selected={index == currentPresenter ? true : false} selectTab={() => setCurrentPresenter(index)} />}
                showsHorizontalScrollIndicator={false}
            />
        </View>

        <View style={{flex: 1}}>
            {presenters[currentPresenter]}
        </View>
    </View>
  )
}

const TabHeader = ({title, selected=false, selectTab}) => {
    return (
        <TouchableOpacity
            style={selected ? styles.selectedScrollTab : styles.scrollTab}
            onPress={selectTab}
            >
            <Text style={{fontSize: 14, color: appColor.primary, fontFamily: "ClarityCity-Regular",}}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    scrollTab: {
        borderColor: appColor.primary,
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: "center",
        height: 30,
        marginRight: 15,
        paddingHorizontal: 15,
    },
    selectedScrollTab: {
        backgroundColor: appColor.secondary,
        borderRadius: 5,
        justifyContent: "center",
        height: 30,
        marginRight: 15,
        paddingHorizontal: 15,
    }
});

export default ScrollTab