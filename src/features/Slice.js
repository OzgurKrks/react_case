import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isAuthKey: false,
  statusCode: 0,
  message: "",
};

export const fetchData = createAsyncThunk("get/weather", async (query) => {
  const api_key = JSON.parse(sessionStorage.getItem("api_key"));
  const { data } = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        q: query,
        units: "metric",
        APPID: api_key,
        lang: "tr",
      },
    }
  );

  return data;
});

export const testApi = createAsyncThunk("test/api", async (key) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${key}`
    );

    if (response.status === 200) {
      sessionStorage.setItem("api_key", JSON.stringify(key));
      return response.status;
    } else {
      return 0;
    }
  } catch (error) {
    return error;
  }
});

export const counterSlice = createSlice({
  name: "weather_app",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(testApi.fulfilled, (state, action) => {
        state.isAuthKey = true;
        state.statusCode = action.payload;
      })
      .addCase(testApi.rejected, (state) => {
        state.isAuthKey = false;
        state.isError = true;
      });
  },
});

export default counterSlice.reducer;
