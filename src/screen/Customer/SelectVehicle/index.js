import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView, Image,TouchableOpacity } from "react-native";
import { Container, Content, Text, Icon } from "@component/Basic";
import { TextInput, Button, ToggleSwitch } from "@component/Form";
import axios from "axios";
import styles from "./styles";
import theme from "@theme/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "@component/Header";
import Accordion from "./Accordion";
import Modal from "react-native-modalbox";
import DropDownPicker from "react-native-dropdown-picker";
import DocumentPicker from "react-native-document-picker";
import CalendarStrip from "react-native-calendar-strip";
import { useSelector } from "react-redux";

import { navigate } from "@navigation";
import { __ } from "@utility/translation";
import messaging from "@react-native-firebase/messaging";
import { DarkStatusBar } from "@component/StatusBar";
import { connect } from "react-redux";
import DatePicker from "react-native-date-picker";
import { showMessage } from "../../../helper/showAlert";
import ImagePicker from "react-native-image-crop-picker";
// import notifee, { AndroidImportance, EventType } from "@notifee/react-native";

function SelectVehicle(params) {
  // console.log(params.route.params);
  console.log("CURRENT PARAMS ===>", params.route.params);

  const from_location_cor = `${params.route.params.form.latitude}, ${params.route.params.form.longitude}`;

  const to_location_cor = `${params.route.params.to.latitude}, ${params.route.params.to.longitude}`;

  const [bids, setBids] = useState([]);
  const [imageForShow,setImageForShow]=useState([])
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openD, setOpenD] = useState(false);
  const [images, setImages] = useState();
  const [fare, setfare] = useState();
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [length, setLength] = useState();
  const [weight, setWeight] = useState();
  const [mainModel, setMainModel] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [opened, setOpened] = useState(false);
  const [bottomModal, setBottomModal] = useState(false);
  const [dateOneTimeSelect, setDateOneTimeSelect] = useState(false);
  const [items, setItems] = useState([
    { label: "Solid", value: "solid" },
    { label: "Metal", value: "metal" },
    { label: "Wood", value: "wood" },
    { label: "Fragile", value: "fragile" },
    { label: "Other Items", value: "otherItems" },
  ]);



  const [pracelTimeType, setPracelTimeType] = useState("");
  const [itemsType, setItemsType] = useState("solid");
  const { socket } = useSelector((state) => state.socket);

  const handleRejection = (bid) => {
    const filteredBids = bids.filter((b) => b._id !== bid._id);

    if (filteredBids.length === 0) {
      setMainModel(false);
    }

    setBids(filteredBids);
  };

  const ModalNotification = useRef();
  const getPhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      var format = {
        fileCopyUri: null,
        name: image.path.split("/")[image.path.split("/").length - 1],
        height: image?.height,
        width: image?.width,
        size: image?.size,
        type: image.mime,
        uri: image?.path,
      };
      setImageForShow(pre=>{
        return[...pre,format]
      })
      setImages(format);
      console.log(format);
    });
  };
  const UploadData = async () => {
    try {
      const res = await DocumentPicker.pick({
        allowMultiSelection:true,
        type: [DocumentPicker.types.allFiles]
      });
      console.log("Image frm galaery", res);
      setImages(res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  useEffect(() => {
    socket.on("bidding", (incomingBid) => {
      console.log("CURRENT BIDDING", incomingBid);
      const incomingBidId = incomingBid.bidder._id;

      const updatedBids =
        bids.length > 0
          ? bids.map((bid) =>
              bid.bidder._id === incomingBidId ? incomingBid : bid
            )
          : [incomingBid];

      setBids(updatedBids);
      if (!mainModel) {
        setMainModel(true);
      }
    });
  }, []);

  const MainModel = ({ value }) => {
    const acceptRide = async (value) => {
      try {
        var data = await AsyncStorage.getItem("response");
        var datas = JSON.parse(data);

        const formData = new FormData();
        formData.append("rider_id", value.bidder._id);
        formData.append("status", "in_progress");
        formData.append("pay_amount", value?.bid_amount);

        const requestOptions = {
          headers: {
            Authorization: `Bearer ${datas.access_token}`,
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        };
        const resp = await axios.patch(
          `https://routeon.mettlesol.com/v1/parcel/${value.parcel._id}`,
          requestOptions.body,
          {
            headers: {
              Authorization: `Bearer ${datas.access_token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setMainModel(false);
        setBids([]);
        alert("You have chosen ur driver. He is on his way!");
        console.log("RESPPPP==>", resp.data);
      } catch (err) {
        console.log("ERROR WHILE ACCEPTING THE RIDE!", err.message);
      }
    };

    return (
      <Modal
        ref={ModalNotification}
        isOpen={true}
        entry={"top"}
        swipeToClose={false}
        style={{
          height: 180,
          width: 380,
          borderRadius: 10,
          alignItems: "center",
        }}
        swipeArea={300}
        backdropPressToClose={false}
      >
        <View style={{ margin: 10, borderRadius: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "20%", marginTop: 20 }}>
              <Image
                source={
                  value?.bidder?.avatar
                    ? {
                        uri: value?.bidder?.avatar,
                      }
                    : require("@asset/images/driver.jpeg")
                }
                resizeMode="cover"
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  margin: 10,
                }}
              />
            </View>
            <View style={{ paddingTop: 20, width: "70%" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 5,
                  fontSize: 20,
                }}
              >
                <Text style={styles.biddingCardText}>
                  {value?.bidder?.first_name} {value?.bidder?.last_name}
                </Text>
                <Text style={styles.biddingCardText}>
                  Fare: {value?.bid_amount}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 5,
                  fontSize: 20,
                }}
              >
                <Text style={styles.biddingCardText}>
                  Ph: {value?.bidder?.phone}
                </Text>
                <Text style={styles.biddingCardText}>25</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 5,
                  fontSize: 20,
                }}
              >
                <Text style={styles.biddingCardText}>
                  Rating: {value?.bidder?.rating}
                </Text>
                <Text style={styles.biddingCardText}>#FFF</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              style={[styles.bookingDeclineBtn, { width: "40%" }]}
              onPress={() => {
                // navigate("CustomerPayment");
                handleRejection(value);
              }}
            >
              <Text style={styles.bookingBtnText}>{__("Decline")}</Text>
            </Button>
            <Button
              style={[styles.bookingBtn, { width: "40%" }]}
              onPress={() => {
                acceptRide(value);
                // navigate("CustomerPayment");
              }}
            >
              <Text style={styles.bookingBtnText}>{__("Accept")}</Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  };
  const getPhotoFromGallery = () => {
    // setBottomModal(true);
    if(imageForShow.length>=3){
      showMessage("error", "You can't uploaded more than three images");
    }else{
      getPhotoFromCamera();
    }
   
    // setImages({ "fileCopyUri": null, "name": "e3a0266f-a831-4a63-a18f-52e1c2ffaf92.jpg", "height": 400,"width": 300,"size": 71776, "type": "image/jpeg", "uri": "file:///storage/emulated/0/Android/data/com.wditechy.truckie/files/Pictures/e3a0266f-a831-4a63-a18f-52e1c2ffaf92.jpg"})
    // UploadData()
  };

  const fetchData = async () => {
    var data = await AsyncStorage.getItem("response");
    var datas = JSON.parse(data);

    const formData = new FormData();
  ( imageForShow[0]?.uri && formData.append("files", imageForShow[0]));
  ( imageForShow[1]?.uri && formData.append("files", imageForShow[1]));
  ( imageForShow[2]?.uri && formData.append("files", imageForShow[2]));
    formData.append(
      "from_location",
      JSON.stringify(params.route.params.form.locationName)
    );
    formData.append(
      "to_location",
      JSON.stringify(params.route.params.to.locationName)
    );
    formData.append(
      "from_location_cor",
      `${params.route.params.form.latitude}, ${params.route.params.form.longitude}`
    );
    formData.append(
      "to_location_cor",
      `${params.route.params.to.latitude}, ${params.route.params.to.longitude}`
    );
    formData.append("height", height);
    formData.append("fare", fare);
    formData.append("width", width);
    formData.append("time", JSON.stringify(date).substr(1,10));
    formData.append("length", length);
    formData.append("weight", weight);
    formData.append("parcel_type",itemsType);
    // formData.append("biddingStartTime", "2023-12-06");
    // formData.append("biddingEndTime", "2023-12-06");
    formData.append("parcel_bidding_type", pracelTimeType);

    console.log("FormData", formData);

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${datas.access_token}`,
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    };
    try {
      const res = await fetch(
        "https://routeon.mettlesol.com/v1/parcel",
        requestOptions
      );
      const result = await res.json();
      showMessage(
        "success",
        "Parcel Created Successfully!. Wait for drivers to bid"
      );
      // alert();
      console.log("RESULT", result);
    } catch (err) {
      showMessage("error", "Error in Created parcel");
      console.log("ERROR", err?.resonpse);
    }
  };



  const deleteShowImage=(value)=>{
    // console.log("press")
    setImageForShow(previous=>previous.filter(val=>val?.uri!=value?.uri))
    showMessage(
      "success",
      "Image Delete Successfully"
    );
  }

  return (
    <Container style={theme.layoutFx}>
      <Modal
        isOpen={mainModel}
        entry={"top"}
        backdropOpacity={0.3}
        swipeToClose={false}
      >
        {bids.map((val) => {
          return (
            <View style={{ height: "28%" }}>
              <MainModel value={val} />
            </View>
          );
        })}

        <Button
          style={[
            styles.bookingBtn,
            { backgroundColor: "grey", marginTop: 40 },
          ]}
          onPress={() => {
            // getPhotoFromGallery();
            // navigate("CustomerPayment");
            setMainModel(false);
          }}
        >
          <Text style={styles.bookingBtnText}>{__("Cancel")}</Text>
        </Button>
      </Modal>
      <DarkStatusBar />
      <Header leftType="back" title={"Booking"} />

      <Content contentContainerStyle={theme.layoutDf}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.selectVehicleContainer, { height: "80%" }]}>
            <View style={styles.selectVehicleContent}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Book Your Parcel</Text>
              </View>
              <Accordion
                setOpened={setOpened}
                opened={opened}
                title= {dateOneTimeSelect?JSON.stringify(date).substr(1,10):"Select Time"}
                renderContent={() => (
                  <View style={styles.accOrderInfo}>
                    <Button onPress={() => {setOpened(false)
                    setDate(new Date())
                    setPracelTimeType("now")
                    setDateOneTimeSelect(true)
                    }}>
                      <Text style={styles.accText}>{__("Now")}</Text>
                    </Button>
                    <Button onPress={() => {setOpenD(true)
                 
                     setDateOneTimeSelect(true)
                    }}>
                      <Text
                        style={styles.accText}
                        onPress={() => setOpen(true)}
                      >
                        {__("Range")}
                      </Text>
                    </Button>
                    {/* <Button onPress={() => setOpen(true)}>
                      <Text style={styles.accText}>{__("Time")}</Text>
                    </Button> */}
                  </View>
                )}
              />

              {open && (
                <DatePicker
                  modal
                  mode="datetime"
                  open={open}
                  date={date}
                  onConfirm={(date) => {
                    setOpen(false);
                    setDate(date);
                    setOpened(false);
                    setPracelTimeType("range")
                    console.log(JSON.stringify(date));
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
              )}

              {/* {openD && (
                <DatePicker
                  modal
                  mode="time"
                  open={openD}
                  date={date}
                  onConfirm={(date) => {
                    setOpenD(false);
                    setDate(date);
                    setOpened(false);
                    console.log(JSON.stringify(date), opened);
                  }}
                  onCancel={() => {
                    setOpenD(false);
                  }}
                />
              )} */}

              <View style={styles.formRow}>
                <TextInput
                  placeholder="Enter The Fare"
                  value={fare}
                  placeholderTextColor="rgba(89, 73, 158, 0.5)"
                  onChangeText={(text) => {
                    setfare(text);
                  }}
                  keyboardType="numeric"
                  style={styles.formInput}
                />
              </View>
              <View style={styles.formRow}>
                <TextInput
                  type="number"
                  placeholder="Height"
                  placeholderTextColor="rgba(89, 73, 158, 0.5)"
                  style={styles.formInput}
                  value={height}
                  onChangeText={(text) => {
                    setHeight(text);
                  }}
                  keyboardType="numeric"
                  maxValue={100}
                />
                {/* "rgba(0,0,0,0.7)" */}
                <TextInput
                  placeholder="Width"
                  placeholderTextColor="rgba(89, 73, 158, 0.5)"
                  keyboardType="numeric"
                  value={width}
                  onChangeText={(text) => {
                    setWidth(text);
                  }}
                  style={[styles.formInput, styles.formInput2]}
                />
              </View>
              <View style={styles.formRow}>
                <TextInput
                  type="number"
                  placeholder="Length"
                  placeholderTextColor="rgba(89, 73, 158, 0.5)"
                  style={styles.formInput}
                  value={length}
                  onChangeText={(text) => {
                    setLength(text);
                  }}
                  keyboardType="numeric"
                  maxValue={100}
                />
                <TextInput
                  placeholder="Weight"
                  placeholderTextColor="rgba(89, 73, 158, 0.5)"
                  keyboardType="numeric"
                  value={weight}
                  onChangeText={(text) => {
                    setWeight(text);
                  }}
                  style={[styles.formInput, styles.formInput2]}
                />
              </View>
              <View style={styles.accordion}>
                <Button
                  style={styles.uploadBtn}
                  onPress={() => {
                    getPhotoFromGallery();
                    // navigate("CustomerPayment");
                  }}
                >
                  <Text style={styles.uploadBtnText}>
                    {__("UPLOAD THE PHOTOS")}
                  </Text>
                  <Icon
                    name="upload"
                    type="AntDesign"
                    style={[theme.SIZE_24, theme.DARKBLUE]}
                  />
                </Button>
                
              </View>
             { imageForShow.length >0 && 
             
             <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',maxWidth:'70%'}}>

         
             {imageForShow.map(val=>{

              return(
                <TouchableOpacity onPress={()=>{
                  deleteShowImage(val);
                  console.log("image is press")
                  }}>
                <Image
                source={{
                  uri: val?.uri ||"https://cdn.pixabay.com/photo/2016/01/10/22/07/beauty-1132617__340.jpg",
                  // uri: values,
                  // uri: "file:///storage/emulated/0/Android/data/com.wditechy.truckie/files/Pictures/fb3506d2-0efc-49f7-9dfc-dc6f5897d544.jpg" ,
                }}
                // source={require(values)}
                style={{width:75,height:75,borderRadius:35}}
                
              />
              </TouchableOpacity>
              )
             })}
                 </View>
             
             }
              <View style={{ height: 270 }}>
                <DropDownPicker
                  open={openModel}
                  items={items}
                  setOpen={setOpenModel}
                  value={itemsType}
                  onSelectItem={(e) => setItemsType(e.value)}
                  // setValue={handleChange("gender")}
                  setItems={setItems}
                  style={{
                    paddingVertical: 19,
                    marginTop: 10,
                    marginBottom: 5,
                    borderWidth: 0,
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </Content>
      <Button
        style={styles.bookingBtn}
        onPress={() => {
          fetchData();
          // setMainModel(true);
        }}
      >
        <Text style={styles.bookingBtnText}>{__("BOOK NOW")}</Text>
      </Button>

      <Modal
        isOpen={bottomModal}
        entry={"bottom"}
        backdropOpacity={0.3}
        swipeToClose={false}
        position="bottom"
        style={{
          height: 200,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <Button
          style={[styles.bookingBtn, { backgroundColor: "purple" }]}
          onPress={() => {
            getPhotoFromCamera();
            setBottomModal(false);
          }}
        >
          <Text style={styles.bookingBtnText}>{__("OPEN CAMERA")}</Text>
        </Button>
        <Button
          style={styles.bookingBtn}
          onPress={() => {
            UploadData();
            setBottomModal(false);
          }}
        >
          <Text style={styles.bookingBtnText}>{__("SELECT FROM FILES")}</Text>
        </Button>
        <Button
          style={[styles.bookingBtn, { backgroundColor: "red" }]}
          onPress={() => {
            setBottomModal(false);
          }}
        >
          <Text style={styles.bookingBtnText}>{__("CANCLE")}</Text>
        </Button>
      </Modal>
    </Container>
  );
}
export default connect(({ session }) => ({ session }))(SelectVehicle);
