import React, { useState, useEffect } from "react";
import { View, ScrollView, Image, SafeAreaView } from "react-native";
import { Container, Content, Text, Icon } from "@component/Basic";
import { TextInput, Button, ToggleSwitch } from "@component/Form";
import { COLOR } from "@theme/typography";

import CheckBox from "react-native-check-box";
import styles from "./styles";
import theme from "@theme/styles";

import Header from "@component/Header";

import CalendarStrip from "react-native-calendar-strip";

import { navigate } from "@navigation";
import { __ } from "@utility/translation";

import { DarkStatusBar } from "@component/StatusBar";
import { connect } from "react-redux";
import DatePicker from "react-native-date-picker";
import Accordion from "./Accordion";

function MyRoute() {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isSelected, setSelection] = useState(false);

  return (
    <Container style={theme.layoutFx}>
      <DarkStatusBar />
      <Header leftType="back" title={"CREATE ROUTE"} />
      <View>
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
          style={{ backgroundColor: "red" }}
        />
      </View>
      <Content contentContainerStyle={theme.layoutDf}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.selectVehicleContainer}>
            <View style={styles.selectVehicleContent}>
              <View style={styles.formRow}>
                <TextInput
                  placeholder="Pickup From"
                  placeholderTextColor="rgba(89, 73, 158, 0.5)"
                  style={styles.formInput}
                />
                <Icon
                  name="location-pin"
                  type="Entypo"
                  style={[theme.SIZE_20, theme.DARKBLUE]}
                />
              </View>
              <View style={styles.formRow}>
                <TextInput
                  placeholder="Drop at"
                  placeholderTextColor="rgba(89, 73, 158, 0.5)"
                  style={styles.formInput}
                />
                <Icon
                  name="location-pin"
                  type="Entypo"
                  style={[theme.SIZE_20, theme.DARKBLUE]}
                />
              </View>
              <View style={styles.formRow11}>
                <Button style={styles.formRow2} onPress={() => setOpen(true)}>
                  <Text style={styles.formInput}>{__("START TIME")}</Text>
                </Button>
                <Button style={styles.formRow2} onPress={() => setOpen(true)}>
                  <Text style={styles.formInput}>{__("END TIME")}</Text>
                </Button>
              </View>
              {/* multisleect */}

              <View style={styles.switchInfo}>
                <Text style={styles.switchText}>
                  {__("Are You Divert or Not")}
                </Text>
                <ToggleSwitch />
              </View>
              <Accordion
                title="DAYS"
                text="open"
                renderContent={() => (
                  <View style={styles.accordionContent}>
                    <View style={{ marginLeft: 10 }}>
                      <CheckBox
                        rightTextStyle={styles.bookingText}
                        checkBoxColor={COLOR.GREEN}
                        onClick={() => {
                          setSelection(!isSelected);
                        }}
                        isChecked={isSelected}
                        rightText={"MONDAY"}
                      />
                      <CheckBox
                        rightTextStyle={styles.bookingText}
                        checkBoxColor={COLOR.GREEN}
                        onClick={() => {
                          setSelection(!isSelected);
                        }}
                        isChecked={isSelected}
                        rightText={"TUESDAY"}
                      />
                      <CheckBox
                        rightTextStyle={styles.bookingText}
                        checkBoxColor={COLOR.GREEN}
                        onClick={() => {
                          setSelection(!isSelected);
                        }}
                        isChecked={isSelected}
                        rightText={"WEDNESDAY"}
                      />
                      <CheckBox
                        rightTextStyle={styles.bookingText}
                        checkBoxColor={COLOR.GREEN}
                        onClick={() => {
                          setSelection(!isSelected);
                        }}
                        isChecked={isSelected}
                        rightText={"THURSDAY"}
                      />
                      <CheckBox
                        rightTextStyle={styles.bookingText}
                        checkBoxColor={COLOR.GREEN}
                        onClick={() => {
                          setSelection(!isSelected);
                        }}
                        isChecked={isSelected}
                        rightText={"FRIDAY"}
                      />
                      <CheckBox
                        rightTextStyle={styles.bookingText}
                        checkBoxColor={COLOR.GREEN}
                        onClick={() => {
                          setSelection(!isSelected);
                        }}
                        isChecked={isSelected}
                        rightText={"SATURDAY"}
                      />
                      <CheckBox
                        rightTextStyle={styles.bookingText}
                        checkBoxColor={COLOR.GREEN}
                        onClick={() => {
                          setSelection(!isSelected);
                        }}
                        isChecked={isSelected}
                        rightText={"SUNDAY"}
                      />
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
        </ScrollView>
      </Content>
      <Button style={styles.bookingBtn} onPress={() => setOpen(true)}>
        <Text style={styles.bookingBtnText}>{__("ADD ROUTE")}</Text>
      </Button>
    </Container>
  );
}

export default connect(({ session }) => ({ session }))(MyRoute);
