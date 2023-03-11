import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: '',
  isLoggedIn: false,
  user: null,
  address: {
    billing: {},
    shipping: {}
  }
}

const updateToken_ = (state, action) => {
  state.token = action.payload.token
}

const login_ = (state, action) => {
  state.isLoggedIn = true
  state.user = action.payload.user
}

const logout_ = (state, action) => {
  return { ...initialState, token: state.token }
}

const updateUser_ = (state, action) => {
  state.user = action.payload.user
}

const updateAddress_ = (state, action) => {
  state.address.billing = action.payload.billing || {}
  state.address.shipping = action.payload.shipping || {}
}

const slice = createSlice({
  name: 'session',
  initialState: { ...initialState },
  reducers: {
    updateToken: updateToken_,
    login: login_,
    logout: logout_,
    updateUser: updateUser_,
    updateAddress: updateAddress_
  }
})

const { actions, reducer } = slice

export const {
  updateToken,
  login,
  logout,
  updateUser,
  updateAddress
} = actions

export default reducer
