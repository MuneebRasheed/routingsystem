import React, { useState } from "react";
import { View, ScrollView, Image } from "react-native";
import { Container, Content, Text, Icon } from "@component/Basic";
import { Button, Picker, TextInput } from "@component/Form";

import Modal from "react-native-modalbox";
import Accordion from "./Accordion";

import styles from "./styles";
import theme from "@theme/styles";

import Header from "@component/Header";

import { navigate } from "@navigation";
import { __ } from "@utility/translation";
import request from "@utility/request";
import { bind } from "@utility/component";
import { DarkStatusBar } from "@component/StatusBar";

export default function MyTrip() {
  const [tabSelected, setTabSelected] = useState("all");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function renderAll() {
    return (
      <View>
        <View style={styles.accordionLayout}>
          <Accordion
            title="BOOKING ID #X876895"
            text="open"
            renderContent={() => (
              <View style={styles.accordionContent}>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("TRIP COST")}</Text>
                  <Text style={styles.bookingText}>{__("$1300 USD")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("TRIP")}</Text>
                  <View style={styles.bookingDetailInfo}>
                    <Text style={styles.bookingDetail}>
                      {__("Dec 25,2019")}
                    </Text>
                    <Text style={styles.bookingText}>{__("11:30 AM")}</Text>
                  </View>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("PICK UP FROM")}</Text>
                  <Text style={styles.bookingText}>{__("New York,USA")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("DROP AT")}</Text>
                  <Text style={styles.bookingText}>{__("Texas, USA")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("YOUR OTP")}</Text>
                  <Text style={styles.bookingText}>{__("2530")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("DRIVER NAME")}</Text>
                  <Text style={styles.bookingText}>{__("DANIEL VETORI")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>
                    {__("VEHICLE NUMBER")}
                  </Text>
                  <Text style={styles.bookingText}>{__("NY 47568")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("CALL DRIVER")}</Text>
                  <Text style={styles.bookingText}>{__("@ 64576348763")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("ADVANCED PAID")}</Text>
                  <Text style={styles.bookingText}>{__("$500 USD")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>
                    {__("BALANCE TO PAY")}
                  </Text>
                  <Text style={styles.bookingText}>{__("$700 USD")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("STATUS")}</Text>
                  <Button
                    onPress={() => {
                      navigate("CustomerBookingComplete");
                    }}
                  >
                    <Text style={styles.openBtnText}>{__("OPEN")}</Text>
                  </Button>
                </View>
                <View style={styles.btnInfo}>
                  <View style={styles.detailTag}>
                    <Button
                      style={styles.detailBtn}
                      onPress={() => {
                        navigate("CustomerBookingComplete");
                      }}
                    >
                      <Icon
                        name="search"
                        type="Feather"
                        style={[theme.SIZE_14, theme.GREYDARK]}
                      />
                      <Text style={styles.detailBtnText}>{__("DETAILS")}</Text>
                    </Button>
                  </View>
                  <Button
                    style={styles.balanceBtn}
                    onPress={() => {
                      setIsOpen(true);
                    }}
                  >
                    <Text style={styles.balanceBtnText}>{__("CHAT")}</Text>
                  </Button>
                </View>
              </View>
            )}
          />
          <Accordion
            title="BOOKING ID #X876895"
            text="complete"
            renderContent={() => (
              <View style={styles.accordionContent}>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("TRIP COST")}</Text>
                  <Text style={styles.bookingText}>{__("$1200 USD")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("TRIP")}</Text>
                  <View style={styles.bookingDetailInfo}>
                    <Text style={styles.bookingDetail}>
                      {__("Dec 25,2019")}
                    </Text>
                    <Text style={styles.bookingText}>{__("11:30 AM")}</Text>
                  </View>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("PICK UP FROM")}</Text>
                  <Text style={styles.bookingText}>{__("New York,USA")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("DROP AT")}</Text>
                  <Text style={styles.bookingText}>{__("Texas, USA")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("YOUR OTP")}</Text>
                  <Text style={styles.bookingText}>{__("2530")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("DRIVER NAME")}</Text>
                  <Text style={styles.bookingText}>{__("SHAN JOHNSON")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>
                    {__("VEHICLE NUMBER")}
                  </Text>
                  <Text style={styles.bookingText}>{__("NY 47568")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("CALL DRIVER")}</Text>
                  <Text style={styles.bookingText}>{__("@ 64576348763")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("ADVANCED PAID")}</Text>
                  <Text style={styles.bookingText}>{__("$1500 USD")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("STATUS")}</Text>
                  <Button
                    onPress={() => {
                      navigate("CustomerBookingComplete");
                    }}
                  >
                    <Text style={styles.completedBtnText}>
                      {__("COMPLETED")}
                    </Text>
                  </Button>
                </View>
                <View style={styles.btnInfo}>
                  <Button
                    style={styles.detailBtn}
                    onPress={() => {
                      navigate("CustomerBookingComplete");
                    }}
                  >
                    <Icon
                      name="search"
                      type="Feather"
                      style={[theme.SIZE_14, theme.GREYDARK]}
                    />
                    <Text style={styles.detailBtnText}>{__("DETAILS")}</Text>
                  </Button>
                  <Button>
                    <Text style={styles.rateBtn}>{__("RATE TRIP")}</Text>
                  </Button>
                </View>
              </View>
            )}
          />
          <Accordion
            title="BOOKING ID #X876895"
            text="complete"
            renderContent={() => (
              <View style={styles.accordionContent}>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("TRIP COST")}</Text>
                  <Text style={styles.bookingText}>{__("$1200 USD")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("TRIP")}</Text>
                  <View style={styles.bookingDetailInfo}>
                    <Text style={styles.bookingDetail}>
                      {__("Dec 25,2019")}
                    </Text>
                    <Text style={styles.bookingText}>{__("11:30 AM")}</Text>
                  </View>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("PICK UP FROM")}</Text>
                  <Text style={styles.bookingText}>{__("New York,USA")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("DROP AT")}</Text>
                  <Text style={styles.bookingText}>{__("Texas, USA")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("YOUR OTP")}</Text>
                  <Text style={styles.bookingText}>{__("2530")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("DRIVER NAME")}</Text>
                  <Text style={styles.bookingText}>{__("SHAN JOHNSON")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>
                    {__("VEHICLE NUMBER")}
                  </Text>
                  <Text style={styles.bookingText}>{__("NY 47568")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("CALL DRIVER")}</Text>
                  <Text style={styles.bookingText}>{__("@ 64576348763")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("ADVANCED PAID")}</Text>
                  <Text style={styles.bookingText}>{__("$1500 USD")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("STATUS")}</Text>
                  <Button
                    onPress={() => {
                      navigate("CustomerBookingComplete");
                    }}
                  >
                    <Text style={styles.completedBtnText}>
                      {__("COMPLETED")}
                    </Text>
                  </Button>
                </View>
                <View style={styles.btnInfo}>
                  <Button
                    style={styles.detailBtn}
                    onPress={() => {
                      navigate("CustomerBookingComplete");
                    }}
                  >
                    <Icon
                      name="search"
                      type="Feather"
                      style={[theme.SIZE_14, theme.GREYDARK]}
                    />
                    <Text style={styles.detailBtnText}>{__("DETAILS")}</Text>
                  </Button>
                  <Button>
                    <Text style={styles.rateBtn}>{__("RATE TRIP")}</Text>
                  </Button>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    );
  }

  function renderOpen() {
    return (
      <View>
        <View style={styles.accordionLayout}>
          <Accordion
            title="BOOKING ID #X876895"
            text="open"
            renderContent={() => (
              <View style={styles.accordionContent}>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("TRIP COST")}</Text>
                  <Text style={styles.bookingText}>{__("$1300 USD")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("TRIP")}</Text>
                  <View style={styles.bookingDetailInfo}>
                    <Text style={styles.bookingDetail}>
                      {__("Dec 25,2019")}
                    </Text>
                    <Text style={styles.bookingText}>{__("11:30 AM")}</Text>
                  </View>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("PICK UP FROM")}</Text>
                  <Text style={styles.bookingText}>{__("New York,USA")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("DROP AT")}</Text>
                  <Text style={styles.bookingText}>{__("Texas, USA")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("YOUR OTP")}</Text>
                  <Text style={styles.bookingText}>{__("2530")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("DRIVER NAME")}</Text>
                  <Text style={styles.bookingText}>{__("DANIEL VETORI")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>
                    {__("VEHICLE NUMBER")}
                  </Text>
                  <Text style={styles.bookingText}>{__("NY 47568")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("CALL DRIVER")}</Text>
                  <Text style={styles.bookingText}>{__("@ 64576348763")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("ADVANCED PAID")}</Text>
                  <Text style={styles.bookingText}>{__("$500 USD")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>
                    {__("BALANCE TO PAY")}
                  </Text>
                  <Text style={styles.bookingText}>{__("$700 USD")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("STATUS")}</Text>
                  <Button
                    onPress={() => {
                      navigate("CustomerBookingComplete");
                    }}
                  >
                    <Text style={styles.openBtnText}>{__("OPEN")}</Text>
                  </Button>
                </View>
                <View style={styles.btnInfo}>
                  <View style={styles.detailTag}>
                    <Button
                      style={styles.detailBtn}
                      onPress={() => {
                        navigate("CustomerBookingComplete");
                      }}
                    >
                      <Icon
                        name="search"
                        type="Feather"
                        style={[theme.SIZE_14, theme.GREYDARK]}
                      />
                      <Text style={styles.detailBtnText}>{__("DETAILS")}</Text>
                    </Button>
                  </View>
                  <Button
                    style={styles.balanceBtn}
                    onPress={() => {
                      navigate("CustomerPayment");
                    }}
                  >
                    <Text style={styles.balanceBtnText}>
                      {__("Real Time Tracking")}
                    </Text>
                  </Button>
                  <Button
                    style={styles.balanceBtn}
                    onPress={() => {
                      navigate("CustomerPayment");
                    }}
                  >
                    <Text style={styles.balanceBtnText}>
                      {__("PAY BALANCE NOW")}
                    </Text>
                  </Button>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    );
  }

  function renderCompleted() {
    return (
      <View>
        <View style={styles.accordionLayout}>
          <Accordion
            title="BOOKING ID #X876895"
            text="open"
            renderContent={() => (
              <View style={styles.accordionContent}>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("TRIP COST")}</Text>
                  <Text style={styles.bookingText}>{__("$1200 USD")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("TRIP")}</Text>
                  <View style={styles.bookingDetailInfo}>
                    <Text style={styles.bookingDetail}>
                      {__("Dec 25,2019")}
                    </Text>
                    <Text style={styles.bookingText}>{__("11:30 AM")}</Text>
                  </View>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("PICK UP FROM")}</Text>
                  <Text style={styles.bookingText}>{__("New York,USA")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("DROP AT")}</Text>
                  <Text style={styles.bookingText}>{__("Texas, USA")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("YOUR OTP")}</Text>
                  <Text style={styles.bookingText}>{__("2530")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("DRIVER NAME")}</Text>
                  <Text style={styles.bookingText}>{__("SHAN JOHNSON")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>
                    {__("VEHICLE NUMBER")}
                  </Text>
                  <Text style={styles.bookingText}>{__("NY 47568")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("CALL DRIVER")}</Text>
                  <Text style={styles.bookingText}>{__("@ 64576348763")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("ADVANCED PAID")}</Text>
                  <Text style={styles.bookingText}>{__("$1500 USD")}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingTitle}>{__("STATUS")}</Text>
                  <Button
                    onPress={() => {
                      navigate("CustomerBookingComplete");
                    }}
                  >
                    <Text style={styles.completedBtnText}>
                      {__("COMPLETED")}
                    </Text>
                  </Button>
                </View>
                <View style={styles.btnInfo}>
                  <Button
                    style={styles.detailBtn}
                    onPress={() => {
                      navigate("CustomerBookingComplete");
                    }}
                  >
                    <Icon
                      name="search"
                      type="Feather"
                      style={[theme.SIZE_14, theme.GREYDARK]}
                    />
                    <Text style={styles.detailBtnText}>{__("DETAILS")}</Text>
                  </Button>
                  <Button>
                    <Text style={styles.rateBtn}>{__("RATE TRIP")}</Text>
                  </Button>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    );
  }

  return (
    <Container>
      <DarkStatusBar />
      <Header leftType="back" />
      <View style={styles.myTripHeader}>
        <Text style={styles.myTripHeaderTitle}>{__("MY TRIPS")}</Text>
        <Text style={styles.myTripHeaderText}>{__("LIST OF TRIPS")}</Text>
        <View style={styles.myTripTabItems}>
          <Button
            style={
              tabSelected === "all" ? styles.tabActive : styles.tabInactive
            }
            onPress={() => setTabSelected("all")}
          >
            <Text
              style={
                tabSelected === "all"
                  ? styles.tabActiveText
                  : styles.tabInactiveText
              }
            >
              {__("ALL")}
            </Text>
          </Button>
          <Button
            style={
              tabSelected === "open" ? styles.tabActive : styles.tabInactive
            }
            onPress={() => setTabSelected("open")}
          >
            <Text
              style={
                tabSelected === "open"
                  ? styles.tabActiveText
                  : styles.tabInactiveText
              }
            >
              {__("OPEN")}
            </Text>
          </Button>
          <Button
            style={
              tabSelected === "completed"
                ? styles.tabActive
                : styles.tabInactive
            }
            onPress={() => setTabSelected("completed")}
          >
            <Text
              style={
                tabSelected === "completed"
                  ? styles.tabActiveText
                  : styles.tabInactiveText
              }
            >
              {__("COMPLETED")}
            </Text>
          </Button>
        </View>
      </View>
      <Content contentContainerStyle={theme.layoutDf}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.myTripContainer}>
            {tabSelected === "all"
              ? renderAll()
              : tabSelected === "open"
              ? renderOpen()
              : tabSelected === "completed"
              ? renderCompleted()
              : null}
          </View>
        </ScrollView>
      </Content>
      {/* <Modal isOpen={true} position={"center"}>
        <Text>muneeb</Text>
      </Modal> */}
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
          <View style={{ height: 300, width: "100%" }}>
            <ScrollView>
              <View style={styles.reciver}>
                <Text>What is your Name</Text>
              </View>

              <View style={styles.sender}>
                <Text>My Name is Aex</Text>
              </View>
            </ScrollView>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              placeholder="Type Here"
              placeholderTextColor="rgba(0,0,0,0.7)"
              style={styles.formInput3}
            />
            <Icon
              name="send"
              type="FontAwesome"
              style={[theme.SIZE_30, theme.DARKVIOLET]}
            />
          </View>
        </View>
      </Modal>
    </Container>
  );
}
