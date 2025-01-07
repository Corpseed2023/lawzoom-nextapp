import { api, authApi, complianceApi } from "@/app/httpRequest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createEnquiry = createAsyncThunk("createEnquiry", async (data) => {
  const response = await api.post(`api/auth/createEnquiry`, data);
  return response.data;
});

export const getAllRoles = createAsyncThunk("getAllRoles", async () => {
  const response = await authApi.get(`api/auth/role/getAllRoles`);
  return response.data;
});

export const createRole=createAsyncThunk('createRole',async({role})=>{
  const response=await api.post(`api/auth/role/createRole?role=${role}`)
  return response.data
})


export const getAllCountries = createAsyncThunk("getAllCountries", async () => {
  const response = await api.get(`/api/compliance/countries/fetch-all-countries`);
  return response.data;
});

export const getStatesByCountryId = createAsyncThunk(
  "getStatesByCountryId",
  async (id) => {
    const response = await api.get(`/api/compliance/states/fetch-all-states?countryId=${id}`);
    return response.data;
  }
);

export const getCitiesByStateId = createAsyncThunk(
  "getCitiesByStateId",
  async (id) => {
    const response = await api.get(`/api/compliance/city/get-all-cities?stateId=${id}`);
    return response.data;
  }
);

export const createCountry = createAsyncThunk("createCountry", async (data) => {
  const response = await complianceApi.post(
    `/api/compliance/countries/create-country?countryName=${data?.countryName}&countryCode=${data?.countryCode}`
  );
  return response.data;
});

export const updateCountry = createAsyncThunk("updateCountry", async (data) => {
  const response = await api.put(`/api/compliance/countries/update-country`, data);
  return response.data;
});

export const createStatesForCountry = createAsyncThunk(
  "createStatesForCountry",
  async (data) => {
    const response = await complianceApi.post(
      `/api/compliance/states/create-state?countryId=${data?.countryId}&stateName=${data?.stateName}`
    );
    return response.data;
  }
);

export const updateStatesForCountry = createAsyncThunk(
  "updateStatesForCountry",
  async (data) => {
    const response = await api.put(`api/auth/states/update-states`, data);
    return response.data;
  }
);

export const createCities = createAsyncThunk("createCities", async (data) => {
  const response = await complianceApi.post(
    `/api/compliance/city/save-cities?cityName=${data?.cityName}&cityCode=${data?.cityCode}&stateId=${data?.stateId}`
  );
  return response.data;
});

export const updateCities = createAsyncThunk("updateCities", async (data) => {
  const response = await api.put(`/api/compliance/city/update-city`, data);
  return response.data;
});

export const deleteCitiesById = createAsyncThunk("deleteCitiesById", async (id) => {
  const response = await api.delete(`/api/compliance/city/softDeleteCity?id=${id}`);
  return response.data;
});

const commonSlice = createSlice({
  name: "common",
  initialState: {
    enquiryLoading: "",
    allRoles: [],
    countries: [],
    loading: "",
    statesList: [],
    citiesList: [],
  },
  extraReducers: (builder) => {
    builder.addCase(createEnquiry.pending, (state, action) => {
      state.enquiryLoading = "pending";
    });
    builder.addCase(createEnquiry.fulfilled, (state, action) => {
      state.enquiryLoading = "success";
    });
    builder.addCase(createEnquiry.rejected, (state, action) => {
      state.enquiryLoading = "rejected";
    });

    builder.addCase(getAllRoles.pending, (state, action) => {
      state.enquiryLoading = "pending";
    });
    builder.addCase(getAllRoles.fulfilled, (state, action) => {
      state.enquiryLoading = "success";
      state.allRoles = action?.payload;
    });
    builder.addCase(getAllRoles.rejected, (state, action) => {
      state.enquiryLoading = "rejected";
    });

    builder.addCase(getAllCountries.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getAllCountries.fulfilled, (state, action) => {
      state.loading = "success";
      state.countries = action?.payload;
    });
    builder.addCase(getAllCountries.rejected, (state, action) => {
      state.loading = "rejected";
    });

    builder.addCase(getStatesByCountryId.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getStatesByCountryId.fulfilled, (state, action) => {
      state.loading = "success";
      state.statesList = action?.payload;
    });
    builder.addCase(getStatesByCountryId.rejected, (state, action) => {
      state.loading = "rejected";
      state.statesList = [];
    });


    builder.addCase(getCitiesByStateId.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getCitiesByStateId.fulfilled, (state, action) => {
      state.loading = "success";
      state.citiesList = action?.payload;
    });
    builder.addCase(getCitiesByStateId.rejected, (state, action) => {
      state.loading = "rejected";
      state.citiesList = [];
    });

  },
});

export default commonSlice.reducer;
