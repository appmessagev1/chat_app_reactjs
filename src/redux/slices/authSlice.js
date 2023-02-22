import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "api/authApi";
import userApi from "api/userApi";

export const doSignIn = createAsyncThunk("auth/signIn", async payload => {
  try {
    const data = await authApi.signIn(payload);
    return data;
  } catch (error) {
    throw(error)
  }
});

export const updateUser = createAsyncThunk("users/updateUser", async payload => {
  try {
    const data = await userApi.updateProfile(payload);
    return data;
  } catch (error) {
    throw error;
  }
});

export const doSignOut = createAsyncThunk("auth/signOut", async () => {
  console.log("Signing out")
})

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    access_token: "",
    refresh_token: "",
  },
  reducers: {
    setUser(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(doSignIn.fulfilled, (state, action) => {
      state.data = action.payload.data.user;
      state.access_token = action.payload.data.access_token;
      state.refresh_token = action.payload.data.refresh_token;
      localStorage.setItem("token", action.payload.data.access_token);
      localStorage.setItem("refresh_token", action.payload.data.refresh_token);
      localStorage.setItem("user", JSON.stringify(action.payload.data.user));
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.data = action.payload.data
      localStorage.setItem("user", JSON.stringify(action.payload.data.user));
    })
  },
});

const { reducer, actions } = userSlice;
export const { setUser } = actions;
export default reducer;
