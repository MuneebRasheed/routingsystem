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
  connectText11: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.LIGHT,
    alignSelf: "center",
    letterSpacing: 0.5,
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
    marginTop: 50,
  },
  signUpImg: {
    width: 50,
    height: 50,
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 15,
  },
  signUpTitle: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_30,
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
    alignItems: "center",
  },
  formInput: {
    flex: 1,
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
  formInput4: {
    width: "100%",
    fontFamily: FAMILY.REGULAR,
    fontSize: SIZE.SIZE_12,
    color: COLOR.DARK,
    backgroundColor: COLOR.LIGHT,
    borderRadius: 3,
  },
  formInput2: {
    marginLeft: 15,
  },
  signUpBtn: {
    backgroundColor: COLOR.GREEN,
    borderRadius: 5,
    paddingVertical: 15,
    marginVertical: 15,
  },
  signUpBtnText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_14,
    color: COLOR.LIGHT,
    alignSelf: "center",
  },
  signUpContent: {
    marginVertical: 20,
  },
  connectText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.LIGHT,
    alignSelf: "center",
    letterSpacing: 0.5,
    paddingBottom: 10,
  },
  connectTextLink: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_14,
    color: COLOR.LIGHT,
    alignSelf: "center",
    letterSpacing: 0.5,

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
    lineHeight: 19,
  },
};
