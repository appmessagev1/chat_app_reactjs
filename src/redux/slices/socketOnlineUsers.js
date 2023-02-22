import { createSlice } from "@reduxjs/toolkit";

const socketOnlineUsers = createSlice({
  name: "currentReceiver",
  initialState: {},
  reducers: {
    setSocketOnlineUsers(state, action) {
      state.data = action.payload;
    },
  },
});

const { actions, reducer } = socketOnlineUsers;
export const { setSocketOnlineUsers } = actions;
export default reducer;
