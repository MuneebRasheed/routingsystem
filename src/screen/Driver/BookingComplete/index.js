import React, { useState } from "react";
import { View, ScrollView, Image } from "react-native";
import { Container, Content, Text, Icon } from "@component/Basic";
import { TextInput, Button } from "@component/Form";
import Modal from "react-native-modalbox";
import styles from "./styles";
import theme from "@theme/styles";
import Accordion from "./Accordion";

import Header from "@component/Header";
import ImagePicker from "react-native-image-crop-picker";

import { navigate } from "@navigation";
import { __ } from "@utility/translation";
import request from "@utility/request";
import { bind } from "@utility/component";
import { DarkStatusBar } from "@component/StatusBar";
import axios from "axios";
import { showMessage } from "../../../helper/showAlert";
import { useSelector } from "react-redux";

export default function BookingComplete(props) {
  console.log("Value", props.route.params.data);
  const val = props.route.params.data;
  const [isOpen, setIsOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [images, setImages] = useState([]);
  const { user } = useSelector((state) => state.session);

  const getPhotoFromGallery = () => {
    // ImagePicker.openPicker({
    //   width: 300,
    //   height: 400,
    //   cropping: true
    // }).then(image => {
    //   console.log(image);
    // });

    ImagePicker.openPicker({
      multiple: true,
    }).then((image) => {
      console.log(image);
      setImages(image);
    });
  };

  const cancelTrip = async () => {
    try {
      const resp = await axios.post(
        `https://routeon.mettlesol.com/v1/parcel/cancel`,
        {
          parcel: val?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );

      showMessage("success", resp.data);
    } catch (err) {
      showMessage("error", "Something went wrong while cancelling the trip");
    }
  };

  return (
    <Container>
      <DarkStatusBar />
      <Header leftType="back" />
      <View style={styles.bookingHeader}>
        <Text style={styles.bookingHeaderTitle}>{__("BOOKING")}</Text>
        <Text style={styles.bookingHeaderText}>
          {__("CHECKOUT YOUR BOOKING")}
        </Text>
      </View>
      <Content contentContainerStyle={theme.layoutDf}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.bookingContainer}>
            <View style={styles.bookingContent}>
              <View style={styles.bookingDetail}>
                <Text style={styles.bookingIdText}>
                  {__(`BOOKING ID : ${(val?._id).substr(0, 15)}`)}
                </Text>
                <Button>
                  <Text style={styles.completeBtn}>{__(`${val?.status}`)}</Text>
                </Button>
              </View>
              <View style={styles.bookingItem}>
                <Text style={styles.bookingTitle}>{__("PAID")}</Text>
                <Text style={styles.bookingText}>
                  {" "}
                  {val?.pay_amount
                    ? __(`${val?.pay_amount} USD`)
                    : __(`${val?.fare} USD`)}
                </Text>
              </View>
              <View style={styles.bookingItem}>
                <Text style={styles.bookingTitle}>{__("PICKUP TIME")}</Text>
                <Text style={styles.bookingText}>
                  {__(val?.time.substr(0, 10))}
                </Text>
              </View>
              {/* <View style={styles.bookingItem}>
                <Text style={styles.bookingTitle}>{__("VEHICLE TYPE")}</Text>
                <Text style={styles.bookingText}>{__("Tata Ace")}</Text>
              </View> */}
              {/* <View style={styles.bookingItem}>
                <Text style={styles.bookingTitle}>{__("MATERIAL TYPE")}</Text>
                <Text style={styles.bookingText}>{__("Eletronics")}</Text>
              </View>
              <View style={styles.bookingItem}>
                <Text style={styles.bookingTitle}>{__("DELIVERY FLOOR")}</Text>
                <Text style={styles.bookingText}>{__("1")}</Text>
              </View> */}
              {/* <View style={styles.bookingItem}>
                <Text style={styles.bookingTitle}>
                  {__("UNLOADING MANPOWER")}
                </Text>
                <Text style={styles.bookingText}>{__("Yes")}</Text>
              </View>
              <View style={styles.bookingItem}>
                <Text style={styles.bookingTitle}>{__("TOTAL LOADS")}</Text>
                <Text style={styles.bookingText}>{__("25")}</Text>
              </View>
              <View style={styles.bookingItem}>
                <Text style={styles.bookingTitle}>{__("TOTAL PACKAGES")}</Text>
                <Text style={styles.bookingText}>{__("5")}</Text>
              </View> */}
            </View>
            <View style={styles.documentInfo}>
              <Text style={styles.documentText}>{__("PACKAGES")}</Text>
              <Text style={styles.checkoutText}>
                {__("Checkout your package informations")}
              </Text>
              <View style={styles.bookingItem}>
                <Text style={styles.bookingTitle}>{__("DIMENSION")}</Text>
                <Text style={styles.bookingTitle}>{__("QUANTITY")}</Text>
              </View>
              <View style={styles.bookingItem}>
                <Text style={styles.bookingTextDark}>{__("Width")}</Text>
                <Text style={styles.bookingTextDark}>
                  {__(`${val?.width}`)}
                </Text>
              </View>
              <View style={styles.bookingItem}>
                <Text style={styles.bookingTextDark}>{__("Height")}</Text>
                <Text style={styles.bookingTextDark}>
                  {__(`${val?.height}`)}
                </Text>
              </View>
              <View style={styles.bookingItem}>
                <Text style={styles.bookingTextDark}>{__("Length")}</Text>
                <Text style={styles.bookingTextDark}>
                  {__(`${val?.length}`)}
                </Text>
              </View>
              <View style={styles.bookingItem}>
                <Text style={styles.bookingTextDark}>{__("Weight")}</Text>
                <Text style={styles.bookingTextDark}>
                  {__(`${val?.weight}`)}
                </Text>
              </View>
              {/* <View style={styles.bookingItem}>
                <Text style={styles.bookingTextDark}>
                  {__("TOTAL PACKAGES")}
                </Text>
                <Text style={styles.bookingTextDark}>{__("30 Nos")}</Text>
              </View> */}
            </View>
            <View style={styles.driverDetail}>
              <View style={styles.driverInfo}>
                <View>
                  <Text style={styles.driverText}>{__("CUSTOMER")}</Text>
                  <Text style={styles.driverTextInfo}>
                    {__("Customer informations")}
                  </Text>
                </View>
                <Button
                  onPress={() => {
                    navigate("CustomerManageProfile");
                  }}
                >
                  <Image
                    source={{
                      uri:
                        val?.customer_id?.avatar ||
                        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                    }}
                    style={styles.driverImg}
                  />
                </Button>
              </View>
              <View>
                <View style={styles.bookingItem}>
                  <Text style={styles.bookingTitle}>{__("NAME")}</Text>
                  <Text style={styles.bookingTextDark}>
                    {__(`${val?.customer_id?.first_name}`)}
                  </Text>
                </View>
                <View style={styles.bookingItem}>
                  <Text style={styles.bookingTitle}>{__("Parcel ID")}</Text>
                  <Text style={styles.bookingTextDark}>
                    {__(`${(val?._id).substr(0, 15)}`)}
                  </Text>
                </View>
                <View style={styles.bookingItem}>
                  <Text style={styles.bookingTitle}>{__("RATING")}</Text>
                  <View style={styles.ratingInfo}>
                    <Icon
                      name="star"
                      type="FontAwesome"
                      style={styles.ratingIconSelected}
                    />
                    <Icon
                      name="star"
                      type="FontAwesome"
                      style={styles.ratingIconSelected}
                    />
                    <Icon
                      name="star"
                      type="FontAwesome"
                      style={styles.ratingIconSelected}
                    />
                    <Icon
                      name="star"
                      type="FontAwesome"
                      style={styles.ratingIconSelected}
                    />
                    <Icon
                      name="star"
                      type="FontAwesome"
                      style={styles.ratingIcon}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </Content>
      <Modal
        position={"center"}
        isOpen={isOpen}
        onClosed={() => setIsOpen(false)}
        isDisabled={isDisabled}
        style={styles.modalRating}
      >
        <View style={styles.modalRatingContainer}>
          <Button style={styles.closeSortDesc}>
            <Icon
              name="close"
              type="MaterialIcons"
              style={[theme.SIZE_20, theme.DARKVIOLET]}
            />
          </Button>

          <View style={styles.formRow}>
            <Text style={styles.formText}>{__("DESCRIPTION")}</Text>
            <TextInput
              placeholder=""
              placeholderTextColor="#ccc"
              multiline
              numberOfLines={7}
              textAlignVertical={"top"}
              // placeholder='Please write your comments'
              // onChangeText={(v) => this.onChangeText("comment", v)}
              style={[styles.formInput, { backgroundColor: "#ededed" }]}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 60,
            }}
          >
            <View style={{ width: "47%", height: 50 }}>
              <Button
                style={styles.mailBtn}
                onPress={() => {
                  getPhotoFromGallery();
                }}
              >
                <Text style={styles.tripText}>{__("ATTACH FILE HERE")}</Text>
              </Button>
            </View>
            <View style={{ width: "47%", height: 50 }}>
              <Button
                style={styles.mailBtn}
                onPress={() => {
                  setIsOpen(false);
                }}
              >
                <Text style={styles.tripText}>{__("SEND")}</Text>
              </Button>
            </View>
          </View>

          {/* <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              position: "absolute",
              bottom: -100,
            }}
          >
            <TextInput
              placeholder="Type Complain Here"
              placeholderTextColor="rgba(0,0,0,0.7)"
              style={styles.formInput3}
            />
            <Icon
              name="send"
              type="FontAwesome"
              style={[theme.SIZE_30, theme.DARKVIOLET]}
            />
          </View> */}
        </View>
      </Modal>
      <View style={[styles.mailBtnInfo]}>
        <Button
          style={[styles.mailBtn, { backgroundColor: "red" }]}
          onPress={() => {
            // navigate("CustomerWriteUs");
            cancelTrip();
          }}
        >
          <Text style={styles.tripText}>CANCEL</Text>
        </Button>
        <Button
          style={styles.mailInvoiceBtn}
          onPress={() => {
            setIsOpen(true);
          }}
        >
          <Text style={styles.tripText}>{__("COMPLAIN")}</Text>
        </Button>
      </View>
    </Container>
  );
}
