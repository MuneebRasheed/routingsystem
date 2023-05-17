import React, { useState, useRef } from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import { COLOR } from "@theme/typography";

import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GOOGLE_MAPS_APIKEY = "AIzaSyABbE8m9cfg-OspSdVkr58Lo5SplQ_XFLA";

const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
// const LATITUDE_DELTA = 0.0922;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const TrackingScreen = () => {
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
