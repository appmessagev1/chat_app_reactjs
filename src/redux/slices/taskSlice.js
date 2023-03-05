import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskApi from "api/taskApi";

export const getTasks = createAsyncThunk("tasks/getTasks", async payload => {
  try {
    const data = await taskApi.getTasks(payload);
    return data;
  } catch (error) {
    throw error;
  }
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    data: [],
    isLoading: false
  },
  reducers: {
    addTask(state, action) {
      state.data = [...state.data, action.payload];
    },
  },
  extraReducers: builder => {
    builder.addCase(getTasks.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false
    });
    builder.addCase(getTasks.rejected, (state, action) => {
      state.isLoading = false
    })
  },
});

const { actions, reducer } = taskSlice;
export const { addTask } = actions;
export default reducer;
