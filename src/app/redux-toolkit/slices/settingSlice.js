import api from "@/app/httpRequest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllDesiginations = createAsyncThunk(
  "getAllDesiginations",
  async () => {
    const response = await api.get(`/api/auth/designation/designation-list`);
    return response.data;
  }
);

export const createDesiginations = createAsyncThunk(
  "createDesiginations",
  async (data) => {
    const response = await api.post(
      `/api/auth/designation/createDesignation?designationName=${data?.designation}&userId=${data?.userId}`
    );
    return response.data;
  }
);

export const deleteDesigination = createAsyncThunk(
  "deleteDesigination",
  async (data) => {
    const response = await api.delete(
      `/api/auth/designation/delete-designation?designationId=${data?.id}&userId=${data?.userId}`
    );
    return response.data;
  }
);

export const editDesigination=createAsyncThunk('editDesigination',async(data)=>{
  const response=await api.put(`/api/auth/designation/update-designation`,data)
  return response.data
})

const settingSlice = createSlice({
  name: "setting",
  initialState: {
    desiginationList: [],
    loading: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getAllDesiginations.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getAllDesiginations.fulfilled, (state, action) => {
      state.loading = "success";
      //   console.log('Sliceeeeeeeeeeeeeeee==============>>>>>>>>>>>>>',action.payload)
      state.desiginationList = action.payload;
    });
    builder.addCase(getAllDesiginations.rejected, (state, action) => {
      state.loading = "error";
      state.desiginationList = [];
    });
  },
});

export default settingSlice.reducer;
