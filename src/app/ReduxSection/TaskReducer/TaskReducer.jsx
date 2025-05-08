'use client';
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  error: '',
  loading: false
};

export const TaskRaducer = createSlice({
  name: 'TaskData',
  initialState,
  reducers: {
    getTaskData: (state, action) => {
      state.data = action.payload;
    }
  }
});

export const { getTaskData } = TaskRaducer.actions;
export default TaskRaducer.reducer;
