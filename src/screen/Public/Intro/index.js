import React from "react";
import { View, ScrollView, Image } from "react-native";
import { Container, Content, Text, Icon } from "@component/Basic";
import { Button } from "@component/Form";

import styles from "./styles";
import theme from "@theme/styles";

import Header from "@component/Header";

import { navigate } from "@navigation";
import { __ } from "@utility/translation";
import request from "@utility/request";
import { bind } from "@utility/component";
import { DarkStatusBar } from "@component/StatusBar";
import {
  getFCMToken,
  requestUserPermission,
} from "../../../helper/pushnotification_helper";
import messaging from "@react-native-firebase/messaging";

export default class extends React.Component {
  componentDidMount() {
    getFCMToken();

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
        }
      });

    messaging().onMessage(async (remoteMessage) => {
      console.log("notification on foreground state....", remoteMessage);
    });
  }

  render() {
    return (
      <Container>
        <DarkStatusBar />
        <Image
          source={{
            uri: "https://images.pexels.com/photos/2994136/pexels-photo-2994136.jpeg?auto=compress&cs=tinysrgb&w=1600",
          }}
          resizeMode="cover"
          style={styles.introBgImg}
        />
        <View style={styles.introBgCover} />
        <View style={styles.introContainer}>
          <Content contentContainerStyle={theme.layoutDf}>
            <View style={styles.introContent}>
              <Image
                source={require("@asset/images/trucklogo.png")}
                style={styles.introImg}
              />
              <View>
                <Text style={styles.introTitle}>{__("TRUCKIE")}</Text>
                <Text style={styles.introText}>
                  {__("Find a easy way to transfer\nyour loads")}
                </Text>
              </View>
            </View>
            <Button
              style={styles.startBtn}
              onPress={() => {
                navigate("PublicSignUp");
              }}
            >
              <Text style={styles.startBtnText}>{__("START")}</Text>
            </Button>
          </Content>
        </View>
      </Container>
    );
  }
}
