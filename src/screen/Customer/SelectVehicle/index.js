import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView, Image } from "react-native";
import { Container, Content, Text, Icon } from "@component/Basic";
import { TextInput, Button, ToggleSwitch } from "@component/Form";
import axios from "axios";
import styles from "./styles";
import theme from "@theme/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "@component/Header";
import Accordion from "./Accordion";
import Modal from "react-native-modalbox";
import DropDownPicker from "react-native-dropdown-picker";
import DocumentPicker from "react-native-document-picker";
import CalendarStrip from "react-native-calendar-strip";

import { navigate } from "@navigation";
import { __ } from "@utility/translation";
import messaging from "@react-native-firebase/messaging";
import { DarkStatusBar } from "@component/StatusBar";
import { connect } from "react-redux";
import DatePicker from "react-native-date-picker";
import ImagePicker from "react-native-image-crop-picker";
import notifee, { AndroidImportance, EventType } from "@notifee/react-native";

function SelectVehicle(params) {
  // console.log(params.route.params);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState();
  const [fare, setfare] = useState();
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [length, setLength] = useState();
  const [weight, setWeight] = useState();
  const [mainModel, setMainModel] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [items, setItems] = useState([
    { label: "Solid", value: "solid" },
    { label: "Metal", value: "metal" },
    { label: "Wood", value: "wood" },
    { label: "Fragile", value: "fragile" },
    { label: "Other Items", value: "otherItems" },
  ]);
  const [itemsType, setItemsType] = useState("solid");

  const [Structure, setStructure] = useState([
    {
      id: 1,
      image: require("@asset/images/avatar.png"),
      vehicalName: "Suzuki Wagon R",
      cityName: "Lahore",
      rating: "4.8",
      totalRides: "2454",
      price: "650",
      time: "2",
      distance: "406",
      userId: "123",
      tripId: "1",
      IsActive: true,
      IsBidding: true,
    },
    {
      id: 2,
      image: require("@asset/images/avatar.png"),
      vehicalName: "Cultus",
      cityName: "Lahore",
      rating: "4.8",
      totalRides: "2454",
      price: "650",
      time: "2",
      distance: "406",
      userId: "123",
      tripId: "1",
      IsActive: true,
      IsBidding: false,
    },
    {
      id: 3,
      image: require("@asset/images/avatar.png"),
      vehicalName: "Civic",
      cityName: "Lahore",
      rating: "4.8",
      totalRides: "2454",
      price: "650",
      time: "23",
      distance: "4000",
      userId: "123",
      tripId: "1",
      IsActive: true,
      IsBidding: false,
    },
  ]);

  function CloseModelBaseOnId(id) {
    console.log("Here Is Id ", Structure.length);
    if (Structure.length == 1) {
      setMainModel(false);
    }
    setStructure((previous) => {
      return previous.filter((value) => {
        return value.id != id;
      });
    });
  }

  const ModalNotification = useRef();
  const getPhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image);
    });
  };
  const UploadData = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setImages(res[0]);
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
    // getFCMToken();
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
    });
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
        }
      });
    messaging().onMessage(async (remoteMessage) => {
      setMainModel((pre) => !pre);
      console.log(
        " on delected vehical notification on foreground state....",
        remoteMessage
      );
    });
  }, []);

  const MainModel = ({value}) => {
    return (
      <Modal
        ref={ModalNotification}
        isOpen={true}
        entry={"top"}
        swipeToClose={false}
        style={{
          height: 180,
          width: 400,
          borderRadius: 10,
          alignItems: "center",
        }}
        swipeArea={300}
        backdropPressToClose={false}
      >
        <View style={{ borderRadius: 50 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "20%" }}>
              <Image
                source={value.image}
                resizeMode="cover"
                style={{ width: 50, height: 50, borderRadius: 25, margin: 10 }}
              />
            </View>
            <View style={{ width: "80%" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 5,
                  fontSize: 20,
                }}
              >
                <Text>{__(value.vehicalName)}</Text>
                <Text>{__(value.price)}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 5,
                  fontSize: 20,
                }}
              >
                <Text>{__("Muzafar")}</Text>
                <Text>{__(value.time)}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 5,
                  fontSize: 20,
                }}
              >
                <Text>{__(value.rating+`(${value.totalRides})`)}</Text>
                <Text>{__(value.distance)}</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              style={[styles.bookingBtn, { width: "40%" }]}
              onPress={() => {
                // navigate("CustomerPayment");
                CloseModelBaseOnId(value.id);
              }}
            >
              <Text style={styles.bookingBtnText}>{__("Decline")}</Text>
            </Button>
            <Button
              style={[styles.bookingBtn, { width: "40%" }]}
              onPress={() => {
                navigate("CustomerPayment");
              }}
            >
              <Text style={styles.bookingBtnText}>{__("Accept")}</Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  };
  const getPhotoFromGallery = () => {
    UploadData();
  };

  const fetchData = async () => {
    var data = await AsyncStorage.getItem("response");
    var datas = JSON.parse(data);

    var fcmToken = await AsyncStorage.getItem("fcmtoken");
    // var fcmToken1 = JSON.parse(fcmToken);
    console.log(fcmToken);
    const formData = new FormData();
    formData.append("files", images);
    formData.append("from_location", JSON.stringify(params.route.params.form));
    formData.append("to_location", JSON.stringify(params.route.params.to));
    formData.append("height", height);
    formData.append("fare", fare);
    formData.append("width", width);
    formData.append("time", "2023-12-06");
    formData.append("length", length);
    formData.append("weight", weight);
    formData.append("parcel_type", "wood");

    console.log("FormData", formData);

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${datas.access_token}`,
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    };
    try {
      const res = await fetch(
        "https://testing.explorelogix.com/v1/parcel",
        requestOptions
      );
      const result = await res.json();
      console.log("RESULT", result);
    } catch (err) {
      console.log("ERROR");
    }
  };

  async function onDisplayNotification() {
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
  return (
    <Container style={theme.layoutFx}>
      <Modal isOpen={mainModel} entry={"top"}  backdropOpacity={0.3} swipeToClose={false} >

        {Structure.map(val=>{
          return(
            val.IsActive &&<View style={{ height: "30%" }}>
            <MainModel value={val} />
          </View>
          )
        }
          
        )}
       
       
        


        <Button
          style={[styles.bookingBtn, { backgroundColor: "grey" }]}
          onPress={() => {
            // getPhotoFromGallery();
            // navigate("CustomerPayment");
            setMainModel(false);
          }}
        >
          <Text style={styles.bookingBtnText}>{__("Cancel")}</Text>
        </Button>
      </Modal>
      <DarkStatusBar />
      <Header leftType="back" title={"Booking"} />

      <Content contentContainerStyle={theme.layoutDf}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.selectVehicleContainer, { height: 600 }]}>
            <View style={styles.selectVehicleContent}>
              <Accordion
                title="Select Time"
                renderContent={() => (
                  <View style={styles.accOrderInfo}>
                    <Button>
                      <Text style={styles.accText}>{__("Now")}</Text>
                    </Button>
                    <Button>
                      <Text style={styles.accText}>{__("Range")}</Text>
                    </Button>
                    <Button onPress={() => setOpen(true)}>
                      <Text style={styles.accText}>{__("Time")}</Text>
                    </Button>
                  </View>
                )}
              />

              <DatePicker
                modal
                mode="time"
                open={open}
                date={date}
                onConfirm={(date) => {
                  setOpen(false);
                  setDate(date);
                  console.log(JSON.stringify(date));
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />

              <View style={styles.formRow}>
                <TextInput
                  placeholder="Enter The Fare"
                  value={fare}
                  placeholderTextColor="rgba(89, 73, 158, 0.5)"
                  onChangeText={(text) => {
                    setfare(text);
                  }}
                  keyboardType="numeric"
                  style={styles.formInput}
                />
              </View>
              <View style={styles.formRow}>
                <TextInput
                  type="number"
                  placeholder="Height"
                  placeholderTextColor="rgba(89, 73, 158, 0.5)"
                  style={styles.formInput}
                  value={height}
                  onChangeText={(text) => {
                    setHeight(text);
                  }}
                  keyboardType="numeric"
                  maxValue={100}
                />
                {/* "rgba(0,0,0,0.7)" */}
                <TextInput
                  placeholder="Width"
                  placeholderTextColor="rgba(89, 73, 158, 0.5)"
                  keyboardType="numeric"
                  value={width}
                  onChangeText={(text) => {
                    setWidth(text);
                  }}
                  style={[styles.formInput, styles.formInput2]}
                />
              </View>
              <View style={styles.formRow}>
                <TextInput
                  type="number"
                  placeholder="Length"
                  placeholderTextColor="rgba(89, 73, 158, 0.5)"
                  style={styles.formInput}
                  value={length}
                  onChangeText={(text) => {
                    setLength(text);
                  }}
                  keyboardType="numeric"
                  maxValue={100}
                />
                <TextInput
                  placeholder="Weight"
                  placeholderTextColor="rgba(89, 73, 158, 0.5)"
                  keyboardType="numeric"
                  value={weight}
                  onChangeText={(text) => {
                    setWeight(text);
                  }}
                  style={[styles.formInput, styles.formInput2]}
                />
              </View>

              <DropDownPicker
                open={openModel}
                items={items}
                setOpen={setOpenModel}
                value={itemsType}
                onSelectItem={(e) => setItemsType(e.value)}
                // setValue={handleChange("gender")}
                setItems={setItems}
                style={{ marginBottom: 5, borderWidth: 0 }}
              />

              <Button
                style={styles.bookingBtn}
                onPress={() => {
                  getPhotoFromGallery();
                  // navigate("CustomerPayment");
                }}
              >
                <Text style={styles.bookingBtnText}>
                  {__("UPLOAD THE PHOTOS")}
                </Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </Content>
      <Button
        style={styles.bookingBtn}
        onPress={() => {
          // fetchData()
          setMainModel(true);
        }}
      >
        <Text style={styles.bookingBtnText}>{__("BOOK NOW")}</Text>
      </Button>
    </Container>
  );
}
export default connect(({ session }) => ({ session }))(SelectVehicle);
