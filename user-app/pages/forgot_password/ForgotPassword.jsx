import React, { useState } from 'react';
import Verifier from '../../components/Verifier';
import Container from '../../components/Container';
import Main from '../../components/Main';
import TopBar from '../../components/TopBar';
import StartPage from './StartPage';
import EndPage from './EndPage';
import VerifyPage from './VerifyPage';

const ForgotPassword = (props) => {
    const [sValue, setSValue] = useState(null);
    const [count, setCount] = useState(0);

    const [verifyCount, setVerifyCount] = useState(0);
    const [vValue, setVValue] = useState(null);

    const [endCount, setEndCount] = useState(0);
    const [eValue, setEValue] = useState(null);
    
    const setStartValue = (startValue) => {
      // console.log("StartValue", startValue);
      setSValue(startValue);
      setCount(count + 1);
    }

    const setVerifyValue = (verifyValue) => {
      // console.log("StartValue", startValue);
      setVValue(verifyValue);
      setVerifyCount(verifyCount + 1);
    }

    const setEndValue = (endValue) => {
      // console.log("EndValue", endValue);
      setEValue(endValue);
      setEndCount(endCount + 1);
    }

  return (
    <Container>
        <TopBar hasBackButton={true} headerText={"Forgot Password"} />
        <Main>
            <Verifier {...props} start={{value: sValue, page: <StartPage userData={setStartValue} />, count}} verifyPage={{value: vValue, page: <VerifyPage userData={setVerifyValue} />, verifyCount}} endPage={{value: eValue, page: <EndPage userData={setEndValue} />, endCount}}/>
        </Main>
    </Container>
  )
}

export default ForgotPassword