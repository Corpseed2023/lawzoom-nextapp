import { api, authApi, complianceApi } from "@/app/httpRequest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllDesiginations = createAsyncThunk(
  "getAllDesiginations",
  async (id) => {
    const response = await api.get(
      `/api/compliance/designation/list?departmentId=${id}`
    );
    return response.data;
  }
);

export const createDesiginations = createAsyncThunk(
  "createDesiginations",
  async (data) => {
    const response = await complianceApi.post(
      `/api/compliance/designation/create`,
      data
    );
    return response.data;
  }
);

export const deleteDesigination = createAsyncThunk(
  "deleteDesigination",
  async (data) => {
    const response = await complianceApi.delete(
      `/api/compliance/designation/delete?designationId=${data?.id}&userId=${data?.userId}`
    );
    return response.data;
  }
);

export const editDesigination = createAsyncThunk(
  "editDesigination",
  async (data) => {
    const response = await complianceApi.put(
      `/api/compliance/designation/update`,
      data
    );
    return response.data;
  }
);

export const getAllIndustries = createAsyncThunk(
  "getAllIndustries",
  async () => {
    const response = await complianceApi.get(
      `/api/compliance/industry-category/fetch-all-industry`
    );
    return response.data;
  }
);

export const createIndustry = createAsyncThunk(
  "createIndustry",
  async (data) => {
    const response = await complianceApi.post(
      `/api/compliance/industry-category/create-industry?industryName=${data?.industryName}&userId=${data?.userId}`
    );
    return response.data;
  }
);

export const updateIndustry = createAsyncThunk(
  "updateIndustry",
  async (data) => {
    const response = await complianceApi.put(
      `/api/compliance/industry-category/update-industry`,
      data
    );
    return response.data;
  }
);

export const getSubIndustryById = createAsyncThunk(
  "getSubIndustryById",
  async (id) => {
    const response = await complianceApi.get(
      `/api/compliance/sub-industry-category/fetch-all-enabled?industryCategoryId=${id}`
    );
    return response.data;
  }
);

export const updateSubIndustryById = createAsyncThunk(
  "updateSubIndustryById",
  async (data) => {
    const response = await complianceApi.put(
      `/api/compliance/sub-industry-category/update-sub-industry`,
      data
    );
    return response.data;
  }
);

export const createSubIndustry = createAsyncThunk(
  "createSubIndustry",
  async (data) => {
    const response = await complianceApi.post(
      `/api/compliance/sub-industry-category/create-sub-industry?industrySubCategoryName=${data?.industrySubCategoryName}&industryCategoryId=${data?.industryCategoryId}&userId=${data?.userId}`
    );
    return response.data;
  }
);

export const deleteSubIndustry = createAsyncThunk(
  "deleteSubIndustry",
  async (id) => {
    const response = await complianceApi.delete(
      `/api/compliance/sub-industry-category/soft-delete?id=${id}`
    );
    return response.data;
  }
);

export const createBusinessActivity = createAsyncThunk(
  "createBusinessActivity",
  async (data) => {
    const response = await complianceApi.post(
      `/api/compliance/business-activity/create-activity?businessActivityName=${data?.businessActivityName}&userId=${data?.userId}&industrySubCategoryId=${data?.industrySubCategoryId}`
    );
    return response.data;
  }
);

export const getBusinessActivityBySubIndustryId = createAsyncThunk(
  "getBusinessActivityBySubIndustryId",
  async (id) => {
    const response = await complianceApi.get(
      `/api/compliance/business-activity/list-activity?industrySubCategoryId=${id}`
    );
    return response.data;
  }
);

export const updateBusinessActivityBySubIndustryAndId = createAsyncThunk(
  "updateBusinessActivityBySubIndustryAndId",
  async (data) => {
    const response = await complianceApi.put(
      `/api/compliance/business-activity/update-activity`,
      data
    );
    return response.data;
  }
);

export const deleteBusinessActivity = createAsyncThunk(
  "deleteBusinessActivity",
  async (id) => {
    const response = await complianceApi.delete(
      `/api/compliance/business-activity/soft-delete?id=${id}`
    );
    return response.data;
  }
);

export const getAllCompanyType = createAsyncThunk(
  "getAllCompanyType",
  async () => {
    const response = await complianceApi.get(
      `/api/compliance/companyType/getAllCompanyTypeNames`
    );
    return response.data;
  }
);

export const editCompanyType = createAsyncThunk(
  "editCompanyType",
  async (data) => {
    const response = await complianceApi.put(
      `/api/compliance/companyType/updateCompanyType?id=${data?.id}`,
      data?.data
    );
    return response.data;
  }
);

export const createCompanyType = createAsyncThunk(
  "createCompanyType",
  async (data) => {
    const response = await complianceApi.post(
      `/api/compliance/companyType/createCompanyType`,
      data
    );
    return response.data;
  }
);

export const deleteCompanyType = createAsyncThunk(
  "deleteCompanyType",
  async (id) => {
    const response = await complianceApi.delete(
      `/api/compliance/companyType/deleteCompanyType?id=${id}`
    );
    return response.data;
  }
);

