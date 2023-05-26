import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  Image,
  SafeAreaView,
  Dimensions,
  Platform,
  StyleSheet,
} from "react-native";
import { Container, Content, Text, Icon } from "@component/Basic";
import { TextInput, Button, ToggleSwitch } from "@component/Form";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { COLOR } from "@theme/typography";

import CheckBox from "react-native-check-box";
import styles from "./styles";
import theme from "@theme/styles";

import Header from "@component/Header";

import CalendarStrip from "react-native-calendar-strip";
import Support from "@component/Support";
import { navigate } from "@navigation";
import { __ } from "@utility/translation";
import { DarkStatusBar } from "@component/StatusBar";
import { connect } from "react-redux";
import DatePicker from "react-native-date-picker";
import Accordion from "./Accordion";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const GOOGLE_MAPS_APIKEY = "AIzaSyABbE8m9cfg-OspSdVkr58Lo5SplQ_XFLA";

const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
// const LATITUDE_DELTA = 0.0922;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function MyRoute({ navigation }) {
  const [opens, setOpens] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    { label: "All Days", value: "AllDays" },
    { label: "Monday", value: "monday" },

    { label: "Tuesday", value: "tuesday" },
    { label: "Wednesday", value: "wednesday" },

    { label: "Thusrday", value: "thursday" },
    { label: "Friday", value: "friday" },

    { label: "Saturday", value: "saturday" },
    { label: "Sunday", value: "sunday" },
  ]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [st, setSt] = useState();
  const [et, setEt] = useState();
  const [openStartTime, setOpenStartTime] = useState(false);
  const [openEndTime, setOpenEndTime] = useState(false);
  const [open, setOpen] = useState(false);
  const [divert, setDivert] = useState(false);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  const [form, setForm] = useState();
  const [to, setTo] = useState();
  const [region, setRegion] = useState();

  const coordinates = [
    {
      latitude: 37.3317876,
      longitude: -122.0054812,
    },
    {
      latitude: 37.771707,
      longitude: -122.4053769,
    },
  ];

  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [state, setState] = useState({
    pickupCords: {
      // latitude: 31.5204,
      // longitude: 74.3587,
    },
    droplocationCords: {
      // latitude: 31.4504,
      // longitude: 73.135,
    },
    isLoading: false,
    coordinate: new AnimatedRegion({
      latitude: 31.5204,
      longitude: 74.3587,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    heading: 0,
  });

  const { pickupCords, droplocationCords, coordinate, heading } = state;

  async function submit() {
    var cd = {
      from: pickupCords.locationName,
      to: droplocationCords.locationName,
      from_cord: `${pickupCords?.latitude}, ${pickupCords?.longitude}`,
      to_cord: `${droplocationCords?.latitude}, ${droplocationCords?.longitude}`,
      time: "2023-04-16",
      status: true,
      has_diversion: divert,
    };
    console.log("CURRENT VALUE==>", cd);

    var data = await AsyncStorage.getItem("response");
    var datas = JSON.parse(data);
    console.log("datas", datas);

    console.log("POSTING DATA==>", cd);

    const res = axios
      .post(`  https://routeon.mettlesol.com/v1/routes`, cd, {
        headers: {
          Authorization: `Bearer ${datas.access_token}`,
        },
      })
      .then((data) => {
        console.log("res rout added", data.data);
        Support.showSuccess({
          title: __("Thank You"),
          message: __("Route Has Been Added Succefully!"),
          onHide: async () => {
            navigation.pop();
          },
          hideDelay: 2500,
        });
      })
      .catch((err) => {
        console.log("ERROR WHILE ADDING ROUTE", err.response.data);
      });
  }

  return (
    <Container style={theme.layoutFx}>
      <DarkStatusBar />
      <Header leftType="back" title={"CREATE ROUTE"} />
      <View>
        <DatePicker
          modal
          mode="time"
          open={openStartTime}
          date={startDate}
          onConfirm={(date) => {
            setOpenStartTime(false);
            console.log("Date",date.toTimeString())
       
            setStartDate(date);
            setSt("done")
          }}
          // timeZoneOffsetInMinutes
          onCancel={() => {
            setOpenStartTime(false);
          }}
        
        />
        <DatePicker
          modal
          mode="time"
          open={openEndTime}
          date={endDate}
          onConfirm={(date) => {
            setOpenEndTime(false);
            console.log("Date",date.toTimeString())
           
            setEndDate(date);
            setEt("Done")
          }}
          timeZoneOffsetInMinutes
          onCancel={() => {
            setOpenEndTime(false);
          }}
          
        />
      </View>
      <Content contentContainerStyle={theme.layoutDf}>
        <View style={styles.selectVehicleContainer}>
          <View style={styles.selectVehicleContent}>
            <View style={[styles.formRow]}>
              <GooglePlacesAutocomplete
                placeholder="Pickup"
                textInputProps={{
                  placeholderTextColor: "black",
                  returnKeyType: "search",
                }}
                styles={{
                  textInput: {
                    color: "black",
                  },
                  listView: {
                    color: "black",
                  },
                  description: {
                    color: "black",
                  },
                  predefinedPlacesDescription: {
                    color: "black",
                  },
                }}
                currentLocation={true}
                onPress={(data, details = null) => {
                  let coords = {
                    latitude: details?.geometry?.location?.lat,
                    longitude: details?.geometry?.location?.lng,
                    locationName: data?.structured_formatting?.main_text,
                  };
                  console.log(
                    "Details",
                    data?.structured_formatting?.main_text,

                    coords
                  );

                  setState({
                    ...state,
                    pickupCords: coords,
                  });
                }}
                query={{
                  key: GOOGLE_MAPS_APIKEY,
                  language: "en",
                }}
                minLength={2}
                GooglePlacesDetailsQuery={{ fields: "geometry" }}
                autoFocus={false}
                returnKeyType={"default"}
                fetchDetails={true}
                enablePoweredByContainer={false}
              />
            </View>

            <View style={styles.formRow}>
              <GooglePlacesAutocomplete
                placeholder="Drop Location"
                textInputProps={{
                  placeholderTextColor: "black",
                  returnKeyType: "search",
                }}
                styles={{
                  textInput: {
                    color: "black",
                  },
                  listView: {
                    color: "black",
                  },
                  description: {
                    color: "black",
                  },
                  predefinedPlacesDescription: {
                    color: "black",
                  },
                }}
                currentLocation={true}
                onPress={(data, details = null) => {
                  let coords = {
                    latitude: details?.geometry?.location?.lat,
                    longitude: details?.geometry?.location?.lng,
                    locationName: data?.structured_formatting?.main_text,
                  };

                  setState({
                    ...state,
                    droplocationCords: coords,
                  });
                  // moveTo(test)
                }}
                query={{
                  key: GOOGLE_MAPS_APIKEY,
                  language: "en",
                }}
                minLength={2}
                GooglePlacesDetailsQuery={{ fields: "geometry" }}
                autoFocus={false}
                returnKeyType={"default"}
                fetchDetails={true}
                enablePoweredByContainer={false}
              />
            </View>

            <View style={styles.formRow11}>
              <Button style={styles.formRow2} onPress={() => setOpenStartTime(true)}>
                <Text style={[styles.formInput,{color:'black'}]}>{__(st?`${startDate.toTimeString().split("G")[0]}`:"START TIME")}</Text>
              </Button>
              <Button style={styles.formRow2} onPress={() => setOpenEndTime(true)}>
                <Text style={[styles.formInput,{color:'black'}]}>{__(et?`${endDate.toTimeString().split("G")[0]}`:"END TIME")}</Text>
              </Button>
            </View>

            <DropDownPicker
              open={opens}
              value={value}
              items={items}
              setOpen={setOpens}
              setValue={setValue}
              setItems={setItems}
              placeholder="Select your days"
              onSelectItem={(e) => console.log(e.value)}
              theme="LIGHT"
              multiple={true}
              mode="BADGE"
              badgeDotColors={[
                "#e76f51",
                "#00b4d8",
                "#e9c46a",
                "#e76f51",
                "#8ac926",
                "#00b4d8",
                "#e9c46a",
              ]}
              style={{ zIndex: 5 }}
            />
            <View style={[styles.switchInfo, { marginTop: 10 }]}>
              <Text style={styles.switchText}>
                {__("What You Want To Divert or Not")}
              </Text>
              <ToggleSwitch value={divert} setValue={setDivert} />
            </View>
          </View>
        </View>
      </Content>

      <View
        style={{
          flex: 1,
          zIndex: -2,
        }}
      >
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          initialRegion={
            Object.values(pickupCords).length > 0
              ? {
                  ...pickupCords,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }
              : null
          }
        >
          {/* {Object.values(state.pickupCords).length > 0 && (
                <Marker.Animated ref={markerRef} coordinate={coordinate}>
                  <Image
                    source={require("../../../../assets/images/bike.png")}
                    style={{
                      width: 40,
                      height: 40,
                      transform: [{ rotate: `${heading}deg` }],
                    }}
                    resizeMode="contain"
                  />
                </Marker.Animated>
              )} */}
          {Object.values(state.pickupCords).length > 0 && (
            <Marker
              coordinate={pickupCords}
              image={require("../../../../assets/images/Oval2x.png")}
            />
          )}
          {Object.values(state.droplocationCords).length > 0 && (
            <Marker
              coordinate={droplocationCords}
              image={require("../../../../assets/images/greenMarker2x.png")}
            />
          )}
          {Object.values(state.pickupCords).length > 0 &&
            Object.values(state.droplocationCords).length > 0 && (
              <MapViewDirections
                origin={pickupCords}
                destination={droplocationCords}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={6}
                strokeColor="hotpink"
                optimizeWaypoints={true}
                onReady={(result) => {
                  mapRef.current.fitToCoordinates(result.coordinates);
                }}
              />
            )}
        </MapView>
      </View>
      <Button
        style={styles.bookingBtn}
        onPress={() => {
          submit();
        }}
      >
        <Text style={styles.bookingBtnText}>{__("ADD ROUTE")}</Text>
      </Button>
    </Container>
  );
}

export default connect(({ session }) => ({ session }))(MyRoute);
