import api from "@/app/httpRequest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllCompliances = createAsyncThunk(
  "getAllCompliances",
  async (userId) => {
    const response = await api.get(
      `api/compliance/company-details-count?userId=${userId}`
    );
    return response.data;
  }
);

export const getComplianceByUnitId = createAsyncThunk(
  "getComplianceByUnitId",
  async (businessUnitId) => {
    const response = await api.get(
      `/api/compliance/fetchByBusinessUnit?businessUnitId=${businessUnitId}`
    );
    return response.data;
  }
);

const complianceSlice = createSlice({
  name: "compliance",
  initialState: {},
  extraReducers: (builder) => {},
});

export default complianceSlice.reducer;
