import React, { useState } from "react";
import { View, Image, TouchableOpacity, Keyboard } from "react-native";
import { TextInput, Button } from "@component/Form";
import { Text, Icon } from "@component/Basic";
import { __ } from "@utility/translation";
import theme from "@theme/styles";

import styles from "./styles";

const BiddingCard = ({ val, CloseModelBaseOnId, handleBid }) => {
  const [biddingValue, setBiddingValue] = useState("");
  const [isBidFormShow, setBidFormShow] = useState(false);

  return (
    <View style={{ borderRadius: 50 }}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "20%" }}>
          <Image
            source={require("@asset/images/avatar.png")}
            resizeMode="cover"
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              margin: 10,
            }}
          />
        </View>
        <View style={{ width: "80%" }}>
          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 5,
              fontSize: 20,
            }}
          >
            <Text>{__("Suzuki Wagon R")}</Text>
            <Text>PKR {val?.fare}</Text>
          </View> */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 5,
              fontSize: 20,
            }}
          >
            <Text>
              {val?.customer_id?.first_name} {val?.customer_id?.last_name}
            </Text>
            {/* <Text>{__("2 min)")}</Text> */}
            <Text>PKR {val?.fare}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 5,
              fontSize: 20,
            }}
          >
            <Text>Phone: {val?.customer_id?.phone}</Text>
            <Text>City: {val?.customer_id?.city}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          style={[styles.bookingBtn, { width: "25%", backgroundColor: "red" }]}
          onPress={(va) => {
            console.log("Muneeb click on Decline");
            CloseModelBaseOnId(val.id);
            // setOpen(false);
          }}
        >
          <Text style={styles.bookingBtnText}>{__("Decline")}</Text>
        </Button>
        {/* <Button
          style={[styles.bookingBtn, { width: "25%", marginLeft: -10 }]}
          onPress={() => {
            console.log("Muneeb click on Accept");
            navigate("CustomerPayment");
          }}
        >
          <Text style={styles.bookingBtnText}>{__("Accepts")}</Text>
        </Button> */}
        <Button
          style={[styles.bookingBtn, { width: "25%", marginLeft: -10 }]}
          onPress={() => {
            setBidFormShow(!isBidFormShow);
          }}
        >
          <Text style={styles.bookingBtnText}>{__("Bidding")}</Text>
        </Button>
      </View>
      {isBidFormShow && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            placeholder="Enter The Bidding"
            style={{
              width: 300,
              borderRadius: 10,
              paddingLeft: 10,
              marginLeft: 20,
            }}
            onChangeText={(e) => {
              setBiddingValue(e);
            }}
            onSubmitEditing={(e) => {
              handleBid(biddingValue, val);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              handleBid(biddingValue, val);
              Keyboard.dismiss();
            }}
          >
            <Icon
              name="send"
              type="FontAwesome"
              style={[theme.SIZE_25, theme.DARKVIOLET]}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default BiddingCard;
