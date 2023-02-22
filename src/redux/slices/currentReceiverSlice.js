import { createSlice } from "@reduxjs/toolkit";

const currentReceiverSlice = createSlice({
  name: 'currentReceiver',
  initialState: {},
  reducers: {
    setCurrentReceiver(state, action) {
      state.data = action.payload;
    }
  }
})

const { actions, reducer } = currentReceiverSlice;
export const { setCurrentReceiver } = actions;
export default reducer;