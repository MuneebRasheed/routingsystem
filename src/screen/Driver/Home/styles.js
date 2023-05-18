import { COLOR, FAMILY, SIZE } from "@theme/typography";

const React = require("react-native");
const { Platform } = React;

export default {
  // --content--//

  homeContainer: {
    backgroundColor: COLOR.PRIMARY,
    paddingVertical: 20,
  },
  btnIcon: {
    alignItems: "center",
    margin: 10,
    marginTop: 20,
  },
  formRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLOR.LIGHT,
    borderRadius: 3,
    marginBottom: 20,
    marginHorizontal: 20,
    paddingLeft: 20,
  },
  formInput: {
    flex: 1,
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.PRIMARY,
    marginLeft: 5,
  },
  footerBtn: {
    backgroundColor: COLOR.PRIMARY,
  },
  footerBtnInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
  },
  selectBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.GREEN,
    borderRadius: 3,
    marginRight: 5,
    paddingVertical: 15,
  },
  shareBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.BLUE,
    borderRadius: 3,
    paddingVertical: 15,
    marginLeft: 5,
  },
  shareBtnText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.dar,
  },
  biddingCardText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.DARKVOLVET,
  },
  // --map--//
  mMap: {
    width: "100%",
    height: "100%",
    borderColor: COLOR.LIGHT,
    borderWidth: 1,
  },
  mMapImg: {
    flex: 1,
  },
  headerImg: {
    marginTop: -20,
    width: 62,
    height: 62,
    borderRadius: 36,
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
};
