import React, { useState } from "react";
import { View, ScrollView, Image } from "react-native";
import { Container, Content, Text, Icon } from "@component/Basic";
import { TextInput, Button } from "@component/Form";
import Modal from "react-native-modalbox";
import styles from "./styles";
import theme from "@theme/styles";
import Accordion from "./Accordion";

import Header from "@component/Header";
// import ImagePicker from "react-native-image-crop-picker";

import { navigate } from "@navigation";
import { __ } from "@utility/translation";
import request from "@utility/request";
import { bind } from "@utility/component";
import { DarkStatusBar } from "@component/StatusBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DocumentPicker from "react-native-document-picker";
export default function BookingComplete(props) {
  console.log(props.route.params.val);
  const val = props.route.params.val;
  const [isOpen, setIsOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [images, setImages] = useState();
  const [description, setDescription] = useState();

  const UploadData = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setImages(res[0]);
      console.log(res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  const fetchData = async () => {
    var data = await AsyncStorage.getItem("response");
    var datas = JSON.parse(data);
    const formData = new FormData();
    formData.append("complain_against", datas._id);
    formData.append("files", images);
    formData.append("description", description);

    console.log("FormData", formData);

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${datas.access_token}`,
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    };
    try {
      const res = await fetch(
        "https://staging.mettlesol.com/v1/complaints",
        requestOptions
      );
      const result = await res.json();
      console.log("RESULT", result);
    } catch (err) {
      console.log("ERROR");
    }
  };

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
                  {__(`BOOKING ID:${val?._id}`)}
                </Text>
                <Button>
                  <Text style={styles.completeBtn}>{__("Complete")}</Text>
                </Button>
              </View>
              <View style={styles.bookingItem}>
                <Text style={styles.bookingTitle}>{__("PAID")}</Text>
                <Text style={styles.bookingText}>{__(`${val?.fare} USD`)}</Text>
              </View>
              <View style={styles.bookingItem}>
                <Text style={styles.bookingTitle}>{__("PICKUP")}</Text>
                <Text style={styles.bookingText}>{__(val?.time)}</Text>
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
              <View style={styles.bookingItem}>
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
              </View>
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
                <Text style={styles.bookingTextDark}>
                  {__(`${val?.width} ft * ${val?.height}ft*1 ft`)}
                </Text>
                <Text style={styles.bookingTextDark}>{__("20 Nos")}</Text>
              </View>
              <View style={styles.bookingItem}>
                <Text style={styles.bookingTextDark}>
                  {__("5.2 ft * 4/7 ft* 2 ft")}
                </Text>
                <Text style={styles.bookingTextDark}>{__("10 Nos")}</Text>
              </View>
              <View style={styles.bookingItem}>
                <Text style={styles.bookingTextDark}>
                  {__("TOTAL PACKAGES")}
                </Text>
                <Text style={styles.bookingTextDark}>{__("30 Nos")}</Text>
              </View>
            </View>
            <View style={styles.driverDetail}>
              <View style={styles.driverInfo}>
                <View>
                  <Text style={styles.driverText}>{__("DRIVER")}</Text>
                  <Text style={styles.driverTextInfo}>
                    {__("Driver informations")}
                  </Text>
                </View>
                <Button
                  onPress={() => {
                    navigate("CustomerManageProfile");
                  }}
                >
                  <Image
                    source={{
                      uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                    }}
                    style={styles.driverImg}
                  />
                </Button>
              </View>
              <View>
                <View style={styles.bookingItem}>
                  <Text style={styles.bookingTitle}>{__("NAME")}</Text>
                  <Text style={styles.bookingTextDark}>
                    {__("DANI VETORI")}
                  </Text>
                </View>
                <View style={styles.bookingItem}>
                  <Text style={styles.bookingTitle}>{__("VEHICLE NO")}</Text>
                  <Text style={styles.bookingTextDark}>{__("NY 6746")}</Text>
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
              value={description}
              onChangeText={(text) => {
                setDescription(text);
              }}
              // placeholder='Please write your comments'
              // onChangeText={(v) => this.onChangeText("comment", v)}
              style={styles.formInput}
            />
          </View>

          <View style={{ width: "100%", height: 50 }}>
            <Button
              style={styles.mailBtn}
              onPress={() => {
                UploadData();
              }}
            >
              <Text style={styles.tripText}>{__("ATTACH FILE HERE")}</Text>
            </Button>
          </View>
          <View style={{ width: "100%", height: 50, marginTop: 10 }}>
            <Button
              style={styles.mailBtn}
              onPress={() => {
                fetchData();
                setIsOpen(false);
              }}
            >
              <Text style={styles.tripText}>{__("SEND")}</Text>
            </Button>
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
      <View style={styles.mailBtnInfo}>
        <Button
          style={styles.mailBtn}
          onPress={() => {
            navigate("CustomerWriteUs");
          }}
        >
          <Text style={styles.tripText}>{__("MAIL\nACKNOWLEDGEMENT")}</Text>
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
