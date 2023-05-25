import { COLOR, FAMILY, SIZE } from "@theme/typography";

const React = require("react-native");
const { Platform } = React;

export default {
  signUpBgImg: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1,
  },
  signUpBgCover: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 2,
    backgroundColor: COLOR.DARKVIOLET,
  },
  signUpBgContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 3,
  },
  /** -- Content --**/
  signUpForm: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 18,
  },
  signUpImg: {
    width: 50,
    height: 50,
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 15,
  },
  formInput4: {
    width: "100%",
    fontFamily: FAMILY.REGULAR,
    fontSize: SIZE.SIZE_12,
    color: COLOR.DARK,
    backgroundColor: COLOR.LIGHT,
    borderRadius: 3,
  },
  signUpTitle: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_20,
    color: COLOR.LIGHT,
    textAlign: "center",
  },
  signUpText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.LIGHT,
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 50,
  },
  formRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formInput: {
    fontFamily: FAMILY.REGULAR,
    fontSize: SIZE.SIZE_12,
    color: COLOR.DARK,
    backgroundColor: COLOR.LIGHT,
    borderRadius: 3,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 15,
  },
  formInput3: {
    width: "100%",
    fontFamily: FAMILY.REGULAR,
    fontSize: SIZE.SIZE_12,
    color: COLOR.DARK,
    backgroundColor: COLOR.LIGHT,
    borderRadius: 3,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 15,
  },
  formInput2: {
    marginLeft: 15,
  },
  signUpBtn: {
    backgroundColor: COLOR.GREEN,
    borderRadius: 5,
    paddingVertical: 15,
  },
  signUpBtnText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.LIGHT,
    alignSelf: "center",
  },
  signUpContent: {
    marginVertical: 10,
  },
  connectText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.LIGHT,
    alignSelf: "center",
    letterSpacing: 0.5,
    // paddingBottom: 10,
  },
  connectText11: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.LIGHT,
    alignSelf: "center",
    letterSpacing: 0.5,
  },
  connectTextLink: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.LIGHT,
    alignSelf: "center",
    letterSpacing: 0.5,
    // paddingBottom: 10,
    textDecorationLine: "underline",
  },
  smnItem: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  smnBtn: {
    flexDirection: "row",
    backgroundColor: "transparent",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  smnFacebook: {
    backgroundColor: COLOR.LIGHT,
  },
  smnTwitter: {
    backgroundColor: COLOR.LIGHT,
    marginLeft: 15,
  },
  smnGooglePlus: {
    backgroundColor: COLOR.LIGHT,
    marginLeft: 15,
  },
  termText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.LIGHT,
    alignSelf: "center",
    textAlign: "center",
    // paddingTop: 5,
    lineHeight: 20,
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
  accOrderInfo: {
    borderColor: COLOR.LIGHT,
    borderWidth: 1,
    borderTopWidth: 0,
    backgroundColor: COLOR.LIGHT,
    paddingVertical: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  accordion: {
    width: "100%",
    marginBottom: 5,
  },
  accText: {
    fontFamily: FAMILY.REGULAR,
    fontSize: SIZE.SIZE_12,
    color: COLOR.PRIMARY,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: COLOR.LIGHTVIOLET,
  },
  tabInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    // backgroundColor: "green",
  },
  tabActive: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#493F5E",
    borderRadius: 3,
    paddingVertical: 15,
    marginHorizontal: 5,
  },
  tabInactive: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 3,
    paddingVertical: 15,
    marginHorizontal: 5,
  },
  tabTextActive: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.LIGHT,
  },
  tabTextInactive: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: "rgba(255,255,255,0.5)",
  },
  termText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.LIGHT,
    alignSelf: "center",
    textAlign: "center",
    paddingTop: 2,
    lineHeight: 20,
    marginTop: 20,
  },
};
