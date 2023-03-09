import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import messageApi from "api/messageApi";


export const getMessagesGroup = createAsyncThunk("message/getMessagesGroup", async payload => {
  try {
    const data = await messageApi.getMessageInGroup(payload);
    return data;
  } catch (error) {
    throw error;
  }
});

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    data: [],
  },
  reducers: {
    addMessageGroup(state, action) {
      state.data = [...state.data, action.payload];
    },
  },
  extraReducers: builder => {
    builder.addCase(getMessagesGroup.fulfilled, (state, action) => {
      state.data = action.payload.data.reverse();
    });
  },
});

const { actions, reducer } = messageSlice;
export const { addMessageGroup } = actions;
export default reducer;
