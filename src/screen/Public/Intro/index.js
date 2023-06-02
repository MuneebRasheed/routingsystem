import React, { useEffect } from "react";
import { View, ScrollView, Image } from "react-native";
import { Container, Content, Text, Icon } from "@component/Basic";
import { Button } from "@component/Form";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles";
import theme from "@theme/styles";
import messaging from "@react-native-firebase/messaging";
import Header from "@component/Header";

import { navigate } from "@navigation";
import { __ } from "@utility/translation";
import request from "@utility/request";
import { bind } from "@utility/component";
import { DarkStatusBar } from "@component/StatusBar";
import { logout } from "../../../store/reducers/session";
import { getFCMToken } from "../../../helper/pushnotification_helper";
import { showMessage } from "../../../helper/showAlert";

export default function Intro({ navigation }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.session);
  console.log("USER===>", user);
  useEffect(() => {
    // * HERE GET FCM TOKEN FUNC WAS INVOKING
    // getFCMToken();

    if (user) {
      messaging().onNotificationOpenedApp((remoteMessage) => {
        if (
          remoteMessage &&
          user &&
          user?.roles?.includes("rider") &&
          remoteMessage?.data.notificationType === "parcel_notify"
        ) {
          console.log(
            "Notification caused app to open from background state:",
            remoteMessage.notification
          );
          navigation.navigate("PublicHome", {
            data: remoteMessage.notification.body,
          });
        }

        if (
          remoteMessage &&
          user &&
          user?.roles?.includes("user") &&
          remoteMessage?.data.notificationType === "parcel_reboot"
        ) {
          console.log(
            "Notification caused app to open from background state:",
            remoteMessage.notification
          );
          navigation.navigate("PublicHome");
        }
      });
      // Check whether an initial notification is available
      messaging()
        .getInitialNotification()
        .then((remoteMessage) => {
          if (
            remoteMessage &&
            user &&
            user?.roles?.includes("rider") &&
            remoteMessage?.data.notificationType === "parcel_notify"
          ) {
            navigation.navigate("PublicHome", {
              data: remoteMessage.notification.body,
            });
            console.log(
              "Notification caused app to open from quit state:",
              remoteMessage.notification
            );
          }
        });
      messaging().onMessage(async (remoteMessage) => {
        console.log("FOREGOURND===>");
        console.log("MY CURRENT USER123===>", user);
        console.log("REMOTE MESAGE===>", remoteMessage);
        if (
          remoteMessage &&
          user &&
          user?.roles?.includes("rider") &&
          remoteMessage?.data.notificationType === "parcel_notify"
        ) {
          console.log("PARCEL-TYPE===>", remoteMessage?.data.type);
          navigation.navigate("PublicHome", {
            data: remoteMessage.notification.body,
          });
          console.log("notification on foreground state....", remoteMessage);
        }

        if (
          remoteMessage &&
          user &&
          user?.roles?.includes("user") &&
          remoteMessage?.data.notificationType === "parcel_reboot"
        ) {
          console.log(
            "notification on foreground state.... USER",
            remoteMessage
          );
          showMessage("success", remoteMessage.notification.body);
        }
      });

      console.log("APP INITIALZED");
    }

    // dispatch(logout());
  }, [user]);

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
              navigate("PublicLogin");
            }}
          >
            <Text style={styles.startBtnText}>{__("START")}</Text>
          </Button>
        </Content>
      </View>
    </Container>
  );
}
