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
import CountDown from 'react-native-countdown-component';
import OTPInputView from "@twotalltotems/react-native-otp-input";
export default function Verification() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [text4, setText4] = useState("");
  const[code,setCode]=useState("")

  async function onSubmit() {
    await Support.showSuccess({
      title: __('Thank You'),
      message: __('Your phone number can be verified'),
      onHide: () => {
        navigateReset('PublicHome')
      },
      hideDelay: 2500
    })
    console.log(text1, text2, text3, text4);
  }

  return (
    <Container>
      <DarkStatusBar />
      <Header leftType="back" />
      <Image
        source={{
          uri: "https://cdn.pixabay.com/photo/2018/08/01/21/49/peterbilt-3578297_960_720.jpg",
        }}
        style={styles.verificationBgImg}
      />
      <View style={styles.verificationBgCover} />
      <View style={styles.verificationContainer}>
        <Content contentContainerStyle={theme.layoutDf}>
          <View style={styles.verificationForm}>
            <Image
              source={require("@asset/images/lock.png")}
              resizeMode="contain"
              style={styles.verificationImg}
            />
            <View>
              <Text style={styles.codeText}>{__("VERIFICATION CODE")}</Text>
              <Text style={styles.verificationTitle}>{__("CONFIRMATION")}</Text>
              <Text style={styles.verificationText}>
                {__("Please type the verification\nsent to +04 465786356")}
              </Text>
            </View>

          
            <View>
              {/* <View style={styles.formRow}>
                <TextInput
                  placeholder=""
                  placeholderTextColor="rgba(0,0,0,0.7)"
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={(value) => {
                    setText1(value);
                  }}
                  style={styles.formInput}
                  returnKeyType={"next"}
                />
                <TextInput
                  placeholder=""
                  placeholderTextColor="rgba(0,0,0,0.7)"
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={(value) => {
                    setText2(value);
                  }}
                  style={styles.formInput}
                  returnKeyType={"next"}
                />
                <TextInput
                  placeholder=""
                  placeholderTextColor="rgba(0,0,0,0.7)"
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={(value) => {
                    setText3(value);
                  }}
                  style={styles.formInput}
                />
                <TextInput
                  placeholder=""
                  placeholderTextColor="rgba(0,0,0,0.7)"
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={(value) => {
                    setText4(value);
                  }}
                  style={styles.formInput}
                />
              </View> */}
                <OTPInputView
              style={{ width: "74%", height: 200 }}
              pinCount={4}
              code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged = {cod => { setCode(cod)}}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={(cod) => {
                console.log(`Code is ${cod}, you are good to go!`);
               
              }}

              editable={true}
            />
              <Button style={styles.confirmBtn} onPress={onSubmit}>
                <Text style={styles.confirmBtnText}>{__("CONFIRM")}</Text>
              </Button>
            </View>
            <View style={styles.verificationTimeInfo}>
              <Text style={styles.resendText}>{__("RESEND CODE IN")}</Text>
              <CountDown
        until={30}
        // onFinish={() => alert('finished')}
        // onPress={() => alert('hello')}
        size={22}
        timeToShow={['S']}
        timeLabels={{ s: null}}
        digitStyle={styles.resendTime}
        digitTxtStyle={{color: 'rgba(255, 178, 41, 1)'}}
      />
              {/* <Text style={styles.resendTime}>{__("30")}</Text> */}
              <Text style={styles.resendText}>{__("SEC")}</Text>
            </View>
          </View>
        </Content>
      </View>
    </Container>
  );
}
