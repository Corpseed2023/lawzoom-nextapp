
import api from "@/app/httpRequest"
import axios from "axios"

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

export const loginUser = createAsyncThunk("loginUser", async (data) => {
  const response = await api.post(`/api/auth/token`, data)
  return response.data
})

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userDetail: {},
  },
  reducers: {
    handleAddition: (state, action) => {
      state.sum = state.sum + action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.userDetail = action.payload
    })
  },
})

export const { handleAddition } = authSlice.actions

export default authSlice.reducer
