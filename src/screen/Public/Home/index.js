import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, Platform, Image } from "react-native";
import { Container, Content, Text } from "@component/Basic";
import { DarkStatusBar } from "@component/StatusBar";
import { Button } from "@component/Form";
import { navigate } from "@navigation";
import { __ } from "@utility/translation";
import styles from "./styles";

import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Header from "@component/Header";

const GOOGLE_MAPS_APIKEY = "AIzaSyABbE8m9cfg-OspSdVkr58Lo5SplQ_XFLA";

const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
// const LATITUDE_DELTA = 0.0922;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function Home(params) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const pickupRef = useRef(null);
  const droplocationRef = useRef(null);
  const [state, setState] = useState({
    pickupCords: params?.route?.params?.data
      ? params.route?.params?.data.pickupCords
      : {},
    droplocationCords: params?.route?.params?.data
      ? params?.route?.params?.data.droplocationCords
      : {},
    isLoading: false,
    coordinate: new AnimatedRegion({
      latitude: 31.5204,
      longitude: 74.3587,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    heading: 0,
  });

  const { pickupCords, droplocationCords, coordinate } = state;

  const handleNavigation = () => {
    if (
      Object.values(state.pickupCords).length > 0 &&
      Object.values(state.droplocationCords).length > 0
    ) {
      navigate("CustomerSelectVehicle", {
        to: state.droplocationCords,
        form: state.pickupCords,
      });
    } else {
      alert("Please Fill the Start and Destination Location");
    }
  };

  useEffect(() => {
    if (
      params.route?.params?.data.pickupCords &&
      params?.route?.params?.data.droplocationCords
    ) {
      pickupRef.current?.setAddressText(
        params.route?.params?.data.pickupCords?.locationName
      );
      droplocationRef?.current?.setAddressText(
        params.route?.params?.data.droplocationCords?.locationName
      );
    }
  }, []);

  console.log("CURRENT PARAMS 007 ===>", params?.route?.params);
  return (
    <Container>
      <DarkStatusBar />
      <Header leftType="menu" title={"TRUCKIE"} />
      <Content>
        <View style={styles.homeContainer}>
          <View style={styles.formRow}>
            <GooglePlacesAutocomplete
              ref={pickupRef}
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
              ref={droplocationRef}
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
          <View style={styles.mMap}>
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
        </View>
      </Content>
      <View style={styles.footerBtn}>
        <View style={styles.footerBtnInfo}>
          <Button
            style={styles.selectBtn}
            onPress={() => {
              handleNavigation();
            }}
          >
            <Text style={styles.shareBtnText}>{__("Select Driving Host")}</Text>
          </Button>
        </View>
      </View>
    </Container>
  );
}
