import { COLOR, FAMILY, SIZE } from '@theme/typography'

const React = require('react-native')
const { Platform } = React

export default {
  verificationBgImg: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1
  },
  verificationBgCover: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 2,
    backgroundColor: COLOR.DARKVIOLET
  },
  verificationContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 3,
  },
  /** -- Content --**/

  verificationForm: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  verificationImg: {
    width: 80,
    height: 150,
    alignSelf: 'center',
    marginBottom: 30
  },
  codeText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.LIGHT,
    textAlign: 'center'
  },
  verificationTitle: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_24,
    color: COLOR.LIGHT,
    textAlign: 'center',
    paddingBottom: 30
  },
  verificationText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.LIGHT,
    letterSpacing: 0.2,
    lineHeight: 21,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 30
  },
  formRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  formInput: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.DARK,
    backgroundColor: COLOR.LIGHT,
    borderRadius: 3,
    margin: 5,
    paddingHorizontal: 20,
    marginBottom: 15
  },
  confirmBtn: {
    backgroundColor: COLOR.GREEN,
    borderRadius: 3,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  confirmBtnText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.LIGHT,
    alignSelf: 'center'
  },
  verificationTimeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20
  },
  resendText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.LIGHT
  },
  resendTime: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_20,
    color: 'rgba(255, 178, 41, 1)',
    marginBottom: 5,
    paddingHorizontal: 3
  },borderStyleBase: {
    width: 60,
    height: 50
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 60,
    height: 50,
    borderWidth: 0,
    borderBottomWidth: 1,
    backgroundColor:'white',
    color:'black'
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
}
