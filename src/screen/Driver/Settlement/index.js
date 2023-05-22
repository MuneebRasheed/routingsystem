import React from "react";
import { View, ScrollView } from "react-native";
import { Container, Content, Text } from "@component/Basic";
import styles from "./styles";
import theme from "@theme/styles";

import Header from "@component/Header";
import Accordion from "./Accordion";
import { __ } from "@utility/translation";
import { DarkStatusBar } from "@component/StatusBar";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TransactionHistory() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    getTransactionHistory();
  }, []);
  const getTransactionHistory = async () => {
    var data = await AsyncStorage.getItem("response");
    var datas = JSON.parse(data);

    const res = axios
      .post(
        ` https://5624-2400-adc5-425-a000-38cd-4f9a-ccdb-4dbf.ngrok-free.app/v1/payment/platform-transactions?limit=100`,
        {},
        {
          headers: {
            Authorization: `Bearer ${datas.access_token}`,
          },
        }
      )
      .then((data) => {
        console.log("history", data.data.data[0]);
        setData(data.data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  return (
    <Container>
      <DarkStatusBar />
      <Header leftType="back" />
      <View style={styles.settlementHeader}>
        <Text style={styles.settlementHeaderTitle}>
          {__("TRANSACTION HISTORY")}
        </Text>
        <Text style={styles.settlementHeaderText}>
          {__("TRANSACTION HISTORY")}
        </Text>
      </View>
      <Content contentContainerStyle={theme.layoutDf}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.settlementContainer}>
            {data.map((val, index) => {
              return (
                <View style={styles.accordionLayout}>
                  <Accordion
                    title={"TRANSACTION ID #" + (index + 1)}
                    text="open"
                    style={{ backgroundColor: "rgba(92,186,71,1)" }}
                    renderContent={() => (
                      <View style={styles.accordionContent}>
                        <View style={[styles.bookingItem, styles.bookingItem2]}>
                          <Text style={styles.bookingText}>
                            {__("Transation Amount")}
                          </Text>
                          <Text style={styles.bookingCost}>
                            {__(`${val.amount}`)}
                          </Text>
                        </View>
                        <View style={[styles.bookingItem, styles.bookingItem2]}>
                          <Text style={styles.bookingText}>{__("Fee")}</Text>
                          <Text style={styles.bookingCost}>
                            {__(`${val.fee} CAD`)}
                          </Text>
                        </View>
                        <View style={[styles.bookingItem, styles.bookingItem2]}>
                          <Text style={styles.bookingText}>
                            {__("Net Amount")}
                          </Text>
                          <Text style={styles.bookingCost}>
                            {__(`${val.net} CAD`)}
                          </Text>
                        </View>
                        <View style={styles.bookingItem}>
                          <Text style={styles.bookingText}>{__("Status")}</Text>
                          <Text style={styles.bookingCost}>
                            {__(`${val.status}`)}
                          </Text>
                        </View>
                      </View>
                    )}
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>
      </Content>
    </Container>
  );
}
