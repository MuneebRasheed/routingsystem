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

import styles from "./styles";
import theme from "@theme/styles";
import axios from "axios";

const ChatsModal = ({ isOpen, setIsOpen, selectedUserId }) => {

  const currentLoggedInUser = "64391ae4b2594bc183f86d47";
  const [text, setText] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const { socket } = useSelector((state) => state.socket);
  const listRef = useRef(null);

  const UserId="643902fab2594bc183f86d46"

  const Token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBSRUFMIERSSVZFUiIsImVtYWlsIjoiam9objIzMTIzMTIxMUBnbWFpbC5jb20iLCJwaG9uZSI6IjAzMzU0MzUyMDAyIiwiX2lkIjoiNjQzOTFhZTRiMjU5NGJjMTgzZjg2ZDQ3IiwiYXZhdGFyIjoiXHRodHRwczovL3N0YXRpYy52ZWN0ZWV6eS5jb20vc3lzdGVtL3Jlc291cmNlcy9wcmV2aeKApi80ODcvOTE3L29yaWdpbmFsL21hbi1hdmF0YXItaWNvbi1mcmVlLXZlY3Rvci5qcGciLCJzb2NrZXRJZCI6IiIsInJvbGUiOlsicmlkZXIiXSwiaWF0IjoxNjgxODkwMTg1LCJleHAiOjE2ODE5NzY1ODV9.-Nbow0WRyFWvayhDi1kHqYDorf5iqh1esHsrcvrYGzc"
  const getConversationId = async (selectedUserId) => {
    console.log("SELECTED", selectedUserId);

    try {
      const responseOne = await axios.get(
        `https://testing.explorelogix.com/v1/chat/conversation?member=`+UserId,
        {
          headers: {
            authorization:
              "Bearer "+Token,
          },
        }
      );

      console.log('resp',responseOne.data);

      if (responseOne.status === 200) {
        console.log("CONVERSTION RESP =>", responseOne.data);
        setConversationId(responseOne?.data?._id);

        const responseTwo = await getChatsOfConversation(responseOne.data._id);
        console.log("CHATS RESP =>", responseTwo.data);
        setMessages(responseTwo?.data?.docs || []);
      }
    } catch (err) {
      console.log("ERROR IN GET CONVERSATION ID", err.response.data);
    }
  };

  const getChatsOfConversation = async (convoId) => {
    console.log("COVERSATION ID:", convoId);
    try {
      const response = await axios.get(
        `https://testing.explorelogix.com/v1/chat?conversationId=${convoId}&page=1&limit=200&sort=createdAt-1`,
        {
          headers: {
            authorization:
              "Bearer "+Token,
          },
        }
      );

      return response;
    } catch (err) {
      console.log("ERROR FETCHING CHATS OF CONVERSATION ID", err.response.data);
    }
  };

  const sendMessage = async () => {
    let sendMsg = {
      to: UserId,
      message: text,
    };

    if (messages?.length !== 0) {
      sendMsg.conversationId = conversationId;
    }

    if (text.length > 0) {
      if (messages.length > 0 && !conversationId) {
        console.log("IN NESTED IF====>");
        const convoResp = await axios.get(
          `https://testing.explorelogix.com/v1/chat/conversation?member=${selectedUserId}`,
          {
            headers: {
              authorization:
                "Bearer "+Token,
            },
          }
        );

        sendMsg.conversationId = convoResp.data._id;
        setConversationId(convoResp.data._id);

        socket.emit("send_message", sendMsg);
        sendMsg._id = Math.random();
        sendMsg.sender = currentLoggedInUser;
        setMessages((prevMessages) => [...prevMessages, sendMsg]);
        setText("");
      } else {
        socket.emit("send_message", sendMsg);
        sendMsg._id = Math.random();
        sendMsg.sender = currentLoggedInUser;
        setMessages((prevMessages) => [...prevMessages, sendMsg]);
        setText("");
      }
    }
  };

  useEffect(() => {
    console.log("REQUEST INTIATE==> IN FIRST");
    getConversationId(UserId);

    socket.on("receive_message", (incomingMsg) => {
      console.log("NEW MESS", incomingMsg);
      setMessages((prevMessages) => [...prevMessages, incomingMsg]);
    });
  }, []);

  console.log("CURRENT MESSAGES", messages?.length);
  return (
    <Modal
      position={"center"}
      isOpen={Boolean(isOpen)}
      onClosed={() => setIsOpen(false)}
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
                  item?.sender?.toString() === currentLoggedInUser.toString()
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

export default ChatsModal;
