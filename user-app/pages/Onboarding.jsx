import React, {} from 'react';
import { StyleSheet, View } from 'react-native';
// import * as SplashScreen from "expo-splash-screen";

import appColor from '../utility/colors';
import AppButton from '../components/AppButton';
import routes from '../navigation/routes';
import Slider from '../components/Slider';


function Onboarding({navigation}) {
    // const [loaded, setLoaded] = useState(true);
    // const dispatch = useDispatch();
    // const currentStateUser = useSelector(getCurrentUser)
    // console.log("CurrentUser from Onboarding", currentStateUser);

    const logScreen=()=>{
        navigation.navigate(routes.LOGIN)
    }

    const regScreen=()=>{
        navigation.navigate(routes.REGISTER)
    }
    return (
        <View style={styles.container}>
            <Slider />
            
            <View style={{justifyContent: "center", alignItems: "center"}}>
            <AppButton style={{...styles.buttonStyle}} label='Start now' onPress={regScreen} labelStyle={{color: appColor.primary}}/> 
            <AppButton style={{...styles.buttonStyle, borderColor: appColor.secondary}} label='I already have an account' 
            onPress={logScreen} labelStyle={{color: appColor.secondary}} 
            />
            </View>           
        </View>
    );
}

const styles = StyleSheet.create({
    buttonStyle: { 
        backgroundColor: appColor.background,       
        borderColor: appColor.primary,
        borderWidth: 1,
        marginTop: 10    
    },
    container: {
        paddingBottom: 20,        
        backgroundColor: appColor.background,
        flex: 1, 
        paddingTop: 60
    }
    
});

export default Onboarding;