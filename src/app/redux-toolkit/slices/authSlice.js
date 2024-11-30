import api from "@/app/httpRequest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const loginUser = createAsyncThunk("loginUser", async (data) => {
  const response = await api.post(`/api/auth/token`, data);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userDetail: {},
    userDetailLoading: "",
  },
  reducers: {

  },
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
  },
});

export const {  } = authSlice.actions;

export default authSlice.reducer;
