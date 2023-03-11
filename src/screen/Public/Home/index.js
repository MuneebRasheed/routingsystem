import React, { useState } from "react";
import { View, ScrollView, Image } from "react-native";
import { Container, Content, Text, Icon } from "@component/Basic";
import { TextInput, Button } from "@component/Form";

import styles from "./styles";
import theme from "@theme/styles";

import Header from "@component/Header";

import { navigate } from "@navigation";
import { __ } from "@utility/translation";
import request from "@utility/request";
import { bind } from "@utility/component";

import MapView from "react-native-maps";
import { DarkStatusBar } from "@component/StatusBar";

export default function Home() {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     selected: '',
  //     region: {
  //       latitude: 37.78825,
  //       longitude: -122.4324,
  //       latitudeDelta: 0.015,
  //       longitudeDelta: 0.0121
  //     }
  //   }
  // }

  return (
    <Container>
      <DarkStatusBar />
      <Header leftType="menu" title={"TRUCKIE"} />
      <Content>
        <View style={styles.homeContainer}>
          <View style={styles.formRow}>
            <Icon
              name="map-marker-alt"
              type="FontAwesome5"
              style={[theme.SIZE_20, theme.DARKVIOLET]}
            />
            <TextInput
              placeholder="NewYork, USA"
              placeholderTextColor="rgba(89, 73, 158, 0.5)"
              style={styles.formInput}
            />
          </View>
          <View style={styles.formRow}>
            <Icon
              name="map-marker-alt"
              type="FontAwesome5"
              style={[theme.SIZE_20, theme.DARKVIOLET]}
            />
            <TextInput
              placeholder="Texas, USA"
              placeholderTextColor="rgba(89, 73, 158, 0.5)"
              style={styles.formInput}
            />
          </View>
          <View style={styles.mMap}>
            <MapView style={styles.mMapImg} region={region} />
          </View>
        </View>
      </Content>
      <View style={styles.footerBtn}>
        <View style={styles.footerBtnInfo}>
          <Button
            style={styles.selectBtn}
            onPress={() => {
              navigate("CustomerSelectVehicle");
            }}
          >
            <Text style={styles.shareBtnText}>{__("Select Driving Host")}</Text>
          </Button>
          {/* <Button style={styles.shareBtn} onPress={() => { navigate('CustomerSharedVehicle') }}>
            <Text style={styles.shareBtnText}>{__('Shared Vehicle')}</Text>
          </Button> */}
        </View>
      </View>
    </Container>
  );
}
