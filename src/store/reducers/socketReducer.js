import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

// const ENDPOINT = "http://192.168.18.254:3000";
const ENDPOINT = "https://testing.explorelogix.com";

const initialState = {
  socket: "",
};

const initilizeSocket_ = (state, action) => {
  state.socket = io(ENDPOINT, {
    extraHeaders: {
      authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEcml2ZXIiLCJlbWFpbCI6ImpvaG4yMzEyMzEyQGdtYWlsLmNvbSIsInBob25lIjoiMDMzNTQzNTIwMDEiLCJfaWQiOiI2NDM5MDJmYWIyNTk0YmMxODNmODZkNDYiLCJhdmF0YXIiOiJcdGh0dHBzOi8vc3RhdGljLnZlY3RlZXp5LmNvbS9zeXN0ZW0vcmVzb3VyY2VzL3ByZXZp4oCmLzQ4Ny85MTcvb3JpZ2luYWwvbWFuLWF2YXRhci1pY29uLWZyZWUtdmVjdG9yLmpwZyIsInNvY2tldElkIjoiIiwicm9sZSI6WyJ1c2VyIl0sImlhdCI6MTY4MTc5OTQ3OCwiZXhwIjoxNjgxODg1ODc4fQ.fjjuBUD28Ew7A17pd214MbnHzKu3P9HGmcNstf2aTr0",
    },
  });
};

const slice = createSlice({
  name: "socketState",
  initialState,
  reducers: {
    initilizeSocket: initilizeSocket_,
  },
});

const { actions, reducer } = slice;

export const { initilizeSocket } = actions;

export default reducer;
