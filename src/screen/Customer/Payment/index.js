import React, { useState } from "react";
import { View, ScrollView, Image } from "react-native";
import { Container, Content, Text, Icon } from "@component/Basic";
import { TextInput, Button } from "@component/Form";

import styles from "./styles";
import theme from "@theme/styles";

import Header from "@component/Header";
import Support from "@component/Support";

import { navigate, navigateReset } from "@navigation";
import { __ } from "@utility/translation";
import request from "@utility/request";
import { bind } from "@utility/component";
import { DarkStatusBar } from "@component/StatusBar";

export default function Payment() {
  const [PaymentTabSelected, setPaymentTabSelected] = useState("card");

  async function onSubmit() {
    await Support.showSuccess({
      title: __("Success!"),
      message: __("Transaction success"),
      onHide: () => {
        navigateReset("");
      },
      hideDelay: 2500,
    });
  }

  function renderCard() {
    return (
      <View>
        <View style={styles.paymentForm}>
          <View style={styles.formRow}>
            <Text style={styles.formText}>{__("NAME ON CARD")}</Text>
            <TextInput
              placeholder="Carol cartex"
              placeholderTextColor="#000"
              style={styles.formInput}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formText}>{__("CARD NUMBER")}</Text>
            <TextInput
              placeholder="0000 3434 7867 9523"
              keyboardType="numeric"
              placeholderTextColor="#000"
              style={styles.formInput}
            />
          </View>
          <View style={styles.cardInfo}>
            <View style={styles.formRow2}>
              <Text style={styles.formText}>{__("EXPIRY DATE")}</Text>
              <TextInput
                placeholder="19 / 2019"
                placeholderTextColor="#000"
                keyboardType="numeric"
                style={styles.formInput}
              />
            </View>
            <View style={styles.formRow}>
              <Text style={styles.formText}>{__("CVV")}</Text>
              <TextInput
                placeholder="657"
                placeholderTextColor="#000"
                keyboardType="numeric"
                style={styles.formInput}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  function renderPayPal() {
    return (
      <View style={styles.payPalInfo}>
        <Button>
          <Image
            style={styles.cardImg}
            source={require("@asset/images/downloadicon.png")}
          />
        </Button>
      </View>
    );
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
      <Content contentContainerStyle={theme.layoutDf}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.tabInfo}>
            <Button
              style={
                PaymentTabSelected === "card"
                  ? styles.tabActive
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
                  ? styles.tabActive
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
        </ScrollView>
      </Content>
      <Button style={styles.payBtn} onPress={onSubmit}>
        <Text style={styles.payBtnText}>{__("MAKE A PAYMENT")}</Text>
      </Button>
    </Container>
  );
}
