import React from "react";
import { ActivityIndicator } from "react-native";

const AppSpinner = ({ color = "white" }) => {
  return <ActivityIndicator size="small" color={color} />;
};

export default AppSpinner;
