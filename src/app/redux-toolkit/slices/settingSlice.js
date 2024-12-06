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

export const editDesigination = createAsyncThunk(
  "editDesigination",
  async (data) => {
    const response = await api.put(
      `/api/auth/designation/update-designation`,
      data
    );
    return response.data;
  }
);

export const getAllIndustries = createAsyncThunk(
  "getAllIndustries",
  async () => {
    const response = await api.get(
      `/api/auth/industry-category/fetch-all-industry`
    );
    return response.data;
  }
);

export const createIndustry = createAsyncThunk(
  "createIndustry",
  async (data) => {
    const response = await api.post(
      `/api/auth/industry-category/create-industry?industryName=${data?.industryName}&userId=${data?.userId}`
    );
    return response.data;
  }
);

export const updateIndustry = createAsyncThunk(
  "updateIndustry",
  async (data) => {
    const response = await api.put(
      `/api/auth/industry-category/update-industry`,
      data
    );
    return response.data;
  }
);

export const getSubIndustryById = createAsyncThunk(
  "getSubIndustryById",
  async (id) => {
    const response = await api.get(
      `/api/auth/sub-industry-category/fetch-all-enabled?industryCategoryId=${id}`
    );
    return response.data;
  }
);

export const updateSubIndustryById = createAsyncThunk(
  "updateSubIndustryById",
  async (data) => {
    const response = await api.put(
      `/api/auth/sub-industry-category/update-sub-industry`,
      data
    );
    return response.data;
  }
);

export const createSubIndustry = createAsyncThunk(
  "createSubIndustry",
  async (data) => {
    const response = await api.post(
      `/api/auth/sub-industry-category/create-sub-industry?industrySubCategoryName=${data?.industrySubCategoryName}&industryCategoryId=${data?.industryCategoryId}&userId=${data?.userId}`
    );
    return response.data;
  }
);

export const deleteSubIndustry = createAsyncThunk(
  "deleteSubIndustry",
  async (id) => {
    const response = await api.delete(
      `/api/auth/sub-industry-category/soft-delete?id=${id}`
    );
    return response.data;
  }
);

export const createBusinessActivity = createAsyncThunk(
  "createBusinessActivity",
  async (data) => {
    const response = await api.post(
      `/api/auth/business-activity/create-activity?businessActivityName=${data?.businessActivityName}&userId=${data?.userId}&industrySubCategoryId=${data?.industrySubCategoryId}`
    );
    return response.data
  }
);

export const getBusinessActivityBySubIndustryId=createAsyncThunk('getBusinessActivityBySubIndustryId',async(id)=>{
  const response=await api.get(`/api/auth/business-activity/list-activity?industrySubCategoryId=${id}`)
  return response.data
})

export const updateBusinessActivityBySubIndustryAndId=createAsyncThunk('updateBusinessActivityBySubIndustryAndId',async(data)=>{
  const response=await api.put(`/api/auth/business-activity/update-activity`,data)
  return response.data
})

export const deleteBusinessActivity=createAsyncThunk('deleteBusinessActivity',async(id)=>{
  const response=await api.delete(`/api/auth/business-activity/soft-delete?id=${id}`)
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
