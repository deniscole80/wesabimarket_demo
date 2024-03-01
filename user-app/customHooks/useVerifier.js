import {useState} from 'react';
import Toast from 'react-native-root-toast';
import routes from '../navigation/routes';
import AuthApi from '../api/auth';
import StatusCode from '../utility/status_codes';
import { ApiResponse } from 'apisauce';

const useVerifier = (props) => {
    const [loading, setLoading] = useState(false);
    const {successful} = StatusCode;
    const [currentScreen, setCurrentScreen] = useState('start');

    // useEffect(() => {
    //     fetchProducts();
    // }, []);

    const handleSendEmail = async (userEmail) => {
        setLoading(true);
        console.log("user", userEmail);
        const response = await AuthApi.sendCode(userEmail);
        console.log(response);
        const {message} = response.data;
        if(response.status == successful.created){
            Toast.show(message, { duration: Toast.durations.LONG });
            setLoading(false);
            setCurrentScreen("verify");
        }else{
            Toast.show(message, { duration: Toast.durations.LONG });
            setLoading(false);
        }
    }

    const handleVerifyCode = async (code) => {
        console.log("CodeData", code);
        setLoading(true);
        const response = await AuthApi.verifyCode(code);
        console.log(response);
        const {message} = response.data;
        if(response.status == successful.accepted){
            Toast.show(message, { duration: Toast.durations.LONG });
            setLoading(false);
            setCurrentScreen("end");
        }else{
            Toast.show(message, { duration: Toast.durations.LONG });
            setLoading(false);
        }
    }

    const handleChangeData = async (data) => {
        console.log("ChangeData", data);
        setLoading(true);
        const response = await AuthApi.changePassword(data);
        console.log("Change Password", response);
        const {message} = response.data;
        if(response.status == successful.created){
            Toast.show(message, { duration: Toast.durations.LONG });
            setLoading(false);
            props.navigation.navigate(routes.LOGIN);
        }else{
            Toast.show(message, { duration: Toast.durations.LONG });
            setLoading(false);
        }
    }

    const handleSwitchScreen = () => {
        // setCurrentScreen(screen);
        return currentScreen;
    }

  return {handleSendEmail, handleVerifyCode, handleChangeData, handleSwitchScreen, currentScreen, loading};
}

export default useVerifier