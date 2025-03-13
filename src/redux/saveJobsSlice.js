import { createSlice } from "@reduxjs/toolkit";

const saveJobSlice = createSlice({
  name: "saveJobs",
  initialState: {
    saveJobs: []
  },
  reducers: {
    setSaveJobs: (state, action) => {
      const jobId = action.payload._id;
      const exists = state.saveJobs.some((job) => job._id === jobId);

      if (exists) {
        state.saveJobs = state.saveJobs.filter((job) => job._id !== jobId);
      } else {
        state.saveJobs.push(action.payload);
      }
    }
  }
});

export const { setSaveJobs } = saveJobSlice.actions;
export default saveJobSlice.reducer;
