import React, { useEffect, useState, useRef } from "react";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Text, Icon } from "@component/Basic";
import { Button, TextInput } from "@component/Form";
import Modal from "react-native-modalbox";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import styles from "./styles";
import theme from "@theme/styles";

const RiderChatsModal = ({ setSelectedParcel, selectedParcel }) => {
  const [currentLoggedInUserDetails, setCurrentLoggedInUserDetails] =
    useState(null);
  const [text, setText] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const { socket } = useSelector((state) => state.socket);
  const listRef = useRef(null);

  const getConversationId = async (userInfo) => {
    console.log("UUUUU =>", selectedParcel);
    const selectedMemberId =
      userInfo._id.toString() === selectedParcel.customer_id.toString()
        ? selectedParcel.rider_id
        : selectedParcel.customer_id;

    try {
      const responseOne = await axios.get(
        `https://5624-2400-adc5-425-a000-38cd-4f9a-ccdb-4dbf.ngrok-free.app/v1/chat/conversation?member=${selectedMemberId}`,
        {
          headers: {
            authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );

      console.log("resp", responseOne.data);

      if (responseOne.status === 200) {
        console.log("CONVERSTION RESP =>", responseOne.data);
        setConversationId(responseOne?.data?._id);
        const responseTwo = await getChatsOfConversation(
          responseOne.data._id,
          userInfo
        );
        console.log("CHATS RESP =>", responseTwo.data);
        setMessages(responseTwo?.data?.docs || []);
      }
    } catch (err) {
      console.log("ERROR IN GET CONVERSATION ID", err.response.data);
    }
  };

  const getChatsOfConversation = async (convoId, userInfo) => {
    console.log("COVERSATION ID:", convoId);
    try {
      const response = await axios.get(
        `https://5624-2400-adc5-425-a000-38cd-4f9a-ccdb-4dbf.ngrok-free.app/v1/chat?conversationId=${convoId}&page=1&limit=200&sort=createdAt-1`,
        {
          headers: {
            authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );

      return response;
    } catch (err) {
      console.log("ERROR FETCHING CHATS OF CONVERSATION ID", err.response.data);
    }
  };

  const sendMessage = async () => {
    const selectedMemberId =
      currentLoggedInUserDetails._id.toString() ===
      selectedParcel.customer_id.toString()
        ? selectedParcel.rider_id
        : selectedParcel.customer_id;

    let sendMsg = {
      to: selectedMemberId,
      message: text,
    };

    if (messages?.length !== 0) {
      sendMsg.conversationId = conversationId;
    }

    if (text.length > 0) {
      if (messages.length > 0 && !conversationId) {
        console.log("IN NESTED IF====>");
        const convoResp = await axios.get(
          `https://5624-2400-adc5-425-a000-38cd-4f9a-ccdb-4dbf.ngrok-free.app/v1/chat/conversation?member=${selectedMemberId}`,
          {
            headers: {
              authorization: `Bearer ${currentLoggedInUserDetails?.token}`,
            },
          }
        );

        sendMsg.conversationId = convoResp.data._id;
        setConversationId(convoResp.data._id);

        socket.emit("send_message", sendMsg);
        sendMsg._id = Math.random();
        sendMsg.sender = currentLoggedInUserDetails?._id;
        setMessages((prevMessages) => [...prevMessages, sendMsg]);
        setText("");
      } else {
        socket.emit("send_message", sendMsg);
        sendMsg._id = Math.random();
        sendMsg.sender = currentLoggedInUserDetails?._id;
        setMessages((prevMessages) => [...prevMessages, sendMsg]);
        setText("");
      }
    }
  };

  const getCurrentLoggedInUserDetails = async () => {
    try {
      let data = await AsyncStorage.getItem("response");
      let datas = JSON.parse(data);

      console.log("CURRENT OFF DATA===>", datas);

      const userDetails = {
        _id: datas._id,
        token: datas.access_token,
      };

      setCurrentLoggedInUserDetails(userDetails);
      return userDetails;
    } catch (err) {
      return false;
    }
  };

  const intializeChatFunctionality = async () => {
    try {
      const isUserDetailsFetchedFromAsyncStorage =
        await getCurrentLoggedInUserDetails();

      console.log("MY RESULT===>", isUserDetailsFetchedFromAsyncStorage);
      if (isUserDetailsFetchedFromAsyncStorage) {
        getConversationId(isUserDetailsFetchedFromAsyncStorage);
      }
    } catch (err) {
      console.log("ERROR IN INTIALIZING CHAT FUNCTIONALITY", err.message);
    }
  };

  useEffect(() => {
    intializeChatFunctionality();
    // getCurrentLoggedInUserDetails();
    // console.log("REQUEST INTIATE==> IN FIRST UNCOMMENT BELOW API");
    // getConversationId("64391ae4b2594bc183f86d47");

    socket.on("receive_message", (incomingMsg) => {
      console.log("NEW MESS", incomingMsg);
      setMessages((prevMessages) => [...prevMessages, incomingMsg]);
    });
  }, []);

  console.log("CURRENT MESSAGES", messages?.length);
  return (
    <Modal
      position={"center"}
      isOpen={Boolean(selectedParcel)}
      onClosed={() => setSelectedParcel(null)}
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
          {messages && messages.length > 0 ? (
            <FlatList
              data={messages}
              keyExtractor={(message) => message._id.toString()}
              renderItem={({ item, index, seperators }) => {
                if (
                  item?.sender?.toString() ===
                  currentLoggedInUserDetails?._id?.toString()
                ) {
                  return (
                    <View style={styles.wrapimg}>
                      <View style={styles.reciverPic}>
                        <Image
                          source={{
                            uri: "https://cdn.pixabay.com/photo/2016/01/10/22/07/beauty-1132617__340.jpg",
                          }}
                          style={styles.profileImg}
                        />
                      </View>
                      <View style={styles.reciver}>
                        <Text style={styles.chatText}>{item.message}</Text>
                      </View>
                    </View>
                  );
                } else {
                  return (
                    <View style={styles.wrapimg}>
                      <View style={styles.sender}>
                        <Text style={styles.chatText}>{item.message}</Text>
                      </View>
                      <View style={styles.senderPic}>
                        <Image
                          source={{
                            uri: "https://cdn.pixabay.com/photo/2016/01/10/22/07/beauty-1132617__340.jpg",
                          }}
                          style={styles.profileImg}
                        />
                      </View>
                    </View>
                  );
                }
              }}
              ref={listRef}
              onLayout={() => listRef?.current.scrollToEnd({ animated: true })}
              onContentSizeChange={() => {
                if (messages.length) {
                  listRef?.current?.scrollToEnd({ animated: true });
                }
              }}
            />
          ) : (
            <Text>No Messages Found</Text>
          )}
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
            defaultValue={text}
            onChangeText={(e) => setText(e)}
          />
          <TouchableOpacity onPress={sendMessage}>
            <Icon
              name="send"
              type="FontAwesome"
              style={[theme.SIZE_30, theme.DARKVIOLET]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default RiderChatsModal;
