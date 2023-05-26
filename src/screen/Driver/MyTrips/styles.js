import { COLOR, FAMILY, SIZE } from "@theme/typography";

const React = require("react-native");
const { Platform } = React;

export default {
  myTripHeader: {
    backgroundColor: COLOR.PRIMARY,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  myTripHeaderTitle: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_20,
    color: COLOR.LIGHT,
    marginTop: 15,
    marginLeft: 15,
    paddingBottom: 5,
  },
  myTripHeaderText: {
    fontFamily: FAMILY.REGULAR,
    fontSize: SIZE.SIZE_12,
    color: COLOR.BLUE,
    marginLeft: 15,
  },
  /** Tab */
  myTripTabItems: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  tabActive: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.BLUE,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
    margin: 5,
  },
  tabInactive: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
    margin: 5,
  },
  tabActiveText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.LIGHT,
  },
  tabInactiveText: {
    fontFamily: FAMILY.REGULAR,
    fontSize: SIZE.SIZE_12,
    color: "rgba(255,255,255,0.5)",
  },

  /* -- Accordion -- */
  tripsAllLable: {
    backgroundColor: COLOR.LIGHT,
    borderRadius: 5,
  },
  accordionTab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLOR.LIGHT,
    borderRadius: 5,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  accordionTabText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: "#333",
  },

  /** Content */
  myTripContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  openBtnText: {
    fontFamily: FAMILY.BOLD,
    fontSize: 12,
    color: COLOR.LIGHT,
    alignSelf: "center",
    backgroundColor: COLOR.BLUE,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 3,
  },
  completedBtnText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.LIGHT,
    alignSelf: "center",
    backgroundColor: COLOR.GREEN,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 3,
  },
  bookingInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: COLOR.SMOKELIGHT,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  bookingTitle: {
    fontFamily: FAMILY.REGULAR,
    fontSize: SIZE.SIZE_12,
    color: COLOR.DARKBLUE,
  },
  bookingDetailInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  bookingDetail: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.DARK,
    borderColor: COLOR.GREY,
    borderRightWidth: 1,
    paddingRight: 5,
  },
  bookingText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.GREYVIOLET,
    borderColor: COLOR.GREY,
    paddingLeft: 5,
  },
  btnInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 15,
  },
  cancelBtn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "red",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginRight: 10,
  },
  cancelBtnText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.LIGHT,
    marginLeft: 5,
  },
  detailBtn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: COLOR.SMOKELIGHT,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginRight: 10,
  },
  detailBtnText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.GREYDARK,
    marginLeft: 5,
  },
  detailTag: {
    flex: 1,
  },
  balanceBtn: {
    flex: 1,
  },
  balanceBtnText: {
    backgroundColor: COLOR.GREEN,
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.LIGHT,
    textAlign: "center",
    backgroundColor: "rgba(249,64,65,1)",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  rateBtn: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.LIGHT,
    textAlign: "center",
    backgroundColor: COLOR.PRIMARY,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  /** * -- ModalLayout -- ***/
  modalRating: {
    width: "90%",
    height: 400,
    borderRadius: 10,
    zIndex: 2,
  },
  modalRatingContainer: {
    marginHorizontal: 15,
  },
  closeSortDesc: {
    alignItems: "flex-end",
    marginVertical: 10,
  },
  starImg: {
    width: 80,
    height: 80,
    alignSelf: "center",
  },
  modalRatingTitle: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_20,
    color: COLOR.DARKLIGHT,
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 5,
  },
  modalRatingText: {
    fontFamily: FAMILY.REGULAR,
    fontSize: SIZE.SIZE_12,
    color: COLOR.GREYVIOLET,
    alignSelf: "center",
    textAlign: "center",
    lineHeight: 20,
  },
  modalRatingInfo: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 20,
  },
  modalStarIcon: {
    fontSize: SIZE.SIZE_30,
    color: "rgba(255, 178, 41, 1)",
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  submitBtn: {
    backgroundColor: COLOR.GREEN,
    paddingVertical: 15,
    borderRadius: 5,
    marginVertical: 15,
  },
  submitBtnText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.LIGHT,
    textAlign: "center",
  },
  /** * -- Accordion -- ***/
  accordionContent: {
    backgroundColor: COLOR.LIGHT,
    borderRadius: 5,
    paddingVertical: 15,
    marginTop: 5,
  },
  accordion: {
    width: "100%",
    marginBottom: 5,
  },
  accordionBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLOR.LIGHT,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  accordionTitle: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.DARKBLUE,
  },
  accOrderInfo: {
    borderColor: COLOR.LIGHT,
    borderWidth: 1,
    borderTopWidth: 0,
    backgroundColor: COLOR.LIGHT,
    borderRadius: 5,
    paddingVertical: 15,
    marginBottom: 20,
  },
  accText: {
    fontFamily: FAMILY.REGULAR,
    fontSize: SIZE.SIZE_12,
    color: COLOR.PRIMARY,
    borderBottomWidth: 1,
    borderColor: COLOR.LIGHTVIOLET,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  accordionInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  accordionActiveText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.LIGHT,
    backgroundColor: "rgba(53,190,224,1)",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  accordionInactiveText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.LIGHT,
    backgroundColor: "rgba(92,186,71,1)",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  senderPic: {
    marginHorizontal: 10,
  },
  reciverPic: {
    marginHorizontal: 10,
  },
  wrapimg: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  profileImg: {
    width: 32,
    height: 32,
    borderRadius: 45,
  },

  sender: {
    minWidth: "1%",
    maxWidth: "80%",
    alignItems: "flex-end",
    backgroundColor: COLOR.GREY,
    marginTop: 5,
    paddingBottom: 5,
    marginLeft: "auto",
    paddingTop: 5,
    paddingRight: 10,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  chatText: {
    fontFamily: FAMILY.REGULAR,
    fontSize: SIZE.SIZE_12,
    color: COLOR.LIGHT,
  },

  reciver: {
    minWidth: "1%",
    maxWidth: "80%",
    marginTop: 5,
    paddingBottom: 5,
    borderRadius: 6,
    paddingTop: 5,
    paddingLeft: 7,
    marginRight: "auto",
    fontSize: SIZE.SIZE_12,
    backgroundColor: COLOR.BLUE,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  formInput3: {
    width: "90%",
    fontFamily: FAMILY.REGULAR,
    fontSize: SIZE.SIZE_12,
    color: COLOR.DARK,
    backgroundColor: COLOR.LIGHTVIOLET,
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  noTripsFoundContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  noTripsFoundText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
};
