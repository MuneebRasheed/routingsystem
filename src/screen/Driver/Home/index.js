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
      bid_amount: bidValue,
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
      alert("You successfully bid on this parcel");
      socket.emit("bidding", requestPayload);
    } catch (error) {
      alert("Something went wrong while bidding...!");
    }
  };

  const [mainModel, setMainModel] = useState(true);
  const [incomingParcelNotifications, setIncomingParcelNotifications] =
    useState([
      {
        __v: 0,
        _id: "6464aee8cd2192b1901c8ff9",
        createdAt: "2023-05-17T10:39:36.547Z",
        customer_id: {
          ID: "",
          ID_file: "",
          __v: 0,
          _id: "6413665dd905a0bb6e203f2b",
          account: "acct_1N83WwPpq5EWgCmW",
          address: "",
          age: "30",
          avatar:
            "file:///storage/emulated/0/Android/data/com.wditechy.truckie/files/Pictures/7b9507be-a6f2-4e67-b229-36273ad7427f.jpg;type=image/png",
          city: "lahore",
          country: "Pakistan",
          cover_image:
            "      https://www.shutterstock.com/image-vector/motorcyc…rider-icon-design-creativity-260nw-1285907485.jpg",
          createdAt: "2023-03-16T18:56:29.578Z",
          driving_license: "",
          first_name: "Haseeb1",
          gender: "male",
          isLoggedIn: true,
          isVerified: false,
          is_block: false,
          last_name: "rasheed",
          password:
            "$2b$10$gvhFOvKftqdO105/JilrcucEGf0yt5nZdNs.sSZU8Xjmi78fzk/hC",
          phone: "+923074461165",
          rating: 0,
          role: [Array],
          status: "active",
          total_earning: "0",
          updatedAt: "2023-05-17T10:36:05.058Z",
          vehicle_no: "",
        },
        description: "",
        fare: "55",
        from_location:
          '"{\\"latitude\\":31.5107032,\\"longitude\\":74.3407454}"',
        from_location_cor: "31.5107032, 74.3407454",
        height: "100",
        images: [],
        length: "7",
        parcel_type: "wood",
        status: "pending",
        time: "2023-10-10T00:00:00.000Z",
        to_location: '"{\\"latitude\\":31.4270794,\\"longitude\\":74.1833836}"',
        to_location_cor: "31.4270794, 74.1833836",
        updatedAt: "2023-05-17T10:39:36.547Z",
        weight: "15kg",
        width: "50",
      },
      {
        __v: 0,
        _id: "6464aee8cd2192b1901c8ff9",
        createdAt: "2023-05-17T10:39:36.547Z",
        customer_id: {
          ID: "",
          ID_file: "",
          __v: 0,
          _id: "6413665dd905a0bb6e203f2b",
          account: "acct_1N83WwPpq5EWgCmW",
          address: "",
          age: "30",
          avatar:
            "file:///storage/emulated/0/Android/data/com.wditechy.truckie/files/Pictures/7b9507be-a6f2-4e67-b229-36273ad7427f.jpg;type=image/png",
          city: "lahore",
          country: "Pakistan",
          cover_image:
            "       https://www.shutterstock.com/image-vector/motorcyc…rider-icon-design-creativity-260nw-1285907485.jpg",
          createdAt: "2023-03-16T18:56:29.578Z",
          driving_license: "",
          first_name: "Haseeb1",
          gender: "male",
          isLoggedIn: true,
          isVerified: false,
          is_block: false,
          last_name: "rasheed",
          password:
            "$2b$10$gvhFOvKftqdO105/JilrcucEGf0yt5nZdNs.sSZU8Xjmi78fzk/hC",
          phone: "+923074461165",
          rating: 0,
          role: [Array],
          status: "active",
          total_earning: "0",
          updatedAt: "2023-05-17T10:36:05.058Z",
          vehicle_no: "",
        },
        description: "",
        fare: "55",
        from_location:
          '"{\\"latitude\\":31.5107032,\\"longitude\\":74.3407454}"',
        from_location_cor: "31.5107032, 74.3407454",
        height: "100",
        images: [],
        length: "7",
        parcel_type: "wood",
        status: "pending",
        time: "2023-10-10T00:00:00.000Z",
        to_location: '"{\\"latitude\\":31.4270794,\\"longitude\\":74.1833836}"',
        to_location_cor: "31.4270794, 74.1833836",
        updatedAt: "2023-05-17T10:39:36.547Z",
        weight: "15kg",
        width: "50",
      },
    ]);
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

      console.log("RESONSE ====>", responseOne);

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
      console.log("ID ===>", id);
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
            <Text style={styles.shareBtnText}>{__("Select Driving Host")}</Text>
          </Button>
        </View>
      </View>
    </Container>
  );
}
