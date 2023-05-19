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
  console.log("Vaue", value);
  return (
    <>
      <View style={styles.notificationContent}>
        <View style={styles.notificationInfo}>
          <Text style={styles.notificationTitle}>
            {__("Notification ID")} {value.index + 1}
          </Text>
          <Text style={styles.notificationText}>{value?.item?.createdAt}</Text>
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