export const createdLocatedAt = createAsyncThunk(
  "createdLocatedAt",
  async (data) => {
    const response = await complianceApi.post(
      `/api/compliance/located-at/create-locatedAt`,
      data
    );
    return response.data;
  }
);

export const getAllLocatedAt = createAsyncThunk("getAllLocatedAt", async () => {
  const response = await complianceApi.get(`/api/compliance/located-at/get-all-locatedAt`);
  return response.data;
});

export const updateLocatedAt = createAsyncThunk(
  "updateLocatedAt",
  async (data) => {
    const response = await complianceApi.put(
      `/api/compliance/located-at/update-locatedAt?id=${data?.id}`,
      data?.data
    );
    return response.data;
  }
);

export const deleteLocatedAt = createAsyncThunk(
  "deleteLocatedAt",
  async (id) => {
    const response = await complianceApi.delete(
      `/api/compliance/located-at/locatedAt-delete?id=${id}`
    );
    return response.data;
  }
);

export const getAllBusinessActivity = createAsyncThunk(
  "getAllBusinessActivity",
  async (searchText) => {
    const response = await complianceApi.get(
      `/api/compliance/business-activity/active-business-activities?searchTerm=${searchText}`
    );
    return response.data;
  }
);

export const createDepartment = createAsyncThunk(
  "createDepartment",
  async (data) => {
    const response = await complianceApi.post(
      `/api/compliance/department/create?departmentName=${data?.departmentName}&userId=${data?.userId}`
    );
    return response.data;
  }
);

export const getAllDepartmentList = createAsyncThunk(
  "getAllDepartment",
  async () => {
    const response = await api.get(`/api/compliance/department/list`);
    return response.data;
  }
);

export const deleteDepartment = createAsyncThunk(
  "deleteDepartment",
  async (id) => {
    const response = await complianceApi.get(
      `/api/compliance/department/delete?departmentId=${id}`
    );
    return response.data;
  }
);

export const updateDepartment = createAsyncThunk(
  "updateDepartment",
  async (data) => {
    const response = await complianceApi.get(
      `/api/compliance/department/update`,
      data
    );
    return response.data;
  }
);

export const getAllResourceType = createAsyncThunk(
  "getAllResourceType",
  async () => {
    const response = await complianceApi.get(`/api/compliance/resource-type/get-all`);
    return response.data;
  }
);

export const createResourceType = createAsyncThunk(
  "createResourceType",
  async ({ typeOfResourceName }) => {
    const response = await complianceApi.post(
      `/api/compliance/resource-type/create?typeOfResourceName=${typeOfResourceName}`
    );
    return response.data;
  }
);

export const updateResourceType = createAsyncThunk(
  "updateResourceType",
  async ({ id, data }) => {
    const response = await complianceApi.put(
      `/api/compliance/resource-type/update?id=${id}`,
      data
    );
    return response.data;
  }
);

export const deleteResourceType = createAsyncThunk(
  "deleteResourceType",
  async (id) => {
    const response = await complianceApi.delete(
      `/api/compliance/resource-type/delete?id=${id}`
    );
    return response.data;
  }
);

const settingSlice = createSlice({
  name: "setting",
  initialState: {
    desiginationList: [],
    loading: "",
    companyTypeList: [],
    locatedAtList: [],
    industriesList: [],
    subIndusryList: [],
    businessActivityList: [],
    businessActivities: [],
    departmentList: [],
    resourceTypeList: [],
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

    builder.addCase(
      getBusinessActivityBySubIndustryId.pending,
      (state, action) => {
        state.loading = "pending";
      }
    );
    builder.addCase(
      getBusinessActivityBySubIndustryId.fulfilled,
      (state, action) => {
        state.loading = "success";
        state.businessActivityList = action.payload;
      }
    );
    builder.addCase(
      getBusinessActivityBySubIndustryId.rejected,
      (state, action) => {
        state.loading = "error";
        state.businessActivityList = [];
      }
    );

    builder.addCase(getAllBusinessActivity.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getAllBusinessActivity.fulfilled, (state, action) => {
      state.loading = "success";
      state.businessActivities = action.payload;
    });
    builder.addCase(getAllBusinessActivity.rejected, (state, action) => {
      state.loading = "error";
      state.businessActivities = [];
    });

    builder.addCase(getAllDepartmentList.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getAllDepartmentList.fulfilled, (state, action) => {
      state.loading = "success";
      state.departmentList = action.payload;
    });
    builder.addCase(getAllDepartmentList.rejected, (state, action) => {
      state.loading = "error";
      state.departmentList = [];
    });

    builder.addCase(getAllResourceType.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getAllResourceType.fulfilled, (state, action) => {
      state.loading = "success";
      state.resourceTypeList = action.payload;
    });
    builder.addCase(getAllResourceType.rejected, (state, action) => {
      state.loading = "error";
      state.resourceTypeList = [];
    });
  },
});

export default settingSlice.reducer;
