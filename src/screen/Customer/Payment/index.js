import React, { useState } from "react";
import { View, ScrollView, Image } from "react-native";
import { Container, Content, Text, Icon } from "@component/Basic";
import { TextInput, Button } from "@component/Form";
// import notifee, { AndroidImportance, EventType } from "@notifee/react-native";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CreditCardInput } from "react-native-credit-card-input";
import Header from "@component/Header";
import Support from "@component/Support";
import axios from "axios";
import { navigate, navigateReset } from "@navigation";
import { __ } from "@utility/translation";

import { DarkStatusBar } from "@component/StatusBar";

export default function Payment() {
  const [CardInput, setCardInput] = useState({});

  const postData = async () => {
    var data = await AsyncStorage.getItem("response");
    var datas = JSON.parse(data);
    console.log(CardInput.values.expiry.split("/"));

    const res = axios
      .post(
        ` https://routeon.mettlesol.com/v1/payment`,
        {
          card_number: CardInput.values.number,
          card_exp_month: CardInput.values.expiry.split("/")[0],
          card_exp_year: CardInput.values.expiry.split("/")[1],
          card_cvc: CardInput.values.cvc,
        },
        {
          headers: {
            Authorization: `Bearer ${datas.access_token}`,
          },
        }
      )
      .then((data) => {
        console.log("res", data.data.payment_method);

        makePaymentByUser(data.data.payment_method);
      })
      .catch((err) => {
        console.log(("error", err));
      });
  };

  const makePaymentByUser = async (method) => {
    console.log("Method in paymentByUser ", method);
    var data = await AsyncStorage.getItem("response");
    var datas = JSON.parse(data);
    // console.log(datas);

    axios
      .post(
        ` https://routeon.mettlesol.com/v1/payment/transfer`,
        {
          paymentMethod: method,
          currency: "cad",
          amount: "250",
          rider_account: "acct_1MwmIbPu2iasesq5",
        },
        {
          headers: {
            Authorization: `Bearer ${datas.access_token}`,
          },
        }
      )
      .then((data) => {
        console.log("result to make payment", data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  async function onSubmit() {
    if (CardInput.valid == false || typeof CardInput.valid == "undefined") {
      alert("Invalid Credit Card");
      return false;
    } else {
      await Support.showSuccess({
        title: __("Success!"),
        message: __("Transaction success"),
        onHide: () => {
          console.log(CardInput);
          // makePaymentByUser();
          postData();
          // onDisplayNotification();
          // navigateReset("PublicHome");
        },
        hideDelay: 2500,
      });
    }
  }

  async function onDisplayNotification() {
    const channelId = await notifee.createChannel({
      id: "important",
      name: "Important Notifications",
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: "Your New Order Is Ready ",
      body: "You can see you order requirment going to in my Trip",
      android: {
        channelId,
        // largeIcon: require('../../../../assets/images/fb.png'),
        importance: AndroidImportance.HIGH,
        // ongoing: true,
      },
    });
  }

  return (
    <Container>
      <DarkStatusBar />
      <Header leftType="back" />
      <View style={styles.paymentHeader}>
        <Text style={styles.paymentHeaderTitle}>{__("PAYMENT")}</Text>
        <Text style={styles.paymentHeaderText}>
          {__("CHOOSE YOUR PAYMENT")}
        </Text>
      </View>
      <Container>
        {/* <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.tabInfo}>
            <Button
              style={
                PaymentTabSelected === "card"
                  ? styles.tabActive1
                  : styles.tabInactive
              }
              onPress={() => setPaymentTabSelected("card")}
            >
              <Image
                source={require("@asset/images/payment-card.png")}
                style={
                  PaymentTabSelected === "card"
                    ? styles.tabImgActive
                    : styles.tabImgInactive
                }
                resizeMode="contain"
              />
            </Button>
            <Button
              style={
                PaymentTabSelected === "paypal"
                  ? styles.tabActive1
                  : styles.tabInactive
              }
              onPress={() => setPaymentTabSelected("paypal")}
            >
              <Image
                source={require("@asset/images/download.png")}
                style={
                  PaymentTabSelected === "paypal"
                    ? styles.tabImgActive
                    : styles.tabImgInactive
                }
                resizeMode="contain"
              />
            </Button>
          </View>
          <View style={styles.paymentContainer}>
            {PaymentTabSelected === "card"
              ? renderCard()
              : PaymentTabSelected === "paypal"
              ? renderPayPal()
              : null}
          </View>
        </ScrollView> */}
        <View style={styles.payPalInfo}>
          {/* <Image
         style={styles.cardImg}
         source={require("@asset/images/downloadicon.png")}
       /> */}

          <CreditCardInput
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            validColor="#fff"
            placeholderColor="#ccc"
            onChange={(data) => {
              setCardInput(data);
            }}
          />
        </View>
      </Container>
      <Button
        style={styles.payBtn}
        onPress={() => {
          onSubmit();
        }}
      >
        <Text style={styles.payBtnText}>{__("MAKE A PAYMENT")}</Text>
      </Button>
    </Container>
  );
}
