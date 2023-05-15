import React, { useState, useRef, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { Container, Content, Text } from "@component/Basic";
import { Button } from "@component/Form";
import styles from "./styles";

import axios from "axios";
import Modal from "react-native-modalbox";
import Header from "@component/Header";

import { __ } from "@utility/translation";
import ApplicationCard from "./ApplicationCard";
import { DarkStatusBar } from "@component/StatusBar";
import BiddingCard from "./BiddingCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ route }) {
  const { socket } = useSelector((state) => state.socket);

  const closeModelBaseOnId = (id) => {
    console.log("Here Is Id ", Structure.length);
    if (incomingParcelNotifications.length == 1) {
      setMainModel(false);
    }
    setIncomingParcelNotifications((previous) => {
      return previous.filter((value) => {
        return value.id != id;
      });
    });
  };

  const handleBid = async (bidValue, selectedParcel) => {
    var data = await AsyncStorage.getItem("response");
    var datas = JSON.parse(data);

    const requestPayload = {
      bid_amount: Number(bidValue),
      parcel: selectedParcel._id,
      bidder: datas._id,
      description: "string",
    };

    try {
      const responseOne = await axios.post(
        "https://testing.explorelogix.com/v1/bid",
        requestPayload,
        {
          headers: {
            Authorization: `Bearer ${datas.access_token}`,
          },
        }
      );

      console.log("SUCCESSFULL RESPONSE ==>", responseOne.data);

      socket.emit("bidding", requestPayload);
    } catch (error) {
      alert("Something went wrong while bidding...!");
    }
  };

  const [mainModel, setMainModel] = useState(false);
  const [incomingParcelNotifications, setIncomingParcelNotifications] =
    useState([]);
  const ModalNotification = useRef();

  const getParcelById = async (parcelId) => {
    var data = await AsyncStorage.getItem("response");
    var datas = JSON.parse(data);

    try {
      const responseOne = await axios.get(
        `https://testing.explorelogix.com/v1/parcel/${parcelId}`,
        {
          headers: {
            Authorization: `Bearer ${datas.access_token}`,
          },
        }
      );

      setIncomingParcelNotifications([
        ...incomingParcelNotifications,
        responseOne.data,
      ]);
      if (!mainModel) {
        setMainModel(true);
      }
    } catch (err) {
      alert("Something went wrong whil fetching parcel");
      console.log(err.response);
    }
  };

  useEffect(() => {
    if (route?.params && route?.params?.data) {
      const id = route?.params?.data?.split("Id: ")[1].split(" has")[0];

      getParcelById(id);
    }
  }, []);

  const MainModel = () => {
    return (
      <Modal
        ref={ModalNotification}
        isOpen={true}
        entry={"top"}
        swipeToClose={false}
        style={{
          borderRadius: 10,
          alignItems: "center",
        }}
        backdropPressToClose={false}
      >
        {incomingParcelNotifications.map((val) => {
          return (
            <BiddingCard
              val={val}
              CloseModelBaseOnId={closeModelBaseOnId}
              handleBid={handleBid}
            />
          );
        })}
      </Modal>
    );
  };

  console.log("STATET ===>", incomingParcelNotifications);
  return (
    <Container>
      <DarkStatusBar />

      <Header leftType="menu" title={"Dashboard"} />
      <Modal isOpen={mainModel} entry={"top"} backdropOpacity={0.3}>
        <View
          style={{
            flex: 1,
          }}
        >
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
            <Text style={styles.shareBtnText}>
              {__("Select Driving Host")} MYHH
            </Text>
          </Button>
        </View>
      </View>
    </Container>
  );
}
