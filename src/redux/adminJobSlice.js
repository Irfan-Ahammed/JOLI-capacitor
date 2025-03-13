import { createSlice } from "@reduxjs/toolkit";

const adminJobSlice = createSlice({
  name: "adminJob",
  initialState: {
    createdJob: [],
    createdSingleJob: null,
  },
  reducers: {
    setAllAdminJob: (state, action) => {
      state.createdJob = action.payload;
    },
  },
});

export const {  setAllAdminJob } = adminJobSlice.actions;
export default adminJobSlice.reducer;