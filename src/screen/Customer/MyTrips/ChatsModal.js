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
  const currentLoggedInUser = "643902fab2594bc183f86d46";
  const [text, setText] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const { socket } = useSelector((state) => state.socket);
  const listRef = useRef(null);

  const getConversationId = async (selectedUserId) => {
    console.log("SELECTED", selectedUserId);
    try {
      const responseOne = await axios.get(
        `https://testing.explorelogix.com/v1/chat/conversation?member=${selectedUserId}`,
        {
          headers: {
            authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEcml2ZXIiLCJlbWFpbCI6ImpvaG4yMzEyMzEyQGdtYWlsLmNvbSIsInBob25lIjoiMDMzNTQzNTIwMDEiLCJfaWQiOiI2NDM5MDJmYWIyNTk0YmMxODNmODZkNDYiLCJhdmF0YXIiOiJcdGh0dHBzOi8vc3RhdGljLnZlY3RlZXp5LmNvbS9zeXN0ZW0vcmVzb3VyY2VzL3ByZXZp4oCmLzQ4Ny85MTcvb3JpZ2luYWwvbWFuLWF2YXRhci1pY29uLWZyZWUtdmVjdG9yLmpwZyIsInNvY2tldElkIjoiIiwicm9sZSI6WyJ1c2VyIl0sImlhdCI6MTY4MTc5OTQ3OCwiZXhwIjoxNjgxODg1ODc4fQ.fjjuBUD28Ew7A17pd214MbnHzKu3P9HGmcNstf2aTr0",
          },
        }
      );

      if (responseOne.status === 200) {
        console.log("CONVERSTION RESP =>", responseOne.data);
        setConversationId(responseOne?.data?._id);

        const responseTwo = await getChatsOfConversation(responseOne.data._id);
        console.log("CHATS RESP =>", responseTwo.data);
        setMessages(responseTwo?.data?.docs || []);
      }
    } catch (err) {
      console.log("ERROR IN GET CONVERSATION ID", err.message);
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
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEcml2ZXIiLCJlbWFpbCI6ImpvaG4yMzEyMzEyQGdtYWlsLmNvbSIsInBob25lIjoiMDMzNTQzNTIwMDEiLCJfaWQiOiI2NDM5MDJmYWIyNTk0YmMxODNmODZkNDYiLCJhdmF0YXIiOiJcdGh0dHBzOi8vc3RhdGljLnZlY3RlZXp5LmNvbS9zeXN0ZW0vcmVzb3VyY2VzL3ByZXZp4oCmLzQ4Ny85MTcvb3JpZ2luYWwvbWFuLWF2YXRhci1pY29uLWZyZWUtdmVjdG9yLmpwZyIsInNvY2tldElkIjoiIiwicm9sZSI6WyJ1c2VyIl0sImlhdCI6MTY4MTc5OTQ3OCwiZXhwIjoxNjgxODg1ODc4fQ.fjjuBUD28Ew7A17pd214MbnHzKu3P9HGmcNstf2aTr0",
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
      to: selectedUserId,
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
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEcml2ZXIiLCJlbWFpbCI6ImpvaG4yMzEyMzEyQGdtYWlsLmNvbSIsInBob25lIjoiMDMzNTQzNTIwMDEiLCJfaWQiOiI2NDM5MDJmYWIyNTk0YmMxODNmODZkNDYiLCJhdmF0YXIiOiJcdGh0dHBzOi8vc3RhdGljLnZlY3RlZXp5LmNvbS9zeXN0ZW0vcmVzb3VyY2VzL3ByZXZp4oCmLzQ4Ny85MTcvb3JpZ2luYWwvbWFuLWF2YXRhci1pY29uLWZyZWUtdmVjdG9yLmpwZyIsInNvY2tldElkIjoiIiwicm9sZSI6WyJ1c2VyIl0sImlhdCI6MTY4MTc5OTQ3OCwiZXhwIjoxNjgxODg1ODc4fQ.fjjuBUD28Ew7A17pd214MbnHzKu3P9HGmcNstf2aTr0",
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
    if (selectedUserId) {
      console.log("REQUEST INTIATE==> IN FIRST");
      getConversationId(selectedUserId);
    }

    socket.on("receive_message", (incomingMsg) => {
      console.log("NEW MESS", incomingMsg);
      setMessages((prevMessages) => [...prevMessages, incomingMsg]);
    });
  }, [selectedUserId]);

  // useEffect(() => {
  //   if (messages.length === 1 && isNewConversation) {
  //     console.log("REQ GONE");
  //     const getId = async () => {
  //       try {
  //         const resp = await axios.get(
  //           `https://testing.explorelogix.com/v1/chat/conversation?member=${selectedUserId}`,
  //           {
  //             headers: {
  //               authorization:
  //                 "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEcml2ZXIiLCJlbWFpbCI6ImpvaG4yMzEyMzEyQGdtYWlsLmNvbSIsInBob25lIjoiMDMzNTQzNTIwMDEiLCJfaWQiOiI2NDM5MDJmYWIyNTk0YmMxODNmODZkNDYiLCJhdmF0YXIiOiJcdGh0dHBzOi8vc3RhdGljLnZlY3RlZXp5LmNvbS9zeXN0ZW0vcmVzb3VyY2VzL3ByZXZp4oCmLzQ4Ny85MTcvb3JpZ2luYWwvbWFuLWF2YXRhci1pY29uLWZyZWUtdmVjdG9yLmpwZyIsInNvY2tldElkIjoiIiwicm9sZSI6WyJ1c2VyIl0sImlhdCI6MTY4MTU0NDg1MywiZXhwIjoxNjgxNjMxMjUzfQ.G6P-MC_dicjCyuMaxQLMsTy9HTpFzX9H88r7pFwxNho",
  //             },
  //           }
  //         );
  //         console.log("ACTUAL RESP", resp);
  //         if (resp.status === 200) {
  //           console.log("CONVERSTION RESP INTIAL =>", resp.data);
  //           setConversationId(resp?.data?._id);
  //         }
  //       } catch (err) {
  //         console.log("ERR AGAIN", err.message, err.response);
  //       }
  //     };

  //     getId();
  //   }
  // }, [messages.length]);

  console.log("CURRENT MESSAGES", messages?.length);
  return (
    <Modal
      position={"center"}
      isOpen={Boolean(isOpen) && Boolean(selectedUserId)}
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
