import React, { useState, useRef ,useEffect} from "react";
import { View, ScrollView, Image, Dimensions } from "react-native";
import { Container, Content, Text, Icon } from "@component/Basic";
import { TextInput, Button } from "@component/Form";

import styles from "./styles";
import theme from "@theme/styles";

import Header from "@component/Header";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { navigate } from "@navigation";
import { __ } from "@utility/translation";
import request from "@utility/request";
import { bind } from "@utility/component";

import MapView from "react-native-maps";
import { DarkStatusBar } from "@component/StatusBar";

import MapViewDirections from "react-native-maps-directions";
import Geolocation from 'react-native-geolocation-service';


export default function Home() {
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
 

  const handleRegionChangeComplete = (region) => {
    // console.log('Current Region:', region);
  };

  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  const [form, setForm] = useState();
  const [to, setTo] = useState();

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

  const onClick = () => {
    navigate("CustomerSelectVehicle", { to, form });
    if (start && end) {
    } else {
      alert("Please Fill the Start and Destination Location");
    }
  };

  const moveTo = async () => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  useEffect(()=>{
    Geolocation.getCurrentPosition(
      (position) => {
          console.log(position);
          setRegion(position?.coords)
      },
      (error) => {
        console.log("map error: ",error);
          console.log(error.code, error.message);
      },
      {
       enableHighAccuracy: true,
       timeout: 5000,

   }
   );

  },[])

  console.log(region);
  const homePlace = {
    description: 'Current Location',
    geometry: { location: { lat: region?.latitude, lng:region?.longitude} },
  };
  const workPlace = {
    description: 'Work',
    geometry: { location: { lat: region?.latitude, lng:region?.longitude} },
  };

  return (
    <Container>
      <DarkStatusBar />
      <Header leftType="menu" title={"TRUCKIE"} />
      <Content>
        <View style={styles.homeContainer}>
          <View style={styles.formRow}>
            
            <GooglePlacesAutocomplete
              placeholder="Pickup"
              currentLocation={true}
              predefinedPlaces={[homePlace]}
              currentLocationLabel='Current location'
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
                  console.log("Test",test)
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
          <View style={styles.formRow}>
           
            <GooglePlacesAutocomplete

              placeholder="Drop"
              currentLocation={true}
              predefinedPlaces={[homePlace]}
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
          <View style={styles.mMap}>
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
              onRegionChangeComplete={handleRegionChangeComplete}
              // onRegionChange={start}
            >
              {start && (
                <MapView.Marker key={`coordinate_1`} coordinate={start} />
              )}
              {end && <MapView.Marker key={`coordinate_2`} coordinate={end} />}

              {start && end && (
                <MapViewDirections
                  strokeWidth={3}
                  strokeColor="hotpink"
                  optimizeWaypoints={true}
                  timePrecision={"now"}
                  origin={start}
                  waypoints={
                    coordinates.length > 2
                      ? coordinates.slice(1, -1)
                      : undefined
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
                    console.log('GOT AN ERROR');
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
              onClick();
            
              // traceRoute();
            }}
          >
            <Text style={styles.shareBtnText}>{__("Select Driving Host")}</Text>
          </Button>
          
        </View>
      </View>
    </Container>
  );
}
