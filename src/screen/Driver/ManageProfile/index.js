import React, { useState } from "react";
import {
  View,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { COLOR, FAMILY, SIZE } from "@theme/typography";
import { Container, Content, Text, Icon } from "@component/Basic";
import { TextInput, Button, ToggleSwitch, Checkbox } from "@component/Form";

import styles from "./styles";
import theme from "@theme/styles";

import Header from "@component/Header";
import Support from "@component/Support";

import { navigate, navigateReset } from "@navigation";
import { __ } from "@utility/translation";

import { DarkStatusBar } from "@component/StatusBar";
import { useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Hyperlink from "react-native-hyperlink";
import DocumentPicker from "react-native-document-picker";
export default function ManageProfile({ navigation }) {
  const [selected, setSelected] = useState("");
  const [value, setValue] = useState();
  const [urlValue, setUrlValue] = useState();
  const [tabSelected, setTabSelected] = useState("profile");
  const [isEnabled, setIsEnabled] = useState(false);

  const [profile, setProfile] = useState("");
  const [profileHttp, setProfileHttp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [vehicalNumber, setVehicalNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [drivingLiscence, setDrivingLiscence] = useState("");
  const [nationalCard, setNationalCard] = useState();

  // acct_1MwmIbPu2iasesq5
  const [PaymentTabSelected, setPaymentTabSelected] = useState("card");
  const UploadData = async (setPath) => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setPath(res[0]);
      console.log(res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  useEffect(() => {
    if (isEnabled) {
      fetchData();
      ConnectingAccount();
    }
  }, [isEnabled]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    var data = await AsyncStorage.getItem("response");
    var datas = JSON.parse(data);
    console.log(datas);

    const res = axios
      .get(
        `  https://5624-2400-adc5-425-a000-38cd-4f9a-ccdb-4dbf.ngrok-free.app/v1/users/user-by-id/${datas._id}`,

        {
          headers: {
            Authorization: `Bearer ${datas.access_token}`,
          },
        }
      )
      .then((data) => {
        console.log("res account no", data.data.data);
        setName(data.data.data.first_name);
        setVehicalNumber(data.data.data.vehicle_no);
        setDrivingLiscence(data.data.data.driving_license);
        setPhoneNumber(data.data.data.phone);
        setProfileHttp(data.data.data.avatar);
        setEmail(data.data.data.email);
        setNationalCard(data.data.data.ID_file);
      })
      .catch((err) => {
        console.log("Get data account error");
        console.log("error", err);
      });
  };
  const fetchData = async () => {
    var data = await AsyncStorage.getItem("response");
    var datas = JSON.parse(data);
    console.log(datas);

    const res = axios
      .post(
        `  http://18.232.210.115:3000/v1/users/connect-account
      `,
        {
          type: "express",
          country: "US",
          business_type: "individual",
        },
        {
          headers: {
            Authorization: `Bearer ${datas.access_token}`,
          },
        }
      )
      .then((data) => {
        console.log("res account no", data.data.account);
        ConnectingAccount(data.data.account, datas);
      })
      .catch((err) => {
        console.log(("error", err));
      });
  };

  const ConnectingAccount = async (values, datas) => {
    const res = axios
      .post(
        `  https://5624-2400-adc5-425-a000-38cd-4f9a-ccdb-4dbf.ngrok-free.app/v1/users/link-account

      `,
        {
          account: values,
          refresh_url: "https://example.com/reauth",
          return_url: "https://example.com/return",
          type: "account_onboarding",
        },
        {
          headers: {
            Authorization: `Bearer ${datas.access_token}`,
          },
        }
      )
      .then((data) => {
        console.log("urlll", data.data);
        setUrlValue(data?.data?.url);
      })
      .catch((err) => {
        console.log(("error", err));
      });
  };

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

  const submit = async () => {
    console.log(
      name,
      email,
      drivingLiscence,
      phoneNumber,
      profile,
      nationalCard
    );
    var data = await AsyncStorage.getItem("response");
    var datas = JSON.parse(data);
    const formData = new FormData();
    formData.append("first_name", name);
    formData.append("avatar_file", profile);
    formData.append("national_ID_file", nationalCard);
    formData.append("phone", phoneNumber);
    formData.append("vehicle_no", vehicalNumber);
    formData.append("driving_license", drivingLiscence);
    formData.append("email", email);

    console.log("FormData", formData);

    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${datas.access_token}`,
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    };
    try {
      const res = await fetch(
        "https://5624-2400-adc5-425-a000-38cd-4f9a-ccdb-4dbf.ngrok-free.app/v1/users/update-user",
        requestOptions
      );
      const result = await res.json();
      console.log("RESULT", result);
    } catch (err) {
      console.log("ERROR");
    }
  };

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
  function onValueChange() {
    setSelected("");
  }

  function renderProfile() {
    return (
      <SafeAreaView style={{ width: "100%", height: "80%" }}>
        <ScrollView showsVerticalScrollIndicator={true}>
          <View style={styles.profileContainer}>
            <View style={styles.profileContent}>
              <View style={styles.profileImgItem}>
                <View style={styles.profileImgDetail}>
                  <View style={styles.avatarImg}>
                    <Image
                      source={{
                        uri:
                          profileHttp ||
                          "https://images.pexels.com/photos/736716/pexels-photo-736716.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                      }}
                      style={styles.profileImg}
                    />
                  </View>
                  <Button
                    style={styles.editBtn}
                    onPress={() => {
                      UploadData(setProfile);
                    }}
                  >
                    <Icon
                      name="pencil"
                      type="SimpleLineIcons"
                      style={[theme.SIZE_16, theme.DARK]}
                    />
                  </Button>
                </View>
              </View>
              <View style={styles.profileform}>
                <View style={styles.formRow}>
                  {/* <Text style={styles.formText}>{__("NAME")}</Text> */}
                  <TextInput
                    placeholder="Enter Your Name"
                    // placeholderTextColor="#000"
                    style={styles.formInput}
                    value={name}
                    onChangeText={setName}
                  />
                </View>
                <View style={styles.formRow}>
                  {/* <Text style={styles.formText}>{__("EMAIL ADDRESS")}</Text> */}
                  <TextInput
                    placeholder="Enter Your Email"
                    // placeholderTextColor="#000"
                    style={styles.formInput}
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
                <View style={styles.formRow}>
                  {/* <Text style={styles.formText}>{__("Vehical Number")}</Text> */}
                  <TextInput
                    placeholder="Enter Your Vehical Number"
                    // placeholderTextColor="#000"
                    style={styles.formInput}
                    value={vehicalNumber}
                    onChangeText={setVehicalNumber}
                  />
                </View>
                <View style={styles.formRow}>
                  {/* <Text style={styles.formText}>{__("MOBILE NUMBER")}</Text> */}
                  <TextInput
                    placeholder="Enter Your Mobile Number"
                    keyboardType="numeric"
                    // placeholderTextColor="#000"
                    style={styles.formInput}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                  />
                </View>

                <View style={styles.profileBtnInfo}>
                  <View style={styles.formRow2}>
                    {/* <Text style={styles.formText}>{__("DRIVING LICENSE")}</Text> */}
                    <TextInput
                      placeholder="Enter Your Driving License"
                      // placeholderTextColor="#000"
                      style={styles.formInput}
                      value={drivingLiscence}
                      onChangeText={setDrivingLiscence}
                    />
                  </View>
                  {/* <Button style={styles.uploadBtn}>
                    <Text style={styles.uploadBtnText}>{__("VIEW")}</Text>
                  </Button> */}
                </View>
                <View style={[styles.profileBtnInfo, styles.profileBtnInfoTwo]}>
                  <View style={styles.formRow2}>
                    <Text style={styles.formText}>
                      {__("NATIONAL ID CARD")}
                    </Text>
                    {/* <TextInput
                      placeholder=""
                      // placeholderTextColor="#000"
                      style={styles.formInput}
                    /> */}

                    <Image
                      source={{
                        uri:
                          nationalCard ||
                          "https://images.pexels.com/photos/736716/pexels-photo-736716.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                      }}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                      }}
                    />
                  </View>

                  <Button
                    style={styles.uploadBtn}
                    onPress={() => {
                      UploadData(setNationalCard);
                    }}
                  >
                    {nationalCard ? (
                      <Text style={styles.uploadBtnText}>{__("UPDATE")}</Text>
                    ) : (
                      <Text style={styles.uploadBtnText}>{__("UPLOAD")}</Text>
                    )}
                  </Button>
                </View>
              </View>
              <Text style={styles.permissionLabel}>
                {__("Click on Link to change Permissions")}{" "}
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("DriverPermissions");
                  }}
                >
                  <Text style={{ color: COLOR.BLUE }}>{__("Permission")}</Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </ScrollView>

        <Button
          style={[styles.saveBtn, { marginLeft: 20, marginRight: 20 }]}
          onPress={submit}
        >
          <Text style={styles.saveBtnText}>{__("SAVE")}</Text>
        </Button>
      </SafeAreaView>
    );
  }

  console.log("uRLVALUE", urlValue);
  function renderPermission() {
    return (
      <View style={styles.profileContainer}>
        <View style={styles.profileContent}>
          <View style={styles.profileInputDetail}>
            <Text style={styles.permissionHeader}>{__("PAYMENT PROCESS")}</Text>
            <View style={styles.switchInfo}>
              <Text style={styles.switchText}>{__("Connect for payment")}</Text>
              <ToggleSwitch
                setValue={setIsEnabled}
                value={isEnabled}
              ></ToggleSwitch>
            </View>
          </View>
          {/* <View style={styles.profileInputDetail}>
            <Text style={styles.permissionText}>{__("LOCATION")}</Text>
            <View style={styles.switchInfo}>
              <Text style={styles.switchText}>
                {__("Access your location")}
              </Text>
              <ToggleSwitch />
            </View>
          </View>
          <View style={styles.profileInputDetail}>
            <Text style={styles.permissionText}>{__("MESSAGE")}</Text>
            <View style={styles.switchInfo}>
              <Text style={styles.switchText}>{__("Access your message")}</Text>
              <ToggleSwitch />
            </View>
          </View>
          <View style={styles.profileInputDetail}>
            <Text style={styles.permissionText}>{__("MEDIA & STORAGE")}</Text>
            <View style={styles.switchInfo}>
              <Text style={styles.switchText}>
                {__("Access your Media & Storage")}
              </Text>
              <ToggleSwitch />
            </View>
          </View>

          <Button
            style={styles.saveBtn}
            onPress={() => {
              navigate("CustomerSelectVehicle");
            }}
          >
            <Text style={styles.saveBtnText}>{__("SAVE")}</Text>
          </Button> */}

          <View style={styles.profileInputDetail}>
            <Text style={[styles.permissionText]}>
              {__(
                "Here is the Payment method button you can click the payment method button and can enable the payment integration with the help of stripe once you click the button in  bottom a ref link is generated you can click the link that send control to stripe you have to full filled your information then your account us acctivated and then you can make payment and recivied the payment from user"
              )}
            </Text>
          </View>

          {urlValue && isEnabled && (
            <Hyperlink
              linkStyle={{
                marginHorizontal: 20,
                color: COLOR.BLUE,
                fontSize: 20,
              }}
              linkText={urlValue ? " Here" : url}
              linkDefault={true}
            >
              <Text style={styles.permissionLabel}>
                Click Here to Continue
                {urlValue}
              </Text>
            </Hyperlink>
          )}
        </View>
      </View>
    );
  }
  function renderInsurance() {
    return (
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
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
        </ScrollView>
        <Button style={styles.payBtn} onPress={onSubmit}>
          <Text style={styles.payBtnText}>{__("MAKE A PAYMENT")}</Text>
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <DarkStatusBar />
      <Header default leftType="back" title={"Profile"} />
      <Content contentContainerStyle={theme.layoutDf}>
        <View>
          <View style={styles.profileHeader}>
            <Text style={styles.profileHeaderTitle}>{__("PROFILE")}</Text>
            <Text style={styles.profileHeaderText}>
              {__("MANAGE YOUR PROFILE")}
            </Text>
            <View style={styles.tabInfo}>
              <Button
                style={
                  tabSelected === "profile"
                    ? styles.tabActive
                    : styles.tabInactive
                }
                onPress={() => setTabSelected("profile")}
              >
                <Text
                  style={
                    tabSelected === "profile"
                      ? styles.tabTextActive
                      : styles.tabTextInactive
                  }
                >
                  {__("PROFILE")}
                </Text>
              </Button>
              <Button
                style={
                  tabSelected === "permission"
                    ? styles.tabActive
                    : styles.tabInactive
                }
                onPress={() => setTabSelected("permission")}
              >
                <Text
                  style={
                    tabSelected === "permission"
                      ? styles.tabTextActive
                      : styles.tabTextInactive
                  }
                >
                  {__("PAYMENT METHOD")}
                </Text>
              </Button>
              {/* <Button
                style={
                  tabSelected === "insurance"
                    ? styles.tabActive
                    : styles.tabInactive
                }
                onPress={() => setTabSelected("insurance")}
              >
                <Text
                  style={
                    tabSelected === "insurance"
                      ? styles.tabTextActive
                      : styles.tabTextInactive
                  }
                >
                  {__("PAYMENT")}
                </Text>
              </Button> */}
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {tabSelected === "profile"
              ? renderProfile()
              : tabSelected === "permission"
              ? renderPermission()
              : null}
          </ScrollView>
        </View>
      </Content>
      {/* <Modal
        ref={"modalBooking"}
        position={"center"}
        isOpen={isOpen}
        onClosed={() => setIsOpen(false)}
        style={styles.modalSort}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.modalDetail}>
            <Button
              style={styles.closeHiddenDesc}
              onPress={() => this.refs.modalBooking.close()}
            >
              <Icon
                name="close"
                type="MaterialIcons"
                style={[theme.SIZE_20, theme.GREY]}
              />
            </Button>
            <Text style={styles.modalTitle}>{__("Local Ride @ $100")}</Text>
            <Text style={styles.modalDesc}>
              {__(
                "Integer pellentesque enim nec sem aliquam porttitor. Duis et nunc at est euismod convallis sit amet vitae risus. In non orci eu risus aliquet volutpat ut non erat."
              )}
            </Text>
            <Text style={styles.modalDesc}>
              {__(
                " Aenean sem sapien, vestibulum eu elit dignissim, sodales scelerisque lectus. Duis eu tempor metus. Vivamus luctus erat eget pellentesque rutrum."
              )}
            </Text>
            <Text style={styles.modalDesc}>
              {__(
                "  Sed blandit, eros sed cursus tempor, nibh nisi sodales elit, nec consequat nunc quam quis odio. Morbi bibendum mi lobortis luctus placerat. Nulla facilisis metus odio."
              )}
            </Text>
            <Text style={styles.modalDesc}>
              {__(
                "Integer pellentesque enim nec sem aliquam porttitor. Duis et nunc at est euismod convallis sit amet vitae risus. In non orci eu risus aliquet volutpat ut non erat.  Aenean sem sapien, vestibulum eu elit dignissim, sodales scelerisque lectus.   Duis eu tempor metus. Vivamus luctus erat eget pellentesque rutrum.  Sed blandit, eros sed cursus tempor, nibh nisi sodales elit, nec consequat nunc quam quis odio. Morbi bibendum mi lobortis luctus placerat."
              )}
            </Text>
          </View>
        </ScrollView>
      </Modal> */}
    </Container>
  );
}
