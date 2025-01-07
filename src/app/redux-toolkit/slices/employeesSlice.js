import { api, authApi, complianceApi } from "@/app/httpRequest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllEmployeesByUserId = createAsyncThunk(
  "getAllEmployeesByUserId",
  async ({ userId, subscriberId }) => {
    const response = await api.get(
      `/api/compliance/users/fetch-members?subscriberId=${subscriberId}&userId=${userId}`
    );
    return response.data;
  }
);

export const addEmployee = createAsyncThunk("addEmployee", async (data) => {
  const response = await authApi.post(`api/auth/user/addTeamMember`, data);
  return response.data;
});

export const updateEmployee = createAsyncThunk(
  "updateEmployee",
  async ({ id, data }) => {
    const response = await api.put(
      `api/auth/team/updateTeamMember?id=${id}`,
      data
    );
    return response.data;
  }
);

export const deleteEmployee = createAsyncThunk(
  "deleteEmployee",
  async ({ userId, subscriptionId, teamMemberId }) => {
    const response = await api.delete(
      `api/auth/team/removeTeamMember?userId=${userId}&subscriptionId=${subscriptionId}&teamMemberId=${teamMemberId}`
    );
    return response.data;
  }
);

export const createTeamMember = createAsyncThunk(
  "createTeamMember",
  async (data) => {
    const response = await complianceApi.post(
      `/api/compliance/users/addTeamMember`,
      data
    );
    return response.data;
  }
);

export const createSignupUser = createAsyncThunk("createSignupUser", async (data) => {
  const response = await complianceApi.post(
    `/api/compliance/users/create`,
    data
  );
  return response.data;
});

const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    loading: "",
    teamMemberList: [],
  },
  extraReducers: (builders) => {
    builders.addCase(getAllEmployeesByUserId.pending, (state, action) => {
      state.loading = "pending";
    });
    builders.addCase(getAllEmployeesByUserId.fulfilled, (state, action) => {
      state.loading = "success";
      state.teamMemberList = action.payload;
    });
    builders.addCase(getAllEmployeesByUserId.rejected, (state, action) => {
      state.loading = "rejected";
      state.teamMemberList = [];
    });
  },
});

export default employeesSlice.reducer;
