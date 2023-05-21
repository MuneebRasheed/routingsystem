import React from "react";
import { View, ScrollView } from "react-native";

import { Container, Content, Text, Icon } from "@component/Basic";
import { TextInput, Button ,ToggleSwitch} from "@component/Form";
import styles from "./styles";
import theme from "@theme/styles";

import Header from "@component/Header";

import { __ } from "@utility/translation";
import { DarkStatusBar } from "@component/StatusBar";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Permission() {
  const [accessMessage, setAccessMessage] = useState(false);
  const [mediaStorage, setMediaStorage] = useState(false);
  const [location, setLocation] = useState(false);
 
  return (
    <Container>
      <DarkStatusBar />
      <Header leftType="back" />
      <View style={styles.settlementHeader}>
        <Text style={styles.settlementHeaderTitle}>
          {__("PERMISSIONS")}
        </Text>
        <Text style={styles.settlementHeaderText}>
          {__("Permissions")}
        </Text>
      </View>
      <Content contentContainerStyle={theme.layoutDf}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.settlementContainer}>
          <View style={styles.profileInputDetail}>
            <Text style={styles.permissionText}>{__("MESSAGE")}</Text>
            <View style={styles.switchInfo}>
              <Text style={styles.switchText}>{__("Access your message")}</Text>
              <ToggleSwitch 
               setValue={setAccessMessage}
               value={accessMessage}
              />

            </View>
          </View>
          <View style={styles.profileInputDetail}>
            <Text style={styles.permissionText}>{__("MEDIA & STORAGE")}</Text>
            <View style={styles.switchInfo}>
              <Text style={styles.switchText}>
                {__("Access your Media & Storage")}
              </Text>
              <ToggleSwitch 
               setValue={setMediaStorage}
               value={mediaStorage}
              />
            </View>
          </View>
           <View style={styles.profileInputDetail}>
            <Text style={styles.permissionText}>{__("LOCATION")}</Text>
            <View style={styles.switchInfo}>
              <Text style={styles.switchText}>
                {__("Access your location")}
              </Text>
              <ToggleSwitch 
               setValue={setLocation}
               value={location}
              />
            </View>
          </View>

          <Button
            style={styles.saveBtn}
            onPress={() => {
              navigate("CustomerSelectVehicle");
            }}
          >
            <Text style={styles.saveBtnText}>{__("SAVE")}</Text>
          </Button>
          </View>
        </ScrollView>
      </Content>
    </Container>
  );
}
