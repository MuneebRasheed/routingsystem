import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GOOGLE_MAPS_APIKEY = "AIzaSyABbE8m9cfg-OspSdVkr58Lo5SplQ_XFLA";

const GoogleAutoCompleteComponent = ({ placeholder, handlePress }) => {
  return (
    <GooglePlacesAutocomplete
      placeholder={placeholder}
      //   currentLocation={true}
      currentLocationLabel="Current location"
      onPress={(data, details = null) => {
        handlePress(data, details);
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
  );
};

export default GoogleAutoCompleteComponent;
