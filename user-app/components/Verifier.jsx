import React, { useEffect } from 'react';
import Loader from './Loader';
import useVerifier from '../customHooks/useVerifier';

const Verifier = (props) => {
  const {loading, handleChangeData, handleSendEmail, currentScreen, handleVerifyCode} = useVerifier(props);
  const {start, verifyPage, endPage} = props;
  
  useEffect(() => {
    const getStartValue = () => {
      // console.log("Verifier", start.value);
      handleSendEmail(start.value);
    }

    if(start.value !== null){
      getStartValue();
    }
  }, [start.count]);

  useEffect(() => {
    const getVerifyValue = () => {
      // console.log("VerifierValue", verifyPage.value);
      handleVerifyCode({...verifyPage.value, ...start.value});
    }

    if(verifyPage.value !== null){
      getVerifyValue();
    }
  }, [verifyPage.verifyCount]);

  useEffect(() => {
    const getEndValue = () => {
      // console.log("EndValue", endPage.value);
      delete endPage.value.confirmPassword;
      handleChangeData({...start.value, ...endPage.value});
    }

    if(endPage.value !== null){
      getEndValue();
    }
  }, [endPage.endCount]);

  return (
    <>  
      {currentScreen == "start" && start.page}
      {currentScreen == "verify" && verifyPage.page}
      {currentScreen == "end" && endPage.page}

      <Loader loading={loading}/>
    </>
  )
}

export default Verifier