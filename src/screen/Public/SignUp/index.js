import React, { useState, useRef } from "react";
import { View, ScrollView, Image } from "react-native";
import CheckBox from "react-native-check-box";
import { Container, Content, Text, Icon } from "@component/Basic";
import { TextInput, Button } from "@component/Form";
import { COLOR, FAMILY, SIZE } from "@theme/typography";
import CountryPicker, { DARK_THEME } from "react-native-country-picker-modal";
import Modal from "react-native-modalbox";
import PhoneInput from "react-native-phone-number-input";
import styles from "./styles";
import theme from "@theme/styles";
import Accordion from "./Accordion";

import Header from "@component/Header";
import Support from "@component/Support";

import { navigate, navigateReset } from "@navigation";
import { __ } from "@utility/translation";
import request from "@utility/request";
import { bind } from "@utility/component";
import { DarkStatusBar } from "@component/StatusBar";

export default function SignUp() {
  const phoneInput = useRef();
  const [value, setValue] = useState("");
  const onSubmit = () => {
    navigateReset("PublicVerification");
  };
  const [isSelected, setSelection] = useState(false);

  const [countryCode, setCountryCode] = useState("");
  const [country, setCountry] = useState("");
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [gender, setGender] = useState("");

  const [dropDownedOpen, setDropDownedOpen] = useState(false)

  const onSelect = (country) => {
    console.log(country);
    setCountryCode(country.cca2);
    setCountry(country);
  };

  // console.log("muneeb",firstName)
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
   
              <View style={styles.formRow}>
                <TextInput
                  // defaultValue={firstName}
                  placeholder="First Name"
                  placeholderTextColor="rgba(0,0,0,0.7)"
                  style={[styles.formInput,{flex:1}]}
                  onChangeText={(value)=>{setFirstName(value)}}
                 
                />
                <TextInput

                  placeholder="Last Name"
                  placeholderTextColor="rgba(0,0,0,0.7)"
                  style={[styles.formInput, styles.formInput2,{flex:1}]}
                  onChangeText={(value)=>{setSecondName(value);
                  }}
                />
              </View>
           
              
              {/* <TextInput
                placeholder="Email Address"
                placeholderTextColor="rgba(0,0,0,0.7)"
                style={styles.formInput3}
              /> */}
              <View style={styles.formRow}>
                {/* <TextInput
                  placeholder="Enter Country"
                  placeholderTextColor="rgba(0,0,0,0.7)"
                  style={styles.formInput}
                /> */}

                <Accordion
                  title= {gender?gender:"Select Gender"}
                  renderContent={() => (
                    <View style={styles.accOrderInfo}>
                      <Button onPress={()=>{setDropDownedOpen(!dropDownedOpen);
                      setGender("Male");
                      }}>
                        <Text style={styles.accText}>{__("MALE")}</Text>
                      </Button>
                      <Button  onPress={()=>{setDropDownedOpen(!dropDownedOpen);
                         setGender("Female");}}>
                        <Text style={styles.accText}>{__("FEMALE")}</Text>
                      </Button>
                    
                    </View>
                  )}
                  opened={dropDownedOpen}
                  setOpened={setDropDownedOpen}
                />
         
                {/* <CountryPicker
                  containerButtonStyle={styles.formInput}
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
         

                {/* <TextInput
                  placeholder="Enter Gender"
                  placeholderTextColor="rgba(0,0,0,0.7)"
                  style={[styles.formInput, styles.formInput2]}
                /> */}
              </View>
              <PhoneInput
                ref={phoneInput}
                defaultValue={value}
                defaultCode="IN"
                textInputStyle={{ padding: 5 }}
                containerStyle={{
                  width: 370,
                  height: 60,
                  borderRadius: 3,
                  marginBottom: 15,
                }}
                textContainerStyle={styles.formInput4}
                onChangeFormattedText={(text) => {
                  setValue(text);
                }}
                // withDarkTheme
                withShadow
                autoFocus
              />

              <Button style={styles.signUpBtn} onPress={onSubmit}>
                <Text style={styles.signUpBtnText}>{__("SIGN UP")}</Text>
              </Button>
           
            </View> 
            <View style={styles.signUpContent}>
              <Text style={styles.connectText}>{__("OR")}</Text>
              <View>
                <Text style={styles.connectText}>
                  {__("If you Have already Login")}
                  <Text
                    onPress={() => {
                      navigateReset("PublicLogin");
                      console.log("firstname:",firstName,"secondname:",secondName,"gender",gender,value)
                      // alert(firstName)
                    }}
                    style={styles.connectTextLink}
                  >
                    {__("    Login")}
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
                  rightText={"SIGN UP AS DRIVER"}
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
              {__("By Sign up I Agree to\nTerms of Use & Privacy Policy")}
            </Text>
          </View>
        </Content>
      </View>
    </Container>
  );
}
