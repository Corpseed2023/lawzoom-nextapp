import api from "@/app/httpRequest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createCompany = createAsyncThunk("createCompany", async (data) => {
  const response = await api.post(`/company/addCompany`, data);
  return response.data;
});

export const getAllCompanies = createAsyncThunk(
  "getAllCompanies",
  async (id) => {
    const response = await api.get(
      `/company/getAllCompany?userId=${id}`
    );
    return response.data;
  }
);



const companySlice = createSlice({
  name: "company",
  initialState: {},
  extraReducers: (builder) => {},
});

export default companySlice.reducer;
