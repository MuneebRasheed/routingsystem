import React from "react";
import { View, ScrollView } from "react-native";
import { Container, Content, Text, Icon } from "@component/Basic";
import { TextInput, Button, Picker } from "@component/Form";

import styles from "./styles";
import theme from "@theme/styles";

import Header from "@component/Header";
import Support from "@component/Support";

import { navigate, navigateReset } from "@navigation";
import { __ } from "@utility/translation";
import request from "@utility/request";
import { bind } from "@utility/component";
import { DarkStatusBar } from "@component/StatusBar";

export default function WriteUs (){
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     values: {},
  //     value: 50,
  //    
  //   };

  //   bind(this);

  //   this.onChangeText = this.onChangeText.bind(this);
  //   this.validate = this.validate.bind(this);
  //   this.onSubmit = this.onSubmit.bind(this);
  // }

  // onChangeText(n, v) {
  //   this.setState({
  //     values: { ...this.state.values, [n]: v },
  //   });
  // }

  // validate() {
  //   const isEmpty = (key) => {
  //     return !(
  //       typeof this.state.values[key] !== "undefined" &&
  //       this.state.values[key] !== ""
  //     );
  //   };
  //   const errors = [];

  //   if (isEmpty("comment")) {
  //     errors.push("Please enter your Comment");
  //   }

  //   if (errors.length) {
  //     throw new Error(errors.join("\n"));
  //   }
  // }

 const book=[{ label: "Order Tracking", value: 0 }];

  async function onSubmit() {
    await Support.showLoading();
    try {
     

      await Support.showSuccess({
        title: __("Thank you !"),
        message: __("Your Message can be send successfully"),
        onHide: () => {
          navigateReset("");
        },
        hideDelay: 2500,
      });
    } catch (e) {
      await Support.showServerError(e);
    }
    await Support.hideLoading();
  }

 
    return (
      <Container>
        <DarkStatusBar />
        <Header leftType="back" />
        <View style={styles.writeUsHeader}>
          <Text style={styles.writeUsHeaderTitle}>{__("WRITE US")}</Text>
          <Text style={styles.writeUsHeaderText}>
            {__("MAIL YOUR REQUIREMENTS TO US")}
          </Text>
        </View>
        <Content contentContainerStyle={theme.layoutDf}>
          <View style={styles.writeUsContainer}>
            <View style={styles.writeUsInfo}>
              <Text style={styles.writeUsTitle}>{__("BOOKING ID")}</Text>
              <View style={styles.picker}>
                <Picker items={book}  />
                {/* onChange={this.onChangeValue} */}
              </View>
            </View>
            <View style={styles.formRow}>
              <Text style={styles.formText}>{__("COMMENTS")}</Text>
              <TextInput
                placeholder=""
                placeholderTextColor="#ccc"
                multiline
                numberOfLines={7}
                textAlignVertical={"top"}
                // placeholder='Please write your comments'
                // onChangeText={(v) => this.onChangeText("comment", v)}
                style={styles.formInput}
              />
            </View>
            <Button style={styles.sendBtn} onPress={onSubmit}>
              <Text style={styles.sendBtnText}>{__("SEND")}</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }

