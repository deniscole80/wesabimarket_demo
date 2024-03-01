import React from "react";
import { StyleSheet } from "react-native";
import { Paystack } from "react-native-paystack-webview";
import Main from "../components/Main";
import useWallet from "../customHooks/useWallet";

const PaymentPage = (props) => {
    const {recordPaymentRef, cancelPayment} = useWallet(props);
    // console.log("From payment page", props.route.params);

    return (
      <Main>
        <Paystack
          paystackKey="pk_test_5089744aafd8d3f3861c11440fc14e312945affe"
          amount={props.route.params.amount}
          billingEmail={props.route.params.email}
          activityIndicatorColor="green"
          onCancel={(e) => {
            // handle response here
            console.log("canceled");
            cancelPayment();
          }}
          onSuccess={(res) => {
            // handle response here
            console.log("Payment Successful", res);
            let { reference } = res.data.transactionRef;
            recordPaymentRef(
              reference,
              props.route.params.id,
              props.route.params.amount
            );
          }}
          autoStart={true}
        />
      </Main>
    );
}

const styles = StyleSheet.create({});

export default PaymentPage;
