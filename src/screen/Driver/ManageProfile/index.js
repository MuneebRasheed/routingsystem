import React, { useState } from "react";
import { View, ScrollView, Image } from "react-native";
import { Container, Content, Text, Icon } from "@component/Basic";
import { TextInput, Button, ToggleSwitch, Checkbox } from "@component/Form";

import Modal from "react-native-modalbox";

import styles from "./styles";
import theme from "@theme/styles";

import Header from "@component/Header";
import Support from "@component/Support";

import { navigate, navigateReset } from "@navigation";
import { __ } from "@utility/translation";
import request from "@utility/request";
import { bind } from "@utility/component";
import { DarkStatusBar } from "@component/StatusBar";

export default function ManageProfile() {
  const [selected, setSelected] = useState("");
  const [values, setValues] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [tabSelected, setTabSelected] = useState("profile");
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     selected: "",
  //     values: {},
  //     tabSelected: "profile",
  //   };

  //   bind(this);

  //   this.renderProfile = this.renderProfile.bind(this);
  //   this.renderPermission = this.renderPermission.bind(this);
  //   this.renderInsurance = this.renderInsurance.bind(this);

  //   this.onChangeText = this.onChangeText.bind(this);
  //   this.validate = this.validate.bind(this);
  //   this.onSubmit = this.onSubmit.bind(this);
  // }
  const [PaymentTabSelected, setPaymentTabSelected] = useState("card");

  async function onSubmit() {
    await Support.showSuccess({
      title: __("Success!"),
      message: __("Transaction success"),
      onHide: () => {
        navigateReset("");
      },
      hideDelay: 2500,
    });
  }

  function renderCard() {
    return (
      <View>
        <View style={styles.paymentForm}>
          <View style={styles.formRow}>
            <Text style={styles.formText}>{__("NAME ON CARD")}</Text>
            <TextInput
              placeholder="Carol cartex"
              placeholderTextColor="#000"
              style={styles.formInput}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formText}>{__("CARD NUMBER")}</Text>
            <TextInput
              placeholder="0000 3434 7867 9523"
              keyboardType="numeric"
              placeholderTextColor="#000"
              style={styles.formInput}
            />
          </View>
          <View style={styles.cardInfo}>
            <View style={styles.formRow2}>
              <Text style={styles.formText}>{__("EXPIRY DATE")}</Text>
              <TextInput
                placeholder="19 / 2019"
                placeholderTextColor="#000"
                keyboardType="numeric"
                style={styles.formInput}
              />
            </View>
            <View style={styles.formRow}>
              <Text style={styles.formText}>{__("CVV")}</Text>
              <TextInput
                placeholder="657"
                placeholderTextColor="#000"
                keyboardType="numeric"
                style={styles.formInput}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  function renderPayPal() {
    return (
      <View style={styles.payPalInfo}>
        <Button>
          <Image
            style={styles.cardImg}
            source={require("@asset/images/downloadicon.png")}
          />
        </Button>
      </View>
    );
  }
  function onValueChange() {
    setSelected("");
  }

  function renderProfile() {
    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={true}>
          <View style={styles.profileContainer}>
            <View style={styles.profileContent}>
              <View style={styles.profileImgItem}>
                <View style={styles.profileImgDetail}>
                  <View style={styles.avatarImg}>
                    <Image
                      source={{
                        uri: "https://images.pexels.com/photos/736716/pexels-photo-736716.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                      }}
                      style={styles.profileImg}
                    />
                  </View>
                  <Button style={styles.editBtn}>
                    <Icon
                      name="pencil"
                      type="SimpleLineIcons"
                      style={[theme.SIZE_16, theme.DARK]}
                    />
                  </Button>
                </View>
              </View>
              <View style={styles.formRow}>
                <Text style={styles.formText}>{__("NAME")}</Text>
                <TextInput
                  placeholder="Daniel Vettari"
                  placeholderTextColor="#000"
                  style={styles.formInput}
                />
              </View>
              <View style={styles.formRow}>
                <Text style={styles.formText}>{__("EMAIL ADDRESS")}</Text>
                <TextInput
                  placeholder="daniel@gmail.com"
                  placeholderTextColor="#000"
                  style={styles.formInput}
                />
              </View>
              <View style={styles.formRow}>
                <Text style={styles.formText}>{__("MOBILE NUMBER")}</Text>
                <TextInput
                  placeholder="+ 012459253784"
                  keyboardType="numeric"
                  placeholderTextColor="#000"
                  style={styles.formInput}
                />
              </View>

              <View style={styles.profileBtnInfo}>
                <View style={styles.formRow2}>
                  <Text style={styles.formText}>{__("DRIVING LICENSE")}</Text>
                  <TextInput
                    placeholder="t1258732345"
                    placeholderTextColor="#000"
                    style={styles.formInput}
                  />
                </View>
                <Button style={styles.uploadBtn}>
                  <Text style={styles.uploadBtnText}>{__("VIEW")}</Text>
                </Button>
              </View>
              <View style={[styles.profileBtnInfo, styles.profileBtnInfoTwo]}>
                <View style={styles.formRow2}>
                  <Text style={styles.formText}>{__("NATIONAL ID CARD")}</Text>
                  <TextInput
                    placeholder=""
                    placeholderTextColor="#000"
                    style={styles.formInput}
                  />
                </View>
                <Button style={styles.uploadBtn}>
                  <Text style={styles.uploadBtnText}>{__("UPLOAD")}</Text>
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>

        <Button style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>{__("SAVE")}</Text>
        </Button>
      </View>
    );
  }
  function renderPermission() {
    return (
      <View style={styles.profileContainer}>
        <View style={styles.profileContent}>
          <View style={styles.profileInputDetail}>
            <Text style={styles.permissionText}>{__("LOCATION")}</Text>
            <View style={styles.switchInfo}>
              <Text style={styles.switchText}>
                {__("Access your location")}
              </Text>
              <ToggleSwitch />
            </View>
          </View>
          <View style={styles.profileInputDetail}>
            <Text style={styles.permissionText}>{__("MESSAGE")}</Text>
            <View style={styles.switchInfo}>
              <Text style={styles.switchText}>{__("Access your message")}</Text>
              <ToggleSwitch />
            </View>
          </View>
          <View style={styles.profileInputDetail}>
            <Text style={styles.permissionText}>{__("MEDIA & STORAGE")}</Text>
            <View style={styles.switchInfo}>
              <Text style={styles.switchText}>
                {__("Access your Media & Storage")}
              </Text>
              <ToggleSwitch />
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
      </View>
    );
  }
  function renderInsurance() {
    return (
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.tabInfo}>
            <Button
              style={
                PaymentTabSelected === "card"
                  ? styles.tabActive1
                  : styles.tabInactive
              }
              onPress={() => setPaymentTabSelected("card")}
            >
              <Image
                source={require("@asset/images/payment-card.png")}
                style={
                  PaymentTabSelected === "card"
                    ? styles.tabImgActive
                    : styles.tabImgInactive
                }
                resizeMode="contain"
              />
            </Button>
            <Button
              style={
                PaymentTabSelected === "paypal"
                  ? styles.tabActive1
                  : styles.tabInactive
              }
              onPress={() => setPaymentTabSelected("paypal")}
            >
              <Image
                source={require("@asset/images/download.png")}
                style={
                  PaymentTabSelected === "paypal"
                    ? styles.tabImgActive
                    : styles.tabImgInactive
                }
                resizeMode="contain"
              />
            </Button>
          </View>
          <View style={styles.paymentContainer}>
            {PaymentTabSelected === "card"
              ? renderCard()
              : PaymentTabSelected === "paypal"
              ? renderPayPal()
              : null}
          </View>
        </ScrollView>
        <Button style={styles.payBtn} onPress={onSubmit}>
          <Text style={styles.payBtnText}>{__("MAKE A PAYMENT")}</Text>
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <DarkStatusBar />
      <Header default leftType="back" title={"Profile"} />
      <Content contentContainerStyle={theme.layoutDf}>
        <View>
          <View style={styles.profileHeader}>
            <Text style={styles.profileHeaderTitle}>{__("PROFILE")}</Text>
            <Text style={styles.profileHeaderText}>
              {__("MANAGE YOUR PROFILE")}
            </Text>
            <View style={styles.tabInfo}>
              <Button
                style={
                  tabSelected === "profile"
                    ? styles.tabActive
                    : styles.tabInactive
                }
                onPress={() => setTabSelected("profile")}
              >
                <Text
                  style={
                    tabSelected === "profile"
                      ? styles.tabTextActive
                      : styles.tabTextInactive
                  }
                >
                  {__("PROFILE")}
                </Text>
              </Button>
              <Button
                style={
                  tabSelected === "permission"
                    ? styles.tabActive
                    : styles.tabInactive
                }
                onPress={() => setTabSelected("permission")}
              >
                <Text
                  style={
                    tabSelected === "permission"
                      ? styles.tabTextActive
                      : styles.tabTextInactive
                  }
                >
                  {__("PERMISSION")}
                </Text>
              </Button>
              <Button
                style={
                  tabSelected === "insurance"
                    ? styles.tabActive
                    : styles.tabInactive
                }
                onPress={() => setTabSelected("insurance")}
              >
                <Text
                  style={
                    tabSelected === "insurance"
                      ? styles.tabTextActive
                      : styles.tabTextInactive
                  }
                >
                  {__("PAYMENT")}
                </Text>
              </Button>
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {tabSelected === "profile"
              ? renderProfile()
              : tabSelected === "permission"
              ? renderPermission()
              : tabSelected === "insurance"
              ? renderInsurance()
              : null}
          </ScrollView>
        </View>
      </Content>
      {/* <Modal
        ref={"modalBooking"}
        position={"center"}
        isOpen={isOpen}
        onClosed={() => setIsOpen(false)}
        style={styles.modalSort}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.modalDetail}>
            <Button
              style={styles.closeHiddenDesc}
              onPress={() => this.refs.modalBooking.close()}
            >
              <Icon
                name="close"
                type="MaterialIcons"
                style={[theme.SIZE_20, theme.GREY]}
              />
            </Button>
            <Text style={styles.modalTitle}>{__("Local Ride @ $100")}</Text>
            <Text style={styles.modalDesc}>
              {__(
                "Integer pellentesque enim nec sem aliquam porttitor. Duis et nunc at est euismod convallis sit amet vitae risus. In non orci eu risus aliquet volutpat ut non erat."
              )}
            </Text>
            <Text style={styles.modalDesc}>
              {__(
                " Aenean sem sapien, vestibulum eu elit dignissim, sodales scelerisque lectus. Duis eu tempor metus. Vivamus luctus erat eget pellentesque rutrum."
              )}
            </Text>
            <Text style={styles.modalDesc}>
              {__(
                "  Sed blandit, eros sed cursus tempor, nibh nisi sodales elit, nec consequat nunc quam quis odio. Morbi bibendum mi lobortis luctus placerat. Nulla facilisis metus odio."
              )}
            </Text>
            <Text style={styles.modalDesc}>
              {__(
                "Integer pellentesque enim nec sem aliquam porttitor. Duis et nunc at est euismod convallis sit amet vitae risus. In non orci eu risus aliquet volutpat ut non erat.  Aenean sem sapien, vestibulum eu elit dignissim, sodales scelerisque lectus.   Duis eu tempor metus. Vivamus luctus erat eget pellentesque rutrum.  Sed blandit, eros sed cursus tempor, nibh nisi sodales elit, nec consequat nunc quam quis odio. Morbi bibendum mi lobortis luctus placerat."
              )}
            </Text>
          </View>
        </ScrollView>
      </Modal> */}
    </Container>
  );
}
