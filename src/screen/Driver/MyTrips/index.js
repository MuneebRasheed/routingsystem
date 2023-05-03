import React, { useState, useEffect } from "react";
import { View, ScrollView, Image } from "react-native";
import { Container, Content, Text, Icon } from "@component/Basic";
import { Button, Picker, TextInput } from "@component/Form";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modalbox";
import Accordion from "./Accordion";

import styles from "./styles";
import theme from "@theme/styles";
import Header from "@component/Header";
import { navigate } from "@navigation";
import { __ } from "@utility/translation";
import request from "@utility/request";
import { bind } from "@utility/component";
import { DarkStatusBar } from "@component/StatusBar";
import { useSelector, useDispatch } from "react-redux";
import RiderChatsModal from "./RiderChatsModal";
export default function MyTrip() {
  const [tabSelected, setTabSelected] = useState("all");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    var data = await AsyncStorage.getItem("response");
    var datas = JSON.parse(data);
    console.log("asuync storage data", datas);
    //  6412f0faf432ae2f820d4f6d
    const res = axios
      .get(
        `http://18.232.210.115:3000/v1/parcel?page=2&limit=5&sort=-1&customer_id=${"6412f0faf432ae2f820d4f6d"}`,
        {
          headers: {
            Authorization: `Bearer ${datas.access_token}`,
          },
        }
      )
      .then((data) => {
        console.log("res", data.data);
        setData(data.data.docs);
      })
      .catch((err) => {
        console.log(("error", err));
      });
  };

  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.socket);

  useEffect(() => {
    if (socket) {
      console.log("RJUNN");
      socket.on("connectedUsers", (data) => {
        console.log("DATA", data);
        setUsers(data);
      });
    }
  }, [socket]);

  useEffect(() => {
    fetchData();
  }, []);

  console.log("CRRENT USERS", users);

  function renderAll() {
    return (
      <View>
        <View style={styles.accordionLayout}>
          <Button onPress={() => socket.disconnect()}>
            <Text style={styles.openBtnText}>Disconnect</Text>
          </Button>
          {data.map((val, index) => {
            return (
              <Accordion
                title={`BOOKING ID ${val?._id}`}
                text="open"
                key={index}
                renderContent={() => (
                  <View style={styles.accordionContent}>
                    <View style={styles.bookingInfo}>
                      <Text style={styles.bookingTitle}>{__("TRIP COST")}</Text>
                      <Text style={styles.bookingText}>
                        {__(`${val?.fare} USD`)}
                      </Text>
                    </View>
                    <View style={styles.bookingInfo}>
                      <Text style={styles.bookingTitle}>{__("TRIP")}</Text>
                      <Text style={styles.bookingDetail}>{__(val?.time)}</Text>
                    </View>
                    <View style={styles.bookingInfo}>
                      <Text style={styles.bookingTitle}>
                        {__("PICK UP FROM")}
                      </Text>
                      <Text style={styles.bookingText}>
                        {__("${JSON.parse(val?.from_location)?.locationName}")}
                      </Text>
                    </View>
                    <View style={styles.bookingInfo}>
                      <Text style={styles.bookingTitle}>{__("DROP AT")}</Text>
                      <Text style={styles.bookingText}>
                        {__("${JSON.parse(val?.to_location)?.locationName}")}
                      </Text>
                    </View>

                    <View style={styles.bookingInfo}>
                      <Text style={styles.bookingTitle}>
                        {__("DRIVER NAME")}
                      </Text>
                      <Text style={styles.bookingText}>
                        {__("DANIEL VETORI")}
                      </Text>
                    </View>
                    <View style={styles.bookingInfo}>
                      <Text style={styles.bookingTitle}>
                        {__("VEHICLE NUMBER")}
                      </Text>
                      <Text style={styles.bookingText}>{__("NY 47568")}</Text>
                    </View>
                    <View style={styles.bookingInfo}>
                      <Text style={styles.bookingTitle}>
                        {__("CALL DRIVER")}
                      </Text>
                      <Text style={styles.bookingText}>
                        {__("@ 64576348763")}
                      </Text>
                    </View>

                    <View style={styles.bookingInfo}>
                      <Text style={styles.bookingTitle}>{__("STATUS")}</Text>
                      <Button
                        onPress={() => {
                          navigate("CustomerBookingComplete");
                        }}
                      >
                        <Text style={styles.openBtnText}>{__("OPEN")}</Text>
                      </Button>
                    </View>

                    <View style={styles.btnInfo}>
                      <View style={styles.detailTag}>
                        <Button
                          style={styles.detailBtn}
                          onPress={() => {
                            navigate("DriverBookingComplete");
                          }}
                        >
                          <Icon
                            name="search"
                            type="Feather"
                            style={[theme.SIZE_14, theme.GREYDARK]}
                          />
                          <Text style={styles.detailBtnText}>
                            {__("DETAILS")}
                          </Text>
                        </Button>
                      </View>

                      <Button
                        style={{ width: 100, marginRight: 25 }}
                        onPress={() => {
                          setIsOpen(true);
                        }}
                      >
                        <Text
                          style={[
                            styles.balanceBtnText,
                            styles.balanceBtnText1,
                          ]}
                        >
                          {__("CHAT")}
                        </Text>
                      </Button>
                      <Button style={{ width: 100 }}>
                        <Text style={styles.balanceBtnText}>
                          {__("Cancel")}
                        </Text>
                      </Button>
                    </View>
                  </View>
                )}
              />
            );
          })}
        </View>
      </View>
    );
  }

  function renderOpen() {
    return (
      <View>
        <View style={styles.accordionLayout}>
          {data.map((val, index) => {
            if (val.status == "pending") {
              return (
                <Accordion
                  title={`BOOKING ID ${val?._id}`}
                  text="open"
                  key={index}
                  renderContent={() => (
                    <View style={styles.accordionContent}>
                      <View style={styles.bookingInfo}>
                        <Text style={styles.bookingTitle}>
                          {__("TRIP COST")}
                        </Text>
                        <Text style={styles.bookingText}>
                          {__(`${val?.fare} USD`)}
                        </Text>
                      </View>
                      <View style={styles.bookingInfo}>
                        <Text style={styles.bookingTitle}>{__("TRIP")}</Text>
                        <Text style={styles.bookingDetail}>
                          {__(val?.time)}
                        </Text>
                      </View>
                      <View style={styles.bookingInfo}>
                        <Text style={styles.bookingTitle}>
                          {__("PICK UP FROM")}
                        </Text>
                        <Text style={styles.bookingText}>
                          {__(
                            "${JSON.parse(val?.from_location)?.locationName}"
                          )}
                        </Text>
                      </View>
                      <View style={styles.bookingInfo}>
                        <Text style={styles.bookingTitle}>{__("DROP AT")}</Text>
                        <Text style={styles.bookingText}>
                          {__("${JSON.parse(val?.to_location)?.locationName}")}
                        </Text>
                      </View>

                      <View style={styles.bookingInfo}>
                        <Text style={styles.bookingTitle}>
                          {__("DRIVER NAME")}
                        </Text>
                        <Text style={styles.bookingText}>
                          {__("DANIEL VETORI")}
                        </Text>
                      </View>
                      <View style={styles.bookingInfo}>
                        <Text style={styles.bookingTitle}>
                          {__("VEHICLE NUMBER")}
                        </Text>
                        <Text style={styles.bookingText}>{__("NY 47568")}</Text>
                      </View>
                      <View style={styles.bookingInfo}>
                        <Text style={styles.bookingTitle}>
                          {__("CALL DRIVER")}
                        </Text>
                        <Text style={styles.bookingText}>
                          {__("@ 64576348763")}
                        </Text>
                      </View>

                      <View style={styles.bookingInfo}>
                        <Text style={styles.bookingTitle}>{__("STATUS")}</Text>
                        <Button
                          onPress={() => {
                            navigate("CustomerBookingComplete");
                          }}
                        >
                          <Text style={styles.openBtnText}>{__("OPEN")}</Text>
                        </Button>
                      </View>
                      <View style={styles.btnInfo}>
                        <View style={styles.detailTag}>
                          <Button
                            style={styles.detailBtn}
                            onPress={() => {
                              navigate("CustomerBookingComplete", { val });
                            }}
                          >
                            <Icon
                              name="search"
                              type="Feather"
                              style={[theme.SIZE_14, theme.GREYDARK]}
                            />
                            <Text style={styles.detailBtnText}>
                              {__("DETAILS")}
                            </Text>
                          </Button>
                        </View>
                        <Button
                          style={styles.balanceBtn}
                          onPress={() => {
                            setIsOpen(true);
                          }}
                        >
                          <Text style={styles.balanceBtnText}>
                            {__("CHAT")}
                          </Text>
                        </Button>
                      </View>
                    </View>
                  )}
                />
              );
            }
          })}
        </View>
      </View>
    );
  }

  function renderCompleted() {
    return (
      <View>
        <View style={styles.accordionLayout}></View>
      </View>
    );
  }

  return (
    <Container>
      <DarkStatusBar />
      <Header leftType="back" />
      <View style={styles.myTripHeader}>
        <Text style={styles.myTripHeaderTitle}>{__("MY TRIPS")}</Text>
        <Text style={styles.myTripHeaderText}>{__("LIST OF TRIPS")}</Text>
        <View style={styles.myTripTabItems}>
          <Button
            style={
              tabSelected === "all" ? styles.tabActive : styles.tabInactive
            }
            onPress={() => setTabSelected("all")}
          >
            <Text
              style={
                tabSelected === "all"
                  ? styles.tabActiveText
                  : styles.tabInactiveText
              }
            >
              {__("ALL")}
            </Text>
          </Button>
          <Button
            style={
              tabSelected === "open" ? styles.tabActive : styles.tabInactive
            }
            onPress={() => setTabSelected("open")}
          >
            <Text
              style={
                tabSelected === "open"
                  ? styles.tabActiveText
                  : styles.tabInactiveText
              }
            >
              {__("OPEN")}
            </Text>
          </Button>
          <Button
            style={
              tabSelected === "completed"
                ? styles.tabActive
                : styles.tabInactive
            }
            onPress={() => setTabSelected("completed")}
          >
            <Text
              style={
                tabSelected === "completed"
                  ? styles.tabActiveText
                  : styles.tabInactiveText
              }
            >
              {__("COMPLETED")}
            </Text>
          </Button>
        </View>
      </View>
      <Content contentContainerStyle={theme.layoutDf}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.myTripContainer}>
            {tabSelected === "all"
              ? renderAll()
              : tabSelected === "open"
              ? renderOpen()
              : tabSelected === "completed"
              ? renderCompleted()
              : null}
          </View>
        </ScrollView>
      </Content>

      {isOpen && <RiderChatsModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </Container>
  );
}
