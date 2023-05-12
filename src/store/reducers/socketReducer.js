import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

// const ENDPOINT = "http://192.168.18.254:3000";
const ENDPOINT = "https://testing.explorelogix.com";
const Token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEcml2ZXIiLCJlbWFpbCI6ImpvaG4yMzEyMzEyQGdtYWlsLmNvbSIsInBob25lIjoiMDMzNTQzNTIwMDEiLCJfaWQiOiI2NDM5MDJmYWIyNTk0YmMxODNmODZkNDYiLCJhdmF0YXIiOiJcdGh0dHBzOi8vc3RhdGljLnZlY3RlZXp5LmNvbS9zeXN0ZW0vcmVzb3VyY2VzL3ByZXZp4oCmLzQ4Ny85MTcvb3JpZ2luYWwvbWFuLWF2YXRhci1pY29uLWZyZWUtdmVjdG9yLmpwZyIsInNvY2tldElkIjoiIiwicm9sZSI6WyJ1c2VyIl0sImlhdCI6MTY4MTg4OTY5NSwiZXhwIjoxNjgxOTc2MDk1fQ.9sA75mdj3bjsOFhtJT-biQHqMDfZnkKZCC0r2HXOumg";
const DriverToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBSRUFMIERSSVZFUiIsImVtYWlsIjoiam9objIzMTIzMTIxMUBnbWFpbC5jb20iLCJwaG9uZSI6IjAzMzU0MzUyMDAyIiwiX2lkIjoiNjQzOTFhZTRiMjU5NGJjMTgzZjg2ZDQ3IiwiYXZhdGFyIjoiXHRodHRwczovL3N0YXRpYy52ZWN0ZWV6eS5jb20vc3lzdGVtL3Jlc291cmNlcy9wcmV2aeKApi80ODcvOTE3L29yaWdpbmFsL21hbi1hdmF0YXItaWNvbi1mcmVlLXZlY3Rvci5qcGciLCJzb2NrZXRJZCI6IiIsInJvbGUiOlsicmlkZXIiXSwiaWF0IjoxNjgxODkwMTg1LCJleHAiOjE2ODE5NzY1ODV9.-Nbow0WRyFWvayhDi1kHqYDorf5iqh1esHsrcvrYGzc";
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
