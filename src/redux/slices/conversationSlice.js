import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import conversationApi from "api/conversationApi";

export const getConversations = createAsyncThunk("conversation/getConversations", async payload => {
  try {
    const data = await conversationApi.getConversations(payload);
    return data;
  } catch (error) {
    throw error;
  }
});

const conversationSlice = createSlice({
  name: "conversations",
  initialState: {
    data: [],
    currentConversation: {}
  },
  reducers: {
    setConversations(state, action) {
      state.data = [...state.data, action.payload];
    },
    setCurrentConversation(state, action) { 
      state.currentConversation = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getConversations.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
  },
});

const { actions, reducer } = conversationSlice;
export const { setConversations, setCurrentConversation } = actions;
export default reducer;
