import React, { useState, useRef } from "react";
import { View, ScrollView, Image, Alert } from "react-native";
import CheckBox from "react-native-check-box";
import { Container, Content, Text, Icon } from "@component/Basic";
import { TextInput, Button } from "@component/Form";
import { COLOR, FAMILY, SIZE } from "@theme/typography";
import PhoneInput from "react-native-phone-number-input";
import styles from "./styles";
import theme from "@theme/styles";
import DropDownPicker from "react-native-dropdown-picker";
import Header from "@component/Header";
import { showMessage } from "../../../helper/showAlert";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login, updateUser } from "../../../store/reducers/session";
import { initilizeSocket } from "../../../store/reducers/socketReducer";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { navigate, navigateReset } from "@navigation";
import { __ } from "@utility/translation";
import { DarkStatusBar } from "@component/StatusBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFCMToken } from "../../../helper/pushnotification_helper";

export default function SignUp() {
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    gender: Yup.string().required("Please Select the gender"),
    phonenum: Yup.string().required("Please Enter Your Mobile Number"),
    password: Yup.string().required("Please Enter Your Password"),
    newPassword: Yup.string().required("Please Enter Your Confirm Password"),
  });
  const phoneInput = useRef();
  const [value, setValue] = useState("");
  const onSubmit = () => {
    navigateReset("PublicVerification");
  };
  const [isSelected, setSelection] = useState(false);
  const [tabSelected, setTabSelected] = useState("User");
  const [valid, setValid] = useState(false);
  const [eye1, setEye1] = useState(true);
  const [eye2, setEye2] = useState(true);
  const dispatch = useDispatch();
  var temp = 0;
  // const [values, setValues] = useState(true);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);

  async function logins(values) {
    var cd = {
      first_name: values.firstName,
      last_name: values.lastName,

      password: values.password,
      phone: values.phonenum,
      country: "pakisatn",
      city: "lahore",
      address: "lahore",
      ID: "string",
      gender: values.gender,
      role: [tabSelected=="User"?"user":"rider"],
    };

    const method=async(response)=>{
      await AsyncStorage.setItem(
        "response",
        JSON.stringify(response?.data)
      );
      await AsyncStorage.setItem("role", "User");
      navigateReset("PublicHome");
  
      
    }

    https: axios
      .post("https://26e4-45-117-104-39.ngrok-free.app/v1/auth/signup", cd)
      .then((response) => {
        if (response.status === 201) {
          console.log("CURRET LOGI===>", response.data);

          if (
            tabSelected === "Driver" &&
          
            isSelected
          ) {
            temp = 2;
            dispatch(login({}));
            dispatch(updateUser(response.data));
            dispatch(initilizeSocket(response.data.access_token));
            method(response);
            showMessage("success", "Login Succefully");
          }

          if (
            tabSelected === "User" &&
      
            !isSelected
          ) {
            dispatch(initilizeSocket(response.data.access_token));
            dispatch(updateUser(response.data));
            temp = 2;
            method(response);
            showMessage("success", "Login Succefully");
          }
          if (temp != 2) {
            showMessage("error", "You cant be loginss");
          }

          return response.data;
        } else {
         
          showMessage("error", "You cant be login.");
        }
      })
      .then(async (userDetails) => {
        const firebaseToken = await getFCMToken();
        const notificationResponse = await axios.post(
          `https://26e4-45-117-104-39.ngrok-free.app/v1/notifications/accept`,
          {
            notification_token: firebaseToken,
            device_type: "mobile_device",
          },
          {
            headers: {
              authorization: `Bearer ${userDetails.access_token}`,
            },
          }
        );

        console.log("CURRENT USER YAY!!! ===>", notificationResponse.data);
      })
      .catch((err) => {
        console.log("error", err, err.response);
        
        showMessage("error", "You cant be login. Server Error");
      });
  }

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
        <ScrollView>
          <Content contentContainerStyle={theme.layoutDf}>
            <View style={styles.signUpForm}>
              <Image
                source={require("@asset/images/trucklogo.png")}
                style={[styles.signUpImg, { marginTop: 0 }]}
              />
              <View style={{ marginBottom: -35 }}>
                <Text style={styles.signUpTitle}>{__("Routing System")}</Text>
                <Text style={styles.signUpText}>
                  {__("Find a easy way to transfer\nyour loads")}
                </Text>
              </View>
              <View style={styles.tabInfo}>
                <Button
                  style={
                    tabSelected === "User"
                      ? styles.tabActive
                      : styles.tabInactive
                  }
                  onPress={() => {
                    setTabSelected("User");
                    setSelection(false);
                  }}
                >
                  <Text
                    style={
                      tabSelected === "User"
                        ? styles.tabTextActive
                        : styles.tabTextInactive
                    }
                  >
                    {__("User")}
                  </Text>
                </Button>

                <Button
                  style={
                    tabSelected === "Driver"
                      ? styles.tabActive
                      : styles.tabInactive
                  }
                  onPress={() => {
                    setTabSelected("Driver");

                    setSelection(true);
                  }}
                >
                  <Text
                    style={
                      tabSelected === "Driver"
                        ? styles.tabTextActive
                        : styles.tabTextInactive
                    }
                  >
                    {__("Driver")}
                  </Text>
                </Button>
              </View>

              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  phonenum: "",
                  gender: "",
                  password: "",
                  newPassword: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                  const checkValid = phoneInput.current?.isValidNumber(value);
                  setValid(checkValid ? checkValid : false);

                  //  navigateReset("PublicVerification",{values});
                  // setValue(values)
                  console.log(values, valid);
                  logins(values)
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  setFieldTouch,
                  isValid,
                  setFieldValue,
                  handleSubmit,
                }) => (
                  <View style={{ marginTop: 20 }}>
                    <View style={[styles.formRow, { marginTop: -20 }]}>
                      <View style={{ width: "48%" }}>
                        <TextInput
                          placeholder="First Name"
                          placeholderTextColor="rgba(0,0,0,0.7)"
                          style={[styles.formInput]}
                          value={values.firstName}
                          onChangeText={handleChange("firstName")}
                        />
                        {errors.firstName && (
                          <Text
                            style={{
                              marginBottom: 5,
                              color: COLOR.LIGHT,
                              fontFamily: FAMILY.BOLD,
                              fontSize: 15,
                              marginTop: -10,
                            }}
                          >
                            {errors.firstName}
                          </Text>
                        )}
                      </View>
                      <View style={{ width: "48%" }}>
                        <TextInput
                          placeholder="Last Name"
                          placeholderTextColor="rgba(0,0,0,0.7)"
                          style={[styles.formInput]}
                          value={values.lastName}
                          onChangeText={handleChange("lastName")}
                        />

                        {errors.lastName && (
                          <Text
                            style={{
                              marginBottom: 5,
                              color: COLOR.LIGHT,
                              fontSize: 15,
                              fontFamily: FAMILY.BOLD,
                              marginTop: -10,
                            }}
                          >
                            {errors.lastName}
                          </Text>
                        )}
                      </View>
                    </View>
                    <View style={styles.formRow}>
                      <View
                        style={{
                          width: "100%",
                        }}
                      >
                        <DropDownPicker
                          open={open}
                          items={items}
                          setOpen={setOpen}
                          value={values.gender}
                          onSelectItem={(e) => setFieldValue("gender", e.value)}
                          // setValue={handleChange("gender")}
                          setItems={setItems}
                          style={{ marginBottom: 5 }}
                        />
                        {errors.gender && (
                          <Text
                            style={{
                              fontFamily: FAMILY.BOLD,
                              color: COLOR.LIGHT,
                              fontSize: 15,
                            }}
                          >
                            {errors.gender}
                          </Text>
                        )}
                      </View>
                    </View>
                    <PhoneInput
                      ref={phoneInput}
                      defaultValue={value}
                      defaultCode="PK"
                      textInputStyle={{ padding: 2 }}
                      containerStyle={{
                        width: "100%",
                        height: 60,
                        borderRadius: 3,
                        marginBottom: 15,
                        marginTop: 10,
                      }}
                      textContainerStyle={styles.formInput4}
                      value={values.phonenum}
                      // onChangeText={handleChange("phonenum")}
                      onChangeFormattedText={(text) => {
                        setFieldValue("phonenum", text);
                        // setValue(text);
                      }}
                      // withDarkTheme
                      withShadow
                      autoFocus
                    />
                    {errors.phonenum && (
                      <Text
                        style={{
                          marginBottom: 5,
                          color: COLOR.LIGHT,
                          fontFamily: FAMILY.BOLD,
                          fontSize: 15,
                          marginTop: -10,
                        }}
                      >
                        {errors.phonenum}
                      </Text>
                    )}
                    <View>
                      <TextInput
                        placeholder="Password"
                        secureTextEntry={eye2}
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        style={[styles.formInput3]}
                        value={values.password}
                        onChangeText={handleChange("password")}
                      />
                      {errors.password && (
                        <Text
                          style={{
                            marginBottom: 5,
                            color: COLOR.LIGHT,
                            fontSize: 15,
                            fontFamily: FAMILY.BOLD,
                            marginTop: -10,
                          }}
                        >
                          {errors.password}
                        </Text>
                      )}

                      <Icon
                        name={eye2 ? "eye-slash" : "eye"}
                        type="FontAwesome"
                        style={[
                          theme.SIZE_18,
                          theme.PRIMARY,
                          { right: "-88%", bottom: "60%" },
                        ]}
                        onPress={() => {
                          setEye2((val) => !val);
                        }}
                      />
                    </View>

                    <View style={{ marginTop: -18 }}>
                      <TextInput
                        placeholder="Confirm Password"
                        secureTextEntry={eye1}
                        value={values.newPassword}
                        onChangeText={handleChange("newPassword")}
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        style={[styles.formInput3]}
                      />
                      {errors.newPassword && (
                        <Text
                          style={{
                            marginBottom: 5,
                            color: COLOR.LIGHT,
                            fontFamily: FAMILY.BOLD,
                            fontSize: 15,
                            marginTop: -10,
                          }}
                        >
                          {errors.newPassword}
                        </Text>
                      )}

                      <Icon
                        name={eye1 ? "eye-slash" : "eye"}
                        type="FontAwesome"
                        style={[
                          theme.SIZE_18,
                          theme.PRIMARY,
                          { right: "-88%", bottom: "60%" },
                        ]}
                        onPress={() => {
                          setEye1((val) => !val);
                        }}
                      />
                    </View>

                    <Button
                      style={[styles.signUpBtn, { marginTop: -18 }]}
                      onPress={handleSubmit}
                    >
                      <Text style={styles.signUpBtnText}>{__("SIGN UP")}</Text>
                    </Button>
                    {/* <Button onPress={handleSubmit} title="Submit" /> */}
                  </View>
                )}
              </Formik>
              <View style={styles.signUpContent}>
                <Text style={styles.connectText}>{__("OR")}</Text>
                <View>
                  <Text style={styles.connectText}>
                    {__("If you Have already account ")}
                    <Text
                      onPress={() => {
                        navigateReset("PublicLogin");
                        // alert(firstName)
                      }}
                      style={styles.connectTextLink}
                    >
                      {__("LOGIN")}
                    </Text>
                  </Text>
                </View>

                {/* <View
                style={{
                  justifyContent: "center",
                  marginLeft: "24%",
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
              </View> */}
                <Text style={styles.termText}>
                  {__("By Sign up I Agree to\nTerms of Use & Privacy Policy")}
                </Text>
              </View>
            </View>
          </Content>
        </ScrollView>
      </View>
    </Container>
  );
}
