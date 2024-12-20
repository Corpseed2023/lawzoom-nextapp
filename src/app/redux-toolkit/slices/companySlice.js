import api from "@/app/httpRequest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createCompany = createAsyncThunk("createCompany", async (data) => {
  const response = await api.post(
    `/company/addCompany?userId=${data?.userId}`,
    data
  );
  return response.data;
});

export const getAllCompanies = createAsyncThunk(
  "getAllCompanies",
  async ({ userId, subscriptionId }) => {
    const response = await api.get(
      `/company/fetch-all-company?userId=${userId}&subscriptionId=${subscriptionId}`
    );
    return response.data;
  }
);

export const addGstDetails = createAsyncThunk("addGstDetails", async (data) => {
  const response = await api.post(`/gst-details/add-gstDetails`, data);
  return response.data;
});

export const deleteCompanyById = createAsyncThunk(
  "deleteCompanyById",
  async ({ id, userId }) => {
    const response = await api.delete(
      `/company/removeCompany?id=${id}&userId=${userId}`
    );
    return response.data;
  }
);

export const fetchAllGstDetails = createAsyncThunk(
  "fetchAllGstDetails",
  async ({ companyId, userId, subscriptionId }) => {
    const response = await api.get(
      `/gst-details/fetch-company-gstDetails?companyId=${companyId}&userId=${userId}&subscriptionId=${subscriptionId}`
    );
    return response.data;
  }
);

export const fetchSingleCompanyDetail = createAsyncThunk(
  "getSingleCompany",
  async ({ userId, subscriptionId, companyId }) => {
    const response = await api.get(
      `/company/fetch-company?userId=${userId}&subscriptionId=${subscriptionId}&companyId=${companyId}`
    );
    return response.data;
  }
);

export const updateCompany = createAsyncThunk("updateCompany", async (data) => {
  const response = await api.put(
    `/company/update-company?companyId=${data?.companyId}&userId=${data?.userId}`,
    data?.formData
  );
  return response.data;
});

export const updateGstDetails = createAsyncThunk(
  "updateGstDetails",
  async (data) => {
    const response = await api.put(
      `/gst-details/update-gst-details?id=${data?.gstId}`
    );
    return response.data;
  }
);

export const createBusinessUnit = createAsyncThunk(
  "createBusinessUnit",
  async (data) => {
    const response = await api.post(
      `/business-unit/saveBusinessUnit?gstDetailsId=${data?.gstDetailsId}`,
      data?.data
    );
    return response.data;
  }
);

export const updateBusinessUnit = createAsyncThunk(
  "updateBusinessUnit",
  async ({ data, businessUnitId }) => {
    const response = await api.put(
      `/business-unit/updateBusinessUnit?businessUnitId=${businessUnitId}`,
      data
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
