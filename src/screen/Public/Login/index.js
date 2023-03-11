import React, { useState, useRef } from "react";
import { View, ScrollView, Image ,TouchableOpacity} from "react-native";
import { Container, Content, Text, Icon } from "@component/Basic";
import { TextInput, Button } from "@component/Form";
import CheckBox from "react-native-check-box";
import { COLOR, FAMILY, SIZE } from "@theme/typography";
import Modal from "react-native-modalbox";

import styles from "./styles";

import theme from "@theme/styles";

import Header from "@component/Header";
import Support from "@component/Support";

import { navigate, navigateReset } from "@navigation";
import { __ } from "@utility/translation";
import request from "@utility/request";
import { bind } from "@utility/component";
import { DarkStatusBar } from "@component/StatusBar";
import PhoneInput from "react-native-phone-number-input";
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal'

export default function SignUp() {
  const [isSelected, setSelection] = useState(false);
  const [value, setValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef();

  const countryInput = useRef();
  const onSubmit = () => {
    navigateReset("PublicVerification");
  };

  const [countryCode, setCountryCode] = useState('');
  const [country, setCountry] = useState('');
  const [userName, setUserName] = useState('');
  const [mobile, setMobile] = useState('');
  const [isLoading, setLoading] = useState(false);

  const onSelect = country => {
    console.log(country);
    setCountryCode(country.cca2);
    setCountry(country);
   };

  return (
    <Container>
      <DarkStatusBar />
      <Header leftType="back" />
      <Image
        source={{
          uri: "https://cdn.pixabay.com/photo/2018/08/01/21/49/peterbilt-3578297_960_720.jpg",
        }}
        resizeMode="cover"
        style={styles.signUpBgImg}
      />
      <View style={styles.signUpBgCover} />
      <View style={styles.signUpBgContainer}>
        <Content contentContainerStyle={theme.layoutDf}>
          <View style={styles.signUpForm}>
            <Image
              source={require("@asset/images/trucklogo.png")}
              style={styles.signUpImg}
            />
            <View>
              <Text style={styles.signUpTitle}>{__("Routing System")}</Text>
              <Text style={styles.signUpText}>
                {__("Find a easy way to transfer\nyour loads")}
              </Text>
            </View>
            <View>
            <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="IN"
            textInputStyle={{padding:5}}
            containerStyle={{width:370,height:60,borderRadius:3}}
            textContainerStyle={styles.formInput4}
            onChangeFormattedText={(text) => {
              setValue(text);
            }}
            // withDarkTheme
            withShadow
            autoFocus
          />
  {/* <CountryPicker
         containerButtonStyle={{
          height: 40,
          marginTop: 5,
          justifyContent: 'center',
         }}
         countryCode={countryCode}
         withCountryNameButton={true}
         visible={false}
         withFlag={true}
         withCloseButton={true}
         withAlphaFilter={true}
         withCallingCode={true}
          //  withCurrency={true}
         withEmoji={true}
        //  withCountryNameButton={true}
         //   withCurrencyButton={true}
         //   withCallingCodeButton={true}
         withFilter={true}
         withModal={true}
         onSelect={onSelect}
        /> */}
{/* <CountryPicker theme={DARK_THEME}  withFlag={true} ref={countryInput}/> */}


{/* <TouchableOpacity
  style={styles.button}
  onPress={() => {
           const checkValid = phoneInput.current?.isValidNumber(value);
           setValid(checkValid ? checkValid : false);
           console.log(countryInput.current)
          //proceed
          }}>
  <Text>Check</Text>
</TouchableOpacity> */}
              {/* <TextInput
                placeholder="Mobile Number"
                placeholderTextColor="rgba(0,0,0,0.7)"
                style={styles.formInput3}
              /> */}
              {/* <TextInput
                placeholder="Password"
                placeholderTextColor="rgba(0,0,0,0.7)"
                style={[styles.formInput3,{marginTop:15}]}
              /> */}

              <Button style={styles.signUpBtn} onPress={onSubmit}>
                <Text style={styles.signUpBtnText}>{__("LOGIN")}</Text>
              </Button>
            </View>
            <View style={styles.signUpContent}>
              <View>
                <Text style={styles.connectText}>{__("OR")}</Text>
                <Text style={styles.connectText}>
                  {__("If you not have account")}
                  <Text
                    onPress={() => {
                      navigateReset("PublicSignUp");
                    }}
                    style={styles.connectTextLink}
                  >
                    {__("    Signup")}
                  </Text>
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  marginLeft: 100,
                }}
              >
                <CheckBox
                  rightTextStyle={styles.connectText11}
                  checkBoxColor={COLOR.GREEN}
                  onClick={() => {
                    setSelection(!isSelected);
                  }}
                  isChecked={isSelected}
                  rightText={"SIGN IN AS DRIVER"}
                />
              </View>

              {/* <View style={styles.smnItem}>
                <Button style={[styles.smnBtn, styles.smnFacebook]}>
                  <Icon name='facebook' type='FontAwesome' style={[theme.SIZE_18, theme.PRIMARY]} />
                </Button>
                <Button style={[styles.smnBtn, styles.smnTwitter]}>
                  <Icon name='twitter' type='FontAwesome' style={[theme.SIZE_18, theme.PRIMARY]} />
                </Button>
                <Button style={[styles.smnBtn, styles.smnGooglePlus]}>
                  <Icon name='google-plus' type='FontAwesome' style={[theme.SIZE_18, theme.PRIMARY]} />
                </Button>
              </View> */}
            </View>
            <Text style={styles.termText}>
              {__("By Sign in I Agree to\nTerms of Use & Privacy Policy")}
            </Text>
          </View>
        </Content>
      </View>
    </Container>
  );
}
