import React, { useState } from "react";
import { View, ScrollView, Image } from "react-native";
import { Container, Content, Text, Icon } from "@component/Basic";
import { Button, Picker, TextInput } from "@component/Form";

import Modal from "react-native-modalbox";

import styles from "./styles";
import theme from "@theme/styles";

import Header from "@component/Header";

import { navigate } from "@navigation";
import { __ } from "@utility/translation";
import request from "@utility/request";
import { bind } from "@utility/component";
import { DarkStatusBar } from "@component/StatusBar";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";


export default function MyTrip() {
  const [tabSelected, setTabSelected] = useState("all");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    if(isFocused){ 
      console.log("UseEffect Call")
      submit();
  }
    
  }, [isFocused]);

  async function submit() {
    var data = await AsyncStorage.getItem("response");
    var datas = JSON.parse(data);
    const res = axios
      .get(
        `  https://testing.explorelogix.com/v1/routes?page=1&limit=10
        `,
        {
          headers: {
            Authorization: `Bearer ${datas.access_token}`,
          },
        }
      )
      .then((data) => {
        console.log("res get all route", data.data.docs.length);
        setData(data.data.docs);
      })
      .catch((err) => {
        console.log(("error", err));
      });
  }

  function renderAll() {
    return (
      <View>
        <View style={styles.accordionLayout}>
          <ScrollView>
            {data.map((val) => {
              return (
                <View style={styles.accordion}>
                  <Button disabled style={styles.accordionBtn}>
                    <Text style={styles.accordionTitle}>
                      {"ROUTE ID #X876895"}
                    </Text>
                    <View style={styles.accordionInfo}>
                      <View style={styles.accordionItem}>
                        <Text style={styles.accordionInactiveText}>
                          {"Edit"}
                        </Text>
                      </View>
                      <Icon
                        name="delete"
                        type="MaterialCommunityIcons"
                        style={[theme.SIZE_20, theme.DARKBLUE]}
                      />
                    </View>
                  </Button>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }

  function renderOpen() {
    return (
      <View>
        <View style={styles.accordionLayout}>
          <View style={styles.accordion}>
          <ScrollView>
            {data.map((val) => {
              if(val.isActive){
                return (
                  <View style={styles.accordion}>
                    <Button disabled style={styles.accordionBtn}>
                      <Text style={styles.accordionTitle}>
                        {"ROUTE ID #X876895"}
                      </Text>
                      <View style={styles.accordionInfo}>
                        <View style={styles.accordionItem}>
                          <Text style={styles.accordionInactiveText}>
                            {"Edit"}
                          </Text>
                        </View>
                        <Icon
                          name="delete"
                          type="MaterialCommunityIcons"
                          style={[theme.SIZE_20, theme.DARKBLUE]}
                        />
                      </View>
                    </Button>
                  </View>
                );
              }
              
            })}
          </ScrollView>
          </View>
        </View>
      </View>
    );
  }

  function renderCompleted() {
    return (
      <View>
        <View style={styles.accordionLayout}>
          <View style={styles.accordion}>
          {data.map((val) => {
              if(!val.isActive){
                return (
                  <View style={styles.accordion}>
                    <Button disabled style={styles.accordionBtn}>
                      <Text style={styles.accordionTitle}>
                        {"ROUTE ID #X876895"}
                      </Text>
                      <View style={styles.accordionInfo}>
                        <View style={styles.accordionItem}>
                          <Text style={styles.accordionInactiveText}>
                            {"Edit"}
                          </Text>
                        </View>
                        <Icon
                          name="delete"
                          type="MaterialCommunityIcons"
                          style={[theme.SIZE_20, theme.DARKBLUE]}
                        />
                      </View>
                    </Button>
                  </View>
                );
              }
              
            })}
          </View>
        </View>
      </View>
    );
  }

  return (
    <Container>
      <DarkStatusBar />
      <Header leftType="back" name="Routes" />
      <View style={styles.myTripHeader}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={styles.myTripHeaderTitle}>{__("MY ROUTES")}</Text>
            <Text style={styles.myTripHeaderText}>{__("LIST OF ROUTES")}</Text>
          </View>
          <Button
            style={[styles.tabActive1, { width: 50 }]}
            onPress={() => navigate("DriverAddRoutes")}
          >
            <Text style={styles.tabActiveText}>{__("ADD")}</Text>
          </Button>
        </View>

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
              {__("BLOCKED")}
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
