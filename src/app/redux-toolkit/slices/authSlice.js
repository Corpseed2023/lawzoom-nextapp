import { api, authApi } from "@/app/httpRequest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk("loginUser", async (data) => {
  const response = await authApi.post(`/api/auth/token`, data);
  return response.data;
});

export const signupUser = createAsyncThunk("signupUser", async (data) => {
  const response = await authApi.post(`api/auth/signup`, data);
  return response.data;
});

export const genrateOpt = createAsyncThunk("genrateOpt", async (data) => {
  const response = await authApi.post(`api/auth/otp/generateOTP`, data);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userDetail: {},
    userDetails: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('userDetails')) || null : null,
    isAuthenticated: !!(typeof window !== 'undefined' && localStorage.getItem('userDetails')),
    userDetailLoading: "",
    otpResponse: {},
  },
  reducers: {
    logout: (state) => {
      state.userDetails = null;
      state.isAuthenticated = false;
      localStorage.removeItem('userDetails');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.userDetailLoading = "pending";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.userDetail = action.payload;
      state.userDetailLoading = "success";
      state.isAuthenticated = true;
      localStorage.setItem('userDetails', JSON.stringify(action.payload?.body));
      document.cookie = "userDetails=" + JSON.stringify(action.payload?.body);
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

export const {logout} = authSlice.actions;

export default authSlice.reducer;
