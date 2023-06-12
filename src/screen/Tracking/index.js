import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useSelector } from "react-redux";
import {
  getUserCurrentPosition,
  locationPermission,
} from "../../helper/getCurrentLocation";
import { COLOR, FAMILY, SIZE } from "@theme/typography";
import AppSpinner from "../../component/AppSpinner";
import { showMessage } from "../../helper/showAlert";
import axios from "axios";

const GOOGLE_MAPS_APIKEY = "AIzaSyABbE8m9cfg-OspSdVkr58Lo5SplQ_XFLA";
const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const TrackingScreen = ({ route }) => {
  console.log("COMPLETE DATA===>", route?.params?.data);

  const [isTrackingStart, setIsTrackingStart] = useState(false);
  const [currentTripStatus, setCurrentTripStatus] = useState(
    route?.params?.data?.status
  );
  const [tripStatusLoading, setTripStatusLoading] = useState(false);
  const { user } = useSelector((state) => state.session);
  const { socket } = useSelector((state) => state.socket);

  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [state, setState] = useState({
    pickupCords: route?.params?.data?.from_location
      ? route?.params?.data?.from_location
      : {},
    droplocationCords: route?.params?.data?.to_location
      ? route?.params?.data?.to_location
      : {},
    isLoading: false,
    coordinate: new AnimatedRegion({
      latitude: route?.params?.data?.from_location
        ? route?.params?.data?.from_location.latitude
        : "",
      longitude: route?.params?.data?.from_location
        ? route?.params?.data?.from_location.longitude
        : "",
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    heading: 0,
  });

  const { pickupCords, droplocationCords, coordinate, heading } = state;

  const animate = (latitude, longitude) => {
    const newCoordinate = { latitude, longitude };
    if (Platform.OS === "android") {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };

  const getCurrentLocation = async () => {
    const isLocationOn = await locationPermission();
    if (isLocationOn) {
      const res = await getUserCurrentPosition();
      console.log("GET LIVE LOCATION AFTER 5 SEC");
      animate(res.latitude, res.longitude);
      setState({
        ...state,
        pickupCords: res,
        coordinate: {
          ...res,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        heading: res.heading,
      });

      console.log("CURRENT POSITION=====>", res);

      socket.emit("tracking", {
        to: route?.params?.data.customer_id?._id,
        location: `${res.latitude}, ${res.longitude}`,
        parcel: route?.params?.data._id,
        riderId: route?.params?.data.rider_id?._id,
        status: "start",
        heading: res.heading,
      });
    }
  };

  const handleTripStatus = async (status) => {
    setTripStatusLoading(true);
    try {
      const resp = await axios.patch(
        `https://routeon.mettlesol.com/v1/parcel/${route?.params?.data?._id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );

      if (resp.status === 200) {
        console.log("DUMYY STATUS ===>", status);
        console.log("API STATUS ===>", resp.data.status);
        setCurrentTripStatus(resp.data.status);
        showMessage("success", `You marked the parcel as ${resp.data.status}`);
        setTripStatusLoading(false);
      }
    } catch (err) {
      console.log("ERROR===>", err.response);
      showMessage("error", "Something went wrong while changing trip status");
      setTripStatusLoading(false);
    }
  };

  useEffect(() => {
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
      socket.on("tracking", (incomingData) => {
        if (
          !isTrackingStart &&
          route?.params?.data?._id.toString() ===
            incomingData.data.parcel.toString()
        ) {
          setIsTrackingStart(true);
        }
        console.log("INCOMING DRIVER POS===>", incomingData);

        if (
          route?.params?.data?._id.toString() !==
          incomingData.data.parcel.toString()
        ) {
          return;
        }

        const [latitude, longitude] = incomingData.data.location.split(",");
        console.log(
          `CURRENT LATITUDE => ${latitude.trim()}, CURRENT LONGITUDE => ${longitude.trim()}`
        );

        const latitudePoints = +latitude;
        const longitudePoints = +longitude;
        const headingPoints = +incomingData.data.heading;

        animate(latitudePoints, longitudePoints);
        setState({
          ...state,
          pickupCords: {
            latitude: latitudePoints,
            longitude: longitudePoints,
          },
          coordinate: {
            latitude: latitudePoints,
            longitude: longitudePoints,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
          heading: headingPoints,
        });
      });
    }
  }, []);

  return (
    <View>
      <View style={styles.mapStyles}>
        {!isTrackingStart && user && user.roles.includes("user") && (
          <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
              <Text style={styles.textStyles}>
                You are looking at your parcel location. When ur rider will
                start the ride. You can see here his/her realtime location on
                the map.
              </Text>
            </View>
          </View>
        )}
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
          {Object.values(state.pickupCords).length > 0 && (
            <Marker.Animated ref={markerRef} coordinate={coordinate}>
              <Image
                source={require("../../../assets/images/bike.jpeg")}
                style={{
                  width: 40,
                  height: 40,
                  transform: [{ rotate: `${heading}deg` }],
                }}
                resizeMode="contain"
              />
            </Marker.Animated>
          )}
          {/* {Object.values(state.pickupCords).length > 0 && (
            <Marker
              coordinate={pickupCords}
              image={require("../../../assets/images/Oval2x.png")}
            />
          )} */}

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
        {user && user.roles.includes("rider") && (
          <View style={styles.outerContainerForDriver}>
            <TouchableOpacity
              onPress={() => {
                if (!tripStatusLoading && currentTripStatus !== "done") {
                  const identifyStatus =
                    currentTripStatus === "in_progress"
                      ? "started"
                      : currentTripStatus === "started"
                      ? "pickup"
                      : currentTripStatus === "pickup"
                      ? "done"
                      : null;

                  handleTripStatus(identifyStatus);
                }
              }}
            >
              <View style={styles.innerContainerForDriver}>
                <View
                  style={{
                    backgroundColor: COLOR.PRIMARY,
                  }}
                >
                  {tripStatusLoading ? (
                    <View style={styles.shareBtnText}>
                      <AppSpinner />
                    </View>
                  ) : (
                    <Text style={styles.shareBtnText}>
                      {currentTripStatus === "in_progress"
                        ? "START TRIP"
                        : currentTripStatus === "started"
                        ? "PICK UP"
                        : currentTripStatus === "pickup"
                        ? "DONE"
                        : "TRIP COMPLETED"}
                    </Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
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
  outerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
    width: "100%",
    padding: 20,
  },
  innerContainer: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: COLOR.PRIMARY,
    overflow: "hidden",
  },
  textStyles: {
    color: COLOR.LIGHT,
    lineHeight: 20,
    fontWeight: "bold",
  },
  outerContainerForDriver: {
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 2,
    width: "100%",
    padding: 20,
  },
  innerContainerForDriver: {
    borderRadius: 10,
    overflow: "hidden",
  },
  textStylesForDriver: {
    color: COLOR.LIGHT,
    lineHeight: 20,
    fontWeight: "bold",
  },

  shareBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.BLUE,
    borderRadius: 3,
    paddingVertical: 15,
    marginLeft: 5,
  },
  shareBtnText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    paddingVertical: 15,
    color: COLOR.LIGHT,
    textAlign: "center",
  },
});

export default TrackingScreen;
