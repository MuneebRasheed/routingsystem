import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  Image,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Container, Content, Text, Icon } from "@component/Basic";
import { TextInput, Button, ToggleSwitch } from "@component/Form";
import { COLOR } from "@theme/typography";

import CheckBox from "react-native-check-box";
import styles from "./styles";
import theme from "@theme/styles";

import Header from "@component/Header";

import CalendarStrip from "react-native-calendar-strip";
import Support from "@component/Support";
import { navigate } from "@navigation";
import { __ } from "@utility/translation";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { DarkStatusBar } from "@component/StatusBar";
import { connect } from "react-redux";
import DatePicker from "react-native-date-picker";
import Accordion from "./Accordion";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import MapView from "react-native-maps";

import MapViewDirections from "react-native-maps-directions";

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
  const [date, setDate] = useState(new Date());
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

  const mapRef = useRef();

  const GOOGLE_MAPS_APIKEY = "AIzaSyABbE8m9cfg-OspSdVkr58Lo5SplQ_XFLA";
  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;

  const LATITUDE_DELTA = 0.07922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const edgePaddingValue = 70;

  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue + 70,
    left: edgePaddingValue,
  };
  const traceRoute = () => {
    if (start && end) {
      mapRef.current?.fitToCoordinates([start, end], { edgePadding });
    }
  };
  const moveTo = async () => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  async function submit() {
    var cd = {
      from: form.locationName,
      to: to.locationName,
      from_cord: `${form.coordinates.latitude}, ${form.coordinates.longitude}`,
      to_cord: `${to.coordinates.latitude}, ${to.coordinates.longitude}`,
      time: "2023-04-16",
      status: true,
      has_diversion: divert,
    };
    console.log(cd);

    var data = await AsyncStorage.getItem("response");
    var datas = JSON.parse(data);
    console.log(datas);

    console.log("POSTING DATA==>", cd);

    const res = axios
      .post(`  https://testing.explorelogix.com/v1/routes`, cd, {
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
          open={open}
          date={date}
          onConfirm={(date) => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          style={{ backgroundColor: "red" }}
        />
      </View>
      <Content contentContainerStyle={theme.layoutDf}>
        <View style={styles.selectVehicleContainer}>
          <View style={styles.selectVehicleContent}>
            <View style={[styles.formRow]}>
              <GooglePlacesAutocomplete
                placeholder="Drop"
                currentLocation={true}
                onPress={(data, details = null) => {
                  console.log(data, details);
                  console.log(
                    "LOcation",
                    JSON.stringify(details?.geometry?.location)
                  );
                  var test = {
                    latitude: details?.geometry?.location?.lat,
                    longitude: details?.geometry?.location?.lng,
                  };
                  setTo({
                    coordinates: test,
                    locationName: data?.structured_formatting?.main_text,
                  });
                  setEnd(test);
                  traceRoute();
                }}
                query={{
                  key: "AIzaSyABbE8m9cfg-OspSdVkr58Lo5SplQ_XFLA",
                  language: "en",
                }}
                minLength={2}
                GooglePlacesDetailsQuery={{ fields: "geometry" }}
                autoFocus={false}
                returnKeyType={"default"}
                fetchDetails={true}
                enablePoweredByContainer={false}
                currentLocationLabel="Current location"
              />
            </View>

            <View style={styles.formRow}>
              <GooglePlacesAutocomplete
                placeholder="Pickup From"
                currentLocation={true}
                currentLocationLabel="Current location"
                onPress={(data, details = null) => {
                  // console.log("data", "details");
                  console.log(
                    "LOcation",
                    details,
                    // data?.structured_formatting.main_text
                    data
                  );
                  var test = {
                    latitude: details?.geometry?.location?.lat,
                    longitude: details?.geometry?.location?.lng,
                  };
                  mapRef.current.initialRegion = {
                    latitude: details?.geometry?.location?.lat,
                    longitude: details?.geometry?.location?.lng,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                  };
                  console.log("Test", test);
                  setStart(test);
                  setForm({
                    coordinates: test,
                    locationName: data?.structured_formatting?.main_text,
                  });
                  moveTo(test);
                }}
                query={{
                  key: "AIzaSyABbE8m9cfg-OspSdVkr58Lo5SplQ_XFLA",
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
              <Button style={styles.formRow2} onPress={() => setOpen(true)}>
                <Text style={styles.formInput}>{__("START TIME")}</Text>
              </Button>
              <Button style={styles.formRow2} onPress={() => setOpen(true)}>
                <Text style={styles.formInput}>{__("END TIME")}</Text>
              </Button>
            </View>

            <View style={styles.switchInfo}>
              <Text style={styles.switchText}>
                {__("Are You Divert or Not")}
              </Text>
              <ToggleSwitch value={divert} setValue={setDivert} />
            </View>

            <DropDownPicker
              open={opens}
              value={value}
              items={items}
              setOpen={setOpens}
              setValue={setValue}
              setItems={setItems}
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
            />
          </View>
        </View>
      </Content>

      <MapView
        style={styles.mMapImg}
        initialRegion={{
          latitude: start?.latitude == undefined ? 0 : start?.latitude,
          longitude: start?.longitude == undefined ? 0 : start?.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        ref={mapRef}
        region={{
          latitude: start?.latitude == undefined ? 0 : start?.latitude,
          longitude: start?.longitude == undefined ? 0 : start?.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        {start && <MapView.Marker key={`coordinate_1`} coordinate={start} />}
        {end && <MapView.Marker key={`coordinate_2`} coordinate={end} />}

        {start && end && (
          <MapViewDirections
            strokeWidth={3}
            strokeColor="hotpink"
            optimizeWaypoints={true}
            timePrecision={"now"}
            origin={start}
            waypoints={
              coordinates.length > 2 ? coordinates.slice(1, -1) : undefined
            }
            destination={end}
            apikey={GOOGLE_MAPS_APIKEY}
            onStart={(params) => {
              console.log(
                `Started routing between "${params.origin}" and "${params.destination}"`
              );
            }}
            onReady={(result) => {
              console.log(`Distance: ${result.distance} km`);
              console.log(`Duration: ${result.duration} min.`);
            }}
            onError={(errorMessage) => {
              console.log("GOT AN ERROR");
            }}
          />
        )}
      </MapView>
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
