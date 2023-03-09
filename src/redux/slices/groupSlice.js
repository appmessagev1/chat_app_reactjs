import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import groupApi from "api/groupApi";

export const getGroups = createAsyncThunk("groups/getGroups", async payload => {
  try {
    const data = await groupApi.getGroups(payload)
    return data
  } catch (error) {
    throw error
  }
});

const groupSlice = createSlice({
  name: "groups",
  initialState: {
    data: [],
    currentGroup: {},
    isLoading: false,
  },
  reducers: {
    addGroup(state, action) {
      state.data = [...state.data, action.payload];
    },
    setCurrentGroup(state, action) {
      state.currentGroup = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getGroups.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getGroups.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(getGroups.rejected, (state, action) => {
      state.isLoading = false;
    });
  }
});

const { actions, reducer } = groupSlice
export const { addGroup, setCurrentGroup } = actions
export default reducer