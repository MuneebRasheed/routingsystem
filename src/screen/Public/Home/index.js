import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import { Container, Content, Text, Icon } from "@component/Basic";
import { DarkStatusBar } from "@component/StatusBar";
import { Button } from "@component/Form";
import { navigate } from "@navigation";
import { __ } from "@utility/translation";
import { COLOR, SIZE } from "@theme/typography";
import styles from "./styles";

import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Geocoder from "react-native-geocoding";
import Header from "@component/Header";
import { locationPermission } from "../../../helper/getCurrentLocation";

const GOOGLE_MAPS_APIKEY = "AIzaSyABbE8m9cfg-OspSdVkr58Lo5SplQ_XFLA";
navigator.geolocation = require("react-native-geolocation-service");

Geocoder.init(GOOGLE_MAPS_APIKEY);
const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function Home(params) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const pickupRef = useRef(null);
  const droplocationRef = useRef(null);
  const [state, setState] = useState({
    pickupCords: params?.route?.params?.mydata
      ? params.route?.params?.mydata.pickupCords
      : {},
    droplocationCords: params?.route?.params?.mydata
      ? params?.route?.params?.mydata.droplocationCords
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

  const defaultLocation = {
    latitude: 30.375321,
    latitudeDelta: 13.4496069226905,
    longitude: 69.34511599999999,
    longitudeDelta: 8.096753331385585,
  };

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

  const handleReverseGeocoding = async (lat, lng) => {
    try {
      const result = await Geocoder.from(lat, lng);
      const address = result?.results[0]?.formatted_address;

      return address;
    } catch (err) {
      console.log("ERROR WHILE GEOCODING ADDRESS", err);
    }
  };

  const askForLocationPermission = async () => {
    try {
      const resp = await locationPermission();
      console.log("LOCATION RESPONSE====>", resp);
    } catch (err) {
      console.log("LOCATION ERROR===>", err);
    }
  };

  const showClearInputButton = (clearInput) => {
    return (
      <Icon
        name="ios-close-circle-outline"
        type="Ionicons"
        style={styles.closeIconStyles}
        onPress={clearInput}
      />
    );
  };

  const handleClearPickupInput = () => {
    pickupRef?.current?.setAddressText("");
    setState({
      ...state,
      pickupCords: {},
    });
  };

  useEffect(() => {
    console.log("CURRENT PARAMS ==>", params);
    askForLocationPermission();
    if (
      params?.route?.params?.mydata &&
      params?.route?.params?.mydata.pickupCords &&
      params &&
      params?.route?.params?.mydata.droplocationCords
    ) {
      pickupRef.current?.setAddressText(
        params.route?.params?.mydata.pickupCords?.locationName
      );
      droplocationRef?.current?.setAddressText(
        params.route?.params?.mydata.droplocationCords?.locationName
      );
    }
  }, []);

  console.log("LATEST PICKUP COORDS===>", pickupCords);

  return (
    <Container>
      <DarkStatusBar />
      <Header leftType="menu" title={"TRUCKIE"} />
      <Content>
        <View style={styles.homeContainer}>
          <View style={styles.formRow}>
            <GooglePlacesAutocomplete
              nearbyPlacesAPI="None"
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
              currentLocation
              currentLocationLabel="Current location"
              onPress={async (data, details = null) => {
                let coords = {
                  latitude: details?.geometry?.location?.lat,
                  longitude: details?.geometry?.location?.lng,
                  locationName: data?.structured_formatting?.main_text,
                };

                if (!coords?.locationName) {
                  const returnedAddress = await handleReverseGeocoding(
                    coords?.latitude,
                    coords?.longitude
                  );

                  coords.locationName = returnedAddress;
                  pickupRef.current?.setAddressText(coords.locationName);
                  pickupRef.current?.blur();
                }

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
              renderRightButton={() => {
                return pickupRef?.current?.getAddressText() &&
                  state.pickupCords?.latitude
                  ? showClearInputButton(handleClearPickupInput)
                  : null;
              }}
            />
          </View>
          <View style={styles.formRow}>
            <GooglePlacesAutocomplete
              nearbyPlacesAPI="None"
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
              currentLocation
              currentLocationLabel="Current location"
              onPress={async (data, details = null) => {
                let coords = {
                  latitude: details?.geometry?.location?.lat,
                  longitude: details?.geometry?.location?.lng,
                  locationName: data?.structured_formatting?.main_text,
                };

                if (!coords?.locationName) {
                  const returnedAddress = await handleReverseGeocoding(
                    coords?.latitude,
                    coords?.longitude
                  );

                  coords.locationName = returnedAddress;
                  droplocationRef.current?.setAddressText(coords.locationName);
                  droplocationRef.current?.blur();
                }

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
              style={[StyleSheet.absoluteFill, { elevation: -1 }]}
              initialRegion={defaultLocation}
              region={
                Object.values(pickupCords).length > 0
                  ? {
                      latitudeDelta: LATITUDE_DELTA,
                      longitudeDelta: LONGITUDE_DELTA,
                      ...pickupCords,
                    }
                  : null
              }
              onRegionChangeComplete={async (coords, { isGesture }) => {
                if (isGesture && !pickupCords?.latitude) {
                  const returnedAddress = await handleReverseGeocoding(
                    coords?.latitude,
                    coords?.longitude
                  );

                  coords.locationName = returnedAddress;
                  pickupRef.current?.setAddressText(coords.locationName);
                  pickupRef.current?.blur();

                  console.log("LAST COORDS===>", coords);

                  setState({
                    ...state,
                    pickupCords: coords,
                  });
                }
              }}
            >
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
            {!state?.pickupCords?.latitude && (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={styles.marker}
                  source={require("../../../../assets/images/pinpoint.png")}
                />
              </View>
            )}
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
