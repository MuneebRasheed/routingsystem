import React, { useState, useEffect } from "react";
import { View, ScrollView, Image, AppRegistry } from "react-native";
import { Container, Content, Text, Icon } from "@component/Basic";
import { TextInput, Button, ToggleSwitch, Checkbox } from "@component/Form";
// import ImagePicker from "react-native-image-crop-picker";
import Modal from "react-native-modalbox";
import { CreditCardInput } from "react-native-credit-card-input";
import styles from "./styles";
import theme from "@theme/styles";
import axios from "axios";
import Header from "@component/Header";
import Support from "@component/Support";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate, navigateReset } from "@navigation";
import DocumentPicker from "react-native-document-picker";
import { __ } from "@utility/translation";
import request from "@utility/request";
import { bind } from "@utility/component";
import { DarkStatusBar } from "@component/StatusBar";
// import notifee, { AndroidImportance, EventType } from "@notifee/react-native";
export default function ManageProfile() {
  const [information, setInformation] = useState({});
  const [name, setName] = useState();
  const [gender, setGender] = useState();
  const [values, setValues] = useState();
  const [valuesHttp, setValuesHttp] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [CardInput, setCardInput] = useState({});
  const [tabSelected, setTabSelected] = useState("profile");

  const [PaymentTabSelected, setPaymentTabSelected] = useState("card");

  useEffect(() => {
    fetchData();
  }, []);

  const postData = async () => {
    var data = await AsyncStorage.getItem("response");
    var datas = JSON.parse(data);
    const formData = new FormData();
    formData.append("first_name", name);
    formData.append("avatar_file", values);
    formData.append("gender", gender);

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

  const fetchData = async () => {
    var data = await AsyncStorage.getItem("response");
    var datas = JSON.parse(data);
    console.log(datas);

    const res = axios
      .get(`  http://18.232.210.115:3000/v1/users/user-by-id/${datas._id}`, {
        headers: {
          Authorization: `Bearer ${datas.access_token}`,
        },
      })
      .then((data) => {
        console.log("res", data.data);

        setInformation(data.data.data);
        setName(data.data.data?.first_name);
        setGender(data.data.data?.gender);
        setValuesHttp(data.data.data?.avatar);
      })
      .catch((err) => {
        console.log(("error", err));
      });
  };

  async function onDisplayNotification() {
    console.log("name", name);
    const channelId = await notifee.createChannel({
      id: "important",
      name: "Important Notifications",
      importance: AndroidImportance.HIGH,
    });

    // await notifee.displayNotification({
    //   title: 'Your account requires attention',
    //   body: 'You are overdue payment on one or more of your accounts!',
    //   android: {
    //     channelId,
    //       largeIcon: require('../../../../assets/images/fb.png'),
    //     importance: AndroidImportance.HIGH,
    //     // ongoing: true,
    //   },
    // });
    // notifee.displayNotification({
    //   title: 'New notification',
    //   android: {
    //     channelId,
    //     pressAction: {
    //       id: 'default',
    //       launchActivity: 'com.awesome.app.CustomActivity',
    //     },
    //   },
    // });

    notifee.displayNotification({
      title: "Suzuki Wagon R",
      body: "Muzafar \n 4.8(613)",
      data: {
        chatId: "123",
      },
      android: {
        largeIcon: require("../../../../assets/images/avatar.png"),
        importance: AndroidImportance.HIGH,
        channelId,
        actions: [
          {
            title: "Accept",
            icon: "https://my-cdn.com/icons/open-chat.png",
            pressAction: {
              id: "Accept",
              launchActivity: "default",
            },
          },
          {
            title: "Delete",
            icon: "https://my-cdn.com/icons/open-chat.png",
            pressAction: {
              id: "Delete",
              launchActivity: "default",
            },
          },
        ],
      },
    });

    notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.ACTION_PRESS && detail.pressAction.id) {
        console.log(
          "User pressed an action with the id: ",
          detail.pressAction.id
        );
        if (detail.pressAction.id == "Accept") {
          // fetchData();
          navigate("CustomerPayment");
        } else {
          alert("you decline");
        }
      }
    });
  }

  async function onSubmit() {
    if (CardInput.valid == false || typeof CardInput.valid == "undefined") {
      alert("Invalid Credit Card");
      return false;
    } else {
      await Support.showSuccess({
        title: __("Success!"),
        message: __("Transaction success"),
        onHide: () => {
          navigateReset("");
        },
        hideDelay: 2500,
      });
    }
  }

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

  function renderProfile() {
    return (
      <View style={styles.profileContainer}>
        <View style={styles.profileContent}>
          <View style={styles.profileImgInfo}>
            <View style={styles.profileBgImg}>
              <Image
                source={{
                  uri:
                    valuesHttp ||
                    "https://cdn.pixabay.com/photo/2016/01/10/22/07/beauty-1132617__340.jpg",
                  // uri: values,
                  // uri: "file:///storage/emulated/0/Android/data/com.wditechy.truckie/files/Pictures/fb3506d2-0efc-49f7-9dfc-dc6f5897d544.jpg" ,
                }}
                // source={require(values)}
                style={styles.profileImg}
              />
              <Button
                style={styles.iconDetail}
                onPress={() => {
                  UploadData(setValues);
                }}
              >
                <Icon
                  name="pencil"
                  type="EvilIcons"
                  style={[theme.SIZE_24, theme.GREYDARK]}
                />
              </Button>
            </View>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formText}>{__("NAME")}</Text>
            <TextInput
              placeholder="Enter The Name"
              placeholderTextColor="rgba(42,33,77,1)"
              value={name}
              onChangeText={(e) => {
                setName(e);
              }}
              style={styles.formInput}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formText}>{__("Gender")}</Text>
            <TextInput
              placeholder="Enter The Gender"
              placeholderTextColor="rgba(42,33,77,1)"
              value={gender}
              onChangeText={(e) => {
                setGender(e);
              }}
              style={styles.formInput}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formText}>{__("MOBILE NUMBER")}</Text>
            <TextInput
              placeholder="Enter The Phone Number"
              value={information?.phone}
              placeholderTextColor="rgba(42,33,77,1)"
              keyboardType="numeric"
              editable={false}
              style={styles.formInput}
            />
          </View>
          <Button style={styles.saveBtn} onPress={postData}>
            <Text style={styles.saveBtnText}>{__("SAVE")}</Text>
          </Button>
        </View>
      </View>
    );
  }
  function renderPermission() {
    return (
      <View style={styles.profileContainer}>
        <View style={styles.profileContent}>
          <View style={styles.profileInputDetail}>
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
          </Button>
        </View>
      </View>
    );
  }
  function renderInsurance() {
    return (
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
        <Button style={styles.payBtn} onPress={onSubmit}>
          <Text style={styles.payBtnText}>{__("MAKE A PAYMENT")}</Text>
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <DarkStatusBar />
      <Header default leftType="back" title={""} />
      <Content contentContainerStyle={theme.layoutDf}>
        <View>
          <View style={styles.profileHeader}>
            <Text style={styles.profileHeaderTitle}>{__("PROFILE")}</Text>
            <Text style={styles.profileHeaderText}>
              {__("MANAGE YOUR PROFILE")}
            </Text>
            <View style={styles.tabInfo}>
              {/* <Button
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
              </Button> */}
              {/* <Button
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
                  {__("PERMISSION")}
                </Text>
              </Button> */}
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
              : tabSelected === "insurance"
              ? renderInsurance()
              : null}
          </ScrollView>
        </View>
      </Content>
    </Container>
  );
}
