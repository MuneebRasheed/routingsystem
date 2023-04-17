import React, { useState } from "react";
import { View, ScrollView, Image } from "react-native";
import { Container, Content, Text, Icon } from "@component/Basic";
import { TextInput, Button, ToggleSwitch } from "@component/Form";

import styles from "./styles";
import theme from "@theme/styles";

import Header from "@component/Header";
import Accordion from "./Accordion";

import CalendarStrip from "react-native-calendar-strip";

import { navigate } from "@navigation";
import { __ } from "@utility/translation";

import { DarkStatusBar } from "@component/StatusBar";
import { connect } from "react-redux";
import DatePicker from "react-native-date-picker";

function SelectVehicle() {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <Container style={theme.layoutFx}>
      <DarkStatusBar />
      <Header leftType="back" title={"Booking"} />
      {/* <View>
        <CalendarStrip
          calendarAnimation={{ type: 'sequence', duration: 30 }}
          daySelectionAnimation={{ type: 'background', duration: 300, highlightColor: 'rgb(53,190,224)', fontFamily: 'Montserrat-SemiBold' }}
          style={{ height: 140, paddingVertical: 10, backgroundColor: 'rgba(89,73,158,1)' }}
          calendarHeaderStyle={{ color: '#FFF' }}
          calendarColor={'#FFF'}
          dateNumberStyle={{ color: '#FFF' }}
          dateNameStyle={{ color: '#FFF' }}
          highlightDateNameStyle={{ color: '#FFF' }}
          highlightDateNumberStyle={{ color: '#FFF' }}
          iconContainer={{ flex: 0.1 }}
        />
      </View> */}
      <Content contentContainerStyle={theme.layoutDf}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.selectVehicleContainer}>
            <View style={styles.selectVehicleContent}>
              {/* <View style={styles.formRow}>
                <TextInput
                  placeholder='Pickup From'
                  placeholderTextColor='rgba(89, 73, 158, 0.5)'
                  style={styles.formInput} />
                <Icon name='location-pin' type='Entypo' style={[theme.SIZE_20, theme.DARKBLUE]} />
              </View>
              <View style={styles.formRow}>
                <TextInput
                  placeholder='Drop at'
                  placeholderTextColor='rgba(89, 73, 158, 0.5)'
                  style={styles.formInput} />
                <Icon name='location-pin' type='Entypo' style={[theme.SIZE_20, theme.DARKBLUE]} />
              </View> */}
              <Accordion
                title="Select Time"
                renderContent={() => (
                  <View style={styles.accOrderInfo}>
                    <Button>
                      <Text style={styles.accText}>{__("Now")}</Text>
                    </Button>
                    <Button>
                      <Text style={styles.accText}>{__("Range")}</Text>
                    </Button>
                    <Button onPress={() => setOpen(true)}>
                      <Text style={styles.accText}>{__("Time")}</Text>
                    </Button>
                  </View>
                )}
              />

              <DatePicker
                modal
                mode="time"
                open={open}
                date={date}
                onConfirm={(date) => {
                  setOpen(false);
                  setDate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />

              <View style={styles.formRow}>
                <TextInput
                  placeholder="Affordable price"
                  placeholderTextColor="rgba(89, 73, 158, 0.5)"
                  style={styles.formInput}
                />
              </View>
              <View style={styles.formRow}>
                <TextInput
                  placeholder="Height"
                  placeholderTextColor="rgba(0,0,0,0.7)"
                  style={styles.formInput}
                />
                <TextInput
                  placeholder="Width"
                  placeholderTextColor="rgba(0,0,0,0.7)"
                  style={[styles.formInput, styles.formInput2]}
                />
              </View>
              {/* <Image
                source={require("@asset/images/pluss.png")}
                style={styles.signUpImg}
              /> */}
              <Button style={styles.bookingBtn}>
                <Text style={styles.bookingBtnText}>
                  {__("UPLOAD THE PHOTOS")}
                </Text>
              </Button>
            </View>
            <View style={styles.accordionLayout}>
              {/* <Accordion
                title='Select Vehicle Type'
                renderContent={() => (
                  <View style={styles.accOrderInfo}>
                    <Button>
                      <Text style={styles.accText}>{__('Dump truck')}</Text>
                    </Button>
                    <Button>
                      <Text style={styles.accText}>{__('Garbage truck')}</Text>
                    </Button>
                    <Button>
                      <Text style={styles.accText}>{__('Log carrier')}</Text>
                    </Button>
                    <Button>
                      <Text style={styles.accText}>{__('Refrigerator truck')}</Text>
                    </Button>
                    <Button>
                      <Text style={styles.accText}>{__('Tank truck')}</Text>
                    </Button>
                    <Button>
                      <Text style={styles.accText}>{__('Concrete transport truck (cement mixer)')}</Text>
                    </Button>
                  </View>
                )}
              /> */}
              {/* <Accordion
                title='Select Material Type'
                renderContent={() => (
                  <View style={styles.accOrderInfo}>
                    <Button>
                      <Text style={styles.accText}>{__('Dump truck')}</Text>
                    </Button>
                    <Button>
                      <Text style={styles.accText}>{__('Garbage truck')}</Text>
                    </Button>
                    <Button>
                      <Text style={styles.accText}>{__('Log carrier')}</Text>
                    </Button>
                    <Button>
                      <Text style={styles.accText}>{__('Refrigerator truck')}</Text>
                    </Button>
                    <Button>
                      <Text style={styles.accText}>{__('Tank truck.')}</Text>
                    </Button>
                    <Button>
                      <Text style={styles.accText}>{__('Concrete transport truck (cement mixer)')}</Text>
                    </Button>
                  </View>
                )}
              />
              <Accordion
                title='Select Delivery Floor'
                renderContent={() => (
                  <View style={styles.accOrderInfo}>
                    <Button>
                      <Text style={styles.accText}>{__('Dump truck')}</Text>
                    </Button>
                    <Button>
                      <Text style={styles.accText}>{__('Garbage truck')}</Text>
                    </Button>
                    <Button>
                      <Text style={styles.accText}>{__('Log carrier')}</Text>
                    </Button>
                    <Button>
                      <Text style={styles.accText}>{__('Refrigerator truck')}</Text>
                    </Button>
                    <Button>
                      <Text style={styles.accText}>{__('Tank truck.')}</Text>
                    </Button>
                    <Button>
                      <Text style={styles.accText}>{__('Concrete transport truck (cement mixer)')}</Text>
                    </Button>
                  </View>
                )}
              /> */}
            </View>
            {/* <View style={styles.switchInfo}>
              <Text style={styles.switchText}>{__('Unloading Manpower')}</Text>
              <ToggleSwitch
              />
            </View>
            <View>
              <View style={styles.selectVehicleDetail}>
                <View>
                  <Text style={styles.vehicleTitle}>{__('Tata ACE')}</Text>
                </View>
                <View style={styles.vehicleInfo}>
                  <Text style={styles.vehicleText}>{__('PAY LOAD')}</Text>
                  <Text style={styles.vehicleItemText}>{__('71 KG')}</Text>
                </View>
                <View style={styles.vehicleInfo}>
                  <Text style={styles.vehicleText}>{__('CARGO BOX')}</Text>
                  <Text style={styles.vehicleItemText}>{__('7.2 ft X 4/2 Ft X 1 Ft')}</Text>
                </View>
                <View style={styles.vehicleInfo}>
                  <Text style={styles.vehicleText}>{__('TYPE')}</Text>
                  <Text style={styles.vehicleItemText}>{__('Heavy Duty')}</Text>
                </View>
                <View style={styles.costInfo}>
                  <Text style={styles.vehicleText}>{__('COST')}</Text>
                  <Text style={styles.vehicleItemText}>{__('$1200')}</Text>
                </View>
              </View>
            </View> */}
          </View>
        </ScrollView>
      </Content>
      <Button
        style={styles.bookingBtn}
        onPress={() => {
          navigate("CustomerPayment");
        }}
      >
        <Text style={styles.bookingBtnText}>{__("BOOK NOW")}</Text>
      </Button>
    </Container>
  );
}
export default connect(({ session }) => ({ session }))(SelectVehicle);
