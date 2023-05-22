import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

// const ENDPOINT = "http://192.168.18.254:3000";
const ENDPOINT =
  "https://5624-2400-adc5-425-a000-38cd-4f9a-ccdb-4dbf.ngrok-free.app";

const initialState = {
  socket: "",
};

const initilizeSocket_ = (state, action) => {
  console.log("Action", action);
  state.socket = io(ENDPOINT, {
    extraHeaders: {
      authorization: `${action.payload}`,
    },
  });
};

const removeSocketConnection_ = (state, action) => {
  state.socket = null;
};

const slice = createSlice({
  name: "socketState",
  initialState,
  reducers: {
    initilizeSocket: initilizeSocket_,
    removeSocketConnection: removeSocketConnection_,
  },
});

const { actions, reducer } = slice;

export const { initilizeSocket, removeSocketConnection } = actions;

export default reducer;
