import api from "@/app/httpRequest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllEmployeesByCompanyId = createAsyncThunk(
  "getAllEmployeesByCompanyId",
  async ({ userId, subscriptionId }) => {
    const response = await api.get(
      `api/auth/team/getAllTeamMembers?userId=${userId}&subscriptionId=${subscriptionId}`
    );
    return response.data;
  }
);

export const addEmployee = createAsyncThunk(
  "addEmployee",
  async ({ userId, data }) => {
    const response = await api.post(
      `api/auth/team/addTeamMember?userId=${userId}`,
      data
    );
    return response.data;
  }
);

export const updateEmployee = createAsyncThunk(
  "updateEmployee",
  async ({ id, data }) => {
    const response = await api.put(`api/auth/team/updateTeamMember?id=${id}`, data);
    return response.data;
  }
);

export const deleteEmployee = createAsyncThunk(
  "deleteEmployee",
  async ({ userId, subscriptionId,teamMemberId }) => {
    const response = await api.delete(
      `api/auth/team/removeTeamMember?userId=${userId}&subscriptionId=${subscriptionId}&teamMemberId=${teamMemberId}`
    );
    return response.data;
  }
);




const employeesSlice = createSlice({
  name: "employees",
  initialState: {},
  extraReducers: (builders) => {},
});

export default employeesSlice.reducer;
