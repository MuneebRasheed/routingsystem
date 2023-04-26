import React ,{useEffect,useState}from 'react'
import { FlatList, View } from 'react-native'

import Item from './Item'
import Placeholder from './Placeholder'
import { __ } from '@utility/translation'
// import data from '../data/notifications'
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Notification(){

const [data,setdata]= useState([])
  useEffect(()=>{
    fetchData()
  },[])
 
  const fetchData = async () => {
    var data = await AsyncStorage.getItem("response");
    var datas = JSON.parse(data);
    console.log(datas);
  
    const res = axios
      .get(
        `   https://testing.explorelogix.com/v1/payment?user=${datas._id}`,
        {
          headers: {
            Authorization: `Bearer ${datas.access_token}`,
          },
        }
      )
      .then((data) => {
        console.log("res", data.data);
        setdata(data.data)
       
        
      })
      .catch((err) => {
        console.log(("error", err));
      });
  };

  const renderTemplate= ()=> {
    return <Placeholder />
  }

 const  renderItem =(val) =>{
  console.log("val",val.item)
    return (
      <Item value={val.item}
        
      />
    )
  }


    return (
      <>
        <FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
        />
      </>

    )
  }

