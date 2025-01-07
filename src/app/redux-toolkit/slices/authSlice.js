import api from "@/app/httpRequest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk("loginUser", async (data) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL_LOGIN}/api/auth/token`,
    data,
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
});

export const signupUser = createAsyncThunk("", async (data) => {
  const response = await api.post(`api/auth/signup`, data);
  return response.data;
});

export const genrateOpt = createAsyncThunk("genrateOpt", async (data) => {
  const response = await api.post(`api/auth/otp/generateOTP`, data);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userDetail: {},
    userDetailLoading: "",
    otpResponse: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.userDetailLoading = "pending";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.userDetail = action.payload;
      state.userDetailLoading = "success";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.userDetail = {};
      state.userDetailLoading = "rejected";
    });

    builder.addCase(genrateOpt.pending, (state, action) => {
      state.userDetailLoading = "pending";
    });
    builder.addCase(genrateOpt.fulfilled, (state, action) => {
      state.otpResponse = action.payload;
      state.userDetailLoading = "success";
    });
    builder.addCase(genrateOpt.rejected, (state, action) => {
      state.otpResponse = {};
      state.userDetailLoading = "rejected";
    });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
