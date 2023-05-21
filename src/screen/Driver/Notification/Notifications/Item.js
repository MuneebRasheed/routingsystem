import React from "react";
import { View } from "react-native";
import { Text, Icon } from "@component/Basic";
import { Button } from "@component/Form";

import styles from "../styles";

import Modal from "react-native-modalbox";

import theme from "@theme/styles";
import { navigate } from "@navigation";
import { __ } from "@utility/translation";

export default function Item({ value }) {
  // console.log("Vaue", value);

  const TimeCalculate = () => {
    const date1 = new Date(value?.item?.createdAt);
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    const IosFormattedString = new Date(formattedDate);
    const seconds = Math.round((IosFormattedString - date1) / 1000);
    const minutes =  Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);
    let stringss = "";
    if (seconds < 60) {
      stringss = seconds + "sec";
    } else if (minutes < 60) {
      stringss = minutes + "min";
    } else if (hours < 24) {
      stringss = hours + "h";
    } else {
      stringss = days + "d";
    }

    // console.log("Dates",stringss)
    return stringss;
  };


  return (
    <>
      <View style={styles.notificationContent}>
        <View style={styles.notificationInfo}>
          <Text style={styles.notificationTitle}>
            {__("Notification ID")} {value.index + 1}
          </Text>
          <Text style={styles.notificationText}>{TimeCalculate()}</Text>
        </View>
        <View style={styles.notificationDetail}>
          <Text style={styles.bookingText}>{value?.item?.body}</Text>
          {/* <Button style={styles.deleteBtn}>
            <Icon
              name="delete"
              type="AntDesign"
              style={[theme.SIZE_20, theme.SMOKEVIOLET]}
            />
          </Button> */}
        </View>
      </View>
    </>
  );
}
