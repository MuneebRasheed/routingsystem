import { COLOR, FAMILY, SIZE } from '@theme/typography'

const React = require('react-native')
const { Platform } = React

export default {

  // --content--//

  homeContainer: {
    backgroundColor: COLOR.PRIMARY,
    paddingVertical: 20
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.LIGHT,
    borderRadius: 3,
    marginBottom: 20,
    marginHorizontal: 20,
    paddingLeft: 20
  },
  formInput: {
    flex: 1,
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.PRIMARY,
    marginLeft: 5
  },
  footerBtn: {
    backgroundColor: COLOR.PRIMARY
  },
  footerBtnInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20
  },
  selectBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.GREEN,
    borderRadius: 3,
    marginRight: 5,
    paddingVertical: 15,
  },
  shareBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.BLUE,
    borderRadius: 3,
    paddingVertical: 15,
    marginLeft: 5
  },
  shareBtnText: {
    fontFamily: FAMILY.BOLD,
    fontSize: SIZE.SIZE_12,
    color: COLOR.LIGHT
  },
  // --map--//
  mMap: {
    width: '100%',
    height: '100%',
    borderColor: COLOR.LIGHT,
    borderWidth: 1
  },
  mMapImg: {
    flex: 1
  }
}
