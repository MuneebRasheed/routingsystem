import React, { useState, useEffect } from "react";
import { View, ScrollView, Image } from "react-native";
import { Container, Content, Text, Icon } from "@component/Basic";
import { Button, Picker, TextInput } from "@component/Form";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modalbox";
import Accordion from "./Accordion";
import { COLOR, FAMILY, SIZE } from "@theme/typography";

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

    //  6412f0faf432ae2f820d4f6d
    const res = axios
      .get(
        `https://26e4-45-117-104-39.ngrok-free.app/v1/parcel?page=1&limit=500&sort=desc&rider_id=${datas._id}`,
        {
          headers: {
            Authorization: `Bearer ${datas.access_token}`,
          },
        }
      )
      .then((data) => {
        setData(data.data.docs);
      })
      .catch((err) => {
        console.log(("error", err.response));
      });
  };

  const [users, setUsers] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.socket);

  const handleNavigation = (val) => {
    alert("navigation");
    navigate("CustomerDriverTracking", {
      data: val,
    });
  };

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

  function renderAll() {
    return (
      <View>
        <View style={styles.accordionLayout}>
          {/* <Button onPress={() => socket.disconnect()}>
            <Text style={styles.openBtnText}>Disconnect</Text>
          </Button> */}
          {data.map((val, index) => {
            return (
              <Accordion
                title={`TRIPS ID : ${index + 1}`}
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
                        {__(`${val?.from}`)}
                      </Text>
                    </View>
                    <View style={styles.bookingInfo}>
                      <Text style={styles.bookingTitle}>{__("DROP AT")}</Text>
                      <Text style={styles.bookingText}>{__(`${val?.to}`)}</Text>
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
                        style={[
                          styles.detailBtn,
                          ,
                          { backgroundColor: COLOR.BLUE },
                        ]}
                        onPress={() => {
                          console.log("CURRENT PAR===>", val);
                          setSelectedParcel(val);
                        }}
                      >
                        <Icon
                          name="chat"
                          type="MaterialIcons"
                          style={[theme.SIZE_14, theme.LIGHT]}
                        />
                        <Text
                          style={[styles.detailBtnText, { color: COLOR.LIGHT }]}
                        >
                          {__("CHAT")}
                        </Text>
                      </Button>
                      <Button
                        style={[
                          styles.detailBtn,
                          { backgroundColor: COLOR.GREEN },
                        ]}
                        onPress={() => handleNavigation(val)}
                      >
                        <Text
                          style={[styles.detailBtnText, { color: "white" }]}
                        >
                          Tracking
                        </Text>
                      </Button>
                      <Button
                        style={styles.cancelBtn}
                        onPress={() => alert("Ride Cancel")}
                      >
                        <Text style={styles.cancelBtnText}>Cancel</Text>
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
                  title={`TRIPS ID : ${index + 1}`}
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
                          {__(`${val?.from}`)}
                        </Text>
                      </View>
                      <View style={styles.bookingInfo}>
                        <Text style={styles.bookingTitle}>{__("DROP AT")}</Text>
                        <Text style={styles.bookingText}>
                          {__(`${val?.to}`)}
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
                          style={[
                            styles.detailBtn,
                            ,
                            { backgroundColor: COLOR.BLUE },
                          ]}
                          onPress={() => {
                            console.log("CURRENT PAR===>", val);
                            setSelectedParcel(val);
                          }}
                        >
                          <Icon
                            name="chat"
                            type="MaterialIcons"
                            style={[theme.SIZE_14, theme.LIGHT]}
                          />
                          <Text
                            style={[
                              styles.detailBtnText,
                              { color: COLOR.LIGHT },
                            ]}
                          >
                            {__("CHAT")}
                          </Text>
                        </Button>
                        <Button
                          style={[
                            styles.detailBtn,
                            { backgroundColor: COLOR.GREEN },
                          ]}
                          onPress={() => handleNavigation(val)}
                        >
                          <Text
                            style={[styles.detailBtnText, { color: "white" }]}
                          >
                            Tracking
                          </Text>
                        </Button>
                        <Button
                          style={styles.cancelBtn}
                          onPress={() => alert("Ride Cancel")}
                        >
                          <Text style={styles.cancelBtnText}>Cancel</Text>
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

      {selectedParcel && (
        <RiderChatsModal
          selectedParcel={selectedParcel}
          setSelectedParcel={setSelectedParcel}
        />
      )}
    </Container>
  );
}
