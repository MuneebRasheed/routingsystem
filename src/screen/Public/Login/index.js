import React, { useState, useRef } from "react";
import { View, Image } from "react-native";
import { Container, Content, Text, Icon } from "@component/Basic";
import { TextInput, Button } from "@component/Form";
import CheckBox from "react-native-check-box";
import { COLOR } from "@theme/typography";

import styles from "./styles";

import theme from "@theme/styles";

import Header from "@component/Header";

import { navigate, navigateReset } from "@navigation";
import { __ } from "@utility/translation";
import { DarkStatusBar } from "@component/StatusBar";
import PhoneInput from "react-native-phone-number-input";
import Support from "@component/Support";
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../../store/reducers/session";
import { initilizeSocket } from "../../../store/reducers/socketReducer";
import { getFCMToken } from "../../../helper/pushnotification_helper";

export default function SignUp() {
  const [isSelected, setSelection] = useState(false);
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(true);
  const dispatch = useDispatch()
  var temp =0;
  const phoneInput = useRef();
  async function logins() {

    
  
    var cd={
      identifier: value,
      password
    }

    axios.post("http://18.232.210.115:3000/v1/auth/login", cd)
      .then((response) => {
     
     
        if (response.status === 201) {

        
          if( isSelected&& response?.data.roles[0]!='user' ){
            temp=2;
            dispatch(login({}))
            dispatch(initilizeSocket(response.data.access_token))
            Support.showSuccess({
              title: __("Thank You"),
              message: __("Your phone number can be verified Login as driver"),
              onHide: async() => {
                navigateReset("PublicHome");
               await AsyncStorage.setItem('response',JSON.stringify(response?.data));
               await AsyncStorage.setItem('role',"User");
                
              },
              hideDelay: 2500,
            });
          
          }

          if( !isSelected && response?.data.roles[0]=='user' ){
            dispatch(initilizeSocket(response.data.access_token))
            temp=2;
            Support.showSuccess({
              title: __("Thank You"),
              message: __("Your phone number can be verified Login as user"),
              onHide: async() => {
                navigateReset("PublicHome");
            
               await AsyncStorage.setItem('response',JSON.stringify(response?.data));
               await AsyncStorage.setItem('role',"User");
                
              },
              hideDelay: 2500,
            });
            
          }
          if(temp!=2){
            Support.showError({
              title: __("OOPs"),
              message: __("You cant be login"),
              hideDelay: 2500,
            });
          }
          

          
        } else {
          
          Support.showError({
            title: __("OOPs"),
            message: __("You cant be login"),
            hideDelay: 2500,
          });
        }
      })
      .catch((err) => {
        console.log("error",err)
        Support.showError({
          title: __('OOPs'),
          message: __('You cant be login Server Error'),
          
          hideDelay: 2500
        })
      });
   
  }

  const onSubmit = () => {
    const checkValid = phoneInput.current?.isValidNumber(value);
    
    if (checkValid) {
      // navigate("PublicVerification", {
      //   values: value,
      //   screen: true,
      //   role: isSelected,
      // });
      console.log(password,value)
      logins();
    } else {
      alert("Invalid Phone Number");
    }
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
                defaultCode="PK"
                textInputStyle={{ padding: 5 }}
                containerStyle={{ width: 370, height: 60, borderRadius: 3 }}
                textContainerStyle={styles.formInput4}
                onChangeFormattedText={(text) => {
                  setValue(text);
                }}
                withShadow
                autoFocus
              />

              <View style={{  postion: "relative" }}>
                <TextInput
                  placeholder="Password"
                  secureTextEntry={valid}
                  value={password}
                  onChangeText={setPassword}
                  placeholderTextColor="rgba(0,0,0,0.7)"
                  style={[styles.formInput3, { marginTop: 15 }]}
                />

                <Icon
                  name={valid ? "eye-slash" : "eye"}
                  type="FontAwesome"
                  style={[
                    theme.SIZE_18,
                    theme.PRIMARY,
                    { postion: "absolute", right: -333, bottom: 52 },
                  ]}
                  onPress={() => {
                    setValid((val) => !val);
                  }}
                />
              </View>
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
