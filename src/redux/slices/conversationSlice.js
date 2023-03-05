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
    currentConversation: {},
    isLoading: false
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
    builder.addCase(getConversations.pending, (state, action) => {
      state.isLoading = true
    });
    builder.addCase(getConversations.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false
    });
    builder.addCase(getConversations.rejected, (state, action) => {
      state.isLoading = false
    });
  },
});

const { actions, reducer } = conversationSlice;
export const { setConversations, setCurrentConversation } = actions;
export default reducer;
