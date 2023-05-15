import React, { useState, useEffect } from "react";
import { Dimensions, I18nManager } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DrawerLeft from "@component/Drawer/Left";
import { navigationRef, onReady, onLastScreenLeave } from "@navigation";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const { width } = Dimensions.get("window");

const WIDTH_DRAWER = width * 0.78;

const listeners = ({ navigation, route }) => ({
  beforeRemove: (e) => {
    if (e.data.action.type === "GO_BACK") {
      onLastScreenLeave(e);
    }
  },
});

const DrawerNavUser = ({ navigation }) => {
  const data = useSelector((state) => state);
  console.log("cveer1", data.session);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerWidth: WIDTH_DRAWER,
        drawerStyle: { width: "75%" },
        drawerPosition: I18nManager.isRTL ? "right" : "left",
      }}
      drawerContent={(props) => <DrawerLeft {...props} />}
      minSwipeDistance={width}
    >
      {data.session.bool ? (
        <Stack.Screen
          name="PublicHome"
          component={require("@screen/Driver/Home").default}
        />
      ) : (
        <Stack.Screen
          name="PublicHome"
          component={require("@screen/Public/Home").default}
        />
      )}
    </Drawer.Navigator>
  );
};

const DrawerNavDriver = ({ navigation }) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerWidth: WIDTH_DRAWER,
        drawerStyle: { width: "75%" },
        drawerPosition: I18nManager.isRTL ? "right" : "left",
      }}
      drawerContent={(props) => <DrawerLeft {...props} />}
      minSwipeDistance={width}
    >
      <Stack.Screen
        name="DriverHome"
        component={require("@screen/Driver/Home").default}
      />
    </Drawer.Navigator>
  );
};

const NavRoot = ({ navigation }) => {
  return null;
};

const Navigator = () => {
  const data = useSelector((state) => state);
  console.log("cveer2", data.session);
  return (
    <NavigationContainer ref={navigationRef} onReady={onReady}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="NavRoot"
        screenListeners={listeners}
      >
        <Stack.Screen name="NavRoot" component={NavRoot} />
        <Stack.Screen name="DrawerNav" component={DrawerNavUser} />
        {/* <Stack.Screen name="DrawerNav" component={DrawerNavDriver} /> */}
        <Stack.Screen
          name="PublicIntro"
          component={require("@screen/Public/Intro").default}
        />
        <Stack.Screen
          name="PublicSignUp"
          component={require("@screen/Public/SignUp").default}
        />
        <Stack.Screen
          name="PublicLogin"
          component={require("@screen/Public/Login").default}
        />
        <Stack.Screen
          name="PublicVerification"
          component={require("@screen/Public/Verification").default}
        />
        <Stack.Screen
          name="PublicAboutUs"
          component={require("@screen/Public/AboutUs").default}
        />
        <Stack.Screen
          name="PublicContact"
          component={require("@screen/Public/Contact").default}
        />
        {data.session.bool ? (
          <Stack.Screen
            name="PublicHome"
            component={require("@screen/Driver/Home").default}
          />
        ) : (
          <Stack.Screen
            name="PublicHome"
            component={require("@screen/Public/Home").default}
          />
        )}
        <Stack.Screen
          name="PublicSplash"
          component={require("@screen/Public/Splash").default}
        />
        <Stack.Screen
          name="CustomerLanguage"
          component={require("@screen/Customer/Language").default}
        />
        <Stack.Screen
          name="CustomerSelectVehicle"
          component={require("@screen/Customer/SelectVehicle").default}
        />
        <Stack.Screen
          name="CustomerSharedVehicle"
          component={require("@screen/Customer/SharedVehicle").default}
        />
        <Stack.Screen
          name="CustomerPayment"
          component={require("@screen/Customer/Payment").default}
        />
        <Stack.Screen
          name="CustomerBookingComplete"
          component={require("@screen/Customer/BookingComplete").default}
        />
        <Stack.Screen
          name="DriverBookingComplete"
          component={require("@screen/Driver/BookingComplete").default}
        />
        <Stack.Screen
          name="CustomerBookingConfirm"
          component={require("@screen/Customer/BookingConfirm").default}
        />
        <Stack.Screen
          name="CustomerWriteUs"
          component={require("@screen/Customer/WriteUs").default}
        />
        <Stack.Screen
          name="CustomerManageProfile"
          component={require("@screen/Customer/ManageProfile").default}
        />
        <Stack.Screen
          name="CustomerMyTrips"
          component={require("@screen/Customer/MyTrips").default}
        />
        <Stack.Screen
          name="CustomerNotification"
          component={require("@screen/Customer/Notification").default}
        />
        <Stack.Screen
          name="CustomerAllPayments"
          component={require("@screen/Customer/AllPayments").default}
        />
        <Stack.Screen
          name="DriverManageProfile"
          component={require("@screen/Driver/ManageProfile").default}
        />
        <Stack.Screen
          name="DriverAddRoutes"
          component={require("@screen/Driver/MyRoutes").default}
        />
        <Stack.Screen
          name="DriverRoutes"
          component={require("@screen/Driver/MyAllRoute").default}
        />
        <Stack.Screen
          name="DriverNotification"
          component={require("@screen/Driver/Notification").default}
        />
        <Stack.Screen
          name="DriverBooking"
          component={require("@screen/Driver/Booking").default}
        />
        <Stack.Screen
          name="DriverSettlement"
          component={require("@screen/Driver/Settlement").default}
        />
        <Stack.Screen
          name="DriverPermissions"
          component={require("@screen/Driver/Permissions").default}
        />
        <Stack.Screen
          name="DriverMyTrips"
          component={require("@screen/Driver/MyTrips").default}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
