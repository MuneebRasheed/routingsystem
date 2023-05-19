import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useSelector } from "react-redux";
import {
  getUserCurrentPosition,
  locationPermission,
} from "../../helper/getCurrentLocation";

import { COLOR } from "@theme/typography";

const GOOGLE_MAPS_APIKEY = "AIzaSyABbE8m9cfg-OspSdVkr58Lo5SplQ_XFLA";
const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const TrackingScreen = ({ route }) => {
  console.log("COMPLETE DATA===>", route?.params?.data);

  const { user } = useSelector((state) => state.session);
  const { socket } = useSelector((state) => state.socket);
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

  const getCurrentLocation = async () => {
    const isLocationOn = await locationPermission();
    if (isLocationOn) {
      const res = await getUserCurrentPosition();
      console.log("GET LIVE LOCATION AFTER 5 SEC");
      // animate(res.latitude, res.longitude);
      // setState({
      //   ...state,
      //   pickupCords: res,
      //   coordinate: {
      //     ...res,
      //     latitudeDelta: LATITUDE_DELTA,
      //     longitudeDelta: LONGITUDE_DELTA,
      //   },
      //   heading: res.heading,
      // });

      console.log("CURRENT POSITION=====>", res);

      socket.emit("tracking", {
        to: route?.params?.data.customer_id,
        location: `${res.latitude}, ${res.longitude}`,
        parcel: route?.params?.data._id,
        riderId: route?.params?.data.rider_id,
        status: "start",
      });
    }
  };

  useEffect(() => {
    if (route?.params?.data) {
      setState({
        ...state,
        pickupCords: JSON.parse(route?.params?.data?.from_location),
        droplocationCords: JSON.parse(route?.params?.data?.to_location),
      });
    }

    if (
      (user && user.roles.includes("driver")) ||
      (user && user.roles.includes("rider"))
    ) {
      getCurrentLocation();
    }

    if (
      (user && user.roles.includes("driver")) ||
      (user && user.roles.includes("rider"))
    ) {
      const interval = setInterval(() => {
        getCurrentLocation();
      }, 6000);

      return () => clearInterval(interval);
    }

    if (user && user.roles.includes("user") && socket) {
      socket.on("tracking", (incomingDriverPosition) => {
        console.log("CURRENT DRIVER POSITION====>", incomingDriverPosition);
        const {
          data: { location },
        } = incomingDriverPosition;

        const [latitude, longitude] = location.split(",");

        setState({
          ...state,
          pickupCords: {
            latitude: latitude.trim(),
            longitude: longitude.trim(),
          },
        });
      });
    }
  }, []);

  console.log("SESSION STATE ===>", user.roles);

  return (
    <View>
      <View style={styles.mapStyles}>
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
              image={require("../../../assets/images/Oval2x.png")}
            />
          )}

          {Object.values(state.droplocationCords).length > 0 && (
            <Marker
              coordinate={droplocationCords}
              image={require("../../../assets/images/greenMarker2x.png")}
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
  );
};

const styles = StyleSheet.create({
  mapStyles: {
    width: "100%",
    height: "100%",
    borderColor: COLOR.LIGHT,
    borderWidth: 1,
  },
});

export default TrackingScreen;
