import React from "react";
import { View, ScrollView } from "react-native";
import { Container, Content, Text, Icon } from "@component/Basic";
import { Button } from "@component/Form";

import AsyncStorage from "@react-native-async-storage/async-storage";

import notificationsList from "./data/notifications";
import Notifications from "./Notifications";

import styles from "./styles";
import theme from "@theme/styles";

import Modal from "react-native-modalbox";
import Header from "@component/Header";

import { navigate } from "@navigation";
import { __ } from "@utility/translation";
import request from "@utility/request";
import { bind } from "@utility/component";
import { DarkStatusBar } from "@component/StatusBar";
import AppSpinner from "../../../component/AppSpinner";
import { COLOR } from "@theme/typography";

export default class extends React.Component {
  state = {
    loading: true,
  };

  showLoading = (val) => {
    this.setState({ loading: val });
  };

  render() {
    console.log("current state in parent", this.state.loading);
    return (
      <Container style={theme.layout}>
        <DarkStatusBar />
        <Header leftType="back" />
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationHeaderTitle}>
            {__("NOTIFICATIONS")}
          </Text>
          <Text style={styles.notificationHeaderText}>
            {__("MANAGE YOUR NOTIFICATIONS")}
          </Text>
        </View>
        {this.state.loading && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AppSpinner size="large" color={COLOR.PRIMARY} />
          </View>
        )}

        <Content
          style={[theme.layout, this.state.loading ? { display: "none" } : {}]}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.notificationContainer}>
              <Notifications
                showLoading={this.showLoading}
                loading={this.state.loading}
              />
            </View>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}
