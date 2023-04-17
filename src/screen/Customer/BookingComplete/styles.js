import { COLOR, FAMILY, SIZE } from "@theme/typography";

const React = require("react-native");
const { Platform } = React;

export default {
  bookingHeader: {
    backgroundColor: COLOR.PRIMARY,
    paddingHorizontal: 15,
    paddingBottom: 40,
  },
  bookingHeaderTitle: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_20,
    color: COLOR.LIGHT,
    marginTop: 15,
    marginLeft: 15,
    paddingBottom: 5,
  },
  bookingHeaderText: {
    fontFamily: FAMILY.REGULAR,
    fontSize: SIZE.SIZE_12,
    color: COLOR.BLUE,
    marginLeft: 15,
  },
  bookingContainer: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  bookingContent: {
    backgroundColor: COLOR.LIGHT,
    borderRadius: 5,
    marginVertical: 10,
  },
  bookingDetail: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  bookingIdText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.DARK,
    marginBottom: 3,
  },
  completeBtn: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.LIGHT,
    backgroundColor: COLOR.GREEN,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  bookingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: COLOR.GREYLIGHT,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  bookingTitle: {
    fontFamily: FAMILY.REGULAR,
    fontSize: SIZE.SIZE_11,
    color: COLOR.DARKBLUE,
  },
  bookingTextDark: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_11,
    color: COLOR.GREYVIOLET,
  },
  bookingText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.GREYVIOLET,
    paddingLeft: 5,
  },
  documentInfo: {
    backgroundColor: COLOR.LIGHT,
    borderRadius: 5,
    marginVertical: 15,
  },
  documentText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.DARK,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  checkoutText: {
    fontFamily: FAMILY.REGULAR,
    fontSize: SIZE.SIZE_12,
    color: COLOR.SMOKEVIOLET,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  driverDetail: {
    backgroundColor: COLOR.LIGHT,
    borderRadius: 5,
    marginBottom: 20,
  },
  driverInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  driverText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.DARK,
    paddingLeft: 15,
  },
  driverTextInfo: {
    fontFamily: FAMILY.REGULAR,
    fontSize: SIZE.SIZE_12,
    color: COLOR.SMOKEVIOLET,
    marginBottom: 20,
    paddingLeft: 15,
  },
  driverImg: {
    width: 64,
    height: 64,
    borderRadius: 5,
    marginRight: 15,
    marginTop: 10,
  },
  mailBtnInfo: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  mailBtn: {
    flex: 5,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: COLOR.GREEN,
    borderRadius: 5,
    paddingLeft: 15,
  },
  mailInvoiceBtn: {
    flex: 2,
    paddingVertical: 15,
    borderRadius: 5,
    marginLeft: 10,
    paddingLeft: 15,
    backgroundColor: COLOR.BLUE,
  },
  tripText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.LIGHT,
  },
  ratingInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  ratingIconSelected: {
    fontSize: SIZE.SIZE_20,
    color: "rgb(234, 201, 78)",
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  ratingIcon: {
    fontSize: SIZE.SIZE_20,
    color: COLOR.SMOKEDARK,
    paddingHorizontal: 2,
    dingVertical: 2,
  },
  modalRating: {
    width: "90%",
    height: 300,
    borderRadius: 10,
  },
  modalRatingContainer: {
    marginHorizontal: 15,
    position: "relative",
    height: 200,
  },
  closeSortDesc: {
    alignItems: "flex-end",
    marginVertical: 10,
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
  accOrderInfo: {
    borderColor: COLOR.LIGHT,
    borderWidth: 1,
    borderTopWidth: 0,
    backgroundColor: COLOR.LIGHT,
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  accText: {
    fontFamily: FAMILY.REGULAR,
    fontSize: SIZE.SIZE_12,
    color: COLOR.PRIMARY,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: COLOR.LIGHTVIOLET,
  },
  accordionBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLOR.LIGHT,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 10,
  },
  accordionTitle: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.DARKBLUE,
  },
  accordion: {
    width: "100%",
    marginBottom: 5,
  },
};
