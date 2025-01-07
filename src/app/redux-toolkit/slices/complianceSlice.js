import {api} from "@/app/httpRequest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCompliances = createAsyncThunk(
  "getAllCompliances",
  async ({ userId, subscriberId }) => {
    const response = await api.get(
      `/api/compliance/compliance/company-details-count?userId=${userId}&subscriberId=${subscriberId}`
    );
    return response.data;
  }
);

export const getComplianceByUnitId = createAsyncThunk(
  "getComplianceByUnitId",
  async ({ businessUnitId, userId, subscriberId }) => {
    const response = await api.get(
      `/api/compliance/compliance/fetchByBusinessUnit?businessUnitId=${businessUnitId}&userId=${userId}&subscriberId=${subscriberId}`
    );
    return response.data;
  }
);

export const createCompliance = createAsyncThunk(
  "createCompliance",
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

export const getAllMileStones=createAsyncThunk('getAllMileStones',async(data)=>{
  const response =await api.post(`/api/compliance/milestone/fetch-all-milestone`,data)
  return response.data
})

export const createMileStone=createAsyncThunk('createMileStone',async(data)=>{
  const response=await api.post(`/api/compliance/milestone/create`,data)
  return response.data
})

export const createTask=createAsyncThunk('createTask',async(data)=>{
  const response=await api.post(`/api/compliance/tasks/create`,data)
  return response.data
})

export const getComplianceById=createAsyncThunk('getComplianceById',async(id)=>{
  const response=await api.get(`/api/compliance/compliance/fetch-compliance?complianceId=${id}`)
  return response.data
})

export const getAllTask=createAsyncThunk('getAllTask',async(id)=>{
  const response=await api.get(`/api/compliance/tasks/fetch?milestoneId=${id}`)
  return response.data
})


const complianceSlice = createSlice({
  name: "compliance",
  initialState: {},
  extraReducers: (builder) => {},
});

export default complianceSlice.reducer;
