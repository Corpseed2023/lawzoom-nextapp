import api from "@/app/httpRequest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllDesiginations = createAsyncThunk(
  "getAllDesiginations",
  async () => {
    const response = await api.get(`/designation/designation-list`);
    return response.data;
  }
);

export const createDesiginations = createAsyncThunk(
  "createDesiginations",
  async (data) => {
    const response = await api.post(
      `/designation/createDesignation?designationName=${data?.designation}&userId=${data?.userId}`
    );
    return response.data;
  }
);

export const deleteDesigination = createAsyncThunk(
  "deleteDesigination",
  async (data) => {
    const response = await api.delete(
      `/designation/delete-designation?designationId=${data?.id}&userId=${data?.userId}`
    );
    return response.data;
  }
);

export const editDesigination = createAsyncThunk(
  "editDesigination",
  async (data) => {
    const response = await api.put(
      `/designation/update-designation`,
      data
    );
    return response.data;
  }
);

export const getAllIndustries = createAsyncThunk(
  "getAllIndustries",
  async () => {
    const response = await api.get(
      `/industry-category/fetch-all-industry`
    );
    return response.data;
  }
);

export const createIndustry = createAsyncThunk(
  "createIndustry",
  async (data) => {
    const response = await api.post(
      `/industry-category/create-industry?industryName=${data?.industryName}&userId=${data?.userId}`
    );
    return response.data;
  }
);

export const updateIndustry = createAsyncThunk(
  "updateIndustry",
  async (data) => {
    const response = await api.put(
      `/industry-category/update-industry`,
      data
    );
    return response.data;
  }
);

export const getSubIndustryById = createAsyncThunk(
  "getSubIndustryById",
  async (id) => {
    const response = await api.get(
      `/sub-industry-category/fetch-all-enabled?industryCategoryId=${id}`
    );
    return response.data;
  }
);

export const updateSubIndustryById = createAsyncThunk(
  "updateSubIndustryById",
  async (data) => {
    const response = await api.put(
      `/sub-industry-category/update-sub-industry`,
      data
    );
    return response.data;
  }
);

export const createSubIndustry = createAsyncThunk(
  "createSubIndustry",
  async (data) => {
    const response = await api.post(
      `/sub-industry-category/create-sub-industry?industrySubCategoryName=${data?.industrySubCategoryName}&industryCategoryId=${data?.industryCategoryId}&userId=${data?.userId}`
    );
    return response.data;
  }
);

export const deleteSubIndustry = createAsyncThunk(
  "deleteSubIndustry",
  async (id) => {
    const response = await api.delete(
      `/sub-industry-category/soft-delete?id=${id}`
    );
    return response.data;
  }
);

export const createBusinessActivity = createAsyncThunk(
  "createBusinessActivity",
  async (data) => {
    const response = await api.post(
      `/business-activity/create-activity?businessActivityName=${data?.businessActivityName}&userId=${data?.userId}&industrySubCategoryId=${data?.industrySubCategoryId}`
    );
    return response.data;
  }
);

export const getBusinessActivityBySubIndustryId = createAsyncThunk(
  "getBusinessActivityBySubIndustryId",
  async (id) => {
    const response = await api.get(
      `/business-activity/list-activity?industrySubCategoryId=${id}`
    );
    return response.data;
  }
);

export const updateBusinessActivityBySubIndustryAndId = createAsyncThunk(
  "updateBusinessActivityBySubIndustryAndId",
  async (data) => {
    const response = await api.put(
      `/business-activity/update-activity`,
      data
    );
    return response.data;
  }
);

export const deleteBusinessActivity = createAsyncThunk(
  "deleteBusinessActivity",
  async (id) => {
    const response = await api.delete(
      `/business-activity/soft-delete?id=${id}`
    );
    return response.data;
  }
);

export const getAllCompanyType = createAsyncThunk(
  "getAllCompanyType",
  async () => {
    const response = await api.get(`/company/getAllCompanyTypeNames`);
    return response.data;
  }
);

export const editCompanyType = createAsyncThunk(
  "editCompanyType",
  async (data) => {
    const response = await api.put(`/company/updateCompanyType?id=${data?.id}`, data?.data);
    return response.data;
  }
);

export const createCompanyType = createAsyncThunk(
  "createCompanyType",
  async (data) => {
    const response = await api.post(
      `/company/createCompanyType?companyTypeName=${data?.companyTypeName}&userId=${data?.userId}`
    );
    return response.data;
  }
);

export const deleteCompanyType=createAsyncThunk('deleteCompanyType',async(id)=>{
  const response=await api.delete(`/company/deleteCompanyType?id=${id}`)
  return response.data
})

export const createdLocatedAt=createAsyncThunk('createdLocatedAt',async(data)=>{
  const response=await api.post(`/located-at/create-locatedAt`,data)
  return response.data
})

export const getAllLocatedAt=createAsyncThunk('getAllLocatedAt',async()=>{
  const response=await api.get(`/located-at/get-all-locatedAt`)
  return response.data
})

export const updateLocatedAt=createAsyncThunk('updateLocatedAt',async(data)=>{
  const response=await api.put(`/located-at/update-locatedAt?id=${data?.id}`,data?.data)
  return response.data
})

export const deleteLocatedAt=createAsyncThunk('deleteLocatedAt',async(id)=>{
  const response=await api.delete(`/api/auth/located-at/locatedAt-delete?id=${id}`)
  return response.data
})

const settingSlice = createSlice({
  name: "setting",
  initialState: {
    desiginationList: [],
    loading: "",
    companyTypeList: [],
    locatedAtList:[],
    industriesList:[],
    subIndusryList:[],
    businessActivityList:[]
  },
  extraReducers: (builder) => {
    builder.addCase(getAllDesiginations.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getAllDesiginations.fulfilled, (state, action) => {
      state.loading = "success";
      state.desiginationList = action.payload;
    });
    builder.addCase(getAllDesiginations.rejected, (state, action) => {
      state.loading = "error";
      state.desiginationList = [];
    });

    builder.addCase(getAllCompanyType.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getAllCompanyType.fulfilled, (state, action) => {
      state.loading = "success";
      state.companyTypeList = action.payload;
    });
    builder.addCase(getAllCompanyType.rejected, (state, action) => {
      state.loading = "error";
      state.companyTypeList = [];
    });

    builder.addCase(getAllLocatedAt.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getAllLocatedAt.fulfilled, (state, action) => {
      state.loading = "success";
      state.locatedAtList = action.payload;
    });
    builder.addCase(getAllLocatedAt.rejected, (state, action) => {
      state.loading = "error";
      state.locatedAtList = [];
    });

    builder.addCase(getAllIndustries.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getAllIndustries.fulfilled, (state, action) => {
      state.loading = "success";
      state.industriesList = action.payload;
    });
    builder.addCase(getAllIndustries.rejected, (state, action) => {
      state.loading = "error";
      state.industriesList = [];
    });

    builder.addCase(getSubIndustryById.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getSubIndustryById.fulfilled, (state, action) => {
      state.loading = "success";
      state.subIndusryList = action.payload;
    });
    builder.addCase(getSubIndustryById.rejected, (state, action) => {
      state.loading = "error";
      state.subIndusryList = [];
    });

    builder.addCase(getBusinessActivityBySubIndustryId.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getBusinessActivityBySubIndustryId.fulfilled, (state, action) => {
      state.loading = "success";
      state.businessActivityList = action.payload;
    });
    builder.addCase(getBusinessActivityBySubIndustryId.rejected, (state, action) => {
      state.loading = "error";
      state.businessActivityList = [];
    });
  },
});

export default settingSlice.reducer;
