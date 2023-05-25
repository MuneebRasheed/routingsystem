import { COLOR, FAMILY, SIZE } from "@theme/typography";

const React = require("react-native");
const { Platform } = React;

export default {
  myTripHeader: {
    backgroundColor: COLOR.PRIMARY,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  balanceBtnText1: {
  
    backgroundColor: COLOR.GREEN,
    
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  tabActive: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.BLUE,
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 12,
    margin: 5,
  },
  tabInactive: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 12 ,
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
    paddingHorizontal: 15,
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
  detailBtn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: COLOR.SMOKELIGHT,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginRight: 15,
  },
  detailBtnText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.GREYDARK,
    marginLeft: 5,
  },
  detailTag: {
    flex: 3,
  },
  balanceBtn: {
    flex: 4,
  },
  balanceBtnText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.LIGHT,
    textAlign: "center",
    backgroundColor: "rgba(249,64,65,1)",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
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
  sender: {
    alignItems: "flex-end",
    backgroundColor: COLOR.GREY,

    marginTop: 5,
    paddingBottom: 5,
    paddingTop: 5,
    paddingRight: 7,
    marginLeft: 70,
    fontSize: SIZE.SIZE_12,
    borderRadius: 6,
  },
  reciver: {
    backgroundColor: COLOR.GREYVIOLET,
    marginTop: 5,
    paddingBottom: 5,
    borderRadius: 6,
    paddingTop: 5,
    paddingLeft: 7,
    marginRight: 70,
    fontSize: SIZE.SIZE_12,
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
};
