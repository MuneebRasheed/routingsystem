import React, { useState, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Container, Content, Text, Icon } from "@component/Basic";
import { TextInput, Button } from "@component/Form";
import theme from "@theme/styles";
import styles from "./styles";

import Modal from "react-native-modalbox";
import Header from "@component/Header";

import { navigate } from "@navigation";
import { __ } from "@utility/translation";
import ApplicationCard from "./ApplicationCard";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DarkStatusBar } from "@component/StatusBar";
import messaging from "@react-native-firebase/messaging";

export default function Home() {
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
      IsBidding:true
    },
    {
      id: 2,
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
      IsBidding:false
    },
  ]);

  useEffect(()=>{
 
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
      console.log("Driver side on foreground state....", remoteMessage);
    });

   
  },[])

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

  function showBiddingField(id){
    setStructure((previous) => {
      return previous.map((value) => {
        var temp={}

        if(value.id==id){
          temp = {...value,IsBidding:!value.IsBidding}
        }else{
          temp=value
        }
        return temp;
      });
    });
  }
  const [open, setOpen] = useState(false);
  const [mainModel, setMainModel] = useState(false);
  const [data, setData] = useState([]);
  let img =
    "https://images.pexels.com/photos/709188/pexels-photo-709188.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500}}";
  let username = __("Allen John");
  const ModalNotification = useRef();

  const MainModel = () => {
    return (
      <Modal
        ref={ModalNotification}
        isOpen={true}
        entry={"top"}
        swipeToClose={false}
        style={{
          height: 200,
          width: 400,
          borderRadius: 10,
          alignItems: "center",
        }}
        backdropPressToClose={false}
      >
        {Structure.map((val) => {
          return (
            val.IsActive && (
              <View style={{ borderRadius: 50 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: "20%" }}>
                    <Image
                      source={require("@asset/images/avatar.png")}
                      resizeMode="cover"
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        margin: 10,
                      }}
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
                      <Text>{__("Suzuki Wagon R")}</Text>
                      <Text>{__("PKR 650)")}</Text>
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
                      <Text>{__("2 min)")}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        margin: 5,
                        fontSize: 20,
                      }}
                    >
                      <Text>{__("4.8(2454)")}</Text>
                      <Text>{__("406 m)")}</Text>
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
                    style={[
                      styles.bookingBtn,
                      { width: "25%", backgroundColor: "red" },
                    ]}
                    onPress={(va) => {
                      console.log("Muneeb click on Decline");
                      CloseModelBaseOnId(val.id);
                      // setOpen(false);
                    }}
                  >
                    <Text style={styles.bookingBtnText}>{__("Decline")}</Text>
                  </Button>
                  <Button
                    style={[
                      styles.bookingBtn,
                      { width: "25%", marginLeft: -10 },
                    ]}
                    onPress={() => {
                      console.log("Muneeb click on Accept");
                      navigate("CustomerPayment");
                    }}
                  >
                    <Text style={styles.bookingBtnText}>{__("Accepts")}</Text>
                  </Button>
                  <Button
                    style={[
                      styles.bookingBtn,
                      { width: "25%", marginLeft: -10 },
                    ]}
                    onPress={() => {
                      
                      showBiddingField(val.id)
                      // navigate("CustomerPayment");
                    }}
                  >
                    <Text style={styles.bookingBtnText}>{__("Bidding")}</Text>
                  </Button>
                </View>
                {val.IsBidding&&<View style={{flexDirection:'row',alignItems:'center'}}>
                <TextInput placeholder="Enter The Bidding" style={{width:300,borderRadius:10,paddingLeft:10,marginLeft:20}}></TextInput>
                  <TouchableOpacity>
                    <Icon
                      name="send"
                      type="FontAwesome"
                      style={[theme.SIZE_25, theme.DARKVIOLET]}
                    />
                  </TouchableOpacity>
                </View>}
              </View>
            )
          );
        })}
      </Modal>
    );
  };
  return (
    <Container>
      <DarkStatusBar />

      <Header leftType="menu" title={"Dashboard"} />
      <Modal isOpen={mainModel} entry={"top"} backdropOpacity={0.3}>
        <View style={{ height: "25%" }}>
          <MainModel />
        </View>

        <Button
          style={[styles.bookingBtn, { backgroundColor: "grey" }]}
          onPress={() => {
            setMainModel(false);
          }}
        >
          <Text style={styles.bookingBtnText}>{__("Cancel")}</Text>
        </Button>
      </Modal>
      <Content>
        <ScrollView>
          <View
            style={[
              styles.homeContainer,
              {
                alignItems: "center",
                justifyContent: "space-around",
                flexDirection: "row",
              },
            ]}
          ></View>
          <View style={{ width: "90%", alignSelf: "center", paddingTop: 15 }}>
            <ApplicationCard value={"123"} length={9} />
          </View>
        </ScrollView>
      </Content>

      <View style={styles.footerBtn}>
        <View style={styles.footerBtnInfo}>
          <Button
            style={styles.selectBtn}
            onPress={() => {
              // getTransactionHistory()
              setMainModel(true);
            }}
          >
            <Text style={styles.shareBtnText}>{__("Select Driving Host")}</Text>
          </Button>
        </View>
      </View>
    </Container>
  );
}
