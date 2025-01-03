import api from "@/app/httpRequest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllCompliances = createAsyncThunk(
  "getAllCompliances",
  async ({ userId, subscriberId }) => {
    const response = await api.get(
      `/api/compliance/company-details-count?userId=${userId}&subscriberId=${subscriberId}`
    );
    return response.data;
  }
);

export const getComplianceByUnitId = createAsyncThunk(
  "getComplianceByUnitId",
  async ({ businessUnitId, userId, subscriberId }) => {
    const response = await api.get(
      `/api/compliance/fetchByBusinessUnit?businessUnitId=${businessUnitId}&userId=${userId}&subscriberId=${subscriberId}`
    );
    return response.data;
  }
);

export const createCompliance = createAsyncThunk(
  "createComplianceSbsdvb",
  async ({ businessUnitId, userId, data }) => {
    try {
      const response = await api.post(
        `/api/compliance/compliance/saveCompliance?businessUnitId=${businessUnitId}&userId=${userId}`,
        data
      );
      return response.data;
    } catch (err) {
      console.log("POST API ERROR IN CREATE COMPLIANCES", err);
    }
  }
);

const complianceSlice = createSlice({
  name: "compliance",
  initialState: {},
  extraReducers: (builder) => {},
});

export default complianceSlice.reducer;
