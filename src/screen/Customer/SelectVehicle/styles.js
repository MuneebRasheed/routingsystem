import { COLOR, FAMILY, SIZE } from "@theme/typography";

const React = require("react-native");
const { Platform } = React;

export default {
  selectVehicleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  selectVehicleContent: {
    paddingVertical: 10,
  },
  formRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLOR.LIGHT,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  formInput2: {
    marginLeft: 15,
  },
  formInput: {
    flex: 1,
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.DARKBLUE,
    paddingVertical: 15,
  },
  formRow2: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLOR.LIGHT,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  /** * -- Accordion -- ***/
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
  /** * -- Vehicle Detail -- ***/
  switchInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  switchText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.SMOKEVIOLET,
    paddingLeft: 10,
  },
  selectVehicleDetail: {
    backgroundColor: COLOR.LIGHT,
    borderRadius: 5,
    paddingVertical: 20,
  },
  vehicleInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: COLOR.LIGHTVIOLET,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  costInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  vehicleTitle: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.DARK,
    borderBottomWidth: 1,
    borderColor: COLOR.SMOKELIGHT,
    paddingBottom: 10,
    paddingLeft: 20,
  },
  vehicleText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.DARKBLUE,
  },
  vehicleItemText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.GREYVIOLET,
  },
  bookingBtn: {
    backgroundColor: COLOR.GREEN,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  bookingBtnText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.LIGHT,
    textAlign: "center",
    paddingVertical: 15,
  },
  signUpImg: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginBottom: 10,
  },
};
