import React, { useState, useRef, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { Container, Content, Text, Icon } from "@component/Basic";
import { TextInput, Button } from "@component/Form";
import theme from "@theme/styles";
import styles from "./styles";

import axios from "axios";
import Modal from "react-native-modalbox";
import Header from "@component/Header";

import { navigate } from "@navigation";
import { __ } from "@utility/translation";
import ApplicationCard from "./ApplicationCard";
import { DarkStatusBar } from "@component/StatusBar";
import BiddingCard from "./BiddingCard";

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
      IsBidding: true,
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

  function showBiddingField(id) {
    setStructure((previous) => {
      return previous.map((value) => {
        var temp = {};

        if (value.id == id) {
          temp = { ...value, IsBidding: !value.IsBidding };
        } else {
          temp = value;
        }
        return temp;
      });
    });
  }

  const handleBid = async (bidValue) => {
    try {
      const responseOne = await axios.post(
        "https://testing.explorelogix.com/v1/bid",
        {
          bid_amount: Number(bidValue),
          parcel: "645c8d782cf653a35a6d19e8",
          bidder: "6413665dd905a0bb6e203f2b",
          description: "string",
        }
      );
    } catch (error) {
      alert("Something went wrong while bidding...!");
    }
  };

  const [mainModel, setMainModel] = useState(true);
  const ModalNotification = useRef();

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
        {Structure.map((val) => {
          return (
            val.IsActive && (
              <BiddingCard
                val={val}
                CloseModelBaseOnId={CloseModelBaseOnId}
                showBiddingField={showBiddingField}
                handleBid={handleBid}
              />
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
