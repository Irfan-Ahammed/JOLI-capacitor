// redux/locationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLocations = createAsyncThunk(
  "location/fetchLocations",
  async (query, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch locations");
    }
  }
);

export const updateLocation = createAsyncThunk(
  "location/updateLocation",
  async (location, { rejectWithValue }) => {
    try {
      const res = await axios.post("https://your-backend.com/api/location", {
        location,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update location");
    }
  }
);

const locationSlice = createSlice({
  name: "location",
  initialState: {
    locations: [],
    selectedLocation: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.locations = action.payload;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        state.selectedLocation = action.payload;
      });
  },
});

export default locationSlice.reducer;
