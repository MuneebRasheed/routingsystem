import React, { useState } from "react";
import { FlatList, View } from "react-native";

import Item from "./Item";
import Placeholder from "./Placeholder";
import { __ } from "@utility/translation";
import data from "../data/notifications";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function Notification() {
  const [notification, setNotification] = useState([]);
  useEffect(() => {
    getNotification();
  }, []);

  async function getNotification() {
    var data = await AsyncStorage.getItem("response");
    var datas = JSON.parse(data);
    console.log("NotifcationId", datas?._id);
    const res = axios
      .get(
        `  https://routeon.mettlesol.com/v1/notifications?user=${datas?._id}
        `,
        {
          headers: {
            Authorization: `Bearer ${datas.access_token}`,
          },
        }
      )
      .then((data) => {
        console.log("get notification driver", data?.data?.docs);
        setNotification(data?.data?.docs);
      })
      .catch((err) => {
        console.log(("error", err));
      });
  }

  const renderTemplate = () => {
    return <Placeholder />;
  };

  const renderItem = (val) => {
    return (
      <Item
        language={"this.props.language"}
        // item={item}
        value={val}
      />
    );
  };

  return (
    <>
      <FlatList
        data={notification}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
      />
    </>
  );
}
