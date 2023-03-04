import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import messageApi from "api/messageApi";

export const getMessagesPrivate = createAsyncThunk("message/getMessages", async payload => {
  try {
    const data = await messageApi.getMessageInConversation(payload);
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
    addMessage(state, action) {
      state.data = [...state.data, action.payload];
    },
  },
  extraReducers: builder => {
    builder.addCase(getMessagesPrivate.fulfilled, (state, action) => {
      state.data = action.payload.data.reverse();
    });
  },
});

const { actions, reducer } = messageSlice;
export const { addMessage } = actions;
export default reducer;
