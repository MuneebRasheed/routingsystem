import React, { Component } from "react";
import { Image, TouchableOpacity, ScrollView, Text, View } from "react-native";
import { connect } from "react-redux";

import styles from "./styles";

import * as MENU from "./Menu";

import { Icon } from "@component/Basic";
import { closeDrawer, navigate, navigateReset } from "@navigation";
import theme from "@theme/styles";
import { __ } from "@utility/translation";

class MenuLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
    };
    this.renderMenuList = this.renderMenuList.bind(this);
  }

  renderMenuList(menus) {
    return menus.map((menu) => {
      return (
        <TouchableOpacity
          key={menu.name}
          style={styles.item}
          underlayColor="transparent"
          onPress={() => {
            closeDrawer();
            if (menu.route === "UserLogout") {
              navigateReset(menu.route);
            } else {
              navigate(menu.route, menu.params || {});
            }
          }}
        >
          <View style={styles.col}>
            <Icon
              name={menu.iconName}
              type={menu.iconType}
              style={styles.itemIcon}
            />
          </View>
          <View style={theme.row}>
            <Text style={styles.itemText}>{__(menu.name)}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  }

  render() {
    let img =
      "https://images.pexels.com/photos/709188/pexels-photo-709188.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500}}";
    let username = __("Allen John");

    return (
      <View style={styles.drawer}>
        <View style={styles.headerBg}>
          <View style={styles.header}>
            <Image
              source={{ uri: img }}
              resizeMode="cover"
              style={styles.headerImg}
            />
            <View
              onPress={() =>
                navigate(
                  this.props.session.isLoggedIn ? "UserHome" : "UserLogin"
                )
              }
            >
              <View style={theme.row}>
                <Text style={styles.headerName}>{username}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.navMenu}>
            <ScrollView>
              {/* <Text style={styles.navHeader}>Public</Text> */}
              {/* {this.renderMenuList(MENU.Data1)} */}
              {/* <Text style={styles.navHeader}>Customer</Text> */}
              {this.renderMenuList(MENU.Data2)}
              {/* <Text style={styles.navHeader}>Driver</Text> */}
              {/* {this.renderMenuList(MENU.Data3)} */}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(({ session }) => ({ session }))(MenuLeft);
