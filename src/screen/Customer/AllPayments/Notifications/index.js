import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

import Item from "./Item";
import Placeholder from "./Placeholder";
import { __ } from "@utility/translation";
// import data from '../data/notifications'
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "../../../../helper/showAlert";
import { useSelector } from "react-redux";

export default function Notification() {
  const [data, setdata] = useState([]);
  const { user } = useSelector((state) => state.session);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    var data = await AsyncStorage.getItem("response");
    var datas = JSON.parse(data);
    console.log(datas);

    const res = axios
      .get(`https://routeon.mettlesol.com/v1/payment?user=${datas._id}`, {
        headers: {
          Authorization: `Bearer ${datas.access_token}`,
        },
      })
      .then((data) => {
        console.log("res", data.data);
        setdata(data.data);
      })
      .catch((err) => {
        console.log(("error", err));
      });
  };

  const renderTemplate = () => {
    return <Placeholder />;
  };

  const renderItem = (val) => {
    return (
      <Item
        value={val.item}
        deletePaymentRecordById={deletePaymentRecordById}
      />
    );
  };

  const deletePaymentRecordById = async (paymentId) => {
    try {
      const res = await axios.delete(
        `https://routeon.mettlesol.com/v1/payment/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );

      if (res.status === 200) {
        showMessage("success", "Payment method removed successfully");
        const filteredPayments = data.filter((d) => d._id !== paymentId);
        setdata(filteredPayments);
      }
      console.log("MY RESPONSE", res.status);
    } catch (err) {
      showMessage("error", "Something went wrong!");
    }
  };
  return (
    <>
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
      />
    </>
  );
}
