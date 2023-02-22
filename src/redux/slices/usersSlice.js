import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "api/userApi";

export const getUserByIds = createAsyncThunk("users/getUserByIds", async payload => {
  try {
    const data = await userApi.getUserByIds(payload)
    return data;
  } catch (error) {
    throw error;
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
  },
  reducers: {
    setUsers(state, action) {
      state.data = [...action.payload];
    },
  },
  extraReducers: builder => {
    builder.addCase(getUserByIds.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
  },
});

const { actions, reducer } = usersSlice;
export const { setUsers } = actions;
export default reducer;
