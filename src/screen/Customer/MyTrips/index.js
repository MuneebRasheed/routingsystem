import React, { useState, useEffect } from "react";
import { View, ScrollView, Image } from "react-native";
import { Container, Content, Text, Icon } from "@component/Basic";
import { Button, Picker, TextInput } from "@component/Form";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modalbox";
import Accordion from "./Accordion";
import { COLOR } from "@theme/typography";

import styles from "./styles";
import theme from "@theme/styles";
import Header from "@component/Header";
import { navigate } from "@navigation";
import { __ } from "@utility/translation";
import request from "@utility/request";
import { bind } from "@utility/component";
import { DarkStatusBar } from "@component/StatusBar";
import { useSelector, useDispatch } from "react-redux";
import ChatsModal from "./ChatsModal";
import AppSpinner from "../../../component/AppSpinner";
export default function MyTrip() {
  const [tabSelected, setTabSelected] = useState("all");
  const [isDisabled, setIsDisabled] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    var data = await AsyncStorage.getItem("response");
    var datas = JSON.parse(data);
    console.log("asuync storage data", datas);
    //  6412f0faf432ae2f820d4f6d

    const res = axios
      .get(
        `https://routeon.mettlesol.com/v1/parcel?page=1&limit=500&populate=customer_id%20rider_id&sort=desc&customer_id=${datas._id}`,
        {
          headers: {
            Authorization: `Bearer ${datas.access_token}`,
          },
        }
      )
      .then((data) => {
        console.log("res", data?.data?.docs[0]);
        setData(data.data.docs);
        setLoading(false);
      })
      .catch((err) => {
        console.log(("error", err));
        setLoading(false);
      });
  };

  const [users, setUsers] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);
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

  const handleNavigation = (val) => {
    const [from_location_latitude, from_location_longitude] =
      val.from_location_cor.split(",");

    const [to_location_latitude, to_location_longitude] =
      val.to_location_cor.split(",");

    const from_location = {
      latitude: +from_location_latitude.trim(),
      longitude: +from_location_longitude.trim(),
    };

    const to_location = {
      latitude: +to_location_latitude.trim(),
      longitude: +to_location_longitude.trim(),
    };

    const customObject = {
      ...val,
      from_location,
      to_location,
    };

    navigate("CustomerDriverTracking", {
      data: customObject,
    });
  };

  console.log("trips===>", data);

  function renderAll() {
    return (
      <View>
        <View style={styles.accordionLayout}>
          {data && data.length > 0 ? (
            data?.map((val, index) => {
              return (
                <Accordion
                  title={`TRIPS ID ${index + 1}`}
                  trip={val}
                  key={index}
                  renderContent={() => (
                    <View style={styles.accordionContent}>
                      <View style={styles.bookingInfo}>
                        <Text style={styles.bookingTitle}>
                          {__("TRIP COST")}
                        </Text>
                        <Text style={styles.bookingText}>
                          {val?.pay_amount
                            ? __(`${val?.pay_amount} USD`)
                            : __(`${val?.fare} USD`)}
                        </Text>
                      </View>
                      <View style={styles.bookingInfo}>
                        <Text style={styles.bookingTitle}>{__("TRIP")}</Text>
                        <Text style={styles.bookingDetail}>
                          {__(val?.time.substr(0, 10))}
                        </Text>
                      </View>
                      <View style={styles.bookingInfo}>
                        <Text style={styles.bookingTitle}>
                          {__("PICK UP FROM")}
                        </Text>

                        <Text style={styles.bookingText}>{`${
                          (val?.from_location).length > 30
                            ? val?.from_location.substr(0, 30)
                            : val?.from_location
                        }`}</Text>
                      </View>
                      <View style={styles.bookingInfo}>
                        <Text style={styles.bookingTitle}>{__("DROP AT")}</Text>
                        <Text style={styles.bookingText}>{`${
                          (val?.to_location).length > 30
                            ? val?.to_location.substr(0, 30)
                            : val?.to_location
                        }`}</Text>
                      </View>

                      <View style={styles.bookingInfo}>
                        <Text style={styles.bookingTitle}>
                          {__("DRIVER NAME")}
                        </Text>
                        <Text style={styles.bookingText}>
                          {__(`${val?.rider_id?.first_name}`)}
                        </Text>
                      </View>
                      <View style={styles.bookingInfo}>
                        <Text style={styles.bookingTitle}>
                          {__("VEHICLE NUMBER")}
                        </Text>
                        <Text style={styles.bookingText}>
                          {__(`${val?.rider_id?.vehicle_no}`)}
                        </Text>
                      </View>
                      <View style={styles.bookingInfo}>
                        <Text style={styles.bookingTitle}>
                          {__("CALL DRIVER")}
                        </Text>
                        <Text style={styles.bookingText}>
                          {__(`${val?.rider_id?.phone}`)}
                        </Text>
                      </View>

                      <View style={styles.bookingInfo}>
                        <Text style={styles.bookingTitle}>{__("STATUS")}</Text>
                        <Button
                          onPress={() => {
                            // navigate("CustomerBookingComplete");
                          }}
                        >
                          <Text style={styles.openBtnText}>
                            {__(`${val?.status}`)}
                          </Text>
                        </Button>
                      </View>

                      <View style={styles.btnInfo}>
                        <Button
                          style={styles.detailBtn}
                          onPress={() => {
                            navigate("CustomerBookingComplete", { data: val });
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
                      </View>
                    </View>
                  )}
                />
              );
            })
          ) : (
            <View style={styles.noTripsFoundContainer}>
              <Text style={styles.noTripsFoundText}>No Trips Found</Text>
            </View>
          )}
        </View>
      </View>
    );
  }

  function renderOpen() {
    return (
      <View>
        <View style={styles.accordionLayout}>
          {data &&
          data?.length > 0 &&
          data.filter((d) => d.status === "in_progress")?.length > 0 ? (
            data.map((val, index) => {
              if (val.status == "in_progress") {
                return (
                  <Accordion
                    title={`TRIPS ID ${index + 1}`}
                    trip={val}
                    key={index}
                    renderContent={() => (
                      <View style={styles.accordionContent}>
                        <View style={styles.bookingInfo}>
                          <Text style={styles.bookingTitle}>
                            {__("TRIP COST")}
                          </Text>
                          <Text style={styles.bookingText}>
                            {val?.pay_amount
                              ? __(`${val?.pay_amount} USD`)
                              : __(`${val?.fare} USD`)}
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

                          <Text
                            style={styles.bookingText}
                          >{`${val?.from_location}`}</Text>
                        </View>
                        <View style={styles.bookingInfo}>
                          <Text style={styles.bookingTitle}>
                            {__("DROP AT")}
                          </Text>
                          <Text
                            style={styles.bookingText}
                          >{`${val?.to_location}`}</Text>
                        </View>

                        <View style={styles.bookingInfo}>
                          <Text style={styles.bookingTitle}>
                            {__("DRIVER NAME")}
                          </Text>
                          <Text style={styles.bookingText}>
                            {__(`${val?.customer_id?.first_name}`)}
                          </Text>
                        </View>
                        <View style={styles.bookingInfo}>
                          <Text style={styles.bookingTitle}>
                            {__("VEHICLE NUMBER")}
                          </Text>
                          <Text style={styles.bookingText}>
                            {__("NY 47568")}
                          </Text>
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
                          <Text style={styles.bookingTitle}>
                            {__("STATUS")}
                          </Text>
                          <Button
                            onPress={() => {
                              navigate("CustomerBookingComplete");
                            }}
                          >
                            <Text style={styles.openBtnText}>
                              {__(`${val?.status}`)}
                            </Text>
                          </Button>
                        </View>

                        <View style={styles.btnInfo}>
                          <Button
                            style={styles.detailBtn}
                            onPress={() => {
                              navigate("CustomerBookingComplete", {
                                data: val,
                              });
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
                        </View>
                      </View>
                    )}
                  />
                );
              }
            })
          ) : (
            <View style={styles.noTripsFoundContainer}>
              <Text style={styles.noTripsFoundText}>No Open Trips Found</Text>
            </View>
          )}
        </View>
      </View>
    );
  }

  function renderCompleted() {
    return (
      <View>
        <View style={styles.accordionLayout}>
          {data &&
          data?.length > 0 &&
          data.filter((d) => d.status === "completed")?.length > 0 ? (
            data.map((val, index) => {
              if (val.status == "completed") {
                return (
                  <Accordion
                    title={`TRIPS ID ${index + 1}`}
                    trip={val}
                    key={index}
                    renderContent={() => (
                      <View style={styles.accordionContent}>
                        <View style={styles.bookingInfo}>
                          <Text style={styles.bookingTitle}>
                            {__("TRIP COST")}
                          </Text>
                          <Text style={styles.bookingText}>
                            {val?.pay_amount
                              ? __(`${val?.pay_amount} USD`)
                              : __(`${val?.fare} USD`)}
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

                          <Text
                            style={styles.bookingText}
                          >{`${val?.from_location}`}</Text>
                        </View>
                        <View style={styles.bookingInfo}>
                          <Text style={styles.bookingTitle}>
                            {__("DROP AT")}
                          </Text>
                          <Text
                            style={styles.bookingText}
                          >{`${val?.to_location}`}</Text>
                        </View>

                        <View style={styles.bookingInfo}>
                          <Text style={styles.bookingTitle}>
                            {__("DRIVER NAME")}
                          </Text>
                          <Text style={styles.bookingText}>
                            {__(`${val?.customer_id?.first_name}`)}
                          </Text>
                        </View>
                        <View style={styles.bookingInfo}>
                          <Text style={styles.bookingTitle}>
                            {__("VEHICLE NUMBER")}
                          </Text>
                          <Text style={styles.bookingText}>
                            {__("NY 47568")}
                          </Text>
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
                          <Text style={styles.bookingTitle}>
                            {__("STATUS")}
                          </Text>
                          <Button
                            onPress={() => {
                              navigate("CustomerBookingComplete");
                            }}
                          >
                            <Text style={styles.openBtnText}>
                              {__(`${val?.status}`)}
                            </Text>
                          </Button>
                        </View>

                        <View style={styles.btnInfo}>
                          <Button
                            style={styles.detailBtn}
                            onPress={() => {
                              navigate("CustomerBookingComplete", {
                                data: val,
                              });
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
                        </View>
                      </View>
                    )}
                  />
                );
              }
            })
          ) : (
            <View style={styles.noTripsFoundContainer}>
              <Text style={styles.noTripsFoundText}>
                No Completed Trips Found
              </Text>
            </View>
          )}
        </View>
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
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <AppSpinner color={COLOR.PRIMARY} size="large" />
        </View>
      ) : (
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
      )}
      {selectedParcel && (
        <ChatsModal
          selectedParcel={selectedParcel}
          setSelectedParcel={setSelectedParcel}
        />
      )}
    </Container>
  );
}
